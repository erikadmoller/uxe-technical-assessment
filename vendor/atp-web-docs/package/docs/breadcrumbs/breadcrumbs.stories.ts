import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {withActions} from 'storybook/actions/decorator';
import {fn} from 'storybook/test';
import {html} from 'lit';
import './breadcrumbs';
import {BreadcrumbsSize} from './breadcrumbs';

const meta: Meta = {
  component: 'atp-breadcrumbs',
  title: 'Components/Breadcrumbs',
  tags: ['autodocs'],
  parameters: {
    docs: {
      component: 'Breadcrumbs Element',
    },
    actions: {
      handles: ['clickEventOutput'],
    },
  },
  decorators: [withActions],
  argTypes: {
    onCustomEvent: fn(),
    itemsList: {},
    size: {
      options: [BreadcrumbsSize.LARGE, BreadcrumbsSize.SMALL],
      control: {type: 'inline-radio'},
    },
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    onCustomEvent: fn(),
    itemsList: [
      {name: 'Item 1', href: 'href-1'},
      {name: 'Item 2 emits event', href: 'href-2', emitEvent: true},
      {name: 'Item 3 emits event and has no href', emitEvent: true},
      {name: 'Item 4 sets an id', href: 'href-4', id: 'breadcrumb4'},
      {name: 'Item 5', href: 'href-5'},
    ],
    size: BreadcrumbsSize.SMALL,
  },
  render: (args) => html`
    <atp-breadcrumbs
      .itemsList=${args['itemsList']}
      @clickEventOutput=${(e: CustomEvent) => args['onCustomEvent'](e.detail)}
    ></atp-breadcrumbs>
  `,
  parameters: {
    docs: {
      source: {
        code: `
          <script>
            const myItems = [
              {name: 'Item 1', href: 'href-1'},
              {name: 'Item 2', href: 'href-2', emitEvent: true},
              {name: 'Item 3', emitEvent: true},
              {name: 'Item 4', href: 'href-4', id: 'breadcrumb4'},  
              {name: 'Item 5', href: 'href-5'},
            ];
          </script>

          <atp-breadcrumbs itemsList="myItems"></atp-breadcrumbs>
        `,
      },
    },
  },
};

export const Large: Story = {
  args: {
    itemsList: [
      {name: 'Item 1', href: 'href-1'},
      {name: 'Item 2', href: 'href-2'},
      {name: 'Item 3', href: 'href-3'},
      {name: 'Item 4', href: 'href-4'},
      {name: 'Item 5', href: 'href-5'},
    ],
    size: BreadcrumbsSize.LARGE,
  },
  parameters: {
    docs: {
      source: {
        code: `
          <script>
            const myItems = [
              {name: 'Item 1', href: 'href-1'},
              {name: 'Item 2', href: 'href-2'},
              {name: 'Item 3', href: 'href-3'},
              {name: 'Item 4', href: 'href-4'},  
              {name: 'Item 5', href: 'href-5'},
            ];
          </script>

          <atp-breadcrumbs itemsList="myItems" size="BreacrumbsSize.LARGE"></atp-breadcrumbs>
        `,
      },
    },
  },
};
