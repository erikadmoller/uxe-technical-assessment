import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {withActions} from 'storybook/actions/decorator';
import {fn} from 'storybook/test';
import {html} from 'lit';
import {RadioButtonGroupDirection} from './radio-button-group';
import './radio-button-group';

const meta: Meta = {
  component: 'atp-radio-button-group',
  title: 'Components/RadioButtonGroup',
  tags: ['autodocs'],
  parameters: {
    docs: {
      component: 'Radio Button Group Element',
    },
    actions: {
      handles: ['clickEventOutput', 'focusEventOutput', 'blurEventOutput', 'changeEventOutput'],
    },
  },
  decorators: [withActions],
  argTypes: {
    name: {},
    required: {
      options: [true, false],
    },
    bordered: {
      options: [true, false],
    },
    isError: {
      options: [true, false],
    },
    direction: {
      options: [RadioButtonGroupDirection.VERTICAL, RadioButtonGroupDirection.HORIZONTAL],
    },
    itemsList: [],
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    onCustomEvent: fn(),
    name: 'primary',
    required: false,
    bordered: false,
    isError: false,
    direction: RadioButtonGroupDirection.VERTICAL,
    itemsList: [
      {label: 'Item 1', value: 'item1', id: 'item-1'},
      {label: 'Item 2', value: 'item2', id: 'item-2'},
      {label: 'Item 3 checked', value: 'item3', id: 'item-3', checked: true},
      {label: 'Item 4 disabled', value: 'item4', id: 'item-4', disabled: true},
      {label: 'Item 5', value: 'item5', id: 'item-5'},
    ],
  },
  render: (args) => html`
    <script>
      itemsList: [
        {label: 'Item 1', value: 'item1', id: 'item-1'},
        {label: 'Item 2', value: 'item2', id: 'item-2'},
        {label: 'Item 3 checked', value: 'item3', id: 'item-3', checked: true},
        {label: 'Item 4 disabled', value: 'item4', id: 'item-4', disabled: true},
        {label: 'Item 5', value: 'item5', id: 'item-5'},
      ],
    </script>
    <atp-radio-button-group
      name="primary"
      .itemsList=${args['itemsList']}
      .direction=${args['direction']}
      @clickEventOutput=${(e: CustomEvent) => args['onCustomEvent']('click: ' + e.detail)}
      @focusEventOutput=${(e: CustomEvent) => args['onCustomEvent']('focus: ' + e.detail)}
      @blurEventOutput=${(e: CustomEvent) => args['onCustomEvent']('blur: ' + e.detail)}
    ></atp-radio-button-group>
  `,
  parameters: {
    docs: {
      source: {
        code: `
          <script> 
            itemsList: [
              {label: 'Item 1', value: 'item1', id: 'item-1'},
              {label: 'Item 2', value: 'item2', id: 'item-2'},
              {label: 'Item 3 checked', value: 'item3', id: 'item-3', checked: true},
              {label: 'Item 4 disabled', value: 'item4', id: 'item-4', disabled: true},
              {label: 'Item 5', value: 'item5', id: 'item-5'},
            ],
          </script>
          <atp-radio-button-group name="primary" .itemsList=\${itemsList}></atp-radio-button-group>
        `,
      },
    },
  },
};

