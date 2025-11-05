#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class PerformanceManager {
  constructor() {
    this.storiesDir = path.join(__dirname, '../stories');
    this.configDir = path.join(__dirname, '../.storybook');
  }

  // Identify problematic large story files
  findLargeStoryFiles() {
    const largeFiles = [];
    const walk = (dir) => {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory() && !file.includes('backup')) {
          walk(filePath);
        } else if (file.endsWith('.stories.tsx') || file.endsWith('.stories.jsx')) {
          const content = fs.readFileSync(filePath, 'utf8');
          const importCount = (content.match(/from '@shopify\/polaris'/g) || []).length;
          const componentCount = (content.match(/[A-Z][a-zA-Z]*,/g) || []).length;

          if (stat.size > 30000 || componentCount > 20 || importCount > 1) {
            largeFiles.push({
              path: filePath,
              size: stat.size,
              imports: importCount,
              components: componentCount
            });
          }
        }
      }
    };

    walk(this.storiesDir);
    return largeFiles.sort((a, b) => b.size - a.size);
  }

  // Create optimized story configuration
  createOptimizedConfig() {
    const largeFiles = this.findLargeStoryFiles();
    const excludePatterns = largeFiles.map(file => {
      const relativePath = path.relative(this.storiesDir, file.path);
      return `!${relativePath.replace('.stories.tsx', '*.stories.*')}`;
    });

    return {
      stories: [
        "../stories/foundation/**/*.stories.@(js|jsx|mjs|ts|tsx)",
        ...excludePatterns,
        "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
      ],
      performance: {
        excludeLargeFiles: largeFiles.map(f => path.relative(this.storiesDir, f.path)),
        recommendations: this.generateRecommendations(largeFiles)
      }
    };
  }

  generateRecommendations(largeFiles) {
    const recommendations = [];

    for (const file of largeFiles) {
      if (file.components > 30) {
        recommendations.push(`Split ${file.path} into smaller files (${file.components} components)`);
      }
      if (file.imports > 1) {
        recommendations.push(`Consolidate imports in ${file.path}`);
      }
      if (file.size > 50000) {
        recommendations.push(`Optimize ${file.path} (${Math.round(file.size/1024)}KB)`);
      }
    }

    return recommendations;
  }

  // Generate performance report
  generateReport() {
    const largeFiles = this.findLargeStoryFiles();
    const report = {
      timestamp: new Date().toISOString(),
      totalStories: this.countStoryFiles(),
      largeFiles: largeFiles.length,
      issues: {
        infiniteReloadRisk: largeFiles.some(f => f.components > 40),
        memoryRisk: largeFiles.some(f => f.size > 50000),
        buildRisk: largeFiles.length > 5
      },
      recommendations: this.generateRecommendations(largeFiles),
      largeFiles: largeFiles
    };

    fs.writeFileSync(
      path.join(__dirname, '../performance-report.json'),
      JSON.stringify(report, null, 2)
    );

    return report;
  }

  countStoryFiles() {
    let count = 0;
    const walk = (dir) => {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory() && !file.includes('backup')) {
          walk(filePath);
        } else if (file.endsWith('.stories.tsx') || file.endsWith('.stories.jsx')) {
          count++;
        }
      }
    };
    walk(this.storiesDir);
    return count;
  }
}

// Run performance analysis
if (require.main === module) {
  const manager = new PerformanceManager();
  console.log('🔍 Analyzing Storybook performance...\n');

  const report = manager.generateReport();

  console.log(`📊 Performance Report:`);
  console.log(`   Total stories: ${report.totalStories}`);
  console.log(`   Large files: ${report.largeFiles}`);
  console.log(`   Issues detected: ${Object.values(report.issues).filter(Boolean).length}\n`);

  if (report.recommendations.length > 0) {
    console.log('⚠️  Recommendations:');
    report.recommendations.forEach(rec => console.log(`   • ${rec}`));
  }

  if (report.issues.infiniteReloadRisk) {
    console.log('\n🚨 HIGH RISK: Infinite reload loop detected!');
    console.log('   Action: Split large story files immediately');
  }

  console.log(`\n📄 Full report saved to: performance-report.json`);
}

module.exports = PerformanceManager;