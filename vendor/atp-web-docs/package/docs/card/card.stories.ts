import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {withActions} from 'storybook/actions/decorator';

import {html} from 'lit';
import './card';
import '../button/button';
import '../icon/icon';
import {CardBorderDecoration, CardColor, CardDensity, CardDivider, CardHeaderFill} from './card';

const meta: Meta = {
  component: 'atp-card',
  title: 'Components/Card',
  tags: ['autodocs'],
  parameters: {
    docs: {
      component: `
        Card is a content container with a visible border. It contains concise information about a single subject.

        Cards can have a header and/or footer, each with an optional divider to separate them from the main content.
        Each header or footer can also contain an action button, such as a menu button that opens a dropdown.
      `,
    },
    actions: {
      handles: ['collapsibleCardToggleEvent'],
    },
  },
  decorators: [withActions],
  argTypes: {
    color: {
      options: [
        CardColor.DEFAULT,
        CardColor.RED,
        CardColor.ORANGE,
        CardColor.GREEN,
        CardColor.BLUE,
        CardColor.PURPLE,
      ],
    },
    headerFill: {
      options: [
        CardHeaderFill.DEFAULT,
        CardHeaderFill.RED,
        CardHeaderFill.ORANGE,
        CardHeaderFill.GREEN,
        CardHeaderFill.BLUE,
        CardHeaderFill.PURPLE,
        CardHeaderFill.LIGHT_SLATE,
      ],
    },
    borderDecoration: {
      options: [CardBorderDecoration.DEFAULT, CardBorderDecoration.START],
    },
    density: {
      options: [CardDensity.DEFAULT, CardDensity.COMPACT],
    },
    divider: {
      options: [CardDivider.DEFAULT, CardDivider.HEADER, CardDivider.FOOTER, CardDivider.BOTH],
    },
    collapsible: {
      options: [true, false],
    },
    open: {
      options: [true, false],
    },
    fullBleed: {
      options: [true, false],
    },
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    color: CardColor.DEFAULT,
    borderDecoration: CardBorderDecoration.DEFAULT,
    density: CardDensity.DEFAULT,
    divider: CardDivider.DEFAULT,
    headerFill: CardHeaderFill.DEFAULT,
    fullBleed: false,
    open: false,
  },
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: var(--atp-space-s)">
      <atp-card
        .color=${args['color']}
        .borderDecoration=${args['borderDecoration']}
        .density=${args['density']}
        .divider=${args['divider']}
        .collapsible=${args['collapsible']}
        .open=${args['open']}
        .headerFill=${args['headerFill']}
        .fullBleed=${args['fullBleed']}
      >
        <atp-card-header slot="header">
          <h2>A header with an <code>&lt;h2&gt;</code> heading</h2>
          <atp-button label="Button"></atp-button>
          <atp-button label="Button2"></atp-button>
        </atp-card-header>
        <p>Here's some content</p>
        <p>and some more content</p>
        <atp-card-footer slot="footer">
          <p>I'm the footer</p>
          <atp-button label="Button"></atp-button>
        </atp-card-footer>
      </atp-card>

      <atp-card
        .color=${args['color']}
        .borderDecoration=${args['borderDecoration']}
        .density=${args['density']}
        .divider=${args['divider']}
        .collapsible=${args['collapsible']}
        .open=${args['open']}
        .headerFill=${args['headerFill']}
        .fullBleed=${args['fullBleed']}
      >
        <atp-card-header slot="header">
          <h4>Using <code>&lt;h4&gt;</code> for the heading</h4>
        </atp-card-header>
        <p>
          This card uses an <code>&lt;h4&gt;</code> for its heading instead, but visually, the
          heading should look the same as for an <code>&lt;h2&gt;</code>. Each card should choose
          the <code>&lt;h*&gt;</code> tag that is appropriate for its semantics, and the visuals
          will remain consistent.
        </p>
        <atp-card-footer slot="footer">I'm the footer</atp-card-footer>
      </atp-card>

      <atp-card
        .color=${args['color']}
        .borderDecoration=${args['borderDecoration']}
        .density=${args['density']}
        .divider=${args['divider']}
        .fullBleed=${args['fullBleed']}
      >
        <p>This card has no header or footer, just regular content.</p>
        <p>This card has no header or footer, just regular content.</p>
        <p>This card has no header or footer, just regular content.</p>
        <p>This card has no header or footer, just regular content.</p>
      </atp-card>

      <div class="atp-display-flex atp-align-items-stretch atp-gap-m">
        <atp-card
          .color=${args['color']}
          .borderDecoration=${args['borderDecoration']}
          .density=${args['density']}
          .fullBleed=${args['fullBleed']}
        >
          <p>Here are two Cards with different heights for their content.</p>
          <p>Each Card is inside a flex container with <code>align-items="stretch"</code>.</p>
          <p>
            This example shows how the cards will be shown with equal heights, because the Card
            component has a natural height of <code>100%</code> set on it, so it will fill the
            available height.
          </p>
        </atp-card>
        <atp-card
          .color=${args['color']}
          .borderDecoration=${args['borderDecoration']}
          .density=${args['density']}
          .fullBleed=${args['fullBleed']}
        >
          <p>This is the second card, which is shorter.</p>
        </atp-card>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      source: {
        code: `
          <atp-card>
            <atp-card-header slot="header">
              <h2>A header with an <code>&lt;h2&gt;</code> heading</h2>
              <atp-button label="Button"></atp-button>
              <atp-button label="Button2"></atp-button>
            </atp-card-header>
            <p>Here's some content</p>
            <p>and some more content</p>
            <atp-card-footer slot="footer">
              <p>I'm the footer</p>
              <atp-button label="Button"></atp-button>
            </atp-card-footer>
          </atp-card>
        `,
      },
    },
  },
};

