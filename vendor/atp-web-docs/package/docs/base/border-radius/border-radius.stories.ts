import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';

const meta: Meta = {
  component: 'Border Radius',
  title: 'Foundations/Border Radius',
  parameters: {
    docs: {
      component: 'Border Radius',
    },
  },

  argTypes: {},
};

export default meta;

type Story = StoryObj;

export const Primary: Story = {
  render: () => html`
    <style>
      .example {
        padding: var(--atp-space-xs);
        background: var(--atp-element-fill-primary-strong-enabled);
        color: var(--atp-content-inverse-medium-enabled);
        border-radius: var(--atp-border-radius-m);
        overflow: hidden;
      }
    </style>

    <div class="atp-display-flex atp-flex-direction-column atp-gap-m">
      <div class="example" style="border-radius: var(--atp-border-radius-s)">
        Border Radius S (<code>--atp-border-radius-s</code>)
      </div>

      <div class="example" style="border-radius: var(--atp-border-radius-m)">
        Border Radius M (<code>--atp-border-radius-m</code>)
      </div>

      <div class="example" style="border-radius: var(--atp-border-radius-xl)">
        Border Radius XL (<code>--atp-border-radius-xl</code>)
      </div>
    </div>
  `,
};
