#!/bin/bash

# Update Tabs.stories.tsx
perl -i -0pe 's/(import.*from '\''@shopify\/polaris'\'';\n)(import React)/\1import { getCodeVariants } from '\''..\/..\/..\/\.storybook\/blocks\/codeVariants'\'';\n\2/g' "storybook/stories/components/navigation/Tabs.stories.tsx"
perl -i -0pe 's/(docs:\s*\{[^}]+\}\s*)(},\s*tags:)/\1,\n    codeVariants: {\n      component: '\''tabs'\'',\n      variations: ['\''default'\'', '\''fitted'\'', '\''inside-of-a-card'\'', '\''with-actions'\'', '\''with-badge-content'\'']\n    }\n  \2/s' "storybook/stories/components/navigation/Tabs.stories.tsx"

# Update ActionList.stories.tsx
perl -i -0pe 's/(import.*from '\''@shopify\/polaris'\'';\n)(import React)/\1import { getCodeVariants } from '\''..\/..\/..\/\.storybook\/blocks\/codeVariants'\'';\n\2/g' "storybook/stories/components/actions/ActionList.stories.tsx"
perl -i -0pe 's/(docs:\s*\{[^}]+\}\s*)(},\s*tags:)/\1,\n    codeVariants: {\n      component: '\''actionList'\'',\n      variations: ['\''with-destructive-item'\'']\n    }\n  \2/s' "storybook/stories/components/actions/ActionList.stories.tsx"

# Update Navigation.stories.tsx
perl -i -0pe 's/(import.*from '\''@shopify\/polaris'\'';\n)(import React)/\1import { getCodeVariants } from '\''..\/..\/..\/\.storybook\/blocks\/codeVariants'\'';\n\2/g' "storybook/stories/components/navigation/Navigation.stories.tsx"
perl -i -0pe 's/(docs:\s*\{[^}]+\}\s*)(},\s*tags:)/\1,\n    codeVariants: {\n      component: '\''navigation'\'',\n      variations: ['\''default'\'']\n    }\n  \2/s' "storybook/stories/components/navigation/Navigation.stories.tsx"

# Update Link.stories.tsx
perl -i -0pe 's/(import.*from '\''@shopify\/polaris'\'';\n)(import React)/\1import { getCodeVariants } from '\''..\/..\/..\/\.storybook\/blocks\/codeVariants'\'';\n\2/g' "storybook/stories/components/utilities/Link.stories.tsx"
perl -i -0pe 's/(docs:\s*\{[^}]+\}\s*)(},\s*tags:)/\1,\n    codeVariants: {\n      component: '\''link'\'',\n      variations: ['\''default'\'']\n    }\n  \2/s' "storybook/stories/components/utilities/Link.stories.tsx"

# Update Pagination.stories.tsx
perl -i -0pe 's/(import.*from '\''@shopify\/polaris'\'';\n)(import React)/\1import { getCodeVariants } from '\''..\/..\/..\/\.storybook\/blocks\/codeVariants'\'';\n\2/g' "storybook/stories/components/utilities/Pagination.stories.tsx"
perl -i -0pe 's/(docs:\s*\{[^}]+\}\s*)(},\s*tags:)/\1,\n    codeVariants: {\n      component: '\''pagination'\'',\n      variations: ['\''default'\'']\n    }\n  \2/s' "storybook/stories/components/utilities/Pagination.stories.tsx"

# Update ContextualSaveBar.stories.tsx
perl -i -0pe 's/(import.*from '\''@shopify\/polaris'\'';\n)(import React)/\1import { getCodeVariants } from '\''..\/..\/..\/\.storybook\/blocks\/codeVariants'\'';\n\2/g' "storybook/stories/components/utilities/ContextualSaveBar.stories.tsx"
perl -i -0pe 's/(docs:\s*\{[^}]+\}\s*)(},\s*tags:)/\1,\n    codeVariants: {\n      component: '\''contextualSaveBar'\'',\n      variations: ['\''default'\'']\n    }\n  \2/s' "storybook/stories/components/utilities/ContextualSaveBar.stories.tsx"

# Update TopBar.stories.tsx
perl -i -0pe 's/(import.*from '\''@shopify\/polaris'\'';\n)(import React)/\1import { getCodeVariants } from '\''..\/..\/..\/\.storybook\/blocks\/codeVariants'\'';\n\2/g' "storybook/stories/components/navigation/TopBar.stories.tsx"
perl -i -0pe 's/(docs:\s*\{[^}]+\}\s*)(},\s*tags:)/\1,\n    codeVariants: {\n      component: '\''topBar'\'',\n      variations: ['\''default'\'']\n    }\n  \2/s' "storybook/stories/components/navigation/TopBar.stories.tsx"

# Update FullscreenBar.stories.tsx
perl -i -0pe 's/(import.*from '\''@shopify\/polaris'\'';\n)(import React)/\1import { getCodeVariants } from '\''..\/..\/..\/\.storybook\/blocks\/codeVariants'\'';\n\2/g' "storybook/stories/components/navigation/FullscreenBar.stories.tsx"
perl -i -0pe 's/(docs:\s*\{[^}]+\}\s*)(},\s*tags:)/\1,\n    codeVariants: {\n      component: '\''fullscreenBar'\'',\n      variations: ['\''default'\'']\n    }\n  \2/s' "storybook/stories/components/navigation/FullscreenBar.stories.tsx"

echo "✓ Updated all story files with codeVariants parameters"
