import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';

const meta: Meta = {
  component: 'Space',
  title: 'Foundations/Space',
  parameters: {
    docs: {
      component: 'Space',
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
        display: flex;
        flex-direction: column;
        background: repeating-conic-gradient(var(--atp-element-fill-primary-medium-enabled) 0 25%, transparent 0 50%) 
          50% / 16px 16px;
        border-radius: var(--atp-border-radius-m);
        overflow: hidden;
      }

      .boundary {
        padding: var(--atp-space-xs);
        background: var( --atp-element-fill-primary-strong-enabled);
        color: var(--atp-content-inverse-medium-enabled);
      }
    </style>

    <div class="atp-display-flex atp-flex-direction-column atp-gap-l">
      <div class="example" style="gap: var(--atp-space-xxxs)">
        <div class="boundary">Space XXXS (<code>--atp-space-xxxs</code>)</div>
        <div class="boundary"></div>
      </div>

      <div class="example" style="gap: var(--atp-space-xxs)">
        <div class="boundary">Space XXS (<code>--atp-space-xxs</code>)</div>
        <div class="boundary"></div>
      </div>

      <div class="example" style="gap: var(--atp-space-xs)">
        <div class="boundary">Space XS (<code>--atp-space-xs</code>)</div>
        <div class="boundary"></div>
      </div>

      <div class="example" style="gap: var(--atp-space-s)">
        <div class="boundary">Space S (<code>--atp-space-s</code>)</div>
        <div class="boundary"></div>
      </div>

      <div class="example" style="gap: var(--atp-space-m)">
        <div class="boundary">
          Space M (<code>--atp-space-m</code>)</div>
          <div class="boundary"></div>
        </div>

        <div class="example" style="gap: var(--atp-space-l)">
          <div class="boundary">Space L (<code>--atp-space-l</code>)</div>
          <div class="boundary"></div>
        </div>

        <div class="example" style="gap: var(--atp-space-xl)">
          <div class="boundary">Space XL (<code>--atp-space-xl</code>)</div>
          <div class="boundary"></div>
        </div>
      </div>
    </div>
  `,
};
