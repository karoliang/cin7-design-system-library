# Polaris Synchronization Strategy

## Current State

The Polaris repository is currently a static copy without connection to the upstream Shopify/polaris repository. This means we won't receive updates automatically.

## Synchronization Options

### Option 1: Git Submodule (Recommended)
Convert the polaris directory to a git submodule pointing to Shopify's repository.

**Pros:**
- Clean separation between your code and Polaris
- Easy to update to specific versions
- Git handles the complexity

**Cons:**
- Submodules can be tricky for contributors
- Need to handle our custom fixes

### Option 2: Periodic Manual Updates
Manually pull updates from Shopify/polaris on a schedule.

**Pros:**
- Full control over when to update
- Can test thoroughly before deploying
- Easier to maintain custom patches

**Cons:**
- Manual process
- May fall behind on updates

### Option 3: GitHub Actions Automation
Set up automated sync with conflict detection.

**Pros:**
- Automatic updates
- Can run tests before merging
- Notifications on conflicts

**Cons:**
- Complex setup
- Need to handle merge conflicts

### Option 4: Fork Strategy
Fork Shopify/polaris and maintain your own branch.

**Pros:**
- Standard Git workflow
- Can contribute back to upstream
- Easy to sync with upstream

**Cons:**
- Need to maintain fork
- Merge conflicts with custom changes

## Recommended Approach: Hybrid Strategy

1. **Set up upstream remote** (immediate)
2. **Create patch system** for our fixes
3. **Implement periodic sync** with testing
4. **Automate where possible**

## Implementation Plan

### Phase 1: Set Up Upstream Tracking
```bash
cd polaris
git remote add upstream https://github.com/Shopify/polaris.git
git fetch upstream
```

### Phase 2: Create Patch Management
- Document all our custom fixes
- Create patch files for each fix
- Build script to apply patches after updates

### Phase 3: Sync Procedure
1. Fetch latest from upstream
2. Create update branch
3. Apply our patches
4. Run comprehensive tests
5. Deploy if tests pass

### Phase 4: Automation (Optional)
- GitHub Action for weekly sync checks
- Automated testing on sync
- Notifications for failures

## Custom Fixes to Preserve

1. **TypeScript Import Fixes**
   - File: `polaris.shopify.com/src/components/Markdown/serialize.ts`
   - File: `polaris.shopify.com/src/components/Markdown/next-mdx-importer/serialize.ts`
   - Change: Import Node/Parent from 'unist' instead of 'unist-util-visit'

2. **React Ref Callback Fix**
   - File: `polaris.shopify.com/src/components/ComponentExamples/ComponentExamples.tsx`
   - Change: Use block syntax for ref callbacks

3. **Component Type Fixes**
   - File: `polaris-react/src/components/UnstyledLink/UnstyledLink.tsx`
   - File: `polaris-react/.storybook/RenderPerformanceProfiler/RenderPerformanceProfiler.tsx`

## Sync Schedule Recommendation

- **Weekly**: Check for upstream updates
- **Monthly**: Apply non-breaking updates
- **Quarterly**: Major version updates with full testing

## Before Implementing

Consider:
1. How often do you need updates?
2. How critical are the latest features?
3. Do you need to customize Polaris further?
4. Will you contribute back to upstream?

## Next Steps

1. Decide on synchronization strategy
2. Set up upstream remote
3. Create patch management system
4. Document sync procedures
5. Train team on process