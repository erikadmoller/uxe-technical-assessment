import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {withActions} from 'storybook/actions/decorator';

import {html} from 'lit';

const meta: Meta = {
  component: 'atp-dl',
  title: 'Components/ListWithVerticalDividers',

  parameters: {
    docs: {
      component: 'List With Vertical Dividers Element',
    },
  },
  decorators: [withActions],
  argTypes: {},
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () => html`
    <h3>As <code>ul</code> tag:</h3>
    <ul class="atp-list-with-vertical-dividers">
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>

    <h3 style="margin-top: var(--atp-space-l)">As <code>dl</code> tag:</h3>
    <dl class="atp-list-with-vertical-dividers">
      <dt>Description Term 1</dt>
      <dd>Detail 1</dd>
      <dt>Description Term 2</dt>
      <dd>Detail 2</dd>
    </dl>

    <h3 style="margin-top: var(--atp-space-l)">Nested inside a Description List component:</h3>
    <dl class="atp-dl">
      <dt>Term 1</dt>
      <dd>
        <ul class="atp-list-with-vertical-dividers">
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </dd>
      <dt>Term 2</dt>
      <dd>
        <ul class="atp-list-with-vertical-dividers">
          <li><span class="atp-color-medium">Connector for</span> LI 1</li>
          <li><span class="atp-color-medium">Connector for</span> LI 2</li>
        </ul>
      </dd>
      <dt>Term 3</dt>
      <dd>
        <dl class="atp-list-with-vertical-dividers">
          <dt><span class="atp-color-medium">Connector is</span></dt>
          <dd>DD 1</dd>
          <dt><span class="atp-color-medium">Connector is</span></dt>
          <dd>DD 2</dd>
        </dl>
      </dd>
      <dt>Term 4</dt>
      <dd>Details that are not a list</dd>
    </dl>
  `,
  parameters: {
    docs: {
      source: {
        code: `
          <ul class="atp-list-with-vertical-dividers">
            <li>Detail 1</li>
            <li>Detail 2</li>
            <li>Detail 3</li>
          </ul>

          <dl class="atp-list-with-vertical-dividers">
            <dt>Description term 1</dt>
            <dd>Description detail 1</dd>
            <dt>Description term 2</dt>
            <dd>Description detail 2</dd>
          </dl>
        `,
      },
    },
  },
};
