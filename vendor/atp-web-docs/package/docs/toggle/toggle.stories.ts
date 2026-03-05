import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {withActions} from 'storybook/actions/decorator';

import {html} from 'lit';
import './toggle';
import {LabelPosition as LabelPositionEnum} from './toggle';

const meta: Meta = {
  component: 'atp-toggle',
  title: 'Components/Toggle',
  tags: ['autodocs'],
  parameters: {
    docs: {
      component: 'Toggle Element',
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
    required: {
      options: [true, false],
    },
    bordered: {
      options: [true, false],
    },
    isError: {
      options: [true, false],
    },
    labelPosition: {
      options: [LabelPositionEnum.LEFT, LabelPositionEnum.RIGHT],
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
    labelPosition: LabelPositionEnum.RIGHT,
    required: false,
    bordered: false,
  },
  parameters: {
    docs: {
      source: {
        code: `
        <script>
          const myForm = document.getElementById('myForm');
          myForm.addEventListener('changeEventOutput', (event) => {
            alert('Hey, thanks for toggling that toggle inside my form!');
          });
        </script>
        <form id="myForm">
          <atp-toggle label="Primary" name="primary" value="on"></atp-toggle>
        </form>
        `,
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
    labelPosition: LabelPositionEnum.RIGHT,
    required: false,
    bordered: false,
  },
  parameters: {
    docs: {
      source: {
        code: '<atp-toggle label="Checked" name="checked" value="on" checked="true"></atp-toggle>',
      },
    },
  },
};

export const Description: Story = {
  args: {
    label: 'Checked',
    name: 'checked',
    value: 'on',
    checked: true,
    disabled: false,
    llabelPosition: LabelPositionEnum.RIGHT,
    required: false,
    bordered: false,
    description: 'Some description',
  },
  parameters: {
    docs: {
      source: {
        code: '<atp-toggle label="Checked" name="checked" value="on" checked="true"></atp-toggle>',
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
    labelPosition: LabelPositionEnum.RIGHT,
    required: false,
    bordered: false,
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: var(--atp-space-s)">
      <atp-toggle label="Disabled" value="on" disabled="true"></atp-toggle>

      <atp-toggle label="Checked" value="on" disabled="true" checked="true"></atp-toggle>
    </div>
  `,
  parameters: {
    docs: {
      source: {
        code: '<atp-toggle label="Disabled" name="disabled" value="on" disabled="true"></atp-toggle>',
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
    llabelPosition: LabelPositionEnum.RIGHT,
    required: true,
    bordered: false,
  },
  render: () => html`
    <form
      id="myForm"
      onsubmit="event.preventDefault(); alert('Form valid and submitted!'); getElementById('tandctoggle').isError = false; getElementById('tandcLabel').style.display = 'none';"
      style="display: flex; flex-direction: column; gap: var(--atp-space-s)"
    >
      <atp-toggle
        label="I consent to the terms and conditions"
        name="tandc"
        value="consented"
        required="true"
        id="tandctoggle"
        aria-errormessage="tandcLabel"
        aria-describedby="tandcLabel"
      ></atp-toggle>
      <label
        for="tandctoggle"
        id="tandcLabel"
        style="display: none; color: var(--atp-danger-primary-strong-enabled)"
      >
        Please indicate that you consent to the terms.
      </label>
      <div>
        <button
          onclick="if(!getElementById('tandctoggle').checked) {getElementById('tandctoggle').isError = true; getElementById('tandcLabel').style.display = 'block';}"
        >
          Submit this form
        </button>
      </div>
    </form>
  `,
  parameters: {
    docs: {
      source: {
        code: '<atp-toggle label="I consent to the terms and conditions" name="tandc" value="true" required="true"></atp-toggle>',
      },
    },
  },
};

export const LabelPosition: Story = {
  args: {
    label: 'Label on left',
    name: 'primary',
    value: 'on',
    checked: false,
    disabled: false,
    labelPosition: LabelPositionEnum.LEFT,
    required: false,
    bordered: false,
  },
  parameters: {
    docs: {
      source: {
        code: '<atp-toggle label="Primary" name="primary" value="on" labelPosition="left"></atp-toggle>',
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
    labelPosition: LabelPositionEnum.RIGHT,
    required: false,
    bordered: true,
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: var(--atp-space-s)">
      <div style="display: flex; flex-direction: row; gap: var(--atp-space-s)">
        <atp-toggle label="Bordered" name="bordered" value="on" bordered></atp-toggle>
        <atp-toggle label="Disabled" name="bordered" value="on" bordered disabled></atp-toggle>
        <atp-toggle
          label="Disabled Checked"
          name="bordered"
          value="on"
          bordered
          disabled
          checked
        ></atp-toggle>
      </div>
      <div style="display: flex; flex-direction: row; gap: var(--atp-space-s)">
        <atp-toggle
          label="Bordered"
          name="bordered"
          value="on"
          bordered
          description="Description"
        ></atp-toggle>
        <atp-toggle
          label="Disabled"
          name="bordered"
          value="on"
          bordered
          disabled
          description="Description"
        ></atp-toggle>
        <atp-toggle
          label="Disabled Checked"
          name="bordered"
          value="on"
          bordered
          disabled
          checked
          description="Description"
        ></atp-toggle>
      </div>
      <div style="display: flex; flex-direction: row; gap: var(--atp-space-s)">
        <atp-toggle
          label="Bordered"
          name="bordered"
          value="on"
          bordered
          description="Description"
          labelPosition="left"
        ></atp-toggle>
        <atp-toggle
          label="Disabled"
          name="bordered"
          value="on"
          bordered
          disabled
          description="Description"
          labelPosition="left"
        ></atp-toggle>
        <atp-toggle
          label="Disabled Checked"
          name="bordered"
          value="on"
          bordered
          disabled
          checked
          description="Description"
          labelPosition="left"
        ></atp-toggle>
      </div>
      <div style="display: flex; flex-direction: row; gap: var(--atp-space-s)">
        <atp-toggle label="Error" name="bordered" value="on" bordered isError></atp-toggle>
        <atp-toggle
          label="Disabled"
          name="bordered"
          value="on"
          bordered
          disabled
          isError
        ></atp-toggle>
        <atp-toggle
          label="Disabled Checked"
          name="bordered"
          value="on"
          bordered
          disabled
          checked
          isError
        ></atp-toggle>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      source: {
        code: '<atp-toggle label="Bordered" name="bordered" value="on" bordered="true"></atp-toggle>',
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
    labelPosition: LabelPositionEnum.RIGHT,
    required: false,
    bordered: false,
    ariaLabel: 'Play sound',
  },
  parameters: {
    docs: {
      source: {
        code: `
          <atp-toggle name="playsound" value="on" ariaLabel="Play sound"></atp-toggle>
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
    labelPosition: LabelPositionEnum.RIGHT,
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

    <atp-toggle name="nolabel" value="on"></atp-toggle>
  `,
  parameters: {
    docs: {
      source: {
        code: `
          <atp-toggle name="nolabel" value="on"></atp-toggle>
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
    llabelPosition: LabelPositionEnum.RIGHT,
    required: false,
    bordered: false,
  },
  parameters: {
    docs: {
      source: {
        code: '<atp-toggle label="No Name or Value props"></atp-toggle>',
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
    labelPosition: LabelPositionEnum.RIGHT,
    required: false,
    bordered: false,
    tabindex: 99,
  },
  parameters: {
    docs: {
      source: {
        code: `
          <atp-toggle name="tabindex99" value="on" label="tabindex of 99" tabindex="99"></atp-toggle>
        `,
      },
    },
  },
};

export const Error: Story = {
  args: {},
  render: () => html`
    <p id="myError" style="margin-bottom: var(--atp-space-s)">
      Error: please set all the toggles on "on" to proceed.
    </p>
    <div style="display: flex; flex-direction: row; gap: var(--atp-space-s)">
      <atp-toggle label="Unchecked" isError="true" ariaErrorMessage="myError"></atp-toggle>
      <atp-toggle label="Checked" isError="true" checked ariaErrorMessage="myError"></atp-toggle>
      <atp-toggle
        label="Disabled Checked"
        isError="true"
        disabled
        ariaErrorMessage="myError"
      ></atp-toggle>
      <atp-toggle
        label="Disabled Unchecked"
        isError="true"
        checked
        disabled
        ariaErrorMessage="myError"
      ></atp-toggle>
    </div>
  `,
  parameters: {
    docs: {
      source: {
        code: `
          <atp-toggle label="My toggle" isError="true"></atp-toggle>
        `,
      },
    },
  },
};
