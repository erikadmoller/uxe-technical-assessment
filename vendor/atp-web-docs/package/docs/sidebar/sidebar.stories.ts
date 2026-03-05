import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {withActions} from 'storybook/actions/decorator';
import {html} from 'lit';
import './sidebar';
import '../button/button';
import {VisualSize} from '../shared/enums';
import {IconPosition} from '../button/button';

const meta: Meta = {
  component: 'atp-sidebar',
  title: 'Components/Sidebar',
  tags: ['autodocs'],
  parameters: {
    docs: {
      component: 'Sidebar',
    },
    actions: {
      handles: ['navigationEventOutput'],
    },
  },
  decorators: [withActions],
  argTypes: {},
};

export default meta;
type Story = StoryObj;

const sidebarArgs = {
  items: [
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
  secondaryItems: [
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
  openIds: [],
  activeId: 'grandchild-123',
  outputNavigationEvents: true,
  colorConfig: {
    hover: '#f97c7c',
    active: '#f53333',
    selected: '#faa1a1',
    selectedSection: '#fdd8d8',
  },
};

export const Primary: Story = {
  args: {
    ...sidebarArgs,
    colorConfig: undefined,
  },
  render: ({items, button, secondaryItems, activeId, outputNavigationEvents}) =>
    html`<atp-sidebar
        id="sidebar"
        .secondaryItems=${secondaryItems}
        .button=${button}
        .items=${items}
        .activeId=${activeId}
        .outputNavigationEvents=${outputNavigationEvents}
      >
        <atp-button
          .iconConfig="${{icon: 'add', color: 'var(--atp-content-inverse-medium-enabled)'}}"
          .iconPosition="${IconPosition.LEFT}"
          slot="top-button"
          .size="${VisualSize.MEDIUM}"
          label="Create new"
        ></atp-button>
      </atp-sidebar>

      <script>
        sidebar = document.getElementById('sidebar');
        ids = [];
        activeId = '';
        sidebar?.addEventListener('navigationEventOutput', ({detail}) => {
          sidebar.activeId = detail.id;
        });
      </script>`,
  parameters: {
    docs: {
      source: {
        code: `<atp-sidebar
        id="sidebar"
        .secondaryItems=\${secondaryItems}
        .button=\${button}
        .items=\${items}
        .activeId=\${activeId}
      ></atp-sidebar>`,
      },
    },
  },
};

export const CustomColors: Story = {
  args: {
    ...sidebarArgs,
  },
  render: ({items, button, secondaryItems, activeId, colorConfig, outputNavigationEvents}) =>
    html`<atp-sidebar
        id="sidebar"
        .secondaryItems=${secondaryItems}
        .button=${button}
        .items=${items}
        .activeId=${activeId}
        .colorConfig=${colorConfig}
        .outputNavigationEvents=${outputNavigationEvents}
      >
        <atp-button
          .iconConfig="${{icon: 'add', color: 'var(--atp-content-inverse-medium-enabled)'}}"
          .iconPosition="${IconPosition.LEFT}"
          slot="top-button"
          .size="${VisualSize.MEDIUM}"
          label="Create new"
        ></atp-button>
      </atp-sidebar>

      <script>
        sidebar = document.getElementById('sidebar');
        ids = [];
        activeId = '';
        sidebar?.addEventListener('navigationEventOutput', ({detail}) => {
          sidebar.activeId = detail.id;
        });
      </script>`,
  parameters: {
    docs: {
      source: {
        code: `<atp-sidebar
        id="sidebar"
        .secondaryItems=\${secondaryItems}
        .button=\${button}
        .items=\${items}
        .activeId=\${activeId}
        .colorConfig=\${colorConfig}
      ></atp-sidebar>`,
      },
    },
  },
};
