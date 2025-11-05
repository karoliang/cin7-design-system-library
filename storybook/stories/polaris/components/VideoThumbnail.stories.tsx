import type { Meta, StoryObj } from '@storybook/react';
import { VideoThumbnail, Badge, Button, Text, InlineStack, Icon, Card } from '@shopify/polaris';
import {
  PlayMinor,
  PauseMinor,
  VolumeUpMinor,
  VolumeUpFilledMajor,
  DownloadMinor,
  ShareMinor,
  ClockMinor,
  ViewMinor,
  HeartMinor,
} from '@shopify/polaris-icons';
import React, { useState } from 'react';

const meta = {
  title: 'Polaris/Data Display/VideoThumbnail',
  component: VideoThumbnail,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Video thumbnails provide preview images for video content with play controls and metadata. They are perfect for video galleries, course previews, product demos, and any interface that needs to display video content in a compact, engaging format with clear visual indicators that the content is playable.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    thumbnailUrl: {
      control: 'text',
      description: 'URL for the thumbnail image',
    },
    videoLength: {
      control: 'number',
      description: 'Video length in seconds',
    },
    showProgress: {
      control: 'boolean',
      description: 'Show playback progress',
    },
    thumbnailAlt: {
      control: 'text',
      description: 'Alt text for the thumbnail image',
    },
    accessibilityLabel: {
      control: 'text',
      description: 'Custom accessibility label',
    },
    onPlaybackStart: {
      action: 'playback started',
      description: 'Called when video playback starts',
    },
  },
} satisfies Meta<typeof VideoThumbnail>;

export default meta;
type Story = StoryObj<typeof VideoThumbnail>;

export const Default: Story = {
  args: {
    thumbnailUrl: 'https://picsum.photos/seed/video1/640/360.jpg',
    videoLength: 120,
    thumbnailAlt: 'Video thumbnail preview',
  },
};

export const WithPlayButton: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <VideoThumbnail
        thumbnailUrl="https://picsum.photos/seed/playbutton/640/360.jpg"
        videoLength={180}
        thumbnailAlt="Product demonstration video"
        onPlaybackStart={() => console.log('Video playback started')}
      />
    </div>
  ),
};

