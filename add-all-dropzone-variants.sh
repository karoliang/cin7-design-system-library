#!/bin/bash

# Script to add all remaining DropZone variants to codeVariants.ts

cd "/Users/karo/Library/Mobile Documents/com~apple~CloudDocs/Github/cin7-design-system-library/storybook/.storybook/blocks"

# Check if multipleFiles already added
if grep -q "imageUpload:" codeVariants.ts; then
  echo "✓ All DropZone variants already added"
  exit 0
fi

# Find the line number where multipleFiles ends (after its closing brace)
LINE_NUM=$(grep -n "multipleFiles:" codeVariants.ts | head -1 | cut -d: -f1)

if [ -z "$LINE_NUM" ]; then
  echo "Error: multipleFiles variant not found"
  exit 1
fi

# Calculate insertion point (after multipleFiles closes)
# We need to find the closing brace of multipleFiles
INSERT_LINE=$(awk "/multipleFiles:/{flag=1; count=0} flag{if(/\{/)count++; if(/\}/)count--; if(count==0 && flag){print NR; exit}}" codeVariants.ts)

echo "Inserting remaining variants after line $INSERT_LINE..."

# Create temp file with all remaining variants
cat > /tmp/dropzone_variants_remaining.txt << 'EOF',

  imageUpload: {
    react: `import { DropZone, Text } from '@shopify/polaris';
import { useState, useCallback } from 'react';

function ImageUploadDropZone() {
  const [file, setFile] = useState<File | null>(null);

  const handleDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0] || null);
  }, []);

  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

  return (
    <div style={{ width: '400px' }}>
      <DropZone onDrop={handleDrop} accept={validImageTypes.join(',')}>
        {file ? (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <img src={URL.createObjectURL(file)} alt={file.name}
                 style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }} />
            <Text variant="bodySm" as="p">{file.name}</Text>
          </div>
        ) : (
          <DropZone.FileUpload actionHint="Accepts .gif, .jpg, and .png" />
        )}
      </DropZone>
    </div>
  );
}

export default ImageUploadDropZone;`,

    vanilla: `<!-- Image Upload -->
<div class="polaris-drop-zone" id="image-zone" style="width: 400px">
  <input type="file" id="image-input" accept="image/*" style="display: none;" />
  <div id="preview"></div>
</div>

<script>
import { $, on } from '@cin7/vanilla-js';

const zone = $('#image-zone');
const input = $('#image-input');

on(zone, 'click', () => input.click());
on(input, 'change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      $('#preview').innerHTML = \`<img src="\${e.target.result}" style="max-width: 100%; max-height: 200px;">\`;
    };
    reader.readAsDataURL(file);
  }
});
</script>`,

    extjs: `// ExtJS Image Upload
Ext.create('Ext.form.Panel', {
  width: 400,
  items: [{
    xtype: 'filefield',
    fieldLabel: 'Image',
    accept: 'image/*',
    listeners: {
      change: function(field) {
        const file = field.fileInputEl.dom.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            field.up('form').down('#preview').update(\`<img src="\${e.target.result}" style="max-width:100%">\`);
          };
          reader.readAsDataURL(file);
        }
      }
    }
  }, {
    xtype: 'component',
    itemId: 'preview'
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { DropZone, Text } from '@shopify/polaris';
import { useState, useCallback } from 'react';

const VALID_IMAGE_TYPES = ['image/gif', 'image/jpeg', 'image/png'];

function ImageUploadDropZone(): JSX.Element {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');

  const handleDrop = useCallback((acceptedFiles: File[]): void => {
    const imageFile = acceptedFiles[0];
    if (imageFile) {
      setFile(imageFile);
      setPreview(URL.createObjectURL(imageFile));
    }
  }, []);

  return (
    <div style={{ width: '400px' }}>
      <DropZone onDrop={handleDrop} accept={VALID_IMAGE_TYPES.join(',')} allowMultiple={false}>
        {file ? (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <img src={preview} alt={file.name}
                 style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }} />
            <Text variant="bodySm" as="p">{file.name}</Text>
          </div>
        ) : (
          <DropZone.FileUpload actionHint="Accepts .gif, .jpg, and .png" />
        )}
      </DropZone>
    </div>
  );
}

export default ImageUploadDropZone;`
  },

  disabled: {
    react: `import { DropZone, Text } from '@shopify/polaris';

function DisabledDropZone() {
  return (
    <div style={{ width: '400px' }}>
      <DropZone disabled>
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <Text variant="bodySm" tone="subdued">File upload is currently disabled</Text>
        </div>
      </DropZone>
    </div>
  );
}

export default DisabledDropZone;`,

    vanilla: `<!-- Disabled DropZone -->
<div class="polaris-drop-zone disabled" style="width: 400px; opacity: 0.5; pointer-events: none;">
  <div style="padding: 40px; text-align: center; color: #6d7175;">
    File upload is currently disabled
  </div>
</div>`,

    extjs: `// ExtJS Disabled DropZone
Ext.create('Ext.form.Panel', {
  width: 400,
  items: [{
    xtype: 'filefield',
    fieldLabel: 'Files',
    disabled: true
  }, {
    xtype: 'displayfield',
    value: 'File upload is currently disabled',
    fieldStyle: 'color: #6d7175;'
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { DropZone, Text } from '@shopify/polaris';

interface DisabledDropZoneProps {
  message?: string;
}

function DisabledDropZone({ message = 'File upload is currently disabled' }: DisabledDropZoneProps): JSX.Element {
  return (
    <div style={{ width: '400px' }}>
      <DropZone disabled>
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <Text variant="bodySm" tone="subdued">{message}</Text>
        </div>
      </DropZone>
    </div>
  );
}

export default DisabledDropZone;`
  },

  withPreview: {
    react: `import { DropZone, BlockStack, Text } from '@shopify/polaris';
import { useState, useCallback } from 'react';

function DropZoneWithPreview() {
  const [files, setFiles] = useState<File[]>([]);
  const [rejectedFiles, setRejectedFiles] = useState<File[]>([]);

  const handleDrop = useCallback((acceptedFiles: File[], rejectedFiles: File[]) => {
    setFiles(acceptedFiles);
    setRejectedFiles(rejectedFiles);
  }, []);

  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
  const hasError = rejectedFiles.length > 0;

  return (
    <div style={{ width: '400px' }}>
      <DropZone onDrop={handleDrop} accept={validImageTypes.join(',')} error={hasError}>
        {files.length > 0 && (
          <div style={{ padding: '20px' }}>
            <BlockStack gap="200">
              {files.map((file, index) => (
                <div key={index}>
                  <img src={URL.createObjectURL(file)} alt={file.name}
                       style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'cover', borderRadius: '4px' }} />
                  <Text variant="bodySm">{file.name}</Text>
                </div>
              ))}
            </BlockStack>
          </div>
        )}
        {!files.length && !hasError && <DropZone.FileUpload />}
        {hasError && (
          <div style={{ padding: '20px' }}>
            <Text variant="bodySm" tone="critical">
              {rejectedFiles.length} file(s) rejected. Please upload only image files.
            </Text>
          </div>
        )}
      </DropZone>
    </div>
  );
}

export default DropZoneWithPreview;`,

    vanilla: `<!-- DropZone with Preview -->
<div class="polaris-drop-zone" id="preview-zone" style="width: 400px">
  <input type="file" id="preview-input" accept="image/*" style="display: none;" />
  <div id="preview-content"></div>
  <div id="error-message" style="display: none; color: #d72c0d; padding: 20px;"></div>
</div>

<script>
import { $, on } from '@cin7/vanilla-js';

const zone = $('#preview-zone');
const input = $('#preview-input');
const preview = $('#preview-content');
const error = $('#error-message');

const validTypes = ['image/gif', 'image/jpeg', 'image/png'];

on(zone, 'click', () => input.click());

on(input, 'change', (e) => {
  const files = Array.from(e.target.files);
  const validFiles = files.filter(f => validTypes.includes(f.type));
  const invalid = files.length - validFiles.length;

  if (invalid > 0) {
    error.style.display = 'block';
    error.textContent = \`\${invalid} file(s) rejected. Please upload only image files.\`;
    preview.innerHTML = '';
  } else {
    error.style.display = 'none';
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        preview.innerHTML += \`<div><img src="\${e.target.result}" style="max-width:100%; max-height:150px; border-radius:4px;"><p>\${file.name}</p></div>\`;
      };
      reader.readAsDataURL(file);
    });
  }
});
</script>`,

    extjs: `// ExtJS DropZone with Preview and Validation
Ext.create('Ext.form.Panel', {
  width: 400,
  items: [{
    xtype: 'filefield',
    fieldLabel: 'Images',
    accept: 'image/*',
    validator: function() {
      const files = this.fileInputEl.dom.files;
      const valid = ['image/gif', 'image/jpeg', 'image/png'];
      for (let file of files) {
        if (!valid.includes(file.type)) {
          return 'Only image files allowed';
        }
      }
      return true;
    },
    listeners: {
      change: function(field) {
        const preview = field.up('form').down('#preview');
        const files = field.fileInputEl.dom.files;
        let html = '';
        Array.from(files).forEach(file => {
          const reader = new FileReader();
          reader.onload = (e) => {
            html += \`<img src="\${e.target.result}" style="max-width:100px; margin:4px;">\`;
            preview.update(html);
          };
          reader.readAsDataURL(file);
        });
      }
    }
  }, {
    xtype: 'component',
    itemId: 'preview'
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { DropZone, BlockStack, Text } from '@shopify/polaris';
import { useState, useCallback } from 'react';

const VALID_IMAGE_TYPES = ['image/gif', 'image/jpeg', 'image/png'];

interface FileWithPreview {
  file: File;
  preview: string;
}

function DropZoneWithPreview(): JSX.Element {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [rejectedFiles, setRejectedFiles] = useState<File[]>([]);

  const handleDrop = useCallback((acceptedFiles: File[], rejectedFiles: File[]): void => {
    const previews = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setFiles(previews);
    setRejectedFiles(rejectedFiles);
  }, []);

  const hasError = rejectedFiles.length > 0;

  return (
    <div style={{ width: '400px' }}>
      <DropZone onDrop={handleDrop} accept={VALID_IMAGE_TYPES.join(',')} error={hasError}>
        {files.length > 0 && (
          <div style={{ padding: '20px' }}>
            <BlockStack gap="200">
              {files.map(({ file, preview }, index) => (
                <div key={index}>
                  <img src={preview} alt={file.name}
                       style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'cover', borderRadius: '4px' }} />
                  <Text variant="bodySm">{file.name}</Text>
                </div>
              ))}
            </BlockStack>
          </div>
        )}
        {!files.length && !hasError && <DropZone.FileUpload />}
        {hasError && (
          <div style={{ padding: '20px' }}>
            <Text variant="bodySm" tone="critical">
              {rejectedFiles.length} file(s) rejected. Please upload only image files.
            </Text>
          </div>
        )}
      </DropZone>
    </div>
  );
}

export default DropZoneWithPreview;`
  }
EOF

# Insert the new content
head -n $INSERT_LINE codeVariants.ts > /tmp/codeVariants_new.ts
cat /tmp/dropzone_variants_remaining.txt >> /tmp/codeVariants_new.ts
tail -n +$((INSERT_LINE + 1)) codeVariants.ts >> /tmp/codeVariants_new.ts

# Replace original file
mv /tmp/codeVariants_new.ts codeVariants.ts

echo "✓ Added imageUpload, disabled, and withPreview variants"
echo "✓ Total DropZone variants: 4 (default, multipleFiles, imageUpload, disabled, withPreview)"
