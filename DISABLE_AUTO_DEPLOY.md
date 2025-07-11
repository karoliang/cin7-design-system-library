# Automatic Deployment Disabled

Automatic deployment to Netlify is currently disabled while we restructure the repository and implement the Cin7 DSL framework.

## Current Status

- **Auto-deploy**: DISABLED
- **Reason**: Repository restructuring and framework implementation
- **Date Disabled**: January 10, 2025

## How to Deploy Manually

When you're ready to deploy:

1. Remove the `ignore = "exit 0"` line from `netlify.toml`
2. Or deploy manually using:
   ```bash
   netlify deploy --prod
   ```

## Re-enabling Auto-Deploy

To re-enable automatic deployment:

1. Remove the `ignore = "exit 0"` line from `netlify.toml`
2. Commit and push the change
3. Future pushes to `main` will trigger automatic deployments

## Note

The `ignore = "exit 0"` command in netlify.toml causes Netlify to skip all builds. This is the recommended way to temporarily disable automatic deployments without disconnecting the repository.