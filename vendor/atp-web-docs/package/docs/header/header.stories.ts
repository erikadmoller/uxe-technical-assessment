import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {withActions} from 'storybook/actions/decorator';
import {html} from 'lit';
import './header';
import '../media-object/media-object';
import {VisualPosition} from '../shared/enums';
import '../pill/pill';
import {PillColor} from '../pill/pill';

const meta: Meta = {
  component: 'atp-header',
  title: 'Components/Header',
  tags: ['autodocs'],
  parameters: {
    docs: {
      component: 'Header',
    },
    actions: {
      handles: ['homeEventOutput', 'searchEventOutput', 'itemSelectedOutput'],
    },
  },
  decorators: [withActions],
  argTypes: {},
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    label: 'Product Catalog',
    org: 'American Airlines',
    isSwitchable: true,
    hasSearch: true,
    itemsList: [
      {name: 'My Catalog', id: 'item-1', isTitle: true},
      {name: 'Alaska', description: 'AK', id: 'Alaska'},
      {name: 'My Partners', id: 'item-2', isTitle: true},
      {name: 'American Airlines', description: 'AA', id: 'American'},
      {name: 'Delta', description: 'DL', id: 'Delta'},
      {name: 'United', description: 'UN', id: 'United'},
    ],
    userMenuItems: [
      {name: 'Profile', id: 'item-1'},
      {name: 'Edit', id: 'Alaska'},
    ],
    activeIds: ['Alaska'],
    iconActions: [
      {
        id: '1',
        icon: 'bell',
        label: 'Notification dropdown toggle',
        size: 16,
        badge: {
          label: '2',
          color: 'var(--atp-content-inverse-medium-enabled)',
          backgroundColor: 'var(--atp-button-danger-medium-enabled)',
        },
      },
      {id: '2', icon: 'help', size: 16, label: 'Help dropdown toggle'},
      {
        id: 'user-menu',
        icon: 'circle-user',
        size: 16,
        rightAligned: true,
        label: 'User menu toggle',
      },
    ],
  },
  render: ({
    label,
    org,
    isSwitchable,
    hasSearch,
    iconActions,
    itemsList,
    activeIds,
    userMenuItems,
  }) =>
    html`<atp-header
        id="header"
        .label=${label}
        .org=${org}
        .isSwitchable=${isSwitchable}
        .hasSearch=${hasSearch}
        .iconActions=${iconActions}
      >
        <atp-pill label="Gold Env" .color="${PillColor.ORANGE}" slot="pill"></atp-pill>
        <atp-dropdown
          id="org-switcher"
          style="width: 200px;"
          .visualPosition="${VisualPosition.LEFT}"
          .itemsList=${itemsList}
          .activeIds=${activeIds}
          .showCheckmarks=${true}
          .openAtActiveIndex=${true}
          slot="org-list"
        ></atp-dropdown>
        <atp-dropdown slot="user-menu" id="user-menu" .itemsList=${userMenuItems}>
          <atp-media-object
            style="height: fit-content; width: fit-content; padding: 8px 16px;"
            iconText="JD"
            label="Christopher Wellington"
            subtitle="christopher.wellington@atpco.net"
            slot="above-menu-content"
          ></atp-media-object>
        </atp-dropdown>
      </atp-header>
      <script>
        orgSwitcher = document.getElementById('org-switcher');
        header = document.getElementById('header');
        orgSwitcher?.addEventListener('itemSelectedOutput', ({detail}) => {
          orgSwitcher.activeIds = [detail[0]];
          header.org = detail[0];
          orgSwitcher.disableKeyScrolling();
        });
      </script>`,
  parameters: {
    docs: {
      source: {
        code: `<atp-header
      .label=\${label}
      .org=\${org}
      .isSwitchable=\${isSwitchable}
      .hasSearch=\${hasSearch}
      .iconActions=\${iconActions}
    ></atp-header>`,
      },
    },
  },
};
