import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {withActions} from 'storybook/actions/decorator';

import {html} from 'lit';

const meta: Meta = {
  component: 'atp-dl',
  title: 'Components/DescriptionList',

  parameters: {
    docs: {
      component: 'Description List (DL) Element',
    },
  },
  decorators: [withActions],
  argTypes: {},
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: var(--atp-space-l);">
      <dl class="atp-dl">
        <dt>Term 1</dt>
        <dd>Description for term 1</dd>
        <dt>Term 2</dt>
        <dd>Description for term 2</dd>
        <dt>Term 3</dt>
        <dd>Description for term 3</dd>
        <dt>Term 4</dt>
        <dd>Description for term 4</dd>
        <dt>Term 5</dt>
        <dd>Description for term 5</dd>
      </dl>

      <atp-card>
        <atp-card-header slot="header">
          <h2>Shown inside a card</h2>
        </atp-card-header>
        <dl class="atp-dl">
          <dt>Term 1</dt>
          <dd>Description for term 1</dd>
          <dt>Term 2</dt>
          <dd>Description for term 2</dd>
          <dt>Term 3</dt>
          <dd>Description for term 3</dd>
          <dt>Term 4</dt>
          <dd>Description for term 4</dd>
          <dt>Term 5</dt>
          <dd>Description for term 5</dd>
        </dl>
      </atp-card>

      <atp-card>
        <atp-card-header divider slot="header">
          <h2>Shown using "borderless", inside a card with Card dividers</h2>
        </atp-card-header>
        <dl class="atp-dl atp-dl--borderless">
          <dt>Term 1</dt>
          <dd>Description for term 1</dd>
          <dt>Term 2</dt>
          <dd>Description for term 2</dd>
          <dt>Term 3</dt>
          <dd>Description for term 3</dd>
          <dt>Term 4</dt>
          <dd>Description for term 4</dd>
          <dt>Term 5</dt>
          <dd>Description for term 5</dd>
        </dl>
      </atp-card>
    </div>
  `,
  parameters: {
    docs: {
      source: {
        code: `
        <dl class="atp-dl">
          <dt>Term 1</dt>
          <dd>Description for term 1</dd>
          <dt>Term 2</dt>
          <dd>Description for term 2</dd>
        </dl>
        `,
      },
    },
  },
};

export const TagsAndConnectors: Story = {
  render: () => html`
    <dl class="atp-dl">
      <dt>Term</dt>
      <dd>
        <span>
          <span class="atp-color-medium">Connector</span>
          for details
        </span>
      </dd>
      <dt>
        Passenger type
        <atp-tag label="Industry standard" appearance="outline" size="small"></atp-tag>
      </dt>
      <dd>
        Government contract passenger,
        <br />
        Government employee dependent
      </dd>
      <dt>Credit card</dt>
      <dd>
        <span class="atp-color-medium">BIN is</span>
        4273
      </dd>
    </dl>
  `,
  parameters: {
    docs: {
      source: {
        code: `
        <dl class="atp-dl">
          <dt>
            Term
            <atp-tag label="Tag label" appearance="outline" size="small"></atp-tag>
          </dt>
          <dd>
            Details
          </dd>
          <dt>
            Term
          </dt>
          <dd>
            <span class="atp-color-medium">Connector for</span>
            details
          </dd>
        </dl>
        `,
      },
    },
  },
};
TagsAndConnectors.storyName = 'Tags and Connectors';

export const NestedListInsideDetails: Story = {
  render: () => html`
    <dl class="atp-dl">
      <dt>Term 1</dt>
      <dd>
        <ul class="atp-list-with-vertical-dividers">
          <li>Detail 1</li>
          <li>Detail 2</li>
          <li>Detail 3</li>
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
          <dd>DD 1</li>
          <dt><span class="atp-color-medium">Connector is</span></dt>
          <dd>DD 2</li>
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
        <dl class="atp-dl">
          <dt>
            Term 1
          </dt>
          <dd>
            <ul class="atp-list-with-vertical-dividers">
              <li>Detail 1</li>
              <li>Detail 2</li>
              <li>Detail 3</li>
            </ul>
          </dd>
        </dl>
        `,
      },
    },
  },
};

export const CustomWidth: Story = {
  render: () => html`
    <dl class="atp-dl" style="--atp-dl-dt-width: 200px">
      <dt>Term 1</dt>
      <dd>Description for term 1</dd>
      <dt>Term 2</dt>
      <dd>Description for term 2</dd>
      <dt>Term 3</dt>
      <dd>Description for term 3</dd>
      <dt>Term 4</dt>
      <dd>Description for term 4</dd>
      <dt>Term 5</dt>
      <dd>Description for term 5</dd>
    </dl>
  `,
  parameters: {
    docs: {
      source: {
        code: `
        <dl class="atp-dl" style="--atp-dl-dt-width: 200px">
          <dt>Term 1</dt>
          <dd>Description for term 1</dd>
          <dt>Term 2</dt>
          <dd>Description for term 2</dd>
        </dl>
        `,
      },
    },
  },
};

export const Borderless: Story = {
  render: () => html`
    <dl class="atp-dl atp-dl--borderless">
      <dt>Term 1</dt>
      <dd>Description for term 1</dd>
      <dt>Term 2</dt>
      <dd>Description for term 2</dd>
      <dt>Term 3</dt>
      <dd>Description for term 3</dd>
      <dt>Term 4</dt>
      <dd>Description for term 4</dd>
      <dt>Term 5</dt>
      <dd>Description for term 5</dd>
    </dl>
  `,
  parameters: {
    docs: {
      source: {
        code: `
        <dl class="atp-dl atp-dl--borderless">
           [etc.]
        </dl>
        `,
      },
    },
  },
};

export const WithDescriptionTable: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: var(--atp-space-l); max-width: 600px;">
      <atp-card>
        <atp-card-header slot="header">
          <h2>Details List inside a card</h2>
        </atp-card-header>
        <dl class="atp-dl">
          <dt>Term 1</dt>
          <dd>Description for term 1</dd>
          <dt>Term 2</dt>
          <dd>Description for term 2</dd>
          <dt>Term 3</dt>
          <dd>Description for term 3</dd>
          <dt>Term 4</dt>
          <dd>Description for term 4</dd>
          <dt>Term 5</dt>
          <dd>Description for term 5</dd>
        </dl>
      </atp-card>

      <atp-card>
        <atp-card-header slot="header">
          <h2>Description Table inside a card</h2>
        </atp-card-header>
        <table class="atp-table atp-table--description">
          <thead>
            <tr>
              <th>LOC 1</th>
              <th>LOC 2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Detail 1</td>
              <td>Detail 1</td>
            </tr>
            <tr>
              <td>Detail 2</td>
              <td>
                Detail 2 <br />
                is especially <br />
                tall.
              </td>
            </tr>
            <tr>
              <td>Detail 3</td>
              <td>Detail 3</td>
            </tr>
          </tbody>
        </table>
      </atp-card>

      <atp-card>
        <atp-card-header slot="header">
          <h2>Description Table with more cells</h2>
        </atp-card-header>
        <table class="atp-table atp-table--description">
          <thead>
            <tr>
              <th></th>
              <th>LOC 1</th>
              <th>LOC 2</th>
              <th>LOC 3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Row head</th>
              <td>Detail 1</td>
              <td>Detail 1</td>
              <td>Detail 1</td>
            </tr>
            <tr>
              <th scope="row">Row head</th>
              <td>Detail 2</td>
              <td>
                Detail 2 <br />
                is especially <br />
                tall
              </td>
              <td>
                Detail 2 <br />
                is especially <br />
                tall
              </td>
            </tr>
            <tr>
              <th scope="row">Row head</th>
              <td>Detail 3</td>
              <td>Detail 3</td>
              <td>Detail 3</td>
            </tr>
          </tbody>
        </table>
      </atp-card>
    </div>
  `,
  parameters: {
    docs: {
      source: {
        code: `/* This is just a Description List next to a Table that's using the "description" variant */`,
      },
    },
  },
};

export const Indented: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: var(--atp-space-l);">
      <dl class="atp-dl atp-dl-indented">
        <dt>Term 1</dt>
        <dd>Description for term 1</dd>
        <dt>Term 2</dt>
        <dd>Description for term 2</dd>
        <dt>Term 3</dt>
        <dd>Description for term 3</dd>
        <dt>Term 4</dt>
        <dd>Description for term 4</dd>
        <dt>Term 5</dt>
        <dd>Description for term 5</dd>
      </dl>
    </div>
  `,
  parameters: {
    docs: {
      source: {
        code: `/* This is just a Description List next to a Table that's using the "description" variant */`,
      },
    },
  },
};
