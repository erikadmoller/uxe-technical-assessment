import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {withActions} from 'storybook/actions/decorator';
import {html} from 'lit';
import './tab-set';

const meta: Meta = {
  component: 'atp-tab-set',
  title: 'Components/TabSet',
  tags: ['autodocs'],
  parameters: {
    docs: {
      component: 'TabSet',
    },
    actions: {
      handles: ['clickEventOutput'],
    },
  },
  decorators: [withActions],
  argTypes: {},
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    tabs: [
      {name: 'Item 0', id: 'item-0'},
      {name: 'Item 1', id: 'item-1', badge: '5'},
      {name: 'Item 2', id: 'item-2', badge: '3', disabled: true},
      {name: 'Item 3', id: 'item-3'},
      {name: 'Item 4', id: 'item-4', badge: '1'},
    ],
    isFullWidth: true,
    activeIndex: 0,
    ariaLabel: 'My Example Tabs',
  },
  render: (args) =>
    html`
      <atp-tab-set
        .tabs="${args['tabs']}"
        .isFullWidth=${args['isFullWidth']}
        .activeIndex=${args['activeIndex']}
        .ariaLabel=${args['ariaLabel']}
        }
      >
        <div slot="tabpanel0">panel 0 content</div>
        <div slot="tabpanel1">panel 1 content</div>
        <div slot="tabpanel2">panel 2 content</div>
        <div slot="tabpanel3">panel 3 content</div>
        <div slot="tabpanel4">panel 4 content</div>
      </atp-tab-set>
    `,
  parameters: {
    docs: {
      source: {
        code: `
        <script>
          myTabs = tabs: [
            {name: 'Item 0', id: 'item-0'},
            {name: 'Item 1', id: 'item-1', badge: '5'},
            {name: 'Item 2', id: 'item-2', badge: '3', disabled: true},
            {name: 'Item 3', id: 'item-3'},
            {name: 'Item 4', id: 'item-4', badge: '1'},
          ]
        </script>
          
        <atp-tab-set
          tabs="myTabs"
          isFullWidth="true"
          activeIndex="0"
          ariaLabel="My Example Tabs"
        >
          <div slot="tabpanel0">panel 0 content</div>
          <div slot="tabpanel1">panel 1 content</div>
          <div slot="tabpanel2">panel 2 content</div>
          <div slot="tabpanel3">panel 3 content</div>
          <div slot="tabpanel4">panel 4 content</div>
        </atp-tab-set>
        
        <!-- Usage example in an Angular context -->
        <atp-tab-set 
          [tabs]="myTabs"
          [isFullWidth]="true"
          [activeIndex]="0"
          [ariaLabel]="'My Example Tabs'"
          (clickEventOutput)="tabHandler($event)">
        </atp-tab-set>
        `,
      },
    },
  },
};
