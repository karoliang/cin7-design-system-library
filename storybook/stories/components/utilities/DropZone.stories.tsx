import type { Meta, StoryObj } from '@storybook/react';
import { DropZone, BlockStack, InlineStack, Text, Card, Thumbnail, Button } from '@shopify/polaris';
import { useState, useCallback } from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Components/Forms/DropZone',
  component: DropZone,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'DropZone provides a drag-and-drop interface for file uploads. It supports single and multiple file uploads, file validation, custom rendering, and provides visual feedback during drag operations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    accept: {
      control: 'text',
      description: 'Accepted file types (e.g., "image/*,.pdf")',
    },
    allowMultiple: {
      control: 'boolean',
      description: 'Allow multiple file selection',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable drop zone interaction',
    },
    error: {
      control: 'boolean',
      description: 'Show error state',
    },
    errorOverlayText: {
      control: 'text',
      description: 'Error overlay text',
    },
    overlayText: {
      control: 'text',
      description: 'Overlay text when dragging files',
    },
    label: {
      control: 'text',
      description: 'Accessible label for screen readers',
    },
    labelHidden: {
      control: 'boolean',
      description: 'Hide the label visually',
    },
    name: {
      control: 'text',
      description: 'Form field name',
    },
    outline: {
      control: 'boolean',
      description: 'Show outline style',
    },
    onDrop: {
      action: 'onDrop',
      description: 'Callback when files are dropped',
    },
  },
} satisfies Meta<typeof DropZone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);

    const handleDrop = useCallback((acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
    }, []);

    const fileUpload = !files.length && (
      <DropZone.FileUpload />
    );

    const uploadedFiles = files.length > 0 && (
      <div style={{ padding: '20px' }}>
        {files.map((file, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <Text variant="bodySm" as="p">{file.name} ({file.size} bytes)</Text>
          </div>
        ))}
      </div>
    );

    return (
      <DropZone onDrop={handleDrop}>
        {uploadedFiles}
        {fileUpload}
      </DropZone>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('dropzone', 'default'),
  },

};

export const MultipleFiles: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);

    const handleDrop = useCallback((acceptedFiles: File[]) => {
      setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
    }, []);

    const handleRemoveFile = (index: number) => {
      setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    const fileUpload = !files.length && (
      <DropZone.FileUpload />
    );

    const uploadedFiles = files.length > 0 && (
      <div style={{ padding: '20px' }}>
        <BlockStack gap="200">
          {files.map((file, index) => (
            <InlineStack key={index} align="space-between" blockAlign="center">
              <Text variant="bodySm">{file.name}</Text>
              <Button
                variant="plain"
                onClick={() => handleRemoveFile(index)}
                size="micro"
              >
                Remove
              </Button>
            </InlineStack>
          ))}
        </BlockStack>
      </div>
    );

    return (
      <div style={{ width: '400px' }}>
        <DropZone allowMultiple onDrop={handleDrop}>
          {uploadedFiles}
          {fileUpload}
        </DropZone>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('dropzone', 'multipleFiles'),
  },

};

export const ImageUpload: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);

    const handleDrop = useCallback((acceptedFiles: File[]) => {
      setFiles(acceptedFiles.slice(0, 1)); // Only keep first file
    }, []);

    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

    const fileUpload = !files.length && (
      <DropZone.FileUpload actionHint="Accepts .gif, .jpg, and .png" />
    );

    const uploadedFile = files.length > 0 && (
      <div style={{ padding: '20px' }}>
        <img
          src={URL.createObjectURL(files[0])}
          alt={files[0].name}
          style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }}
        />
        <Text variant="bodySm" as="p" alignment="center">{files[0].name}</Text>
      </div>
    );

    return (
      <div style={{ width: '400px' }}>
        <DropZone
          onDrop={handleDrop}
          accept={validImageTypes.join(',')}
        >
          {uploadedFile}
          {fileUpload}
        </DropZone>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('dropzone', 'imageUpload'),
  },

};

export const DocumentUpload: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);

    const handleDrop = useCallback((acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
    }, []);

    const validDocumentTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
    ];

    const fileUpload = !files.length && (
      <DropZone.FileUpload actionHint="Accepts PDF, DOC, DOCX, and TXT files" />
    );

    const uploadedFiles = files.length > 0 && (
      <div style={{ padding: '20px' }}>
        <BlockStack gap="200">
          {files.map((file, index) => (
            <InlineStack key={index} gap="200" blockAlign="center">
              <Thumbnail
                size="small"
                alt={file.name}
                source={
                  file.type.includes('pdf') ? '📄' :
                  file.type.includes('word') ? '📝' :
                  '📄'
                }
              />
              <div>
                <Text variant="bodySm" as="p">{file.name}</Text>
                <Text variant="bodySm" tone="subdued">{(file.size / 1024).toFixed(1)} KB</Text>
              </div>
            </InlineStack>
          ))}
        </BlockStack>
      </div>
    );

    return (
      <div style={{ width: '400px' }}>
        <DropZone
          onDrop={handleDrop}
          accept={validDocumentTypes.join(',')}
        >
          {uploadedFiles}
          {fileUpload}
        </DropZone>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('dropzone', 'default'),
  },

};

