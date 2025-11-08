import type { Meta, StoryObj } from '@storybook/react';
import { Card, Page, Layout, BlockStack, Text, Badge, DataTable, Button, TextField } from '@shopify/polaris';
import React from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

// Primitive Value Objects
class Money {
  private constructor(
    public readonly amount: number,
    public readonly currency: string
  ) {
    if (amount < 0) {
      throw new Error('Money amount cannot be negative');
    }
    if (!['USD', 'EUR', 'GBP', 'AUD'].includes(currency)) {
      throw new Error('Invalid currency');
    }
  }

  static create(amount: number, currency: string = 'USD'): Money {
    return new Money(amount, currency);
  }

  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error('Cannot add money with different currencies');
    }
    return new Money(this.amount + other.amount, this.currency);
  }

  multiply(factor: number): Money {
    return new Money(this.amount * factor, this.currency);
  }

  equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }

  toString(): string {
    return `${this.currency} ${this.amount.toFixed(2)}`;
  }
}

class Email {
  private constructor(public readonly value: string) {
    if (!this.isValid(value)) {
      throw new Error('Invalid email format');
    }
  }

  static create(value: string): Email {
    return new Email(value.toLowerCase().trim());
  }

  private isValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  getDomain(): string {
    return this.value.split('@')[1];
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}

// Composite Value Objects
class Address {
  private constructor(
    public readonly street: string,
    public readonly city: string,
    public readonly state: string,
    public readonly zipCode: string,
    public readonly country: string
  ) {
    if (!street || !city || !state || !zipCode || !country) {
      throw new Error('All address fields are required');
    }
  }

  static create(street: string, city: string, state: string, zipCode: string, country: string = 'USA'): Address {
    return new Address(street, city, state, zipCode, country);
  }

  equals(other: Address): boolean {
    return (
      this.street === other.street &&
      this.city === other.city &&
      this.state === other.state &&
      this.zipCode === other.zipCode &&
      this.country === other.country
    );
  }

  toString(): string {
    return `${this.street}, ${this.city}, ${this.state} ${this.zipCode}, ${this.country}`;
  }

  getFullCity(): string {
    return `${this.city}, ${this.state}`;
  }
}

class PhoneNumber {
  private constructor(
    public readonly countryCode: string,
    public readonly areaCode: string,
    public readonly number: string
  ) {
    if (!this.isValidNumber(countryCode, areaCode, number)) {
      throw new Error('Invalid phone number format');
    }
  }

  static create(countryCode: string, areaCode: string, number: string): PhoneNumber {
    return new PhoneNumber(countryCode, areaCode, number);
  }

  static fromString(phoneString: string): PhoneNumber {
    // Parse formats like +1-555-1234567 or +1 (555) 123-4567
    const cleaned = phoneString.replace(/[\s()-]/g, '');
    if (cleaned.startsWith('+')) {
      const countryCode = cleaned.substring(0, 2);
      const areaCode = cleaned.substring(2, 5);
      const number = cleaned.substring(5);
      return new PhoneNumber(countryCode, areaCode, number);
    }
    throw new Error('Invalid phone number format');
  }

  private isValidNumber(countryCode: string, areaCode: string, number: string): boolean {
    return countryCode.length >= 1 && areaCode.length === 3 && number.length >= 7;
  }

  equals(other: PhoneNumber): boolean {
    return (
      this.countryCode === other.countryCode &&
      this.areaCode === other.areaCode &&
      this.number === other.number
    );
  }

  toString(): string {
    return `${this.countryCode} (${this.areaCode}) ${this.number}`;
  }

