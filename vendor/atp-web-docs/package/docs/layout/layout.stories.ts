import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {withActions} from 'storybook/actions/decorator';
import {html} from 'lit';
import '../sidebar/sidebar';
import '../header/header';
import '../button/button';
import '../dropdown/dropdown';
import '../media-object/media-object';
import '../pill/pill';

import {VisualPosition, VisualSize} from '../shared/enums';
import {IconPosition} from '../button/button';
import {PillColor} from '../pill/pill';

const meta: Meta = {
  title: 'Foundations/Layout',
  parameters: {
    docs: {
      component: 'Layout',
    },
    actions: {
      handles: [],
    },
  },
  decorators: [withActions],
  argTypes: {},
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    headerLabel: 'Product Catalog',
    headerOrg: 'American Airlines',
    headerIsSwitchable: true,
    headerHasSearch: true,
    headerItemsList: [
      {name: 'My Catalog', id: 'item-1', isTitle: true},
      {name: 'Alaska', description: 'AK', id: 'Alaska'},
      {name: 'My Partners', id: 'item-2', isTitle: true},
      {name: 'American Airlines', description: 'AA', id: 'American'},
      {name: 'Delta', description: 'DL', id: 'Delta'},
      {name: 'United', description: 'UN', id: 'United'},
    ],
    headerUserMenuItems: [
      {name: 'Profile', id: 'item-1'},
      {name: 'Edit', id: 'Alaska'},
    ],
    headerActiveIds: ['Alaska'],
    headerIconActions: [
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
    sidebarItems: [
      {name: 'Control Center', route: 'control', id: 'control', children: []},
      {
        name: 'Products',
        route: 'products',
        id: 'products',
        children: [
          {
            name: 'Child 1',
            id: 'child-1',
            route: 'child-1',
            children: [
              {name: 'Grandchild 1', route: 'grandchild-1', id: 'grandchild-1', children: []},
              {name: 'Grandchild 2', route: 'grandchild-2', id: 'grandchild-2', children: []},
            ],
          },
          {name: 'Child 2', id: 'grandchild-13', route: 'grandchild-13', children: []},
          {name: 'Child 3', id: 'grandchild-14', route: 'grandchild-14', children: []},
          {
            name: 'Child 4',
            id: 'child-4',
            route: 'grandchild-1',
            children: [
              {name: 'Grandchild 1', route: 'grandchild-12', id: 'grandchild-12', children: []},
              {name: 'Grandchild 2', route: 'grandchild-22', id: 'grandchild-22', children: []},
            ],
          },
          {name: 'Child 5', id: 'grandchild-15', route: 'grandchild-15', children: []},
          {
            name: 'Child 6 Not Link',
            id: 'child-6',
            children: [
              {name: 'Grandchild 1', route: 'grandchild-123', id: 'grandchild-123', children: []},
              {name: 'Grandchild 2', route: 'grandchild-223', id: 'grandchild-223', children: []},
            ],
          },
          {name: 'Child 7', route: 'child-7', id: 'child-7', children: []},
        ],
      },
      {
        name: 'Bundles',
        id: 'bundles',
        route: 'bundles',
        children: [
          {
            name: 'Child 1',
            id: 'child-12',
            route: 'child-12',
            children: [
              {name: 'Grandchild', route: 'grandchild-1342', id: 'grandchild-1342', children: []},
              {name: 'Grandchild', route: 'grandchild-2432', id: 'grandchild-2432', children: []},
            ],
          },
          {name: 'Power', route: 'power', id: 'power', children: []},
          {name: 'Entertainment', route: 'entertainment', id: 'entertainment', children: []},
          {name: 'Meals', route: 'meals', id: 'meals', children: []},
          {name: 'Beverages', route: 'beverages', id: 'beverages', children: []},
          {name: 'WiFi', route: 'wifi', id: 'wifi', children: []},
          {name: 'Flexibility', route: 'flexibility', id: 'flexibility', children: []},
          {name: 'Transport', route: 'transport-2', id: 'transport-2', children: []},
        ],
      },
      {name: 'Transport', route: 'transport', id: 'transport', children: []},
    ],
    sidebarSecondaryItems: [
      {name: 'Favorites', route: 'favorites', id: 'favorites', icon: {icon: 'star', height: 10}},
      {name: 'Watchlist', route: 'watchlist', id: 'watchlist', icon: {icon: 'eye', height: 10}},
      {
        name: 'Importance',
        route: 'importance',
        id: 'importance',
        icon: {icon: 'triangle-exclamation', height: 10},
      },
      {
        name: 'Recently modified',
        route: 'recently-modified',
        id: 'recently-modified',
        icon: {icon: 'clock', height: 10},
      },
    ],
    sidebarOutputNavigationEvents: true,
    sidebarHidden: false,
    sidebarColorConfig: {},
    sidebarOpenIds: [],
    sidebarActiveId: '',
  },
  render: ({
    headerLabel,
    headerOrg,
    headerIsSwitchable,
    headerHasSearch,
    headerIconActions,
    headerActiveIds,
    headerItemsList,
    headerUserMenuItems,
    sidebarItems,
    sidebarSecondaryItems,
    sidebarHidden,
    sidebarColorConfig,
    sidebarOpenIds,
    sidebarActiveId,
    sidebarOutputNavigationEvents,
  }) =>
    html`
      <style>
        .sb-main-padded {
          padding: 0 !important;
        }
      </style>
      <div class="atp-layout">
        <atp-header
          id="header"
          class="layout-header"
          .label=${headerLabel}
          .org=${headerOrg}
          .isSwitchable=${headerIsSwitchable}
          .hasSearch=${headerHasSearch}
          .iconActions=${headerIconActions}
        >
          <atp-pill label="Gold Env" .color="${PillColor.ORANGE}" slot="pill"></atp-pill>
          <atp-dropdown
            id="org-switcher"
            style="width: 200px;"
            .visualPosition="${VisualPosition.left}"
            .itemsList=${headerItemsList}
            .activeIds=${headerActiveIds}
            .showCheckmarks=${true}
            slot="org-list"
          ></atp-dropdown>
          <atp-dropdown slot="user-menu" id="user-menu" .itemsList=${headerUserMenuItems}>
            <atp-media-object
              style="height: fit-content; width: fit-content; padding: 8px 16px;"
              iconText="JD"
              label="Jane Doe"
              subtitle="jdoe@atpco.net"
              slot="above-menu-content"
            ></atp-media-object>
          </atp-dropdown>
        </atp-header>
        <atp-sidebar
          id="sidebar"
          class="layout-sidebar"
          .sidebarColorConfig=${sidebarColorConfig}
          .secondaryItems=${sidebarSecondaryItems}
          .items=${sidebarItems}
          .openIds=${sidebarOpenIds}
          .activeId=${sidebarActiveId}
          .sidebarHidden=${sidebarHidden}
          .outputNavigationEvents=${sidebarOutputNavigationEvents}
        >
          <atp-button
            .iconConfig="${{icon: 'add', color: 'var(--atp-content-inverse-medium-enabled)'}}"
            .iconPosition="${IconPosition.LEFT}"
            slot="top-button"
            .size="${VisualSize.MEDIUM}"
            label="Create new"
          ></atp-button>
        </atp-sidebar>
        <div class="scroll-wrapper">
          <div class="page-content">
            <!-- This section is just some content for the page -->
            <ul>
              ${Array(50)
                .fill(0)
                .map((e, i) => html`<li>Content ${i}</li>`)}
            </ul>
          </div>
        </div>
      </div>

      <script>
        orgSwitcher = document.getElementById('org-switcher');
        header = document.getElementById('header');
        orgSwitcher?.addEventListener('itemSelectedOutput', ({detail}) => {
          orgSwitcher.activeIds = [detail[0]];
          header.org = detail[0];
          orgSwitcher.disableKeyScrolling();
        });
        sidebar = document.getElementById('sidebar');
        sidebar?.addEventListener('navigationEventOutput', ({detail}) => {
          sidebar.activeId = detail.id;
        });
      </script>
    `,
  parameters: {
    docs: {
      source: {
        code: `<div class="atp-layout">
        <atp-header
          class="layout-header"
          .label=\${headerLabel}
          .org=\${headerOrg}
          .isSwitchable=\${headerIsSwitchable}
          .hasSearch=\${headerHasSearch}
          .iconActions=\${headerIconActions}
        ></atp-header>
        <atp-sidebar
          id="sidebar"
          class="layout-sidebar"
          .sidebarColorConfig=\${sidebarColorConfig}
          .secondaryItems=\${sidebarSecondaryItems}
          .button=\${sidebarButton}
          .items=\${sidebarItems}
          .openIds=\${sidebarOpenIds}
          .activeId=\${sidebarActiveId}
          .sidebarHidden=\${sidebarHidden}
        ></atp-sidebar>
        <div class="scroll-wrapper">
          <div class="page-content">
            <!-- This section is just some content for the page -->
            <ul>
              \${Array(50)
                .fill(0)
                .map((e, i) => 'Content')}
            </ul>
          </div>
        </div>
      </div>

      <script>
        sidebar = document.getElementById('sidebar');
        sidebar?.addEventListener('sidebarItemSelectedOutput', ({detail}) => {
          sidebar.activeId = detail.id;
        });
      </script>`,
      },
    },
  },
};
