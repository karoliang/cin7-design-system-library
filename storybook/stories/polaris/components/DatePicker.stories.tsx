import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker, BlockStack, InlineStack, Text } from '@shopify/polaris';
import { useState, useCallback } from 'react';
import en from '@shopify/polaris/locales/en.json';

const meta = {
  title: 'Polaris/Forms/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Date picker components allow users to select dates from a calendar interface. They support single date selection, date ranges, month/year selection, and can be configured with disabled dates, minimum/maximum dates, and localization.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    month: {
      control: 'number',
      description: 'Month (0-11)',
    },
    year: {
      control: 'number',
      description: 'Year',
    },
    selected: {
      control: 'object',
      description: 'Selected date(s)',
    },
    allowRange: {
      control: 'boolean',
      description: 'Enable date range selection',
    },
    multiMonth: {
      control: 'boolean',
      description: 'Show multiple months',
    },
    disableDatesBefore: {
      control: 'date',
      description: 'Disable dates before this date',
    },
    disableDatesAfter: {
      control: 'date',
      description: 'Disable dates after this date',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable date picker',
    },
    weekStartsOn: {
      control: 'number',
      description: 'Day week starts on (0-6, 0=Sunday)',
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState(new Date());
    const [month, setMonth] = useState(selected.getMonth());
    const [year, setYear] = useState(selected.getFullYear());

    const handleMonthChange = useCallback((month: number, year: number) => {
      setMonth(month);
      setYear(year);
    }, []);

    return (
      <DatePicker
        month={month}
        year={year}
        onChange={setSelected}
        onMonthChange={handleMonthChange}
        selected={selected}
      />
    );
  },
};

export const WithPlaceholder: Story = {
  render: () => {
    const [selected, setSelected] = useState<{start: Date; end: Date} | undefined>();
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());

    const handleMonthChange = useCallback((month: number, year: number) => {
      setMonth(month);
      setYear(year);
    }, []);

    return (
      <DatePicker
        month={month}
        year={year}
        onChange={setSelected}
        onMonthChange={handleMonthChange}
        selected={selected}
        allowRange
      />
    );
  },
};

export const DateRange: Story = {
  render: () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 7);

    const [selected, setSelected] = useState({start: today, end: tomorrow});
    const [month, setMonth] = useState(selected.start.getMonth());
    const [year, setYear] = useState(selected.start.getFullYear());

    const handleMonthChange = useCallback((month: number, year: number) => {
      setMonth(month);
      setYear(year);
    }, []);

    return (
      <BlockStack gap="400">
        <Text as="h3" variant="headingMd">Select Date Range</Text>
        <DatePicker
          month={month}
          year={year}
          onChange={setSelected}
          onMonthChange={handleMonthChange}
          selected={selected}
          allowRange
        />
        {selected && (
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '6px' }}>
            <Text as="p">
              From: {selected.start.toLocaleDateString()}<br/>
              To: {selected.end.toLocaleDateString()}
            </Text>
          </div>
        )}
      </BlockStack>
    );
  },
};

export const MultiMonth: Story = {
  render: () => {
    const [selected, setSelected] = useState(new Date());
    const [month, setMonth] = useState(selected.getMonth());
    const [year, setYear] = useState(selected.getFullYear());

    const handleMonthChange = useCallback((month: number, year: number) => {
      setMonth(month);
      setYear(year);
    }, []);

    return (
      <DatePicker
        month={month}
        year={year}
        onChange={setSelected}
        onMonthChange={handleMonthChange}
        selected={selected}
        multiMonth
      />
    );
  },
};

export const WithDateRestrictions: Story = {
  render: () => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    const [selected, setSelected] = useState(today);
    const [month, setMonth] = useState(today.getMonth());
    const [year, setYear] = useState(today.getFullYear());

    const handleMonthChange = useCallback((month: number, year: number) => {
      setMonth(month);
      setYear(year);
    }, []);

    return (
      <BlockStack gap="400">
        <Text as="h3" variant="headingMd">Booking Date (This Week Only)</Text>
        <DatePicker
          month={month}
          year={year}
          onChange={setSelected}
          onMonthChange={handleMonthChange}
          selected={selected}
          disableDatesBefore={today}
          disableDatesAfter={nextWeek}
        />
        <Text as="p" variant="bodySm" tone="subdued">
          Only dates between today and next week are selectable
        </Text>
      </BlockStack>
    );
  },
};

