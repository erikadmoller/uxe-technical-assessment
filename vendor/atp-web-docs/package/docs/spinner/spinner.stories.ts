import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {withActions} from 'storybook/actions/decorator';
import {html} from 'lit';
import './spinner';
import {SpinnerColor, SpinnerSize} from './spinner';

const meta: Meta = {
  component: 'atp-spinner',
  title: 'Components/Spinner',
  tags: ['autodocs'],
  parameters: {
    docs: {
      component: 'Spinner',
    },
    actions: {
      handles: [],
    },
  },
  decorators: [withActions],
  argTypes: {
    size: {
      options: [SpinnerSize.XXL, SpinnerSize.XL, SpinnerSize.L, SpinnerSize.M, SpinnerSize.S],
      control: {type: 'inline-radio'},
    },
    color: {
      options: [SpinnerColor.SLATE, SpinnerColor.WHITE, SpinnerColor.RED],
      control: {type: 'inline-radio'},
    },
    isWaiting: {
      options: [true, false],
      control: {type: 'inline-radio'},
    },
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    color: SpinnerColor.SLATE,
    size: SpinnerSize.M,
    isWaiting: false,
    progress: 50,
  },
  render: ({size, color, isWaiting, progress}) =>
    html` <div
      style="width: fit-content; padding: var(--atp-space-s);background-color: ${color ===
      SpinnerColor.WHITE
        ? 'var(--atp-content-primary-medium-enabled)'
        : 'transparent'}"
    >
      <atp-spinner
        .isWaiting=${isWaiting}
        .progress=${progress}
        .size=${size}
        .color=${color}
      ></atp-spinner>
    </div>`,
  parameters: {
    docs: {
      source: {
        code: `
        
        <!-- Angular example -->
        <atp-spinner isWaiting="true" progress="50" [size]="SpinnerSize.xxlarge" [color]="SpinnerColor.slate"></atp-spinner>`,
      },
    },
  },
};