export const VideoLengthDisplay: Story = {
  render: () => {
    const videos = [
      { length: 30, title: 'Quick Tip' },
      { length: 120, title: 'Tutorial' },
      { length: 450, title: 'Full Course' },
      { length: 1800, title: 'Webinar Recording' },
    ];

    const formatTime = (seconds: number) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;

      if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      }
      return `${minutes}:${secs.toString().padStart(2, '0')}`;
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Text variant="headingMd" as="h3">Video Length Variations</Text>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
          {videos.map((video, index) => (
            <Card key={index} padding="300">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <VideoThumbnail
                  thumbnailUrl={`https://picsum.photos/seed/video${index}/320/180.jpg`}
                  videoLength={video.length}
                  thumbnailAlt={`${video.title} video thumbnail`}
                />
                <div>
                  <Text variant="bodyMd" fontWeight="medium">{video.title}</Text>
                  <Text color="subdued" variant="bodySm">
                    Duration: {formatTime(video.length)}
                  </Text>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  },
};

export const VideoGallery: Story = {
  render: () => {
    const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

    const videos = [
      { title: 'Product Introduction', length: 90, views: 1250 },
      { title: 'Features Overview', length: 180, views: 890 },
      { title: 'How to Use', length: 240, views: 2100 },
      { title: 'Customer Testimonials', length: 150, views: 3200 },
      { title: 'Technical Specifications', length: 300, views: 450 },
      { title: 'FAQ and Support', length: 120, views: 1800 },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Text variant="headingMd" as="h3">Video Gallery</Text>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {videos.map((video, index) => (
            <div
              key={index}
              style={{
                border: selectedVideo === index ? '2px solid #007ace' : '2px solid transparent',
                borderRadius: '8px',
                padding: selectedVideo === index ? '2px' : '0',
                cursor: 'pointer',
              }}
              onClick={() => setSelectedVideo(index)}
            >
              <VideoThumbnail
                thumbnailUrl={`https://picsum.photos/seed/gallery${index}/320/180.jpg`}
                videoLength={video.length}
                thumbnailAlt={`${video.title} video thumbnail`}
                onPlaybackStart={() => setSelectedVideo(index)}
              />
              <div style={{ marginTop: '8px' }}>
                <Text variant="bodySm" fontWeight="medium">{video.title}</Text>
                <InlineStack gap="200">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Icon source={ViewMinor} color="subdued" />
                    <Text variant="bodySm" color="subdued">{video.views.toLocaleString()}</Text>
                  </div>
                  <Text variant="bodySm" color="subdued">
                    {Math.floor(video.length / 60)}:{(video.length % 60).toString().padStart(2, '0')}
                  </Text>
                </InlineStack>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const CourseContent: Story = {
  render: () => {
    const [watchedVideos, setWatchedVideos] = useState<Set<number>>(new Set([0, 1]));

    const courseVideos = [
      { title: 'Chapter 1: Introduction', length: 480, completed: true },
      { title: 'Chapter 2: Getting Started', length: 600, completed: true },
      { title: 'Chapter 3: Basic Concepts', length: 720, completed: false },
      { title: 'Chapter 4: Advanced Topics', length: 900, completed: false },
      { title: 'Chapter 5: Best Practices', length: 540, completed: false },
    ];

    const toggleWatched = (index: number) => {
      setWatchedVideos(prev => {
        const newSet = new Set(prev);
        if (newSet.has(index)) {
          newSet.delete(index);
        } else {
          newSet.add(index);
        }
        return newSet;
      });
    };

    const formatTime = (seconds: number) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      if (hours > 0) {
        return `${hours}h ${minutes}m`;
      }
      return `${minutes}m`;
    };

    return (
      <div style={{ width: '600px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Text variant="headingMd" as="h3">Course Content</Text>

          {courseVideos.map((video, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                gap: '16px',
                padding: '16px',
                border: `1px solid ${watchedVideos.has(index) ? '#2a6f3a' : '#e1e1e1'}`,
                borderRadius: '8px',
                backgroundColor: watchedVideos.has(index) ? '#f3faf3' : 'white',
              }}
            >
              <div style={{ position: 'relative' }}>
                <VideoThumbnail
                  thumbnailUrl={`https://picsum.photos/seed/course${index}/160/90.jpg`}
                  videoLength={video.length}
                  thumbnailAlt={`${video.title} video thumbnail`}
                />
                {watchedVideos.has(index) && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      backgroundColor: '#2a6f3a',
                      color: 'white',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: "var(--font-size-xs)",
                      fontWeight: 'bold',
                    }}
                  >
                    ✓
                  </div>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <Text variant="bodyMd" fontWeight="medium">{video.title}</Text>
                <Text color="subdued" variant="bodySm">
                  Duration: {formatTime(video.length)}
                </Text>
                <div style={{ marginTop: '8px' }}>
                  <Button
                    size="small"
                    variant={watchedVideos.has(index) ? 'plain' : 'primary'}
                    onClick={() => toggleWatched(index)}
                  >
                    {watchedVideos.has(index) ? 'Watched' : 'Mark as watched'}
                  </Button>
                </div>
              </div>
            </div>
          ))}

          <div style={{ padding: '16px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
            <Text variant="bodyMd" fontWeight="medium">
              Progress: {watchedVideos.size} of {courseVideos.length} videos completed
            </Text>
            <div style={{
              marginTop: '8px',
              height: '8px',
              backgroundColor: '#e1e1e1',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div
                style={{
                  height: '100%',
                  width: `${(watchedVideos.size / courseVideos.length) * 100}%`,
                  backgroundColor: '#2a6f3a',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const InteractivePreview: Story = {
  render: () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [isLiked, setIsLiked] = useState(false);

    React.useEffect(() => {
      let interval: NodeJS.Timeout;
      if (isPlaying && progress < 100) {
        interval = setInterval(() => {
          setProgress(prev => Math.min(prev + 1, 100));
        }, 1000);
      }
      return () => clearInterval(interval);
    }, [isPlaying, progress]);

    const togglePlay = () => {
      setIsPlaying(!isPlaying);
    };

    return (
      <div style={{ width: '500px' }}>
        <Card padding="0">
          <div style={{ position: 'relative' }}>
            <VideoThumbnail
              thumbnailUrl="https://picsum.photos/seed/interactive/500/281.jpg"
              videoLength={120}
              thumbnailAlt="Interactive video preview"
              showProgress={isPlaying}
            />
            {isPlaying && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  right: '0',
                  height: '4px',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${progress}%`,
                    backgroundColor: '#007ace',
                  }}
                />
              </div>
            )}
          </div>
          <div style={{ padding: '16px' }}>
            <Text variant="headingMd" as="h3" style={{ marginBottom: '8px' }}>
              Interactive Product Demo
            </Text>
            <Text color="subdued" as="p" style={{ marginBottom: '16px' }}>
              Explore the features and capabilities of our latest product through this comprehensive demonstration.
            </Text>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <button
                onClick={togglePlay}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  border: '1px solid #e1e1e1',
                  borderRadius: '6px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                }}
              >
                <Icon source={isPlaying ? PauseMinor : PlayMinor} />
                <Text variant="bodyMd">{isPlaying ? 'Pause' : 'Play'}</Text>
              </button>

              <button
                onClick={() => setVolume(volume > 0 ? 0 : 0.7)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '8px',
                  border: '1px solid #e1e1e1',
                  borderRadius: '6px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                }}
              >
                <Icon source={volume > 0 ? VolumeUpFilledMajor : VolumeUpMinor} color={volume > 0 ? undefined : 'subdued'} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Icon source={ClockMinor} color="subdued" />
                <Text variant="bodySm" color="subdued">
                  {Math.floor((progress * 120) / 100)}:{((progress * 120) % 60).toString().padStart(2, '0')} / 2:00
                </Text>
              </div>
            </div>

            <InlineStack gap="200">
              <button
                onClick={() => setIsLiked(!isLiked)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 12px',
                  border: '1px solid #e1e1e1',
                  borderRadius: '6px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  color: isLiked ? '#d72c0d' : '#637381',
                }}
              >
                <Icon source={HeartMinor} color={isLiked ? 'critical' : 'subdued'} />
                <Text variant="bodySm">{isLiked ? 'Liked' : 'Like'}</Text>
              </button>

              <button
                onClick={() => console.log('Share video')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 12px',
                  border: '1px solid #e1e1e1',
                  borderRadius: '6px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                }}
              >
                <Icon source={ShareMinor} color="subdued" />
                <Text variant="bodySm">Share</Text>
              </button>

              <button
                onClick={() => console.log('Download video')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 12px',
                  border: '1px solid #e1e1e1',
                  borderRadius: '6px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                }}
              >
                <Icon source={DownloadMinor} color="subdued" />
                <Text variant="bodySm">Download</Text>
              </button>
            </InlineStack>
          </div>
        </Card>
      </div>
    );
  },
};

export const WithMetadata: Story = {
  render: () => {
    const videos = [
      {
        title: 'Product Launch Event',
        description: 'Live recording of our annual product launch event showcasing new features and innovations.',
        length: 3600,
        date: '2024-07-15',
        views: 15420,
        category: 'Events',
      },
      {
        title: 'Customer Success Story',
        description: 'How Company X transformed their business using our solution - an in-depth case study.',
        length: 900,
        date: '2024-07-12',
        views: 8930,
        category: 'Testimonials',
      },
    ];

    const formatDate = (date: string) => {
      const d = new Date(date);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const formatTime = (seconds: number) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:00`;
      }
      return `${minutes}:00`;
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Text variant="headingMd" as="h3">Video Content with Metadata</Text>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
          {videos.map((video, index) => (
            <Card key={index} padding="400">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <VideoThumbnail
                  thumbnailUrl={`https://picsum.photos/seed/metadata${index}/400/225.jpg`}
                  videoLength={video.length}
                  thumbnailAlt={`${video.title} video thumbnail`}
                />
                <div>
                  <Text variant="headingMd" as="h3" style={{ marginBottom: '8px' }}>
                    {video.title}
                  </Text>
                  <Text color="subdued" as="p" style={{ marginBottom: '12px' }}>
                    {video.description}
                  </Text>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <InlineStack gap="400">
                      <Badge>{video.category}</Badge>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Icon source={ClockMinor} color="subdued" />
                        <Text variant="bodySm" color="subdued">
                          {formatTime(video.length)}
                        </Text>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Icon source={ViewMinor} color="subdued" />
                        <Text variant="bodySm" color="subdued">
                          {video.views.toLocaleString()} views
                        </Text>
                      </div>
                    </InlineStack>
                    <Text variant="bodySm" color="subdued">
                      Published {formatDate(video.date)}
                    </Text>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  },
};

export const LoadingState: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <div style={{ border: '1px solid #e1e1e1', borderRadius: '8px', overflow: 'hidden' }}>
        <div style={{
          backgroundColor: '#f3f4f6',
          height: '225px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                border: '4px solid #e1e1e1',
                borderTop: '4px solid #007ace',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 12px',
              }}
            />
            <Text color="subdued">Loading video...</Text>
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '8px',
              right: '8px',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: "var(--font-size-xs)",
            }}
          >
            --:--
          </div>
        </div>
      </div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  ),
};

export const Accessibility: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Text variant="headingMd" as="h3">Accessibility Features</Text>

      <Card padding="400">
        <Text variant="bodyMd" fontWeight="medium" style={{ marginBottom: '16px' }}>
          Screen Reader Friendly Video Thumbnails
        </Text>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          <VideoThumbnail
            thumbnailUrl="https://picsum.photos/seed/a11y1/300/169.jpg"
            videoLength={180}
            thumbnailAlt="Product demonstration video showing main features and benefits"
            accessibilityLabel="Play product demonstration video, 3 minutes long"
          />
          <VideoThumbnail
            thumbnailUrl="https://picsum.photos/seed/a11y2/300/169.jpg"
            videoLength={300}
            thumbnailAlt="Tutorial video with step-by-step instructions"
            accessibilityLabel="Play tutorial video, 5 minutes long, includes closed captions"
          />
        </div>
        <Text color="subdued" variant="bodySm" style={{ marginTop: '16px' }}>
          Each video thumbnail includes descriptive alt text and accessibility labels for screen readers.
        </Text>
      </Card>

      <Card padding="400">
        <Text variant="bodyMd" fontWeight="medium" style={{ marginBottom: '16px' }}>
          Keyboard Navigation Support
        </Text>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <VideoThumbnail
              thumbnailUrl="https://picsum.photos/seed/keyboard1/120/68.jpg"
              videoLength={120}
              thumbnailAlt="Video with keyboard navigation"
              accessibilityLabel="Video tutorial, press Enter or Space to play, 2 minutes"
            />
            <Text variant="bodySm">
              Tab to focus, Enter/Space to play
            </Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <VideoThumbnail
              thumbnailUrl="https://picsum.photos/seed/keyboard2/120/68.jpg"
              videoLength={240}
              thumbnailAlt="Video with keyboard controls"
              accessibilityLabel="Webinar recording, press Enter or Space to play, 4 minutes"
            />
            <Text variant="bodySm">
              Full keyboard control support
            </Text>
          </div>
        </div>
      </Card>
    </div>
  ),
};

export const ResponsiveDesign: Story = {
  render: () => {
    const [containerSize, setContainerSize] = useState<'small' | 'medium' | 'large'>('medium');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Text variant="headingMd" as="h3">Responsive Video Thumbnails</Text>
          <InlineStack gap="200">
            <Button
              size="small"
              variant={containerSize === 'small' ? 'primary' : 'plain'}
              onClick={() => setContainerSize('small')}
            >
              Small
            </Button>
            <Button
              size="small"
              variant={containerSize === 'medium' ? 'primary' : 'plain'}
              onClick={() => setContainerSize('medium')}
            >
              Medium
            </Button>
            <Button
              size="small"
              variant={containerSize === 'large' ? 'primary' : 'plain'}
              onClick={() => setContainerSize('large')}
            >
              Large
            </Button>
          </InlineStack>
        </div>

        <div
          style={{
            width: containerSize === 'small' ? '300px' : containerSize === 'medium' ? '500px' : '700px',
            margin: '0 auto',
          }}
        >
          <VideoThumbnail
            thumbnailUrl="https://picsum.photos/seed/responsive/700/394.jpg"
            videoLength={180}
            thumbnailAlt="Responsive video thumbnail that adapts to container size"
            accessibilityLabel="Adaptive video preview, 3 minutes long"
          />
          <Text color="subdued" variant="bodySm" style={{ marginTop: '8px' }}>
            Container width: {containerSize === 'small' ? '300px' : containerSize === 'medium' ? '500px' : '700px'}
          </Text>
        </div>
      </div>
    );
  },
};

export const CustomStyling: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Text variant="headingMd" as="h3">Custom Video Thumbnail Styles</Text>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
          <div style={{ position: 'relative' }}>
            <VideoThumbnail
              thumbnailUrl="https://picsum.photos/seed/custom1/400/225.jpg"
              videoLength={120}
              thumbnailAlt="Styled video thumbnail with badge"
            />
            <div
              style={{
                position: 'absolute',
                top: '8px',
                left: '8px',
              }}
            >
              <Badge status="new">NEW</Badge>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <VideoThumbnail
              thumbnailUrl="https://picsum.photos/seed/custom2/400/225.jpg"
              videoLength={240}
              thumbnailAlt="Styled video thumbnail with live indicator"
            />
            <div
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                backgroundColor: '#d72c0d',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: "var(--font-size-xs)",
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'white',
                animation: 'pulse 2s infinite',
              }} />
              LIVE
            </div>
          </div>
        </div>

        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
        `}</style>
      </div>
    );
  },
};