export const Dividers: Story = {
  args: {
    color: CardColor.DEFAULT,
    borderDecoration: CardBorderDecoration.DEFAULT,
    density: CardDensity.DEFAULT,
    collapsible: false,
    divider: CardDivider.BOTH,
    headerFill: CardHeaderFill.DEFAULT,
    fullBleed: false,
  },
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: var(--atp-space-s)">
      <atp-card
        .color=${args['color']}
        .borderDecoration=${args['borderDecoration']}
        .density=${args['density']}
        .divider=${args['divider']}
        .collapsible=${args['collapsible']}
        .headerFill=${args['headerFill']}
        .fullBleed=${args['fullBleed']}
      >
        <atp-card-header slot="header">
          <h3>Using dividers</h3>
        </atp-card-header>
        <p>
          Adding the <code>divider</code> attribute to the header or footer will draw a visible
          divider.
        </p>
        <atp-card-footer slot="footer">I'm the footer</atp-card-footer>
      </atp-card>

      <atp-card
        .color=${args['color']}
        .borderDecoration=${args['borderDecoration']}
        .density=${args['density']}
        divider=${CardDivider.HEADER}
        .collapsible=${args['collapsible']}
        .headerFill=${args['headerFill']}
        .fullBleed=${args['fullBleed']}
      >
        <atp-card-header slot="header">
          <h3>Header but no footer</h3>
        </atp-card-header>
        <p>
          Adding the <code>divider</code> attribute to the header or footer will draw a visible
          divider.
        </p>
      </atp-card>
    </div>
  `,
  parameters: {
    docs: {
      source: {
        code: `
          <atp-card>
            <atp-card-header  slot="header">
              <h3>Using dividers</h3>
            </atp-card-header>
            <p>  
              Adding the <code>divider</code> attribute to the header or footer will draw a visible divider.
            </p>
            <atp-card-footer  slot="footer">I'm the footer</atp-card-footer>
            </atp-card>
          </atp-card>
        `,
      },
    },
  },
};

export const FullBleed: Story = {
  args: {
    color: CardColor.DEFAULT,
    borderDecoration: CardBorderDecoration.DEFAULT,
    density: CardDensity.DEFAULT,
    divider: CardDivider.DEFAULT,
    headerFill: CardHeaderFill.DEFAULT,
    fullBleed: true,
    open: false,
  },
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: var(--atp-space-s)">
      <atp-card
        .color=${args['color']}
        .borderDecoration=${args['borderDecoration']}
        .density=${args['density']}
        .divider=${args['divider']}
        .collapsible=${args['collapsible']}
        .open=${args['open']}
        .headerFill=${args['headerFill']}
        .fullBleed=${args['fullBleed']}
      >
        <atp-card-header slot="header">
          <h2>A full bleed card</h2>
          <atp-button label="Button"></atp-button>
          <atp-button label="Button2"></atp-button>
        </atp-card-header>
        <p>Here's some content</p>
        <p>and some more content</p>
        <atp-card-footer slot="footer">
          <p>I'm the footer</p>
          <atp-button label="Button"></atp-button>
        </atp-card-footer>
      </atp-card>

      <atp-card
        .color=${args['color']}
        .borderDecoration=${args['borderDecoration']}
        .density=${args['density']}
        .divider=${CardDivider.HEADER}
        .collapsible=${args['collapsible']}
        .open=${args['open']}
        .headerFill=${CardHeaderFill.LIGHT_SLATE}
        .fullBleed=${args['fullBleed']}
      >
        <atp-card-header slot="header">
          <h2 id="fullBleedTableNoCaption">
            Full-bleed, with a Table using "inner borders" option
          </h2>
          <atp-button label="Button"></atp-button>
          <atp-button label="Button2"></atp-button>
        </atp-card-header>

        <table class="atp-table atp-table--inner-borders" aria-labelledby="fullBleedTableNoCaption">
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
      </atp-card>

      <atp-card
        .color=${args['color']}
        .borderDecoration=${args['borderDecoration']}
        .density=${args['density']}
        .divider=${CardDivider.HEADER}
        .collapsible=${args['collapsible']}
        .open=${args['open']}
        .headerFill=${CardHeaderFill.LIGHT_SLATE}
        .fullBleed=${args['fullBleed']}
      >
        <atp-card-header slot="header">
          <h2 id="fullBleedDescriptionList">
            Full-bleed, with a Description List using the "indented" option
          </h2>
          <atp-button label="Button"></atp-button>
          <atp-button label="Button2"></atp-button>
        </atp-card-header>

        <dl class="atp-dl atp-dl--indented" aria-labelledby="fullBleedDescriptionList">
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
          <atp-card fullBleed="true">
            <atp-card-header slot="header">
              <h2>A header with an <code>&lt;h2&gt;</code> heading</h2>
              <atp-button label="Button"></atp-button>
              <atp-button label="Button2"></atp-button>
            </atp-card-header>
            <p>Here's some content</p>
            <p>and some more content</p>
            <atp-card-footer slot="footer">
              <p>I'm the footer</p>
              <atp-button label="Button"></atp-button>
            </atp-card-footer>
          </atp-card>
        `,
      },
    },
  },
};

