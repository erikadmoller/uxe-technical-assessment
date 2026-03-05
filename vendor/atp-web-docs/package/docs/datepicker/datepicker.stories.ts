import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {withActions} from 'storybook/actions/decorator';
import {html} from 'lit';
import './datepicker';
import {DateTime} from 'luxon';

const exampleDate = DateTime.fromISO('2025-08-14');

const meta: Meta = {
  component: 'atp-datepicker',
  title: 'Components/Datepicker',
  tags: ['autodocs'],
  parameters: {
    docs: {
      component: 'Datepicker',
    },
    actions: {
      handles: ['date2SelectedOutput', 'dateSelectedOutput'],
    },
  },
  decorators: [withActions],
  argTypes: {
    date: exampleDate,
  },
};

export default meta;
type Story = StoryObj;

const args = {
  date: exampleDate,
  date2: exampleDate,
  minDate: exampleDate.minus({years: 2}),
  maxDate: exampleDate.plus({years: 2}),
  isVisible: false,
  notAllowedDates: [
    exampleDate.plus({days: 8}),
    exampleDate.plus({days: 12}),
    exampleDate.plus({days: 15}),
    exampleDate.plus({days: 18}),
    exampleDate.plus({days: 19}),
    exampleDate.minus({days: 7}),
    exampleDate.minus({days: 2}),
    exampleDate.minus({days: 5}),
    exampleDate.minus({days: 8}),
    exampleDate.minus({days: 12}),
    exampleDate.minus({days: 15}),
    exampleDate.minus({days: 18}),
    exampleDate.minus({days: 19}),
    exampleDate.minus({days: 7}),
  ],
};

export const Primary: Story = {
  args: {
    ...args,
    isVisible: true,
  },
  render: ({
    date,
    preselectedRanges,
    date2,
    minDate,
    maxDate,
    notAllowedDates,
    isVisible,
  }) => html`<atp-datepicker
      id="datepicker"
      .notAllowedDates=${notAllowedDates}
      .maxDate=${maxDate}
      .minDate=${minDate}
      .date2=${date2}
      .date=${date}
      .isVisible=${isVisible}
      .preselectedRanges=${preselectedRanges}
    >
    </atp-datepicker>

    <!-- JS implementation will vary depending on setup-->
    <script>
      datepicker = document.getElementById('datepicker');
      datepicker?.addEventListener('dateSelectedOutput', (e) => {
        if (e.detail.isValid) {
          datepicker.date = e.detail;
        }
      });
    </script> `,
  parameters: {
    docs: {
      source: {
        code: `<atp-datepicker
      id="datepicker"
      .notAllowedDates=\${notAllowedDates}
      .maxDate=\${maxDate}
      .minDate=\${minDate}
      .date2=\${date2}
      .date=\${date}
      .isVisible=\${isVisible}
    >
    </atp-datepicker>

    <!-- JS implementation will vary depending on setup-->
    <script>
      datepicker = document.getElementById('datepicker');
      datepicker?.addEventListener('dateSelectedOutput', (e) => {
        if (e.detail.isValid) {
          datepicker.date = e.detail;
        }
      });
    </script>`,
      },
    },
  },
};

export const SoloPicker: Story = {
  args: {
    ...args,
  },
  render: ({date, date2, minDate, maxDate, notAllowedDates}) => html`
    <style>
      .atp-input {
        max-width: 150px;
      }
    </style>
    <atp-datepicker
      id="datepicker"
      .isSoloPicker=${true}
      .notAllowedDates=${notAllowedDates}
      .maxDate=${maxDate}
      .minDate=${minDate}
      .date2=${date2}
      .date=${date}
    >
      <atp-input helpText="MM/dd/yyyy" class="atp-input" id="input" label="Start Date" slot="date">
        <input aria-label="date" id="date" />
      </atp-input>
    </atp-datepicker>

    <!-- JS implementation will vary depending on setup-->
    <script>
      datepicker = document.getElementById('datepicker');
      input = document.getElementById('input');

      datepicker?.addEventListener('dateSelectedOutput', (e) => {
        if (e.detail.isValid) {
          datepicker.date = e.detail;
          input.helpText = 'MM/dd/yyyy';
          input.isError = false;
        } else {
          input.helpText = 'Invalid date';
          input.isError = true;
        }
      });
    </script>
  `,
  parameters: {
    docs: {
      source: {
        code: `<atp-datepicker
      id="datepicker"
      .isSoloPicker=\${true}
      .notAllowedDates=\${notAllowedDates}
      .maxDate=\${maxDate}
      .minDate=\${minDate}
      .date2=\${date2}
      .date=\${date}
    >
      <atp-input helpText="MM/dd/yyyy" class="atp-input" id="input" label="Start Date" slot="date">
        <input aria-label="date" id="date" />
      </atp-input>
    </atp-datepicker>

    <!-- JS implementation will vary depending on setup-->
    <script>
      datepicker = document.getElementById('datepicker');
      input = document.getElementById('input');

      datepicker?.addEventListener('dateSelectedOutput', (e) => {
        if (e.detail.isValid) {
          datepicker.date = e.detail;
          input.helpText = 'MM/dd/yyyy';
          input.isError = false;
        } else {
          input.helpText = 'Invalid date';
          input.isError = true;
        }
      });
    </script>`,
      },
    },
  },
};

