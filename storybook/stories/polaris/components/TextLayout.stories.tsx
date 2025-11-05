import type { Meta, StoryObj } from '@storybook/react';
import { TextLayout, Card, BlockStack, InlineStack, Text, Badge } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Polaris/Typography/TextLayout',
  component: TextLayout,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'TextLayout provides structured typography layouts for consistent text presentation. Perfect for article content, documentation, and long-form text.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    spacing: {
      control: 'select',
      options: ['loose', 'tight', 'none'],
      description: 'Spacing between text elements',
    },
    as: {
      control: 'select',
      options: ['p', 'div', 'span', 'article', 'section'],
      description: 'HTML element to render as',
    },
  },
} satisfies Meta<typeof TextLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    spacing: 'loose',
    children: (
      <>
        <h2>Product Features</h2>
        <p>Our product comes with a comprehensive set of features designed to meet your needs.</p>
        <h3>Core Functionality</h3>
        <p>Experience the power of our core features that streamline your workflow and boost productivity.</p>
      </>
    ),
  },
};

export const ArticleContent: Story = {
  render: () => (
    <div style={{ maxWidth: '700px', width: '100%' }}>
      <Card>
        <div style={{ padding: '24px' }}>
          <TextLayout spacing="loose">
            <h1>Getting Started with Our Platform</h1>
            <p>Welcome to our comprehensive guide on getting started with our platform. This article will walk you through the essential features and help you make the most of your experience.</p>

            <h2>Setting Up Your Account</h2>
            <p>The first step is creating your account. Simply click the sign-up button and follow the intuitive registration process. You'll need to provide some basic information and verify your email address.</p>

            <h3>Account Verification</h3>
            <p>After registration, check your email for a verification link. Click the link to activate your account and gain full access to all features.</p>

            <h2>Understanding the Dashboard</h2>
            <p>Once logged in, you'll be greeted by your personal dashboard. This is your command center where you can monitor your progress, access key features, and customize your experience.</p>

            <h3>Key Dashboard Components</h3>
            <p>The dashboard is divided into several sections, each serving a specific purpose. Take some time to familiarize yourself with the layout and available options.</p>

            <h2>Advanced Features</h2>
            <p>As you become more comfortable with the platform, you'll discover advanced features that can significantly enhance your workflow and productivity.</p>

            <p>Remember, our support team is always available to help you make the most of our platform. Don't hesitate to reach out if you have any questions or need assistance.</p>
          </TextLayout>
        </div>
      </Card>
    </div>
  ),
};

export const ProductDescription: Story = {
  render: () => {
    return (
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <TextLayout spacing="tight">
              <h2>Premium Wireless Headphones</h2>
              <p>Experience crystal-clear audio with our premium wireless headphones. Designed for audiophiles and casual listeners alike, these headphones deliver exceptional sound quality and comfort.</p>

              <h3>Key Features</h3>
              <p>• Active noise cancellation for immersive listening<br/>
              • 40-hour battery life with quick charge<br/>
              • Premium memory foam ear cushions<br/>
              • Bluetooth 5.0 connectivity</p>

              <h3>Technical Specifications</h3>
              <p>Driver size: 40mm dynamic drivers<br/>
              Frequency response: 20Hz - 20kHz<br/>
              Impedance: 32 ohms<br/>
              Weight: 250 grams</p>

              <h3>What's Included</h3>
              <p>Your purchase includes the headphones, a premium carrying case, USB-C charging cable, 3.5mm audio cable, and airplane adapter.</p>
            </TextLayout>
          </div>
        </Card>
      </div>
    );
  },
};

export const DocumentationLayout: Story = {
  render: () => {
    return (
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <TextLayout spacing="loose">
              <h1>API Documentation</h1>
              <p>This comprehensive guide covers everything you need to know about integrating with our API.</p>

              <h2>Authentication</h2>
              <p>All API requests require authentication using API keys. Include your API key in the Authorization header of your requests.</p>

              <h3>Getting Your API Key</h3>
              <p>Navigate to your account settings and generate a new API key. Keep this key secure and never share it publicly.</p>

              <h2>Making Requests</h2>
              <p>Our API uses RESTful conventions and returns JSON responses. All requests should be made to the base URL: https://api.example.com/v1</p>

              <h3>Rate Limiting</h3>
              <p>API requests are limited to 1000 requests per hour per API key. The rate limit headers are included in every response.</p>

              <h2>Error Handling</h2>
              <p>The API uses standard HTTP status codes to indicate request success or failure. Check the response body for detailed error information.</p>

              <h3>Common Error Codes</h3>
              <p><strong>400 Bad Request:</strong> Invalid request parameters<br/>
              <strong>401 Unauthorized:</strong> Invalid or missing API key<br/>
              <strong>429 Too Many Requests:</strong> Rate limit exceeded<br/>
              <strong>500 Internal Server Error:</strong> Server error occurred</p>
            </TextLayout>
          </div>
        </Card>
      </div>
    );
  },
};