export const Density: Story = {
  args: {
    color: CardColor.DEFAULT,
    borderDecoration: CardBorderDecoration.DEFAULT,
    density: CardDensity.COMPACT,
    divider: CardDivider.BOTH,
    collapsible: false,
    headerFill: CardHeaderFill.DEFAULT,
    fullBleed: false,
  },
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: var(--atp-space-s)">
      <atp-card
        .color=${args['color']}
        .borderDecoration=${args['borderDecoration']}
        .density=${args['density']}
        .divider=${args['divider']}
        .collapsible=${args['collapsible']}
        .headerFill=${args['headerFill']}
        .fullBleed=${args['fullBleed']}
      >
        <atp-card-header density="compact" slot="header">
          <h2>Using density="compact"</h2>
        </atp-card-header>
        <p>
          Compact cards need to add <code>density="compact"</code> to the card
          <strong>and</strong> to the header and footer. Compact cards should use buttons with
          <code>size="small"</code>.
        </p>
        <atp-card-footer density="compact" slot="footer">
          <p>I'm the footer</p>
          <atp-button size="small" label="Button"></atp-button>
        </atp-card-footer>
      </atp-card>

      <atp-card
        .color=${args['color']}
        .borderDecoration="${args['borderDecoration']}"
        .density=${args['density']}
        .divider="false"
        .collapsible=${args['collapsible']}
        .headerFill=${args['headerFill']}
        .fullBleed=${args['fullBleed']}
      >
        <atp-card-header density="compact" slot="header">
          <h2>Using density="compact"</h2>
        </atp-card-header>
        <p>Without dividers.</p>
        <atp-card-footer density="compact" slot="footer">
          <p>I'm the footer</p>
          <atp-button size="small" label="Button"></atp-button>
        </atp-card-footer>
      </atp-card>

      <atp-card
        .color=${args['color']}
        .borderDecoration=${args['borderDecoration']}
        density="wide"
        divider=${args['divider']}
        .collapsible=${args['collapsible']}
        .headerFill=${args['headerFill']}
        .fullBleed=${args['fullBleed']}
      >
        <atp-card-header density="wide" slot="header">
          <h2>Using density="wide"</h2>
        </atp-card-header>
        <p>
          Wide cards need to add <code>density="wide"</code> to the card <strong>and</strong> to the
          header and footer.
        </p>
        <atp-card-footer density="wide" slot="footer">
          <p>I'm the footer</p>
          <atp-button size="small" label="Button"></atp-button>
        </atp-card-footer>
      </atp-card>

      <atp-card
        .color=${args['color']}
        .borderDecoration=${args['borderDecoration']}
        density="wide"
        divider="false"
        .collapsible=${args['collapsible']}
        .headerFill=${args['headerFill']}
        .fullBleed=${args['fullBleed']}
      >
        <atp-card-header density="wide" slot="header">
          <h2>Using density="wide"</h2>
        </atp-card-header>
        <p>without dividers.</p>
        <atp-card-footer density="wide" slot="footer">
          <p>I'm the footer</p>
          <atp-button size="small" label="Button"></atp-button>
        </atp-card-footer>
      </atp-card>

      <atp-card
        .color=${args['color']}
        .borderDecoration=${args['borderDecoration']}
        density="default"
        .divider=${args['divider']}
        .fullBleed=${args['fullBleed']}
      >
        <atp-card-header slot="header">
          <h2>Using default density</h2>
        </atp-card-header>
        <p>For comparison, here's the default density.</p>
        <atp-card-footer slot="footer">
          <p>I'm the footer</p>
          <atp-button size="small" label="Button"></atp-button>
        </atp-card-footer>
      </atp-card>

      <atp-card
        .color=${args['color']}
        .borderDecoration=${args['borderDecoration']}
        density="default"
        divider="false"
        .collapsible=${args['collapsible']}
        .headerFill=${args['headerFill']}
        .fullBleed=${args['fullBleed']}
      >
        <atp-card-header slot="header">
          <h2>Using default density</h2>
        </atp-card-header>
        <p>without dividers.</p>
        <atp-card-footer slot="footer">
          <p>I'm the footer</p>
          <atp-button size="small" label="Button"></atp-button>
        </atp-card-footer>
      </atp-card>
    </div>
  `,
  parameters: {
    docs: {
      source: {
        code: `
          <atp-card density='compact'>
            <atp-card-header  density="compact" slot="header">
              <h2>Using density=compact</h2>
            </atp-card-header>  
            <p>
             Compact cards need to add <code>density="compact"</code> to the card
             <strong>and</strong> to the header and footer. 
             Compact cards should use buttons with <code>size="small"</code>.
            </p>
            <atp-card-footer density="compact" slot="footer">
              <p>I'm the footer</p>
              <atp-button size="small" label="Button"></atp-button>
            </atp-card-footer>
          </atp-card>
        `,
      },
    },
  },
};

export const ColorAndBorderDecoration: Story = {
  args: {
    color: CardColor.DEFAULT,
    borderDecoration: CardBorderDecoration.START,
    density: CardDensity.DEFAULT,
    divider: CardDivider.HEADER,
    collapsible: false,
    headerFill: CardHeaderFill.DEFAULT,
    fullBleed: false,
  },
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: var(--atp-space-s)">
      <atp-card
        .borderDecoration=${args['borderDecoration']}
        .density=${args['density']}
        .divider=${args['divider']}
        .collapsible=${args['collapsible']}
        .headerFill=${args['headerFill']}
        .fullBleed=${args['fullBleed']}
      >
        Some content
        <atp-card-header slot="header">
          Default card with <code>borderDecoration="start"</code>
        </atp-card-header>
      </atp-card>

      <atp-card
        .color=${CardColor.RED}
        .borderDecoration=${args['borderDecoration']}
        .density=${args['density']}
        .divider=${args['divider']}
        .collapsible=${args['collapsible']}
        .headerFill=${args['headerFill']}
        .fullBleed=${args['fullBleed']}
      >
        Some content
        <atp-card-header slot="header">
          Red card with <code>borderDecoration="start"</code>
        </atp-card-header>
      </atp-card>

      <atp-card
        .color=${CardColor.RED}
        .borderDecoration=${CardBorderDecoration.DEFAULT}
        .density=${args['density']}
        .divider=${args['divider']}
        .collapsible=${args['collapsible']}
        .headerFill=${args['headerFill']}
        .fullBleed=${args['fullBleed']}
      >
        Some content
        <atp-card-header slot="header"> Red card without border decoration </atp-card-header>
      </atp-card>

      <atp-card
        .color=${CardColor.ORANGE}
        .borderDecoration=${args['borderDecoration']}
        .density=${args['density']}
        .divider=${args['divider']}
        .collapsible=${args['collapsible']}
        .headerFill=${args['headerFill']}
        .fullBleed=${args['fullBleed']}
      >
        Some content
        <atp-card-header slot="header">
          Orange card with <code>borderDecoration="start"</code>
        </atp-card-header>
      </atp-card>

      <atp-card
        .color=${CardColor.GREEN}
        .borderDecoration=${args['borderDecoration']}
        .density=${args['density']}
        .divider=${args['divider']}
        .collapsible=${args['collapsible']}
        .headerFill=${args['headerFill']}
        .fullBleed=${args['fullBleed']}
      >
        Some content
        <atp-card-header slot="header">
          Green card with <code>borderDecoration="start"</code>
        </atp-card-header>
      </atp-card>

      <atp-card
        .color=${CardColor.BLUE}
        .borderDecoration=${args['borderDecoration']}
        .density=${args['density']}
        .divider=${args['divider']}
        .collapsible=${args['collapsible']}
        .headerFill=${args['headerFill']}
        .fullBleed=${args['fullBleed']}
      >
        Some content
        <atp-card-header slot="header">
          Blue card with <code>borderDecoration="start"</code>
        </atp-card-header>
      </atp-card>

      <atp-card
        .color=${CardColor.PURPLE}
        .borderDecoration=${args['borderDecoration']}
        .density=${args['density']}
        .divider=${args['divider']}
        .collapsible=${args['collapsible']}
        .headerFill=${args['headerFill']}
        .fullBleed=${args['fullBleed']}
      >
        Some content
        <atp-card-header slot="header">
          Purple card with <code>borderDecoration="start"</code>
        </atp-card-header>
      </atp-card>

      <atp-card
        .color=${CardColor.PURPLE}
        .borderDecoration=${args['borderDecoration']}
        density=${CardDensity.COMPACT}
        .divider=${args['divider']}
        .collapsible=${args['collapsible']}
        .headerFill=${args['headerFill']}
        .fullBleed=${args['fullBleed']}
      >
        Some content
        <atp-card-header density=${CardDensity.COMPACT} slot="header">
          Purple card with compact density</code>
        </atp-card-header>
      </atp-card>

      <atp-card
        .color=${CardColor.PURPLE}
        .borderDecoration=${args['borderDecoration']}
        density=${CardDensity.WIDE}
        .divider=${args['divider']}
        .collapsible=${args['collapsible']}
        .headerFill=${args['headerFill']}
        .fullBleed=${args['fullBleed']}
      >
        Some content
        <atp-card-header density=${CardDensity.WIDE} slot="header">
          Purple card with wide density</code>
        </atp-card-header>
      </atp-card>
    </div>
  `,
  parameters: {
    docs: {
      source: {
        code: `
          <atp-card color="red" borderDecoration="start">
            <atp-card-header slot="header">
              Red card with <code>borderDecoration="start"</code>
            </atp-card-header>  
            Some content
          </atp-card>
        `,
      },
    },
  },
};

