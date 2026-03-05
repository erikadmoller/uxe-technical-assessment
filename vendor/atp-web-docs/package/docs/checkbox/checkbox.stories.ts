import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {withActions} from 'storybook/actions/decorator';

import {html} from 'lit';
import './checkbox';

const meta: Meta = {
  component: 'atp-checkbox',
  title: 'Components/Checkbox',
  tags: ['autodocs'],
  parameters: {
    docs: {
      component: 'Checkbox Element',
    },
    actions: {
      handles: ['clickEventOutput', 'focusEventOutput', 'blurEventOutput'],
    },
  },
  decorators: [withActions],
  argTypes: {
    label: {},
    name: {},
    value: {},
    checked: {
      options: [true, false],
    },
    disabled: {
      options: [true, false],
    },
    indeterminate: {
      options: [true, false],
    },
    required: {
      options: [true, false],
    },
    bordered: {
      options: [true, false],
    },
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    label: 'Primary',
    name: 'primary',
    value: 'on',
    checked: false,
    disabled: false,
    indeterminate: false,
    required: false,
    bordered: false,
  },
  parameters: {
    docs: {
      source: {
        code: '<atp-checkbox label="Primary" name="primary" value="on"></atp-checkbox>',
      },
    },
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked',
    name: 'checked',
    value: 'on',
    checked: true,
    disabled: false,
    indeterminate: false,
    required: false,
    bordered: false,
  },
  parameters: {
    docs: {
      source: {
        code: '<atp-checkbox label="Checked" name="checked" value="on" checked="true"></atp-checkbox>',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    name: 'disabled',
    value: 'on',
    checked: false,
    disabled: true,
    indeterminate: false,
    required: false,
    bordered: false,
  },
  render: () => html`
    <atp-checkbox label="Disabled" value="on" disabled="true"></atp-checkbox>
    <br />
    <atp-checkbox label="Checked" value="on" disabled="true" checked="true"></atp-checkbox>
  `,
  parameters: {
    docs: {
      source: {
        code: '<atp-checkbox label="Disabled" name="disabled" value="on" disabled="true"></atp-checkbox>',
      },
    },
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Indeterminate',
    name: 'indeterminate',
    value: 'on',
    checked: true,
    disabled: false,
    indeterminate: true,
    required: false,
    bordered: false,
  },
  parameters: {
    docs: {
      source: {
        code: '<atp-checkbox label="Indeterminate" name="indeterminate" value="on" indeterminate="true"></atp-checkbox>',
      },
    },
  },
};

export const Required: Story = {
  args: {
    label: 'I consent to the terms and conditions',
    name: 'required',
    value: 'on',
    checked: false,
    disabled: false,
    indeterminate: false,
    required: true,
    bordered: false,
  },
  render: () => html`
    <form id="myForm" onsubmit="event.preventDefault(); alert('Form valid and submitted!');">
      <atp-checkbox
        label="I consent to the terms and conditions"
        name="tandc"
        value="true"
        required="true"
      ></atp-checkbox>
      <div>
        <button>Submit this form</button>
      </div>
    </form>
  `,
  parameters: {
    docs: {
      source: {
        code: '<atp-checkbox label="I consent to the terms and conditions" name="tandc" value="true" required="true"></atp-checkbox>',
      },
    },
  },
};

export const Bordered: Story = {
  args: {
    label: 'Bordered',
    name: 'bordered',
    value: 'on',
    checked: false,
    disabled: false,
    indeterminate: false,
    required: false,
    bordered: true,
  },
  render: () => html`
    <atp-checkbox label="Bordered" name="bordered" value="on" bordered></atp-checkbox>
    <atp-checkbox label="Disabled" name="bordered" value="on" bordered disabled></atp-checkbox>
    <atp-checkbox
      label="Disabled Checked"
      name="bordered"
      value="on"
      bordered
      disabled
      checked
    ></atp-checkbox>
    <br />
    <atp-checkbox label="Error" name="bordered" value="on" bordered isError></atp-checkbox>
    <atp-checkbox
      label="Disabled"
      name="bordered"
      value="on"
      bordered
      disabled
      isError
    ></atp-checkbox>
    <atp-checkbox
      label="Disabled Checked"
      name="bordered"
      value="on"
      bordered
      disabled
      checked
      isError
    ></atp-checkbox>
  `,
  parameters: {
    docs: {
      source: {
        code: '<atp-checkbox label="Bordered" name="bordered" value="on" bordered="true"></atp-checkbox>',
      },
    },
  },
};

export const WithAriaLabel: Story = {
  args: {
    label: null,
    name: 'playsound',
    value: 'on',
    checked: false,
    disabled: false,
    indeterminate: false,
    required: false,
    bordered: false,
    ariaLabel: 'Play sound',
  },
  parameters: {
    docs: {
      source: {
        code: `
          <atp-checkbox name="playsound" value="on" ariaLabel="Play sound"></atp-checkbox>
        `,
      },
    },
  },
};

export const WithNoLabel: Story = {
  args: {
    label: null,
    name: 'nolabel',
    value: 'on',
    checked: false,
    disabled: false,
    indeterminate: false,
    required: false,
    bordered: false,
  },
  render: () => html`
    <p>
      A form element with no label or <code>aria-label</code> creates an accessibility issue,
      because some users may not be able to tell what the element does. This component does not
      support <code>aria-labelledby</code>, so we do not advise that you use it without a label or
      <code>aria-label</code> unless you're <strong>very</strong> certain that you're not creating
      an accessibility problem.
    </p>

    <atp-checkbox name="nolabel" value="on"></atp-checkbox>
  `,
  parameters: {
    docs: {
      source: {
        code: `
          <atp-checkbox name="nolabel" value="on"></atp-checkbox>
        `,
      },
    },
  },
};

export const WithNoNameOrValue: Story = {
  args: {
    label: 'No Name or Value props',
    checked: false,
    disabled: false,
    indeterminate: false,
    required: false,
    bordered: false,
  },
  parameters: {
    docs: {
      source: {
        code: '<atp-checkbox label="No Name or Value props"></atp-checkbox>',
      },
    },
  },
};

export const Tabindex: Story = {
  args: {
    label: 'tabindex of 99',
    name: 'tabindex99',
    value: 'on',
    checked: false,
    disabled: false,
    indeterminate: false,
    required: false,
    bordered: false,
    tabindex: 99,
  },
  parameters: {
    docs: {
      source: {
        code: `
          <atp-checkbox name="tabindex99" value="on" label="tabindex of 99" tabindex="99"></atp-checkbox>
        `,
      },
    },
  },
};

export const Error: Story = {
  args: {},
  render: () => html`
    <p id="myError">Error: please check all the checkboxes to proceed.</p>
    <atp-checkbox label="Unchecked" isError="true" ariaErrorMessage="myError"></atp-checkbox>
    <br />
    <atp-checkbox label="Checked" isError="true" checked ariaErrorMessage="myError"></atp-checkbox>
    <br />
    <atp-checkbox
      label="Disabled"
      isError="true"
      checked
      disabled
      ariaErrorMessage="myError"
    ></atp-checkbox>
  `,
  parameters: {
    docs: {
      source: {
        code: `
          <atp-checkbox label="My Checkbox" isError="true"></atp-checkbox>
        `,
      },
    },
  },
};
