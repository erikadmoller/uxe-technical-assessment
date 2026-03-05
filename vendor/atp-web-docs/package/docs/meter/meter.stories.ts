import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {withActions} from 'storybook/actions/decorator';
import './meter';
import {MeterAppearance} from './meter';

const meta: Meta = {
  component: 'atp-meter',
  title: 'Components/Meter',
  tags: ['autodocs'],
  parameters: {
    docs: {
      component: 'Meter',
    },
  },
  decorators: [withActions],
  argTypes: {
    min: {},
    max: {},
    value: {},
    appearance: {
      options: [MeterAppearance.DEFAULT, MeterAppearance.CIRCLE],
      control: {type: 'inline-radio'},
    },
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    min: null,
    max: 5,
    value: 3,
    appearance: MeterAppearance.DEFAULT,
  },
  parameters: {
    docs: {
      source: {
        code: `<atp-meter max="5" value="3"></atp-meter>`,
      },
    },
  },
};

export const WithMinValue: Story = {
  args: {
    min: 3,
    max: 5,
    value: 4,
    appearance: MeterAppearance.DEFAULT,
  },
  parameters: {
    docs: {
      source: {
        code: `<atp-meter min="3" max="5" value="4"></atp-meter>`,
      },
    },
  },
};

export const Circle: Story = {
  args: {
    min: null,
    max: 5,
    value: 2,
    appearance: MeterAppearance.CIRCLE,
  },

  parameters: {
    docs: {
      source: {
        code: `<atp-meter appearance="circle" max="5" value="2"></atp-meter>`,
      },
    },
  },
};