  toInternationalFormat(): string {
    return `${this.countryCode}-${this.areaCode}-${this.number}`;
  }
}

const meta = {
  title: 'Cin7 DSL/04 Business Logic/TypeScript SDK - Value Objects',
  component: Card,
  parameters: {
    layout: 'centered',
    codeVariants: getCodeVariants('valueobjects', 'default'),
    docs: {
      description: {
        component: 'Value Object patterns for TypeScript SDK. Demonstrates immutable value types, validation, and equality semantics for domain concepts.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimitiveValueObjects: Story = {
  render: () => {
    const [operations, setOperations] = React.useState<Array<{ operation: string; result: string; valid: boolean }>>([]);

    const runOperations = () => {
      const results = [];

      try {
        const price1 = Money.create(99.99, 'USD');
        const price2 = Money.create(49.99, 'USD');
        const total = price1.add(price2);
        results.push({ operation: 'Add Money (USD 99.99 + USD 49.99)', result: total.toString(), valid: true });
      } catch (error) {
        results.push({ operation: 'Add Money', result: (error as Error).message, valid: false });
      }

      try {
        const price = Money.create(29.99, 'USD');
        const total = price.multiply(3);
        results.push({ operation: 'Multiply Money (USD 29.99 × 3)', result: total.toString(), valid: true });
      } catch (error) {
        results.push({ operation: 'Multiply Money', result: (error as Error).message, valid: false });
      }

      try {
        const email1 = Email.create('user@example.com');
        const email2 = Email.create('USER@EXAMPLE.COM');
        const areEqual = email1.equals(email2);
        results.push({ operation: 'Email Equality (case-insensitive)', result: `Equals: ${areEqual}`, valid: true });
      } catch (error) {
        results.push({ operation: 'Email Equality', result: (error as Error).message, valid: false });
      }

      try {
        const email = Email.create('contact@company.com');
        results.push({ operation: 'Email Domain Extraction', result: `Domain: ${email.getDomain()}`, valid: true });
      } catch (error) {
        results.push({ operation: 'Email Domain', result: (error as Error).message, valid: false });
      }

      try {
        const invalidEmail = Email.create('not-an-email');
        results.push({ operation: 'Invalid Email', result: invalidEmail.toString(), valid: false });
      } catch (error) {
        results.push({ operation: 'Invalid Email Validation', result: 'Correctly rejected invalid email', valid: true });
      }

      setOperations(results);
    };

    React.useEffect(() => {
      runOperations();
    }, []);

    return (
      <Page title="Primitive Value Objects">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h3">Money and Email Value Objects</Text>
                <Text as="p">
                  Primitive value objects encapsulate single domain concepts with validation,
                  immutability, and value-based equality. They replace primitive types with
                  rich, type-safe domain objects.
                </Text>

                <DataTable
                  columnContentTypes={['text', 'text', 'text']}
                  headings={['Operation', 'Result', 'Status']}
                  rows={operations.map((op, idx) => [
                    op.operation,
                    op.result,
                    <Badge tone={op.valid ? 'success' : 'critical'} key={idx}>
                      {op.valid ? 'Valid' : 'Invalid'}
                    </Badge>,
                  ])}
                />

                <BlockStack gap="200">
                  <Badge tone="info">Primitive Value Object Pattern</Badge>
                  <Text as="p" variant="bodySm">
                    • Immutable by design<br />
                    • Value-based equality<br />
                    • Self-validating<br />
                    • Rich behavior and operations
                  </Text>
                </BlockStack>

                <Button onClick={runOperations}>Re-run Operations</Button>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  },
};

export const CompositeValueObjects: Story = {
  render: () => {
    const [addresses] = React.useState([
      Address.create('123 Main St', 'New York', 'NY', '10001', 'USA'),
      Address.create('456 Oak Ave', 'Los Angeles', 'CA', '90001', 'USA'),
      Address.create('789 Pine Rd', 'Chicago', 'IL', '60601', 'USA'),
    ]);

    const [phones] = React.useState([
      PhoneNumber.create('+1', '555', '1234567'),
      PhoneNumber.create('+1', '555', '7654321'),
      PhoneNumber.fromString('+1 (555) 999-8888'),
    ]);

    return (
      <Page title="Composite Value Objects">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h3">Address and PhoneNumber Value Objects</Text>
                <Text as="p">
                  Composite value objects combine multiple primitive values into a single
                  immutable domain concept. They ensure all parts are valid together and
                  provide cohesive operations.
                </Text>

                <Text variant="headingMd" as="h4">Addresses</Text>
                <DataTable
                  columnContentTypes={['text', 'text', 'text']}
                  headings={['Street', 'City/State', 'Full Address']}
                  rows={addresses.map(addr => [
                    addr.street,
                    addr.getFullCity(),
                    addr.toString(),
                  ])}
                />

                <Text variant="headingMd" as="h4">Phone Numbers</Text>
                <DataTable
                  columnContentTypes={['text', 'text', 'text']}
                  headings={['Country Code', 'Area Code', 'Formatted']}
                  rows={phones.map(phone => [
                    phone.countryCode,
                    phone.areaCode,
                    phone.toString(),
                  ])}
                />

                <BlockStack gap="200">
                  <Badge tone="info">Composite Value Object Pattern</Badge>
                  <Text as="p" variant="bodySm">
                    • Groups related values<br />
                    • Validates entire composite<br />
                    • Provides formatted outputs<br />
                    • Value-based equality across all fields
                  </Text>
                </BlockStack>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  },
};

export const Equality: Story = {
  render: () => {
    const [equalityTests, setEqualityTests] = React.useState<Array<{ test: string; result: boolean; explanation: string }>>([]);

    const runEqualityTests = () => {
      const tests = [];

      // Money equality
      const money1 = Money.create(100, 'USD');
      const money2 = Money.create(100, 'USD');
      const money3 = Money.create(100, 'EUR');
      tests.push({
        test: 'Same Money values',
        result: money1.equals(money2),
        explanation: 'USD 100.00 === USD 100.00'
      });
      tests.push({
        test: 'Different currencies',
        result: !money1.equals(money3),
        explanation: 'USD 100.00 !== EUR 100.00'
      });

      // Email equality
      const email1 = Email.create('user@example.com');
      const email2 = Email.create('USER@EXAMPLE.COM');
      const email3 = Email.create('other@example.com');
      tests.push({
        test: 'Email case-insensitive',
        result: email1.equals(email2),
        explanation: 'user@example.com === USER@EXAMPLE.COM (normalized)'
      });
      tests.push({
        test: 'Different emails',
        result: !email1.equals(email3),
        explanation: 'user@example.com !== other@example.com'
      });

      // Address equality
      const addr1 = Address.create('123 Main St', 'New York', 'NY', '10001', 'USA');
      const addr2 = Address.create('123 Main St', 'New York', 'NY', '10001', 'USA');
      const addr3 = Address.create('456 Oak Ave', 'New York', 'NY', '10001', 'USA');
      tests.push({
        test: 'Same addresses',
        result: addr1.equals(addr2),
        explanation: 'All fields match'
      });
      tests.push({
        test: 'Different streets',
        result: !addr1.equals(addr3),
        explanation: 'Street differs'
      });

      // Phone equality
      const phone1 = PhoneNumber.create('+1', '555', '1234567');
      const phone2 = PhoneNumber.create('+1', '555', '1234567');
      const phone3 = PhoneNumber.create('+1', '555', '7654321');
      tests.push({
        test: 'Same phone numbers',
        result: phone1.equals(phone2),
        explanation: 'All components match'
      });
      tests.push({
        test: 'Different numbers',
        result: !phone1.equals(phone3),
        explanation: 'Number component differs'
      });

      setEqualityTests(tests);
    };

    React.useEffect(() => {
      runEqualityTests();
    }, []);

    return (
      <Page title="Value Object Equality">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h3">Value-Based Equality</Text>
                <Text as="p">
                  Value objects use structural equality instead of reference equality.
                  Two value objects are equal if all their fields have the same values,
                  regardless of whether they are the same object instance.
                </Text>

                <DataTable
                  columnContentTypes={['text', 'text', 'text']}
                  headings={['Equality Test', 'Result', 'Explanation']}
                  rows={equalityTests.map((test, idx) => [
                    test.test,
                    <Badge tone={test.result ? 'success' : 'info'} key={idx}>
                      {test.result ? 'EQUAL' : 'NOT EQUAL'}
                    </Badge>,
                    test.explanation,
                  ])}
                />

                <BlockStack gap="200">
                  <Badge tone="info">Equality Pattern</Badge>
                  <Text as="p" variant="bodySm">
                    • Compare by value, not reference<br />
                    • All fields must match<br />
                    • Normalization for consistency<br />
                    • Type-safe comparisons
                  </Text>
                </BlockStack>

                <Button onClick={runEqualityTests}>Re-run Tests</Button>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  },
};