export const HeaderFill: Story = {
  args: {
    color: CardColor.DEFAULT,
    borderDecoration: CardBorderDecoration.DEFAULT,
    density: CardDensity.DEFAULT,
    divider: CardDivider.HEADER,
    collapsible: false,
    headerFill: CardHeaderFill.LIGHT_SLATE,
    fullBleed: false,
  },
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: var(--atp-space-s)">
      <atp-card
        .color=${args['color']}
        .borderDecoration=${args['borderDecoration']}
        .density=${args['density']}
        .divider=${args['divider']}
        .collapsible=${args['collapsible']}
        .headerFill=${args['headerFill']}
        .fullBleed=${args['fullBleed']}
      >
        <atp-card-header slot="header">
          <h3>Header with light slate fill, and a divider</h3>
        </atp-card-header>
        <p>Some card contents.</p>
        <atp-card-footer slot="footer">I'm the footer</atp-card-footer>
      </atp-card>

      <atp-card
        .color=${args['color']}
        .borderDecoration=${args['borderDecoration']}
        .density=${args['density']}
        .divider=${args['divider']}
        .collapsible=${args['collapsible']}
        .headerFill=${CardHeaderFill.RED}
        .fullBleed=${args['fullBleed']}
      >
        <atp-card-header slot="header">
          <h3>Header with red fill, and a divider</h3>
        </atp-card-header>
        <p>Some card contents.</p>
        <atp-card-footer slot="footer">I'm the footer</atp-card-footer>
      </atp-card>

      <atp-card
        .color=${args['color']}
        .borderDecoration=${args['borderDecoration']}
        .density=${args['density']}
        .divider=${args['divider']}
        .collapsible=${args['collapsible']}
        .headerFill=${CardHeaderFill.ORANGE}
        .fullBleed=${args['fullBleed']}
      >
        <atp-card-header slot="header">
          <h3>Header with orange fill, and a divider</h3>
        </atp-card-header>
        <p>Some card contents.</p>
        <atp-card-footer slot="footer">I'm the footer</atp-card-footer>
      </atp-card>

      <atp-card
        .color=${args['color']}
        .borderDecoration=${args['borderDecoration']}
        .density=${args['density']}
        .divider=${args['divider']}
        .collapsible=${args['collapsible']}
        .headerFill=${CardHeaderFill.GREEN}
        .fullBleed=${args['fullBleed']}
      >
        <atp-card-header slot="header">
          <h3>Header with green fill, and a divider</h3>
        </atp-card-header>
        <p>Some card contents.</p>
        <atp-card-footer slot="footer">I'm the footer</atp-card-footer>
      </atp-card>

      <atp-card
        .color=${args['color']}
        .borderDecoration=${args['borderDecoration']}
        .density=${args['density']}
        .divider=${args['divider']}
        .collapsible=${args['collapsible']}
        .headerFill=${CardHeaderFill.BLUE}
        .fullBleed=${args['fullBleed']}
      >
        <atp-card-header slot="header">
          <h3>Header with blue fill, and a divider</h3>
        </atp-card-header>
        <p>Some card contents.</p>
        <atp-card-footer slot="footer">I'm the footer</atp-card-footer>
      </atp-card>

      <atp-card
        .color=${args['color']}
        .borderDecoration=${args['borderDecoration']}
        .density=${args['density']}
        .divider=${args['divider']}
        .collapsible=${args['collapsible']}
        .headerFill=${CardHeaderFill.PURPLE}
        .fullBleed=${args['fullBleed']}
      >
        <atp-card-header slot="header">
          <h3>Header with purple fill, and a divider</h3>
        </atp-card-header>
        <p>Some card contents.</p>
        <atp-card-footer slot="footer">I'm the footer</atp-card-footer>
      </atp-card>
    </div>
  `,
  parameters: {
    docs: {
      source: {
        code: `
          <atp-card>
            <atp-card-header headerFill="light-slate" slot="header">
              <h3>With header fill</h3>
            </atp-card-header>
            <p>  
              Card content
            </p>
            <atp-card-footer  slot="footer">I'm the footer</atp-card-footer>
            </atp-card>
          </atp-card>
        `,
      },
    },
  },
};

export const Collapsible: Story = {
  args: {
    color: CardColor.DEFAULT,
    borderDecoration: CardBorderDecoration.DEFAULT,
    density: CardDensity.DEFAULT,
    divider: CardDivider.DEFAULT,
    collapsible: true,
    headerFill: CardHeaderFill.DEFAULT,
    open: false,
    fullBleed: false,
  },
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: var(--atp-space-s)">
      <atp-card
        .color=${args['color']}
        .borderDecoration=${args['borderDecoration']}
        .density=${args['density']}
        .divider=${args['divider']}
        .collapsible=${args['collapsible']}
        .open=${args['open']}
        .headerFill=${args['headerFill']}
        .fullBleed=${args['fullBleed']}
      >
        <atp-card-header slot="header">
          <h3>Collapsible card</h3>
        </atp-card-header>
        <p>Some card contents.</p>
        <atp-card-footer slot="footer">I'm the footer</atp-card-footer>
      </atp-card>

      <atp-card
        .color=${args['color']}
        .borderDecoration=${args['borderDecoration']}
        .density=${args['density']}
        .divider=${args['divider']}
        .collapsible=${args['collapsible']}
        .headerFill=${args['headerFill']}
        .fullBleed=${args['fullBleed']}
        open="true"
      >
        <atp-card-header slot="header">
          <h3>Open by default</h3>
        </atp-card-header>
        <p>Some card contents.</p>
        <atp-card-footer slot="footer">I'm the footer</atp-card-footer>
      </atp-card>

      <atp-card
        .color=${args['color']}
        .borderDecoration=${args['borderDecoration']}
        .density=${args['density']}
        divider=${CardDivider.BOTH}
        .collapsible=${args['collapsible']}
        .open=${args['open']}
        .headerFill=${args['headerFill']}
        .fullBleed=${args['fullBleed']}
      >
        <atp-card-header slot="header">
          <h3>Using dividers</h3>
        </atp-card-header>
        <p>
          Adding the <code>divider</code> attribute to the header or footer will draw a visible
          divider.
        </p>
        <atp-card-footer slot="footer">I'm the footer</atp-card-footer>
      </atp-card>

      <atp-card
        .color=${args['color']}
        .borderDecoration=${args['borderDecoration']}
        .density=${args['density']}
        divider=${CardDivider.BOTH}
        .collapsible=${args['collapsible']}
        .open=${args['open']}
        .headerFill=${CardHeaderFill.RED}
        .fullBleed=${args['fullBleed']}
      >
        <atp-card-header slot="header">
          <h3>Using header fill</h3>
        </atp-card-header>
        <p>This card has a visible header fill.</p>
        <atp-card-footer slot="footer">I'm the footer</atp-card-footer>
      </atp-card>

      <atp-card
        .color=${args['color']}
        .borderDecoration=${args['borderDecoration']}
        .density=${args['density']}
        .divider=${args['divider']}
        .collapsible=${args['collapsible']}
        .open=${args['open']}
        .headerFill=${args['headerFill']}
        .fullBleed=${args['fullBleed']}
      >
        <atp-card-header slot="header">
          <h3>No footer</h3>
        </atp-card-header>
        <p>This one has no footer.</p>
      </atp-card>
    </div>
  `,
  parameters: {
    docs: {
      source: {
        code: `
          <atp-card collapsible>
            <atp-card-header slot="header">
              <h3>Collapsible</h3>
            </atp-card-header>
            <p>  
              Card content
            </p>
            <atp-card-footer slot="footer">I'm the footer</atp-card-footer>
            </atp-card>
          </atp-card>
        `,
      },
    },
  },
};