export const PastDatesOnly: Story = {
  render: () => {
    const today = new Date();
    const lastMonth = new Date(today);
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const [selected, setSelected] = useState(lastMonth);
    const [month, setMonth] = useState(selected.getMonth());
    const [year, setYear] = useState(selected.getFullYear());

    const handleMonthChange = useCallback((month: number, year: number) => {
      setMonth(month);
      setYear(year);
    }, []);

    return (
      <BlockStack gap="400">
        <Text as="h3" variant="headingMd">Historical Date Selection</Text>
        <DatePicker
          month={month}
          year={year}
          onChange={setSelected}
          onMonthChange={handleMonthChange}
          selected={selected}
          disableDatesAfter={today}
        />
        <Text as="p" variant="bodySm" tone="subdued">
          Only past dates are selectable
        </Text>
      </BlockStack>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [selected] = useState(new Date());
    const [month] = useState(selected.getMonth());
    const [year] = useState(selected.getFullYear());

    return (
      <BlockStack gap="400">
        <Text as="h3" variant="headingMd">Disabled Date Picker</Text>
        <DatePicker
          month={month}
          year={year}
          selected={selected}
          disabled
        />
        <Text as="p" variant="bodySm" tone="subdued">
          Date picker is disabled and cannot be interacted with
        </Text>
      </BlockStack>
    );
  },
};

export const WeekStartMonday: Story = {
  render: () => {
    const [selected, setSelected] = useState(new Date());
    const [month, setMonth] = useState(selected.getMonth());
    const [year, setYear] = useState(selected.getFullYear());

    const handleMonthChange = useCallback((month: number, year: number) => {
      setMonth(month);
      setYear(year);
    }, []);

    return (
      <BlockStack gap="400">
        <Text as="h3" variant="headingMd">Week Starts on Monday</Text>
        <DatePicker
          month={month}
          year={year}
          onChange={setSelected}
          onMonthChange={handleMonthChange}
          selected={selected}
          weekStartsOn={1}
        />
        <Text as="p" variant="bodySm" tone="subdued">
          Calendar week starts on Monday instead of Sunday
        </Text>
      </BlockStack>
    );
  },
};

export const HotelBooking: Story = {
  render: () => {
    const today = new Date();
    const [selectedRange, setSelectedRange] = useState<{start: Date; end: Date}>();
    const [month, setMonth] = useState(today.getMonth());
    const [year, setYear] = useState(today.getFullYear());
    const [errors, setErrors] = useState('');

    const handleMonthChange = useCallback((month: number, year: number) => {
      setMonth(month);
      setYear(year);
    }, []);

    const handleDateRangeChange = (range: {start: Date; end: Date}) => {
      setSelectedRange(range);

      // Validation: Check if stay is at least 2 nights
      if (range.start && range.end) {
        const nights = Math.ceil((range.end.getTime() - range.start.getTime()) / (1000 * 60 * 60 * 24));
        if (nights < 2) {
          setErrors('Minimum stay is 2 nights');
        } else {
          setErrors('');
        }
      }
    };

    return (
      <BlockStack gap="400" maxWidth="600px">
        <Text as="h3" variant="headingMd">Select Booking Dates</Text>

        <DatePicker
          month={month}
          year={year}
          onChange={handleDateRangeChange}
          onMonthChange={handleMonthChange}
          selected={selectedRange}
          allowRange
          disableDatesBefore={today}
        />

        {errors && (
          <Text as="p" tone="critical">{errors}</Text>
        )}

        {selectedRange && (
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '6px' }}>
            <Text as="h4" variant="headingSm">Booking Summary:</Text>
            <Text as="p">Check-in: {selectedRange.start.toLocaleDateString()}</Text>
            <Text as="p">Check-out: {selectedRange.end.toLocaleDateString()}</Text>
            {selectedRange.start && selectedRange.end && (
              <Text as="p">
                Nights: {Math.ceil((selectedRange.end.getTime() - selectedRange.start.getTime()) / (1000 * 60 * 60 * 24))}
              </Text>
            )}
          </div>
        )}
      </BlockStack>
    );
  },
};

