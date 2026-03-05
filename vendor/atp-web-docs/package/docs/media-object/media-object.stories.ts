import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {withActions} from 'storybook/actions/decorator';
import {html} from 'lit';
import './media-object';
import {MediaObjectColor} from './media-object';

const meta: Meta = {
  component: 'atp-media-object',
  title: 'Components/MediaObject',
  tags: ['autodocs'],
  parameters: {
    docs: {
      component: 'MediaObject',
    },
    actions: {
      handles: [],
    },
  },
  decorators: [withActions],
  argTypes: {
    color: {
      options: [
        MediaObjectColor.BLUE,
        MediaObjectColor.GREEN,
        MediaObjectColor.PURPLE,
        MediaObjectColor.RED,
        MediaObjectColor.SLATE,
      ],
      control: {type: 'inline-radio'},
    },
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    iconText: 'KD',
    icon: {},
    label: 'Example label',
    subtitle: 'This is an example subtitle',
    color: MediaObjectColor.RED,
  },
  render: ({iconText, icon, label, subtitle, color}) => html`<atp-media-object
    .iconText=${iconText}
    .icon=${icon}
    .label=${label}
    .subtitle=${subtitle}
    .color=${color}
  ></atp-media-object>`,
  parameters: {
    docs: {
      source: {
        code: `
        <atp-media-object
          iconText="IT"
          label="my label"
          subtitle="my subtitle"
        >
        </atp-media-object>
        `,
      },
    },
  },
};

export const WithIcon: Story = {
  args: {
    iconText: '',
    icon: {icon: 'user', color: 'white', height: 16},
    label: 'Example label',
    subtitle: 'This is an example subtitle',
    color: MediaObjectColor.RED,
  },
  render: ({iconText, icon, label, subtitle, color}) => html`<atp-media-object
    .iconText=${iconText}
    .icon=${icon}
    .label=${label}
    .subtitle=${subtitle}
    .color=${color}
  ></atp-media-object>`,
  parameters: {
    docs: {
      source: {
        code: '<atp-media-object></atp-media-object>',
      },
    },
  },
};
