import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {withActions} from 'storybook/actions/decorator';

import {html} from 'lit';
import './list-bounded';
import '../media-object/media-object';
import '../button/button';
import '../icon/icon';

const meta: Meta = {
  component: 'atp-list-bounded',
  title: 'Components/ListBounded',
  tags: ['autodocs'],
  parameters: {
    docs: {
      component: 'List Bounded Element',
    },
  },
  decorators: [withActions],
  argTypes: {
    ordered: {
      options: [true, false],
    },
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    ordered: false,
  },
  render: (args) => html`
    <atp-list-bounded .ordered=${args['ordered']}>
      <atp-list-bounded-item>Item 1</atp-list-bounded-item>
      <atp-list-bounded-item>Item 2</atp-list-bounded-item>
      <atp-list-bounded-item>Item 3</atp-list-bounded-item>
    </atp-list-bounded>

    <p style="margin-block-start: var(--atp-space-l)">An example with more complex contents:</p>

    <style>
      .person-block {
        display: grid;
        gap: var(--atp-space-s);
        grid-template-columns: 300px auto 200px 30px;
        align-items: center;
      }
    </style>

    <atp-list-bounded .ordered=${args['ordered']} style="margin-block-start: var(--atp-space-m)">
      <atp-list-bounded-item>
        <div class="person-block">
          <atp-media-object
            iconText="LK"
            label="Leslie Knope"
            subtitle="lknope@parks.pawnee.in.gov"
          ></atp-media-object>
          <span class="person-title">Deputy Director, Parks and Recreation</span>
          <span class="person-location">Pawnee, IN</span>
          <atp-button appearance="text">
            <atp-icon height="12" icon="more-vertical"></atp-icon>
          </atp-button>
        </div>
      </atp-list-bounded-item>
      <atp-list-bounded-item>
        <div class="person-block">
          <atp-media-object
            iconText="RS"
            label="Ron Swanson"
            subtitle="rswanson@parks.pawnee.in.gov"
          ></atp-media-object>
          <span class="person-title">Director, Parks and Recreation</span>
          <span class="person-location">Pawnee, IN</span>
          <atp-button appearance="text">
            <atp-icon height="12" icon="more-vertical"></atp-icon>
          </atp-button>
        </div>
      </atp-list-bounded-item>
      <atp-list-bounded-item>
        <div class="person-block">
          <atp-media-object
            iconText="AL"
            label="April Ludgate"
            subtitle="aludgate@animalcontrol.pawnee.in.gov"
          ></atp-media-object>
          <span class="person-title">Deputy Director, Pawnee Animal Control </span>
          <span class="person-location">Pawnee, IN</span>
          <atp-button appearance="text">
            <atp-icon height="12" icon="more-vertical"></atp-icon>
          </atp-button>
        </div>
      </atp-list-bounded-item>
    </atp-list-bounded>
  `,
  parameters: {
    docs: {
      source: {
        code: `
        <atp-list-bounded>
          <atp-list-bounded-item>Item 1</atp-list-bounded-item>
          <atp-list-bounded-item>Item 2</atp-list-bounded-item>
          <atp-list-bounded-item>Item 3</atp-list-bounded-item>
        </atp-list-bounded>

        <style>
          .person-block {
            display: grid;
            gap: var(--atp-space-s);
            grid-template-columns: 300px auto 200px 30px;
            align-items: center;
          }
        </style>
        <atp-list-bounded>
          <atp-list-bounded-item>
            <div class="person-block">
              <atp-media-object
                iconText="LK"
                label="Leslie Knope"
                subtitle="lknope@parks.pawnee.in.gov"
              ></atp-media-object>
              <span class="person-title">Deputy Director, Parks and Recreation</span>
              <span class="person-location">Pawnee, IN</span>
              <atp-button appearance="text">
                <atp-icon height="12" icon="more-vertical"></atp-icon>
              </atp-button>
            </div>
          </atp-list-bounded-item>
        </atp-list-bounded>
        `,
      },
    },
  },
};

export const Ordered = {
  args: {
    ordered: true,
  },
  render: (args) => html`
    <p style="margin-block-end: var(--atp-space-m)">
      By default, the ListBounded component creates an unordered list (<code>&lt;ul&gt;</code>), but
      setting <code>ordered</code> to true creates an ordered list (<code>&lt;ol&gt;</code>)
      instead. There is no visual difference, but you should choose the correct semantics to better
      support accessibility.
    </p>
    <atp-list-bounded .ordered=${args['ordered']}>
      <atp-list-bounded-item>Item 1</atp-list-bounded-item>
      <atp-list-bounded-item>Item 2</atp-list-bounded-item>
      <atp-list-bounded-item>Item 3</atp-list-bounded-item>
    </atp-list-bounded>
  `,
  parameters: {
    docs: {
      source: {
        code: `
        <atp-list-bounded ordered>
          <atp-list-bounded-item>Item 1</atp-list-bounded-item>
          <atp-list-bounded-item>Item 2</atp-list-bounded-item>
          <atp-list-bounded-item>Item 3</atp-list-bounded-item>
        </atp-list-bounded>
        `,
      },
    },
  },
};
