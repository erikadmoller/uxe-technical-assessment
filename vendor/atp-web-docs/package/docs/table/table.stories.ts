import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {withActions} from 'storybook/actions/decorator';

import {html} from 'lit';

const meta: Meta = {
  component: 'atp-table',
  title: 'Components/Table',
  parameters: {
    docs: {
      component: 'Table Element',
    },
  },
  decorators: [withActions],
  argTypes: {},
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: var(--atp-space-xl)">
      <table class="atp-table">
        <caption>
          Table caption
        </caption>
        <thead>
          <tr>
            <th>One</th>
            <th>Two</th>
            <th>Three</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>One</td>
            <td>Two</td>
            <td>Three</td>
          </tr>
          <tr>
            <td>One</td>
            <td>Two</td>
            <td>Three</td>
          </tr>
        </tbody>
      </table>

      <table class="atp-table">
        <caption>
          <h3>Table caption with an h3 tag in its caption</h3>
        </caption>
        <thead>
          <tr>
            <th>One</th>
            <th>Two</th>
            <th>Three</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>One</td>
            <td>Two</td>
            <td>Three</td>
          </tr>
          <tr>
            <td>One</td>
            <td>Two</td>
            <td>Three</td>
          </tr>
        </tbody>
      </table>

      <table class="atp-table">
        <caption>
          Table using row headers instead of column headers
        </caption>
        <tbody>
          <tr>
            <th scope="row">One</th>
            <td>Two</td>
            <td>Three</td>
          </tr>
          <tr>
            <th scope="row">One</th>
            <td>Two</td>
            <td>Three</td>
          </tr>
        </tbody>
      </table>

      <table class="atp-table">
        <caption>
          Table with tfoot element
        </caption>
        <thead>
          <tr>
            <th>One</th>
            <th>Two</th>
            <th>Three</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>One</td>
            <td>Two</td>
            <td>Three</td>
          </tr>
          <tr>
            <td>One</td>
            <td>Two</td>
            <td>Three</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>Footer One</td>
            <td>Footer Two</td>
            <td>Footer Three</td>
          </tr>
        </tfoot>
      </table>

      <table class="atp-table">
        <thead>
          <tr>
            <th>Table with no caption</th>
            <th>Two</th>
            <th>Three</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>One</td>
            <td>Two</td>
            <td>Three</td>
          </tr>
          <tr>
            <td>One</td>
            <td>Two</td>
            <td>Three</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  parameters: {
    docs: {
      source: {
        code: `<table class="atp-table">`,
      },
    },
  },
};

export const Borders: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: var(--atp-space-xl)">
      <table class="atp-table atp-table--borderless">
        <caption>
          Borderless
        </caption>
        <thead>
          <tr>
            <th>One</th>
            <th>Two</th>
            <th>Three</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>One</td>
            <td>Two</td>
            <td>Three</td>
          </tr>
          <tr>
            <td>One</td>
            <td>Two</td>
            <td>Three</td>
          </tr>
        </tbody>
      </table>

      <table class="atp-table atp-table--outer-border">
        <caption>
          Outer border
        </caption>
        <thead>
          <tr>
            <th>One</th>
            <th>Two</th>
            <th>Three</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>One</td>
            <td>Two</td>
            <td>Three</td>
          </tr>
          <tr>
            <td>One</td>
            <td>Two</td>
            <td>Three</td>
          </tr>
        </tbody>
      </table>

      <table class="atp-table atp-table--inner-borders">
        <caption>
          Inner borders
        </caption>
        <thead>
          <tr>
            <th>One</th>
            <th>Two</th>
            <th>Three</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>One</td>
            <td>Two</td>
            <td>Three</td>
          </tr>
          <tr>
            <td>One</td>
            <td>Two</td>
            <td>Three</td>
          </tr>
        </tbody>
      </table>

      <table class="atp-table atp-table--inner-borders">
        <caption>
          Inner borders using row headers instead of column headers
        </caption>
        <tbody>
          <tr>
            <th scope="row">One</th>
            <td>Two</td>
            <td>Three</td>
          </tr>
          <tr>
            <th scope="row">One</th>
            <td>Two</td>
            <td>Three</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  parameters: {
    docs: {
      source: {
        code: `
        <table class="atp-table atp-table--borderless">

        <table class="atp-table atp-table--outer-border">
        
        <table class="atp-table atp-table--inner-borders">
        `,
      },
    },
  },
};

