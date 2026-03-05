import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {withActions} from 'storybook/actions/decorator';
import {html} from 'lit';
import './alert-button';

const meta: Meta = {
  component: 'atp-alert-button',
  title: 'Components/Alert/AlertButton',
  tags: ['autodocs'],
  parameters: {
    docs: {
      component: 'AlertButton',
    },
    actions: {
      handles: [],
    },
  },
  decorators: [withActions],
  argTypes: {},
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    label: 'Hello world',
  },
  render: ({label}) => html`<atp-alert-button .label="${label}"></atp-alert-button>`,
  parameters: {
    docs: {
      source: {
        code: '<atp-alert-button label="Hello World"></atp-alert-button>',
      },
    },
  },
};