export const BlogPost: Story = {
  render: () => {
    return (
      <div style={{ maxWidth: '700px', width: '100%' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <TextLayout spacing="loose">
              <h1>10 Tips for Effective Remote Work</h1>
              <p>Remote work has become increasingly common, and adapting to this new way of working requires intention and strategy. Here are ten proven tips to help you thrive in a remote environment.</p>

              <h2>1. Create a Dedicated Workspace</h2>
              <p>Having a specific area designated for work helps your brain associate that space with productivity. Even a small corner of a room can serve as an effective home office.</p>

              <h2>2. Establish a Routine</h2>
              <p>Maintain regular working hours and create a daily routine that mimics your office schedule. Start and end your day at consistent times to maintain work-life balance.</p>

              <h2>3. Take Regular Breaks</h2>
              <p>Use techniques like the Pomodoro method to structure your work sessions. Short, frequent breaks can actually increase productivity and prevent burnout.</p>

              <h2>4. Invest in Good Technology</h2>
              <p>Reliable internet, a comfortable chair, and quality headphones are essential tools for remote work success. Don't skimp on the equipment you use daily.</p>

              <h2>5. Overcommunicate</h2>
              <p>Without the benefit of in-person interaction, clear communication becomes even more critical. Provide regular updates and be proactive in sharing information with your team.</p>

              <h2>6. Set Clear Boundaries</h2>
              <p>Establish boundaries with family members or roommates about your work hours. Let them know when you're available and when you need to focus.</p>

              <h2>7. Stay Socially Connected</h2>
              <p>Remote work can be isolating. Make an effort to maintain social connections through virtual coffee breaks, team chats, and regular video calls.</p>

              <h2>8. Prioritize Self-Care</h2>
              <p>Exercise regularly, eat healthy meals, and get enough sleep. Physical wellbeing directly impacts your productivity and mental health.</p>

              <h2>9. Continuous Learning</h2>
              <p>Use the flexibility of remote work to invest in your professional development. Online courses and virtual workshops are more accessible than ever.</p>

              <h2>10. Reflect and Adjust</h2>
              <p>Regularly assess what's working and what isn't. Be willing to experiment with different approaches to find the remote work style that suits you best.</p>

              <p>Remember, transitioning to remote work is a process. Be patient with yourself as you adapt to this new way of working and find the rhythm that works for you.</p>
            </TextLayout>
          </div>
        </Card>
      </div>
    );
  },
};

export const FAQSection: Story = {
  render: () => {
    return (
      <div style={{ maxWidth: '700px', width: '100%' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <TextLayout spacing="tight">
              <h1>Frequently Asked Questions</h1>
              <p>Find answers to common questions about our products and services.</p>

              <h2>Account & Billing</h2>

              <h3>How do I update my payment method?</h3>
              <p>Log into your account and navigate to the Billing section. Click on "Update Payment Method" and enter your new payment details.</p>

              <h3>Can I change my subscription plan?</h3>
              <p>Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.</p>

              <h3>Do you offer refunds?</h3>
              <p>We offer a 30-day money-back guarantee for all new subscriptions. Contact our support team to request a refund.</p>

              <h2>Technical Support</h2>

              <h3>What browsers are supported?</h3>
              <p>We support the latest versions of Chrome, Firefox, Safari, and Edge. For the best experience, we recommend using Chrome or Firefox.</p>

              <h3>Is there a mobile app?</h3>
              <p>Yes, our mobile apps are available for both iOS and Android devices. You can download them from the App Store or Google Play Store.</p>

              <h3>How do I report a bug?</h3>
              <p>Use the feedback form in your account or email support@example.com with details about the issue you're experiencing.</p>

              <h2>Privacy & Security</h2>

              <h3>How is my data protected?</h3>
              <p>We use industry-standard encryption and security measures to protect your data. All information is stored securely and backed up regularly.</p>

              <h3>Can I export my data?</h3>
              <p>Yes, you can export all your data at any time from your account settings. We believe in data portability and your right to access your information.</p>
            </TextLayout>
          </div>
        </Card>
      </div>
    );
  },
};

export const TermsAndConditions: Story = {
  render: () => {
    return (
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <TextLayout spacing="tight">
              <h1>Terms of Service</h1>
              <p><strong>Last updated:</strong> November 5, 2024</p>
              <p>Please read these Terms of Service carefully before using our platform.</p>

              <h2>1. Acceptance of Terms</h2>
              <p>By accessing and using our service, you accept and agree to be bound by the terms and provision of this agreement.</p>

              <h2>2. Use License</h2>
              <p>Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only.</p>

              <h2>3. Disclaimer</h2>
              <p>The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

              <h2>4. Limitations</h2>
              <p>In no event shall our company or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.</p>

              <h2>5. Revisions and Errata</h2>
              <p>The materials appearing on our website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete, or current.</p>

              <h2>6. Governing Law</h2>
              <p>These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which our company operates and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.</p>
            </TextLayout>
          </div>
        </Card>
      </div>
    );
  },
};

export const PressRelease: Story = {
  render: () => {
    return (
      <div style={{ maxWidth: '700px', width: '100%' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <TextLayout spacing="loose">
              <h1>TechCorp Announces Revolutionary AI Platform for Small Businesses</h1>
              <p><strong>FOR IMMEDIATE RELEASE</strong></p>
              <p><strong>NEW YORK, NY – November 5, 2024</strong> – TechCorp today announced the launch of its groundbreaking AI-powered business management platform, designed specifically for small and medium-sized enterprises.</p>

              <h2>Transforming Small Business Operations</h2>
              <p>The new platform leverages advanced machine learning algorithms to automate routine tasks, provide actionable insights, and help business owners make data-driven decisions. Early beta testers report an average 40% increase in operational efficiency within the first month of use.</p>

              <h2>Key Features and Benefits</h2>
              <p>"We've built a solution that understands the unique challenges small businesses face," said CEO Jane Smith. "Our AI doesn't just crunch numbers – it learns from each business's specific patterns and provides personalized recommendations that drive real growth."</p>

              <p>Key features include predictive inventory management, automated customer service responses, financial forecasting, and marketing optimization tools. The platform integrates seamlessly with existing business systems and requires minimal technical expertise to implement.</p>

              <h2>Pricing and Availability</h2>
              <p>The platform is available starting today with three subscription tiers: Starter ($49/month), Professional ($99/month), and Enterprise (custom pricing). A 14-day free trial is available for all new customers.</p>

              <h2>About TechCorp</h2>
              <p>TechCorp is a leading provider of innovative business solutions, dedicated to helping small businesses compete in an increasingly digital marketplace. Founded in 2020, the company serves over 10,000 customers worldwide.</p>

              <p><strong>Contact:</strong><br/>
              Media Relations<br/>
              press@techcorp.com<br/>
              555-123-4567</p>

              <p><strong>###</strong></p>
            </TextLayout>
          </div>
        </Card>
      </div>
    );
  },
};

export const TutorialGuide: Story = {
  render: () => {
    return (
      <div style={{ maxWidth: '700px', width: '100%' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <TextLayout spacing="loose">
              <h1>Complete Guide: Setting Up Your Online Store</h1>
              <p>Welcome to our comprehensive tutorial on launching your successful online store. This step-by-step guide will walk you through everything you need to know.</p>

              <h2>Chapter 1: Planning Your Store</h2>
              <p>Before diving into the technical setup, it's crucial to have a clear vision for your store. This section covers market research, product selection, and business planning.</p>

              <h3>Identifying Your Niche</h3>
              <p>Start by researching market trends and identifying gaps you can fill. Look for underserved customer segments or unique product combinations that set you apart from competitors.</p>

              <h3>Product Sourcing Strategy</h3>
              <p>Decide whether you'll manufacture products, wholesale them, or use dropshipping. Each approach has different advantages in terms of control, investment, and scalability.</p>

              <h2>Chapter 2: Technical Setup</h2>
              <p>With your business plan in place, it's time to set up the technical infrastructure. This includes choosing your platform, configuring payment systems, and setting up shipping.</p>

              <h3>Choosing Your Platform</h3>
              <p>Consider factors like ease of use, scalability, pricing, and available features. Popular options include Shopify, WooCommerce, BigCommerce, and custom solutions.</p>

              <h3>Payment Gateway Configuration</h3>
              <p>Set up multiple payment options to accommodate customer preferences. Most businesses start with credit card processing and PayPal, then expand based on customer feedback.</p>

              <h2>Chapter 3: Design and Branding</h2>
              <p>Your store's appearance plays a crucial role in building trust and driving conversions. This chapter covers theme selection, branding elements, and user experience design.</p>

              <h3>Creating Your Brand Identity</h3>
              <p>Develop a consistent visual identity including logo, color scheme, and typography. Your brand should reflect your values and resonate with your target audience.</p>

              <h3>Optimizing User Experience</h3>
              <p>Focus on creating an intuitive shopping experience with clear navigation, fast loading times, and mobile responsiveness. Test thoroughly across different devices and browsers.</p>

              <h2>Chapter 4: Product Management</h2>
              <p>Learn how to effectively manage your product catalog, including photography, descriptions, pricing strategies, and inventory management.</p>

              <h3>Compelling Product Descriptions</h3>
              <p>Write detailed, benefit-oriented descriptions that help customers visualize using your products. Include specifications, sizing information, and care instructions when relevant.</p>

              <h3>Professional Product Photography</h3>
              <p>Invest in high-quality images from multiple angles. Consider lifestyle photos showing products in use, and include zoom functionality for detailed views.</p>

              <h2>Conclusion</h2>
              <p>Setting up an online store is a journey that requires planning, patience, and continuous optimization. Start with a solid foundation, gather customer feedback, and iterate based on data and insights.</p>

              <p>Remember that successful e-commerce is an ongoing process of learning and improvement. Stay current with industry trends, monitor your analytics, and always prioritize the customer experience.</p>
            </TextLayout>
          </div>
        </Card>
      </div>
    );
  },
};

export const ComparisonArticle: Story = {
  render: () => {
    return (
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <TextLayout spacing="tight">
              <h1>Cloud Storage Solutions: A Comprehensive Comparison</h1>
              <p>Choosing the right cloud storage solution is crucial for businesses and individuals alike. This detailed comparison examines the leading options across key criteria.</p>

              <h2>Security Features</h2>
              <p>When it comes to data protection, different providers take varying approaches. Industry leaders like Google Drive and Dropbox offer end-to-end encryption, while others focus on secure data centers and compliance certifications.</p>

              <h3>Encryption Standards</h3>
              <p>Look for AES-256 encryption as the industry standard. Some services like Tresorit and SpiderOak offer zero-knowledge encryption, meaning even the service providers cannot access your data.</p>

              <h3>Compliance and Certifications</h3>
              <p>For business users, compliance with regulations like GDPR, HIPAA, and SOC 2 is essential. Enterprise-focused solutions typically offer more robust compliance features than consumer-oriented services.</p>

              <h2>Pricing Models</h2>
              <p>Cloud storage pricing varies significantly between providers. Some offer generous free tiers, while others focus on premium business features. Understanding your storage needs helps determine the most cost-effective solution.</p>

              <h3>Free vs. Paid Tiers</h3>
              <p>Google Drive offers 15GB free storage, while Dropbox provides 2GB. However, paid plans from services like pCloud offer lifetime options that can be more economical in the long run.</p>

              <h3>Business Pricing</h3>
              <p>Enterprise solutions typically charge per user per month, with costs scaling based on storage and features. Consider total cost of ownership, including migration and training expenses.</p>

              <h2>Collaboration Features</h2>
              <p>Modern work requires robust collaboration tools. The best cloud storage solutions integrate seamlessly with productivity suites and offer real-time collaboration capabilities.</p>

              <h3>Real-time Editing</h3>
              <p>Google Workspace excels with real-time document editing, while Microsoft 365 offers similar functionality through Office Online. Consider which ecosystem your team already uses.</p>

              <h3>Version Control and Recovery</h3>
              <p>Look for services with robust version history and file recovery options. Dropbox Paper and Google Docs offer excellent revision tracking, while some services limit version history to 30 days on basic plans.</p>

              <h2>Integration Capabilities</h2>
              <p>The ability to integrate with other tools and services can significantly impact workflow efficiency. Consider which applications and services you need to connect with your cloud storage.</p>

              <h3>API Access</h3>
              <p>Developers should consider API quality and documentation. Services like Amazon S3 offer extensive APIs, while others may have limited programmatic access.</p>

              <h3>Third-party Integrations</h3>
              <p>Check compatibility with your existing tools. Zapier integration can connect thousands of apps, while native integrations may offer deeper functionality.</p>

              <h2>Making Your Choice</h2>
              <p>The right cloud storage solution depends on your specific needs. Consider security requirements, budget constraints, collaboration needs, and existing technology investments when making your decision.</p>
            </TextLayout>
          </div>
        </Card>
      </div>
    );
  },
};