export const RangePicker: Story = {
  args: {
    ...args,
    date2: exampleDate.plus({weeks: 1}),
    preselectedRanges: [
      {isTitle: true, name: 'Future'},
      {
        name: 'Next 60 Days',
        start: exampleDate,
        end: exampleDate.plus({days: 60}),
      },
      {
        name: 'Next 90 Days',
        start: exampleDate,
        end: exampleDate.plus({days: 90}),
      },
      {
        name: 'Next 2 Months',
        start: exampleDate,
        end: exampleDate.plus({months: 2}),
      },
      {isTitle: true, name: 'Past'},
      {
        name: 'Past 60 Days',
        start: exampleDate,
        end: exampleDate.minus({days: 60}),
      },
      {
        name: 'Past 90 Days',
        start: exampleDate,
        end: exampleDate.minus({days: 90}),
      },
      {
        name: 'Past 2 Months',
        start: exampleDate,
        end: exampleDate.minus({months: 2}),
      },
    ],
  },
  render: ({date, date2, minDate, maxDate, notAllowedDates, preselectedRanges}) => html`
    <style>
      .atp-input {
        max-width: 150px;
      }
      .atp-datepicker {
        margin-inline-start: 150px;
      }
    </style>
    <atp-datepicker
      id="datepicker"
      class="atp-datepicker"
      .isMultiPicker=${true}
      .notAllowedDates=${notAllowedDates}
      .preselectedRanges=${preselectedRanges}
      .maxDate=${maxDate}
      .minDate=${minDate}
      .date2=${date2}
      .date=${date}
    >
      <atp-input label="Start date" class="atp-input" helpText="MM/dd/yyyy" id="input1" slot="date">
        <input aria-label="start date" id="start-date" />
      </atp-input>
      <atp-input label="End date" class="atp-input" helpText="MM/dd/yyyy" id="input2" slot="date2">
        <input aria-label="end date" id="end-date" /> </atp-input
    ></atp-datepicker>

    <!-- JS implementation will vary depending on setup-->
    <script>
      datepicker = document.getElementById('datepicker');
      input1 = document.getElementById('input1');
      input2 = document.getElementById('input2');

      datepicker?.addEventListener('dateSelectedOutput', (e) => {
        if (e.detail.isValid) {
          datepicker.date = e.detail;
          input1.isError = false;
          input1.helpText = 'dd MM YYYY';
        } else {
          input1.isError = true;
          input1.helpText = 'Invalid date';
        }
      });
      datepicker?.addEventListener('date2SelectedOutput', (e) => {
        if (e.detail.isValid) {
          datepicker.date2 = e.detail;
          input2.isError = false;
          input2.helpText = 'dd MM YYYY';
        } else {
          input2.isError = true;
          input2.helpText = 'Invalid date';
        }
      });
    </script>
  `,
  parameters: {
    docs: {
      source: {
        code: `<atp-datepicker
      id="datepicker"
      .isMultiPicker=\${true}
      .notAllowedDates=\${notAllowedDates}
      .maxDate=\${maxDate}
      .minDate=\${minDate}
      .date2=\${date2}
      .date=\${date}
    >
      <atp-input label="Start date" class="atp-input" helpText="MM/dd/yyyy" id="input1" slot="date">
        <input aria-label="start date" id="start-date" />
      </atp-input>
      <atp-input label="End date" class="atp-input" helpText="MM/dd/yyyy" id="input2" slot="date2">
        <input aria-label="end date" id="end-date" /> </atp-input
    ></atp-datepicker>

    <!-- JS implementation will vary depending on setup-->
    <script>
      datepicker = document.getElementById('datepicker');
      input1 = document.getElementById('input1');
      input2 = document.getElementById('input2');

      datepicker?.addEventListener('dateSelectedOutput', (e) => {
        if (e.detail.isValid) {
          datepicker.date = e.detail;
          input1.isError = false;
          input1.helpText = 'dd MM YYYY';
        } else {
          input1.isError = true;
          input1.helpText = 'Invalid date';
        }
      });
      datepicker?.addEventListener('date2SelectedOutput', (e) => {
        if (e.detail.isValid) {
          datepicker.date2 = e.detail;
          input2.isError = false;
          input2.helpText = 'dd MM YYYY';
        } else {
          input2.isError = true;
          input2.helpText = 'Invalid date';
        }
      });
    </script>`,
      },
    },
  },
};
