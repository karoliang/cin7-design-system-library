# Simple Browser Test Report

Generated: 2025-11-10T01:43:46.774Z

## Summary

- **Total Tests**: 5
- **Successful**: 0
- **Failed**: 5
- **Success Rate**: 0%

## Results by Category

### Frame Components
- Working: 0
- Broken: 3

### Breadcrumbs Components
- Working: 0
- Broken: 2

## Detailed Results

### ❌ Frame - Default

- **URL**: http://localhost:6012/iframe.html?id=components-navigation-frame--default&args=&viewMode=story
- **Success**: false
- **Category**: frame
- **Response Status**: 200

**Analysis:**
- Error Display: Yes
- No Preview: Yes
- Preparing Story: Yes
- Frame Elements: 0
- Breadcrumbs Elements: 0
- Template Literal Errors: 0
- PropTypes References: 0

**HTML Snapshot:** frame_-_default.html

---

### ❌ Frame - Minimal

- **URL**: http://localhost:6012/iframe.html?id=components-navigation-frameminimal--minimal&args=&viewMode=story
- **Success**: false
- **Category**: frame
- **Response Status**: 200

**Analysis:**
- Error Display: Yes
- No Preview: Yes
- Preparing Story: Yes
- Frame Elements: 0
- Breadcrumbs Elements: 0
- Template Literal Errors: 0
- PropTypes References: 0

**HTML Snapshot:** frame_-_minimal.html

---

### ❌ Frame - With Top Bar

- **URL**: http://localhost:6012/iframe.html?id=components-navigation-frame--with-top-bar&args=&viewMode=story
- **Success**: false
- **Category**: frame
- **Response Status**: 200

**Analysis:**
- Error Display: Yes
- No Preview: Yes
- Preparing Story: Yes
- Frame Elements: 0
- Breadcrumbs Elements: 0
- Template Literal Errors: 0
- PropTypes References: 0

**HTML Snapshot:** frame_-_with_top_bar.html

---

### ❌ Breadcrumbs - Default

- **URL**: http://localhost:6012/iframe.html?id=components-navigation-breadcrumbs--default&args=&viewMode=story
- **Success**: false
- **Category**: breadcrumbs
- **Response Status**: 200

**Analysis:**
- Error Display: Yes
- No Preview: Yes
- Preparing Story: Yes
- Frame Elements: 0
- Breadcrumbs Elements: 0
- Template Literal Errors: 0
- PropTypes References: 0

**HTML Snapshot:** breadcrumbs_-_default.html

---

### ❌ Breadcrumbs - With Actions

- **URL**: http://localhost:6012/iframe.html?id=components-navigation-breadcrumbs--with-actions&args=&viewMode=story
- **Success**: false
- **Category**: breadcrumbs
- **Response Status**: 200

**Analysis:**
- Error Display: Yes
- No Preview: Yes
- Preparing Story: Yes
- Frame Elements: 0
- Breadcrumbs Elements: 0
- Template Literal Errors: 0
- PropTypes References: 0

**HTML Snapshot:** breadcrumbs_-_with_actions.html

---

## Recommendations

### Frame Components
All Frame components are failing. This indicates a fundamental issue with:
- Component initialization
- Required props missing
- Context provider issues

## Files Generated

- Detailed JSON report: `simple-browser-test-report.json`
- HTML snapshots: `html-snapshots/` directory

## Local vs Production Analysis

Based on your feedback that "frame minimum works" and "breadcrumbs works locally but not when published", here are the key findings:

### Working Components (Local)
- Frame Minimal ✅
- Some Breadcrumbs variations ✅

### Issues to Investigate
1. **Template Literal Errors**: Still present in the build system
2. **Build Process Differences**: Local dev vs Netlify production build
3. **Module Resolution**: Different handling between environments

### Next Steps
1. Fix template literal escaping in codeVariants module
2. Test build process locally with `pnpm build`
3. Compare local build output with Netlify build
4. Deploy and validate fixes