export const Error: Story = {
  args: {
    onCustomEvent: fn(),
    name: 'myErrorExample',
    required: false,
    bordered: false,
    isError: true,
    direction: RadioButtonGroupDirection.VERTICAL,
    itemsList: [
      {label: 'Item 1', value: 'item1', id: 'item-1'},
      {label: 'Item 2', value: 'item2', id: 'item-2'},
      {label: 'Item 3 checked', value: 'item3', id: 'item-3', checked: true},
      {label: 'Item 4 disabled', value: 'item4', id: 'item-4', disabled: true},
      {label: 'Item 5', value: 'item5', id: 'item-5'},
    ],
  },

  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: var(--atp-space-s)">
      <p id="myErrorMsg" style="color: var(--atp-danger-primary-strong-enabled)">
        Item 3 is not a valid choice. Please revise your selection.
      </p>
      <atp-radio-button-group
        name="myErrorExample"
        isError
        .itemsList=${args['itemsList']}
        ariaErrorMessage="myErrorMsg"
        @clickEventOutput=${(e: CustomEvent) => args['onCustomEvent']('click: ' + e.detail)}
        @focusEventOutput=${(e: CustomEvent) => args['onCustomEvent']('focus: ' + e.detail)}
        @blurEventOutput=${(e: CustomEvent) => args['onCustomEvent']('blur: ' + e.detail)}
      >
      </atp-radio-button-group>
    </div>
  `,
  parameters: {
    docs: {
      source: {
        code: `
          <script> 
            itemsList: [
              {label: 'Item 1', value: 'item1', id: 'item-1'},
              {label: 'Item 2', value: 'item2', id: 'item-2'},
              {label: 'Item 3 checked', value: 'item3', id: 'item-3', checked: true},
              {label: 'Item 4 disabled', value: 'item4', id: 'item-4', disabled: true},
              {label: 'Item 5', value: 'item5', id: 'item-5'},
            ],
          </script>
          <atp-radio-button-group 
            name="myErrorExample" isError .itemsList=\${itemsList} ariaErrorMessage="myErrorMsg"
          ></atp-radio-button-group>
        `,
      },
    },
  },
};

export const Horizontal: Story = {
  args: {
    onCustomEvent: fn(),
    name: 'myBorderedExample',
    required: false,
    bordered: false,
    isError: false,
    direction: RadioButtonGroupDirection.HORIZONTAL,
    itemsList: [
      {label: 'Item 1', value: 'item1', id: 'item-1'},
      {label: 'Item 2', value: 'item2', id: 'item-2'},
      {label: 'Item 3 checked', value: 'item3', id: 'item-3', checked: true},
      {label: 'Item 4 disabled', value: 'item4', id: 'item-4', disabled: true},
      {label: 'Item 5', value: 'item5', id: 'item-5'},
    ],
  },
  render: (args) => html`
    <script>
      itemsList: [
        {label: 'Item 1', value: 'item1', id: 'item-1'},
        {label: 'Item 2', value: 'item2', id: 'item-2'},
        {label: 'Item 3 checked', value: 'item3', id: 'item-3', checked: true},
        {label: 'Item 4 disabled', value: 'item4', id: 'item-4', disabled: true},
        {label: 'Item 5', value: 'item5', id: 'item-5'},
      ],
    </script>
    <atp-radio-button-group
      name="myBorderedExample"
      direction="horizontal"
      .itemsList=${args['itemsList']}
      @clickEventOutput=${(e: CustomEvent) => args['onCustomEvent']('click: ' + e.detail)}
      @focusEventOutput=${(e: CustomEvent) => args['onCustomEvent']('focus: ' + e.detail)}
      @blurEventOutput=${(e: CustomEvent) => args['onCustomEvent']('blur: ' + e.detail)}
    ></atp-radio-button-group>
  `,
  parameters: {
    docs: {
      source: {
        code: `
          <script> 
            itemsList: [
              {label: 'Item 1', value: 'item1', id: 'item-1'},
              {label: 'Item 2', value: 'item2', id: 'item-2'},
              {label: 'Item 3 checked', value: 'item3', id: 'item-3', checked: true},
              {label: 'Item 4 disabled', value: 'item4', id: 'item-4', disabled: true},
              {label: 'Item 5', value: 'item5', id: 'item-5'},
            ],
          </script>
          <atp-radio-button-group name="myBorderedExample" direction="horizontal" .itemsList=\${itemsList}></atp-radio-button-group>
        `,
      },
    },
  },
};

export const Bordered: Story = {
  args: {
    onCustomEvent: fn(),
    name: 'bordered',
    required: false,
    bordered: true,
    isError: false,
    direction: RadioButtonGroupDirection.VERTICAL,
    itemsList: [
      {label: 'Item 1', value: 'item1', id: 'item-1'},
      {label: 'Item 2', value: 'item2', id: 'item-2'},
      {label: 'Item 3 checked', value: 'item3', id: 'item-3', checked: true},
      {label: 'Item 4 disabled', value: 'item4', id: 'item-4', disabled: true},
      {label: 'Item 5', value: 'item5', id: 'item-5'},
    ],
  },
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: var(--atp-space-s)">
      <atp-radio-button-group
        name="myBorderedExample"
        bordered
        .itemsList=${args['itemsList']}
        @clickEventOutput=${(e: CustomEvent) => args['onCustomEvent']('click: ' + e.detail)}
        @focusEventOutput=${(e: CustomEvent) => args['onCustomEvent']('focus: ' + e.detail)}
        @blurEventOutput=${(e: CustomEvent) => args['onCustomEvent']('blur: ' + e.detail)}
      >
      </atp-radio-button-group>

      <h4>Showing error state:</h4>
      <atp-radio-button-group
        name="bordered-error"
        bordered
        isError
        .itemsList=${args['itemsList']}
        @clickEventOutput=${(e: CustomEvent) => args['onCustomEvent']('click: ' + e.detail)}
        @focusEventOutput=${(e: CustomEvent) => args['onCustomEvent']('focus: ' + e.detail)}
        @blurEventOutput=${(e: CustomEvent) => args['onCustomEvent']('blur: ' + e.detail)}
      >
      </atp-radio-button-group>

      <h4>Horizontal:</h4>
      <atp-radio-button-group
        name="bordered-horiz"
        bordered
        direction="horizontal"
        .itemsList=${args['itemsList']}
        @clickEventOutput=${(e: CustomEvent) => args['onCustomEvent']('click: ' + e.detail)}
        @focusEventOutput=${(e: CustomEvent) => args['onCustomEvent']('focus: ' + e.detail)}
        @blurEventOutput=${(e: CustomEvent) => args['onCustomEvent']('blur: ' + e.detail)}
      >
      </atp-radio-button-group>
    </div>
  `,
  parameters: {
    docs: {
      source: {
        code: `
          <script> 
            itemsList: [
              {label: 'Item 1', value: 'item1', id: 'item-1'},
              {label: 'Item 2', value: 'item2', id: 'item-2'},
              {label: 'Item 3 checked', value: 'item3', id: 'item-3', checked: true},
              {label: 'Item 4 disabled', value: 'item4', id: 'item-4', disabled: true},
              {label: 'Item 5', value: 'item5', id: 'item-5'},
            ],
          </script>
          <atp-radio-button-group name="myBorderedExample" bordered .itemsList=\${itemsList}></atp-radio-button-group>
        `,
      },
    },
  },
};

