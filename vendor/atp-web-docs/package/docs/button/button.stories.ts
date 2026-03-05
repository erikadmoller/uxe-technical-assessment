import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {withActions} from 'storybook/actions/decorator';
import {html} from 'lit';

import './button';
import '../icon/icon';
import {ButtonAppearance, ButtonSize, IconPosition} from './button';

const meta: Meta = {
  component: 'atp-button',
  title: 'Components/Button',
  tags: ['autodocs'],
  parameters: {
    docs: {
      component: 'Button Element',
    },
    actions: {
      handles: ['clickEventOutput', 'focusEventOutput', 'blurEventOutput'],
    },
  },
  decorators: [withActions],
  argTypes: {
    label: {},
    appearance: {
      options: [ButtonAppearance.FILL, ButtonAppearance.OUTLINE, ButtonAppearance.TEXT],
      control: {type: 'inline-radio'},
    },
    size: {
      options: [ButtonSize.LARGE, ButtonSize.MEDIUM, ButtonSize.SMALL],
      control: {type: 'inline-radio'},
    },
    disabled: {
      options: [true, false],
    },
    isDestructive: {
      options: [true, false],
    },
    isLoading: {
      options: [true, false],
    },
    iconConfig: {},
    iconPosition: {
      options: [IconPosition.LEFT, IconPosition.RIGHT],
      control: {type: 'inline-radio'},
    },
    focusInverse: {
      options: [true, false],
    },
    dataTrackingId: {},
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    label: 'Hello World',
    appearance: ButtonAppearance.FILL,
    size: ButtonSize.LARGE,
    disabled: false,
    isDestructive: false,
    isLoading: false,
    focusInverse: false,
    dataTrackingId: undefined,
  },
  parameters: {
    docs: {
      source: {
        code: '<atp-button label="Hello World" appearance="fill" size="large" color="primary"></atp-button>',
      },
    },
  },
};

export const Icon: Story = {
  args: {
    label: 'Hello World',
    appearance: ButtonAppearance.FILL,
    size: ButtonSize.LARGE,
    disabled: false,
    iconPosition: IconPosition.RIGHT,
    isLoading: false,
    iconConfig: {
      icon: 'add',
      height: 16,
    },
    focusInverse: false,
    dataTrackingId: undefined,
  },
  parameters: {
    docs: {
      source: {
        code: '<atp-button label="Hello World" appearance="fill" size="ButtonSize.LARGE"></atp-button>',
      },
    },
  },
};

export const IconClickable: Story = {
  args: {
    appearance: ButtonAppearance.TEXT,
    size: ButtonSize.LARGE,
    iconConfig: {
      icon: 'add',
      height: 16,
      label: 'Button label',
    },
    iconClickableLight: false,
  },
  parameters: {
    docs: {
      source: {
        code: `<atp-button .iconConfig="{icon: 'add', height: 16, label: 'Button label'}" appearance="ButtonAppearance.TEXT"></atp-button>`,
      },
    },
  },
  render: (args) => html` <div
    style="display: flex; justify-content: center; align-items:center; inline-size: 60px; block-size: 60px;  gap: var(--atp-space-xs); background-color:${args[
      'iconClickableLight'
    ]
      ? 'black'
      : 'white'}"
  >
    <atp-button
      .iconConfig="${args['iconConfig']}"
      .appearance="${args['appearance']}"
      .iconClickableLight="${args['iconClickableLight']}"
    ></atp-button>
  </div>`,
};

export const Slot: Story = {
  args: {
    label: 'Hello World',
    appearance: ButtonAppearance.FILL,
    size: ButtonSize.LARGE,
    disabled: false,
    isDestructive: false,
    isLoading: false,
    focusInverse: false,
    dataTrackingId: undefined,
  },
  render: (args) => html`
    <atp-button
      .label=${args['label']}
      .appearance=${args['appearance']}
      .size=${args['size']}
      .isDestructive=${args['isDestructive']}
      .isLoading=${args['isLoading']}
      color="primary"
      ><span>
        with slot
        <em>contents</em>
        <span class="visually-hidden">including visually hidden text</span>
      </span></atp-button
    >
  `,
  parameters: {
    docs: {
      source: {
        code: `
          <atp-button label="Hello World" appearance="fill" size="large" color="primary">
            <span>
              with slot
              <em>contents</em>
              <span class="visually-hidden">including visually hidden text</span>
            </span>
          </atp-button>
        `,
      },
    },
  },
};

export const FocusInverse: Story = {
  args: {
    label: 'Hello World',
    appearance: ButtonAppearance.FILL,
    size: ButtonSize.LARGE,
    disabled: false,
    focusInverse: true,
    dataTrackingId: undefined,
  },
  render: (args) => html`
    <div
      style="background: var(--atp-slate-1000); padding: var(--atp-space-l); color: var(--atp-neutral-100)"
    >
      <p>
        When using the keyboard to move focus to this Button, its focus indicator will be inverted,
        so that it is white instead of blue.
      </p>
      <p>Use this feature when a Button is on a dark background.</p>
      <p>
        <atp-button
          .label=${args['label']}
          .appearance=${args['appearance']}
          .size=${args['size']}
          .disabled=${args['disabled']}
          .focusInverse=${args['focusInverse']}
        ></atp-button>
      </p>
    </div>
  `,
  parameters: {
    docs: {
      source: {
        code: '<atp-button label="Hello World" appearance="fill" size="large" color="primary" focusInverse="true"></atp-button>',
      },
    },
  },
};

export const DataTrackingId: Story = {
  args: {
    label: 'Hello World',
    appearance: ButtonAppearance.FILL,
    size: ButtonSize.LARGE,
    disabled: false,
    dataTrackingId: 'myTrackingId',
  },
  render: (args) => html`
    <p>
      This Button has a <code>dataTrackingId</code> prop on it, so the underlying
      <code>&lt;button&gt;</code> tag will have a <code>data-tracking-id</code> prop with a matching
      value.
    </p>
    <p>
      <atp-button
        .label=${args['label']}
        .appearance=${args['appearance']}
        .size=${args['size']}
        .disabled=${args['disabled']}
        .dataTrackingId=${args['dataTrackingId']}
      ></atp-button>
    </p>
  `,
  parameters: {
    docs: {
      source: {
        code: '<atp-button label="Hello World" appearance="fill" size="large" color="primary" dataTrackingId="myTrackingId"></atp-button>',
      },
    },
  },
};