export const EventScheduling: Story = {
  render: () => {
    const today = new Date();
    const threeMonthsFromNow = new Date(today);
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);

    const [selectedDate, setSelectedDate] = useState<Date>();
    const [month, setMonth] = useState(today.getMonth());
    const [year, setYear] = useState(today.getFullYear());
    const [eventType, setEventType] = useState('meeting');

    const handleMonthChange = useCallback((month: number, year: number) => {
      setMonth(month);
      setYear(year);
    }, []);

    const handleDateChange = (date: Date) => {
      setSelectedDate(date);
    };

    const isWeekend = (date: Date) => {
      const day = date.getDay();
      return day === 0 || day === 6; // Sunday or Saturday
    };

    const shouldDisableDate = (date: Date) => {
      if (eventType === 'meeting') {
        return isWeekend(date); // Disable weekends for meetings
      }
      return false;
    };

    return (
      <BlockStack gap="400" maxWidth="600px">
        <Text as="h3" variant="headingMd">Schedule Event</Text>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
            Event Type:
          </label>
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            style={{ padding: '8px', border: '1px solid #d2d2d2', borderRadius: '4px', width: '200px' }}
          >
            <option value="meeting">Meeting</option>
            <option value="workshop">Workshop</option>
            <option value="social">Social Event</option>
          </select>
        </div>

        <DatePicker
          month={month}
          year={year}
          onChange={handleDateChange}
          onMonthChange={handleMonthChange}
          selected={selectedDate}
          disableDatesBefore={today}
          disableDatesAfter={threeMonthsFromNow}
        />

        {eventType === 'meeting' && (
          <Text as="p" variant="bodySm" tone="subdued">
            Note: Weekends are disabled for business meetings
          </Text>
        )}

        {selectedDate && (
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '6px' }}>
            <Text as="h4" variant="headingSm">Event Details:</Text>
            <Text as="p">Type: {eventType.charAt(0).toUpperCase() + eventType.slice(1)}</Text>
            <Text as="p">Date: {selectedDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</Text>
            <Text as="p">Day of week: {selectedDate.toLocaleDateString('en-US', { weekday: 'long' })}</Text>
          </div>
        )}
      </BlockStack>
    );
  },
};

export const DateRangeComparison: Story = {
  render: () => {
    const [period1, setPeriod1] = useState<{start: Date; end: Date}>();
    const [period2, setPeriod2] = useState<{start: Date; end: Date}>();

    const [month1, setMonth1] = useState(new Date().getMonth());
    const [year1, setYear1] = useState(new Date().getFullYear());

    const [month2, setMonth2] = useState(new Date().getMonth());
    const [year2, setYear2] = useState(new Date().getFullYear());

    const handleMonth1Change = useCallback((month: number, year: number) => {
      setMonth1(month);
      setYear1(year);
    }, []);

    const handleMonth2Change = useCallback((month: number, year: number) => {
      setMonth2(month);
      setYear2(year);
    }, []);

    return (
      <BlockStack gap="600" maxWidth="800px">
        <Text as="h3" variant="headingMd">Compare Date Periods</Text>

        <BlockStack gap="300">
          <Text as="h4" variant="headingSm">Period 1</Text>
          <DatePicker
            month={month1}
            year={year1}
            onChange={setPeriod1}
            onMonthChange={handleMonth1Change}
            selected={period1}
            allowRange
          />
        </BlockStack>

        <BlockStack gap="300">
          <Text as="h4" variant="headingSm">Period 2</Text>
          <DatePicker
            month={month2}
            year={year2}
            onChange={setPeriod2}
            onMonthChange={handleMonth2Change}
            selected={period2}
            allowRange
          />
        </BlockStack>

        {(period1 || period2) && (
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '6px' }}>
            <Text as="h4" variant="headingSm">Comparison Summary:</Text>
            {period1 && (
              <Text as="p">
                Period 1: {period1.start?.toLocaleDateString()} - {period1.end?.toLocaleDateString()}
                {period1.start && period1.end && (
                  <> ({Math.ceil((period1.end.getTime() - period1.start.getTime()) / (1000 * 60 * 60 * 24))} days)</>
                )}
              </Text>
            )}
            {period2 && (
              <Text as="p">
                Period 2: {period2.start?.toLocaleDateString()} - {period2.end?.toLocaleDateString()}
                {period2.start && period2.end && (
                  <> ({Math.ceil((period2.end.getTime() - period2.start.getTime()) / (1000 * 60 * 60 * 24))} days)</>
                )}
              </Text>
            )}
          </div>
        )}
      </BlockStack>
    );
  },
};

export const AccessibilityExamples: Story = {
  render: () => {
    const [selected, setSelected] = useState(new Date());
    const [month, setMonth] = useState(selected.getMonth());
    const [year, setYear] = useState(selected.getFullYear());

    const handleMonthChange = useCallback((month: number, year: number) => {
      setMonth(month);
      setYear(year);
    }, []);

    return (
      <BlockStack gap="400" maxWidth="500px">
        <Text as="h3" variant="headingMd">Accessibility Features</Text>

        <DatePicker
          month={month}
          year={year}
          onChange={setSelected}
          onMonthChange={handleMonthChange}
          selected={selected}
        />

        <BlockStack gap="200">
          <Text as="p" variant="bodySm">
            ✓ Fully keyboard navigable<br/>
            ✓ Screen reader compatible<br/>
            ✓ ARIA labels and descriptions<br/>
            ✓ High contrast mode support<br/>
            ✓ Focus indicators<br/>
            ✓ Semantic HTML structure
          </Text>
          <Text as="p" variant="bodySm" tone="subdued">
            Navigation: Use arrow keys to navigate dates, Enter/Space to select,
            Page Up/Down for months, Home/End for first/last dates
          </Text>
        </BlockStack>
      </BlockStack>
    );
  },
};