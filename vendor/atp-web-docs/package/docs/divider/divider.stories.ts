import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {withActions} from 'storybook/actions/decorator';

import {html} from 'lit';

import {DividerOrientation} from './divider';
import './divider';

const meta: Meta = {
  component: 'atp-divider',
  title: 'Components/Divider',
  tags: ['autodocs'],
  parameters: {
    docs: {
      component: 'HR Element',
    },
  },
  decorators: [withActions],
  argTypes: {
    orientation: {
      options: [DividerOrientation.HORIZONTAL, DividerOrientation.VERTICAL],
    },
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  parameters: {
    docs: {
      source: {
        code: '<atp-divider />',
      },
    },
  },
};

export const Vertical: Story = {
  args: {
    orientation: DividerOrientation.VERTICAL,
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: var(--atp-space-xs)">
      <div>
        <p>
          This paragraph is followed by a vertical divider. Lacking any context for height, the
          divider renders 0px tall.
        </p>
        <atp-divider orientation="vertical"></atp-divider>
      </div>
      <div style="display: flex; gap: var(--atp-space-xs)">
        <p>
          This paragraph is in a flex row next to a divider. The divider renders as tall as the
          text:
        </p>
        <atp-divider orientation="vertical"></atp-divider>
      </div>

      <div style="display: flex; gap: var(--atp-space-xs)">
        <p style="height: 300px">
          This paragraph is 300px tall, so the divider can show how it grows to match:
        </p>
        <atp-divider orientation="vertical"></atp-divider>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      source: {
        code: '<atp-divider orientation="vertical" />',
      },
    },
  },
};
