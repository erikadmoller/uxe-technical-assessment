import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './icon';
import {iconRefObject} from './iconRefs';

const meta: Meta = {
  component: 'atp-icon',
  title: 'Foundations/Icons',
  tags: ['autodocs'],
  argTypes: {
    icon: {},
    height: {},
    color: {},
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    icon: 'help',
    height: 16,
    color: 'black',
    badge: {
      label: '4',
      color: 'var(--atp-content-inverse-medium-enabled)',
      backgroundColor: 'var(--atp-button-danger-medium-enabled)',
    },
  },
  parameters: {
    docs: {
      source: {
        code: '<atp-icon .badge="${badge}" .icon="${icon}" .height=${height} .color="${color}"></atp-icon>',
      },
    },
  },
};

const iconsToExclude = [
  'arrow-down-standard',
  'arrow-left-standard',
  'arrow-up-standard',
  'arrow-right-standard',
  'arrow-right-from-bracket',
  'cart',
  'crash',
  'expand-less',
  'expand-more',
  'eyedropper',
  'file-excel',
  'filter-filled',
  'help-filled',
  'info',
  'info-filled',
  'picture',
  'radio-selected',
  'radio-unselected',
  'search',
  'share',
  'sigma',
  'slash-circle',
  'square-plus',
  'stop-circle',
  'thumbtack',
  'turn-down-left',
  'x',
];

const iconsToShow = Object.keys(iconRefObject).filter(
  (element) => iconsToExclude.indexOf(element.replace('icon-', '')) === -1,
);

export const FullList: Story = {
  args: {
    icon: 'help',
    height: 24,
    color: 'black',
    badge: {
      label: '4',
      color: 'var(--atp-content-inverse-medium-enabled)',
      backgroundColor: 'var(--atp-button-danger-medium-enabled)',
    },
    iconsToShow: iconsToShow,
  },
  render: (args) =>
    html` <div
      class="atp-body-xs"
      style="
        display: grid; 
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
        gap: var(--atp-space-m) var(--atp-space-l);"
    >
      ${args['iconsToShow'].sort().map(
        (iconName) => html`
          <div
            style="
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: var(--atp-space-m) var(--atp-space-s);
                gap: var(--atp-space-s);
                border: 1px solid var(--atp-element-border-primary-strong-enabled);
                border-radius: var(--atp-border-radius-m);
                text-align: center;
              "
          >
            <atp-icon
              icon=${iconName.replace('icon-', '')}
              .height=${args['height']}
              .color=${args['color']}
            ></atp-icon>
            <span>${iconName.replace('icon-', '')}</span>
          </div>
        `,
      )}
    </div>`,
  parameters: {
    docs: {
      source: {
        code: '<atp-icon .badge="${badge}" .icon="${icon}" .height=${height} .color="${color}"></atp-icon>',
      },
    },
  },
};