export const WithPreview: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);
    const [rejectedFiles, setRejectedFiles] = useState<File[]>([]);

    const handleDrop = useCallback((acceptedFiles: File[], rejectedFiles: File[]) => {
      setFiles(acceptedFiles);
      setRejectedFiles(rejectedFiles);
    }, []);

    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

    const hasError = rejectedFiles.length > 0;

    const fileUpload = !files.length && !hasError && (
      <DropZone.FileUpload />
    );

    const uploadedFiles = files.length > 0 && (
      <div style={{ padding: '20px' }}>
        <BlockStack gap="200">
          {files.map((file, index) => (
            <div key={index}>
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'cover', borderRadius: '4px' }}
              />
              <Text variant="bodySm" as="p">{file.name}</Text>
            </div>
          ))}
        </BlockStack>
      </div>
    );

    const errorMessage = hasError && (
      <div style={{ padding: '20px' }}>
        <Text variant="bodySm" tone="critical">
          {rejectedFiles.length} file(s) were rejected. Please upload only image files.
        </Text>
      </div>
    );

    return (
      <div style={{ width: '400px' }}>
        <DropZone
          onDrop={handleDrop}
          accept={validImageTypes.join(',')}
          error={hasError}
          errorOverlayText="Only image files are allowed"
        >
          {uploadedFiles}
          {fileUpload}
          {errorMessage}
        </DropZone>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('dropzone', 'withPreview'),
  },

};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <DropZone disabled>
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <Text variant="bodySm" tone="subdued">
            File upload is currently disabled
          </Text>
        </div>
      </DropZone>
    </div>
  ),
  parameters: {
    codeVariants: getCodeVariants('dropzone', 'disabled'),
  },

};