export const HeaderFill: Story = {
  render: () => html`
    <table class="atp-table atp-table--header-fill-light-slate">
      <caption>
        Header fill light-slate
      </caption>
      <thead>
        <tr>
          <th>One</th>
          <th>Two</th>
          <th>Three</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>One</td>
          <td>Two</td>
          <td>Three</td>
        </tr>
        <tr>
          <td>One</td>
          <td>Two</td>
          <td>Three</td>
        </tr>
      </tbody>
    </table>
  `,
  parameters: {
    docs: {
      source: {
        code: '<table class="atp-table atp-table--header-fill-light-slate">\n',
      },
    },
  },
};

export const CellAlignment: Story = {
  render: () => html`
    <table class="atp-table atp-table">
      <caption>
        Cell alignment
      </caption>
      <thead>
        <tr>
          <th class="atp-table-cell--start">Start alignment</th>
          <th class="atp-table-cell--center">Center alignment</th>
          <th class="atp-table-cell--end">End aligment</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Content for one</td>
          <td>Two</td>
          <td class="atp-table-cell--nowrap">
            A cell with the nowrap option, so the text will not wrap to the next line, but will
            always stay on one line, even if it gets to be too long. Like, way, way, too long. Like
            ridiculousy long, enough that you should really consider using the scroll container
            feature with it.
          </td>
        </tr>
      </tbody>
    </table>
  `,
  parameters: {
    docs: {
      source: {
        code: `
          <th class="atp-table-cell--start">Start alignment</th>

          <th class="atp-table-cell--center">Center alignment</th>

          <th class="atp-table-cell--end">End alignment</th>
          
          <td class="atp-table-cell--nowrap">Nowrap cell</td>
        `,
      },
    },
  },
};

export const Description: Story = {
  render: () => html`
    <table class="atp-table atp-table--description">
      <caption>
        "Description" table
      </caption>
      <thead>
        <tr>
          <th>One</th>
          <th>Two</th>
          <th>Three</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>One</td>
          <td>Two</td>
          <td>Three</td>
        </tr>
        <tr>
          <td>One</td>
          <td>Two</td>
          <td>Three</td>
        </tr>
      </tbody>
    </table>
  `,
  parameters: {
    docs: {
      source: {
        code: `
        <table class="atp-table atp-table--description">
        `,
      },
    },
  },
};

export const ScrollContainer: Story = {
  render: () => html`
    <h3 class="atp-table-caption" id="myTableCaption">With scroll container</h3>
    <div class="atp-table-scroll-container" tabindex="0">
      <table class="atp-table" aria-describedby="myTableCaption">
        <thead>
          <tr>
            <th>One</th>
            <th>Two</th>
            <th>Three</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">One</th>
            <td>Two</td>
            <td>Three</td>
          </tr>
          <tr>
            <th scope="row">One</th>
            <td>Two</td>
            <td>Three</td>
          </tr>
          <tr>
            <th scope="row">One</th>
            <td>Two</td>
            <td class="atp-table-cell--nowrap">
              Oh my god, Becky, look at that table cell. It is so big, ugh. It looks like one of
              those nowrap guys' tables, but ugh, you know, who understands those nowrap guys? They
              only use it because it looks like a total spreadsheet, okay?
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  parameters: {
    docs: {
      source: {
        code: `
<h3 class="atp-table-caption" id="myTableCaption">My caption</h3>
<div class="atp-table-scroll-container" tabindex="0">
  <table class="atp-table" aria-describedby="myTableCaption">
    [etc]
  </table>
</div>
        `,
      },
    },
  },
};
