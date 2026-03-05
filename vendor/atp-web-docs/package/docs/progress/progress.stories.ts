import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {withActions} from 'storybook/actions/decorator';
import './progress';
import {ProgressAppearance} from './progress';

const meta: Meta = {
  component: 'atp-progress',
  title: 'Components/Progress',
  tags: ['autodocs'],
  parameters: {
    docs: {
      component: 'Progress',
    },
  },
  decorators: [withActions],
  argTypes: {
    max: {},
    value: {},
    appearance: {
      options: [ProgressAppearance.DEFAULT, ProgressAppearance.CIRCLE],
      control: {type: 'inline-radio'},
    },
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    max: 5,
    value: 3,
    appearance: ProgressAppearance.DEFAULT,
  },
  parameters: {
    docs: {
      source: {
        code: `<atp-progress max="5" value="3"></atp-progress>`,
      },
    },
  },
};

export const Circle: Story = {
  args: {
    max: 5,
    value: 2,
    appearance: ProgressAppearance.CIRCLE,
  },
  parameters: {
    docs: {
      source: {
        code: `<atp-progress appearance="circle" max="5" value="2"></atp-progress>`,
      },
    },
  },
};
