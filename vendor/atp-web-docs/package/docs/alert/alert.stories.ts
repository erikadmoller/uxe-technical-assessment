import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {withActions} from 'storybook/actions/decorator';
import './alert';
import '../icon/icon';
import '../button/button';
import {html} from 'lit';
import {AlertAppearance, AlertColor} from './alert';
import {TextButtonColor} from './alert-button/alert-button';

const meta: Meta = {
  component: 'atp-alert',
  title: 'Components/Alert',
  tags: ['autodocs'],
  parameters: {
    docs: {
      component: 'Alert Element',
    },
    actions: {
      handles: ['closeEventOutput'],
    },
  },
  decorators: [withActions],

  argTypes: {
    appearance: {
      table: {disable: true},
      options: [
        AlertAppearance.FULL,
        AlertAppearance.PAGE,
        AlertAppearance.EXPANDABLE,
        AlertAppearance.TOAST,
      ],
      control: {type: 'inline-radio'},
    },
    label: {},
    color: {
      options: [AlertColor.INFO, AlertColor.DANGER, AlertColor.WARNING],
      control: {type: 'inline-radio'},
    },
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    icon: 'help',
    label: 'Test Alert',
    appearance: AlertAppearance.PAGE,
    color: AlertColor.INFO,
  },
  render: ({icon, label, appearance, color}) =>
    html`
      <atp-alert .icon=${icon} .label=${label} .appearance=${appearance} .color=${color}>
        <atp-alert-button appearance="text" label="Learn more" slot="button"></atp-alert-button>
      </atp-alert>
    `,
  parameters: {
    docs: {
      source: {
        code: `<atp-alert
        icon="icon"
        label="label"
        appearance="appearance"
        color="color"
      >
        <atp-alert-button appearance="text" label="Learn more" slot="button"></atp-alert-button>
      </atp-alert>`,
      },
    },
  },
};

export const TopLevelBanner: Story = {
  args: {
    icon: '',
    label: 'Your profile will be reviewed within 24 hours.',
    appearance: AlertAppearance.FULL,
    color: AlertColor.INFO,
  },
  render: ({icon, label, appearance, color}) =>
    html`
      <atp-alert .icon=${icon} .label=${label} .appearance=${appearance} .color=${color}>
        <atp-alert-button
          .iconConfig="${{icon: 'chevron-right', height: 12}}"
          appearance="text"
          size="small"
          .textButtonColor=${TextButtonColor.LIGHT}
          label="Learn more"
          slot="button"
        ></atp-alert-button>
      </atp-alert>
    `,
  parameters: {
    docs: {
      source: {
        code: `<atp-alert .icon=\${icon} .label=\${label} .appearance=\${appearance} .color=\${color}>
        <atp-alert-button
          .iconConfig="\${{icon: 'chevron-right', height: 12}}"
          appearance="text"
          size="small"
          .textButtonColor=\${TextButtonColor.LIGHT}
          label="Learn more"
          slot="button"
        ></atp-alert-button>
      </atp-alert>`,
      },
    },
  },
};

export const PageLevelBanner: Story = {
  args: {
    icon: 'circle-info',
    label: 'Your profile will be reviewed within 24 hours.',
    appearance: AlertAppearance.PAGE,
    color: AlertColor.INFO,
  },
  render: ({icon, label, appearance, color}) =>
    html`
      <atp-alert .icon=${icon} .label=${label} .appearance=${appearance} .color=${color}>
        <atp-alert-button
          .textButtonColor=${TextButtonColor.DARK}
          appearance="text"
          label="Learn more"
          slot="button"
        ></atp-alert-button>
      </atp-alert>
    `,
  parameters: {
    docs: {
      source: {
        code: `<atp-alert .icon=\${icon} .label=\${label} .appearance=\${appearance} .color=\${color}>
        <atp-alert-button
          .textButtonColor=\${TextButtonColor.DARK}
          appearance="text"
          label="Learn more"
          slot="button"
        ></atp-alert-button>
      </atp-alert>`,
      },
    },
  },
};

export const ExpandablePageLevelBanner: Story = {
  args: {
    label: 'Your profile will be reviewed within 24 hours.',
    appearance: AlertAppearance.EXPANDABLE,
    color: AlertColor.INFO,
  },
  render: ({icon, label, appearance, color}) =>
    html`
      <style>
        .slot-content {
          color: var(--atp-button-primary-medium-enabled);
          font-family: var(--atpco-font-family);
          font-size: var(--atp-font-size-body-s);
          font-weight: var(--atp-font-weight-regular);
          line-height: var(--atp-line-height-body-s);
          padding-left: calc(var(--atp-space-l) + 3px);
          li {
            margin-bottom: var(--atp-space-xs);
          }
        }
      </style>
      <atp-alert .icon=${icon} .label=${label} .appearance=${appearance} .color=${color}>
        <ul class="slot-content" slot="content">
          ${Array(10)
            .fill(0)
            .map((e, i) => html`<li>Projected content - item ${i}</li>`)}
        </ul>
      </atp-alert>
    `,
  parameters: {
    docs: {
      source: {
        code: `<atp-alert
        icon="icon"
        label="label"
        appearance="appearance"
        color="color"
      >
        <div slot="content"> <!-- Projected content --></div>
      </atp-alert>`,
      },
    },
  },
};

export const Toast: Story = {
  args: {
    icon: 'circle-check',
    label: 'Lorem ipsum dolor sit amet',
    appearance: AlertAppearance.TOAST,
    color: AlertColor.INFO,
  },
  render: ({icon, label, appearance, color}) =>
    html`
      <atp-alert
        style="max-width: 500px; display: block"
        .icon=${icon}
        .label=${label}
        .appearance=${appearance}
        .color=${color}
      >
        <atp-alert-button
          size="medium"
          label="Learn more"
          slot="button"
          focusInverse="true"
        ></atp-alert-button>
      </atp-alert>
    `,
  parameters: {
    docs: {
      source: {
        code: `<atp-alert
        style="max-width: 500px; display: block"
        icon="icon"
        label="label"
        appearance="appearance"
        color="color"
      >
        <atp-alert-button size="medium" label="Learn more" focusInverse="true" slot="button"></atp-alert-button>
        </atp-alert>`,
      },
    },
  },
};
