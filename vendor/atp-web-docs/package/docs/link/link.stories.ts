import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {withActions} from 'storybook/actions/decorator';

import {html} from 'lit';

const meta: Meta = {
  component: 'atp-link',
  title: 'Components/Link',

  parameters: {
    docs: {
      component: 'Link Element',
    },
  },
  decorators: [withActions],
  argTypes: {},
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () => html` <a href="#">default link</a> `,
  parameters: {
    docs: {
      source: {
        code: `
        <a href="#">default link</a>
        `,
      },
    },
  },
};

export const Inverse: Story = {
  render: () => html`
    <div style="background-color: var(--atp-slate-900); padding: 1rem;">
      <a href="#" class="atp-link--inverse">inverse</a>
    </div>
  `,
  parameters: {
    docs: {
      source: {
        code: `
        <a href="#" class="atp-link--inverse">inverse</a>
        `,
      },
    },
  },
};

export const Minimal: Story = {
  render: () => html` <a href="#" class="atp-link--minimal">minimal</a> `,
  parameters: {
    docs: {
      source: {
        code: `
        <a href="#" class="atp-link--minimal">minimal</a>
        `,
      },
    },
  },
};
