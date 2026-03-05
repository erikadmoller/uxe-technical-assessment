import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {withActions} from 'storybook/actions/decorator';
import {html} from 'lit';
import './tag';
import {TagAppearance, TagColor} from './tag';

const meta: Meta = {
  component: 'atp-tag',
  title: 'Components/Tag',
  tags: ['autodocs'],
  parameters: {
    docs: {
      component: 'Tag',
    },
    actions: {
      handles: ['clickEventOutput'],
    },
  },
  decorators: [withActions],
  argTypes: {
    label: {},
    icon: {},
    isAction: {},
    disabled: {},
    appearance: {options: [TagAppearance.FILL, TagAppearance.FILL_DARK, TagAppearance.OUTLINE]},
    color: {
      options: [
        TagColor.BLUE,
        TagColor.GREEN,
        TagColor.ORANGE,
        TagColor.PINK,
        TagColor.PURPLE,
        TagColor.UTILITY_BLUE,
        TagColor.DARK_SLATE,
        TagColor.LIGHT_SLATE,
      ],
      control: {type: 'inline-radio'},
    },
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    label: 'Hello world',
    icon: {icon: 'x', height: 16},
    isAction: true,
    disabled: false,
    appearance: TagAppearance.FILL,
    color: TagColor.BLUE,
  },
  render: ({label, appearance, icon, isAction, disabled, color}) =>
    html`<atp-tag
      .label=${label}
      .icon=${icon}
      .isAction=${isAction}
      .disabled=${disabled}
      .color=${color}
      .appearance=${appearance}
    ></atp-tag>`,
  parameters: {
    docs: {
      source: {
        code: '<atp-tag label="Hello world"></atp-tag>',
      },
    },
  },
};
