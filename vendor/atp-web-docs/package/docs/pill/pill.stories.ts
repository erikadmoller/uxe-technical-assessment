import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {withActions} from 'storybook/actions/decorator';
import {html} from 'lit';
import './pill';
import {PillAppearance, PillColor} from './pill';

const meta: Meta = {
  component: 'atp-pill',
  title: 'Components/Pill',
  tags: ['autodocs'],
  parameters: {
    docs: {
      component: 'Pill',
    },
    actions: {
      handles: ['pillClickEventOutput'],
    },
  },
  decorators: [withActions],
  argTypes: {
    appearance: {
      options: [PillAppearance.FILL, PillAppearance.OUTLINE],
      control: {type: 'inline-radio'},
    },
    color: {
      options: [
        PillColor.BLUE,
        PillColor.DARK_BLUE,
        PillColor.GREEN,
        PillColor.ORANGE,
        PillColor.PINK,
        PillColor.PURPLE,
        PillColor.RED,
      ],
      control: {type: 'inline-radio'},
    },
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    label: 'Pill label',
    iconLeft: {icon: 'help', height: 14},
    iconRight: {icon: 'help', height: 14},
    appearance: PillAppearance.FILL,
    color: PillColor.BLUE,
    isAction: false,
    disabled: false,
  },
  render: ({label, iconLeft, iconRight, appearance, color, isAction, disabled}) =>
    html`<atp-pill
      .label=${label}
      .iconLeft=${iconLeft}
      .iconRight=${iconRight}
      .appearance=${appearance}
      .color=${color}
      .isAction=${isAction}
      .disabled=${disabled}
    ></atp-pill>`,
  parameters: {
    docs: {
      source: {
        code: `<atp-pill
      .label=\${label}
      .iconLeft=\${iconLeft}
      .iconRight=\${iconRight}
      .appearance=\${appearance}
      .color=\${color}
      .isAction=\${isAction}
      .disabled=\${disabled}
    ></atp-pill>`,
      },
    },
  },
};
