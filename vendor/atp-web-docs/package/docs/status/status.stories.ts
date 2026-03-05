import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {withActions} from 'storybook/actions/decorator';
import {html} from 'lit';
import './status';
import {StatusColor, StatusSize} from './status';

const meta: Meta = {
  component: 'atp-status',
  title: 'Components/Status',
  tags: ['autodocs'],
  parameters: {
    docs: {
      component: 'Status',
    },
    actions: {
      handles: [],
    },
  },
  decorators: [withActions],
  argTypes: {
    color: {
      options: [StatusColor.SUCCESS, StatusColor.INFO, StatusColor.WARNING, StatusColor.DANGER],
      control: {type: 'inline-radio'},
    },
    size: {
      options: [StatusSize.M, StatusSize.L],
      control: {type: 'inline-radio'},
    },
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    label: 'Active',
    color: StatusColor.SUCCESS,
    size: StatusSize.M,
  },
  render: ({label, color, size}) =>
    html`<atp-status .label="${label}" .size="${size}" .color="${color}"></atp-status>`,
  parameters: {
    docs: {
      source: {
        code: `
        <!-- Implementation in an Angular context --> 
        <atp-status label="Hello World" [size]="StatusSize.M" [color]="StatusColor.success"></atp-status>`,
      },
    },
  },
};

export const ProjectedContent: Story = {
  args: {
    label: 'Upload error',
    color: StatusColor.DANGER,
    size: StatusSize.M,
  },
  render: ({label, color, size}) =>
    html`<atp-status .label="${label}" .size="${size}" .color="${color}">
      <span style="font-size: var(--atp-font-size-body-xs)">Server unresponsive</span>
    </atp-status>`,
  parameters: {
    docs: {
      source: {
        code: `
        <!-- Implementation in an Angular context --> 
        <atp-status label="Upload error" [size]="StatusSize.M" [color]="StatusColor.success">
          <span style="font-size: var(--atp-font-size-body-xs)">Server unresponsive</span>
        </atp-status>`,
      },
    },
  },
};