export const ProductImageUpload: Story = {
  render: () => {
    const [mainImage, setMainImage] = useState<File | null>(null);
    const [additionalImages, setAdditionalImages] = useState<File[]>([]);

    const handleMainImageDrop = useCallback((acceptedFiles: File[]) => {
      setMainImage(acceptedFiles[0] || null);
    }, []);

    const handleAdditionalImagesDrop = useCallback((acceptedFiles: File[]) => {
      setAdditionalImages(acceptedFiles.slice(0, 4)); // Max 4 additional images
    }, []);

    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

    return (
      <Card padding="400">
        <BlockStack gap="600">
          <div>
            <Text as="h3" variant="headingMd">Main Product Image</Text>
            <div style={{ width: '300px', marginTop: '16px' }}>
              <DropZone
                onDrop={handleMainImageDrop}
                accept={validImageTypes.join(',')}
                allowMultiple={false}
              >
                {mainImage ? (
                  <div style={{ padding: '20px', textAlign: 'center' }}>
                    <img
                      src={URL.createObjectURL(mainImage)}
                      alt="Main product image"
                      style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }}
                    />
                    <Text variant="bodySm" as="p">{mainImage.name}</Text>
                  </div>
                ) : (
                  <DropZone.FileUpload actionHint="Upload main product image" />
                )}
              </DropZone>
            </div>
          </div>

          <div>
            <Text as="h3" variant="headingMd">Additional Images (Max 4)</Text>
            <div style={{ width: '300px', marginTop: '16px' }}>
              <DropZone
                onDrop={handleAdditionalImagesDrop}
                accept={validImageTypes.join(',')}
                allowMultiple
              >
                {additionalImages.length > 0 ? (
                  <div style={{ padding: '20px' }}>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '16px',
                      marginBottom: '16px'
                    }}>
                      {additionalImages.map((file, index) => (
                        <div key={index} style={{ textAlign: 'center' }}>
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Additional image ${index + 1}`}
                            style={{
                              width: '100%',
                              height: '80px',
                              objectFit: 'cover',
                              borderRadius: '4px'
                            }}
                          />
                          <Text variant="bodyXs" as="p" tone="subdued">{file.name.slice(0, 15)}...</Text>
                        </div>
                      ))}
                    </div>
                    {additionalImages.length < 4 && (
                      <DropZone.FileUpload actionHint="Add more images" />
                    )}
                  </div>
                ) : (
                  <DropZone.FileUpload actionHint="Upload additional product images" />
                )}
              </DropZone>
            </div>
          </div>
        </BlockStack>
      </Card>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('dropzone', 'default'),
  },

};

export const FileSizeValidation: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);
    const [errors, setErrors] = useState<string[]>([]);

    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

    const handleDrop = useCallback((acceptedFiles: File[], rejectedFiles: File[]) => {
      const validFiles: File[] = [];
      const newErrors: string[] = [];

      acceptedFiles.forEach(file => {
        if (file.size <= MAX_FILE_SIZE) {
          validFiles.push(file);
        } else {
          newErrors.push(`${file.name} is too large (max 2MB)`);
        }
      });

      if (rejectedFiles.length > 0) {
        newErrors.push(`${rejectedFiles.length} file(s) had invalid format`);
      }

      setFiles(validFiles);
      setErrors(newErrors);
    }, []);

    const fileUpload = !files.length && errors.length === 0 && (
      <DropZone.FileUpload actionHint="Max file size: 2MB" />
    );

    const uploadedFiles = files.length > 0 && (
      <div style={{ padding: '20px' }}>
        <BlockStack gap="200">
          {files.map((file, index) => (
            <InlineStack key={index} gap="200" blockAlign="center">
              <Thumbnail size="small" source="📄" alt={file.name} />
              <div style={{ flex: 1 }}>
                <Text variant="bodySm" as="p">{file.name}</Text>
                <Text variant="bodyXs" tone="subdued">
                  {(file.size / 1024).toFixed(1)} KB
                </Text>
              </div>
            </InlineStack>
          ))}
        </BlockStack>
      </div>
    );

    const errorMessages = errors.length > 0 && (
      <div style={{ padding: '20px' }}>
        <BlockStack gap="100">
          {errors.map((error, index) => (
            <Text key={index} variant="bodySm" tone="critical">
              • {error}
            </Text>
          ))}
        </BlockStack>
      </div>
    );

    return (
      <div style={{ width: '400px' }}>
        <DropZone
          onDrop={handleDrop}
          error={errors.length > 0}
          errorOverlayText="Some files were rejected"
        >
          {uploadedFiles}
          {fileUpload}
          {errorMessages}
        </DropZone>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('dropzone', 'default'),
  },

};

export const CustomDropZone: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    const handleDrop = useCallback((acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      setIsDragging(false);
    }, []);

    const handleDragEnter = useCallback(() => {
      setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback(() => {
      setIsDragging(false);
    }, []);

    return (
      <div style={{ width: '400px' }}>
        <DropZone
          onDrop={handleDrop}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        >
          <div style={{
            padding: '40px',
            textAlign: 'center',
            border: isDragging ? '2px dashed #007ace' : '2px dashed #d2d2d2',
            borderRadius: '8px',
            backgroundColor: isDragging ? '#f0f8ff' : 'transparent'
          }}>
            {files.length > 0 ? (
              <BlockStack gap="200">
                <div style={{ fontSize: '48px' }}>📁</div>
                <Text variant="headingSm">Files Ready!</Text>
                <Text variant="bodySm" as="p">
                  {files.length} file(s) uploaded
                </Text>
                <div style={{ textAlign: 'left' }}>
                  {files.map((file, index) => (
                    <Text key={index} variant="bodyXs" as="p">
                      • {file.name} ({(file.size / 1024).toFixed(1)} KB)
                    </Text>
                  ))}
                </div>
              </BlockStack>
            ) : (
              <BlockStack gap="200">
                <div style={{ fontSize: '48px' }}>📤</div>
                <Text variant="headingSm">
                  {isDragging ? 'Drop files here!' : 'Drag & Drop Files Here'}
                </Text>
                <Text variant="bodySm" as="p" tone="subdued">
                  or click to browse
                </Text>
                <Text variant="bodyXs" as="p" tone="subdued">
                  Supports all file types
                </Text>
              </BlockStack>
            )}
          </div>
        </DropZone>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('dropzone', 'default'),
  },

};

export const CompactDropZone: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);

    const handleDrop = useCallback((acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
    }, []);

    return (
      <div style={{ width: '400px' }}>
        <DropZone outline onDrop={handleDrop}>
          <div style={{ padding: '16px', textAlign: 'center' }}>
            {files.length > 0 ? (
              <Text variant="bodySm">{files.length} file(s) selected</Text>
            ) : (
              <Text variant="bodySm">Drop files or click to upload</Text>
            )}
          </div>
        </DropZone>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('dropzone', 'default'),
  },

};