export const Required: Story = {
  args: {
    onCustomEvent: fn(),
    name: 'required',
    required: true,
    bordered: false,
    isError: false,
    direction: RadioButtonGroupDirection.VERTICAL,
    itemsList: [
      {label: 'Item 1', value: 'item1', id: 'item-1'},
      {label: 'Item 2', value: 'item2', id: 'item-2'},
      {label: 'Item 3', value: 'item3', id: 'item-3'},
      {label: 'Item 4 disabled', value: 'item4', id: 'item-4', disabled: true},
      {label: 'Item 5', value: 'item5', id: 'item-5'},
    ],
  },
  render: (args) => html`
    <form
      id="myForm"
      onsubmit="    
        event.preventDefault();
        alert('Form valid and submitted! Value is ' + document.getElementById('myGroup').value);
      "
    >
      <atp-radio-button-group
        name="myRequiredExample"
        required
        bordered
        .itemsList=${args['itemsList']}
        @clickEventOutput=${(e: CustomEvent) => args['onCustomEvent']('click: ' + e.detail)}
        @focusEventOutput=${(e: CustomEvent) => args['onCustomEvent']('focus: ' + e.detail)}
        @blurEventOutput=${(e: CustomEvent) => args['onCustomEvent']('blur: ' + e.detail)}
        id="myGroup"
      >
      </atp-radio-button-group>
      <div style="margin-top: var(--atp-space-s)">
        <button>Submit this form</button>
      </div>
    </form>
  `,
  parameters: {
    docs: {
      source: {
        code: `
          <script> 
            itemsList: [
              {label: 'Item 1', value: 'item1', id: 'item-1'},
              {label: 'Item 2', value: 'item2', id: 'item-2'},
              {label: 'Item 3 checked', value: 'item3', id: 'item-3', checked: true},
              {label: 'Item 4 disabled', value: 'item4', id: 'item-4', disabled: true},
              {label: 'Item 5', value: 'item5', id: 'item-5'},
            ],
          </script>
          <atp-radio-button-group required name="myRequiredExample" .itemsList=\${itemsList}></atp-radio-button-group>
        `,
      },
    },
  },
};
