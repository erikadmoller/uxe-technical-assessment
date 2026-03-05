import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {withActions} from 'storybook/actions/decorator';
import {html} from 'lit';
import '../tag/tag';
import {TooltipDisplay, TooltipInlineAlign} from './tooltip';

import './tooltip';

const meta: Meta = {
  component: 'atp-tooltip',
  title: 'Components/Tooltip',
  tags: ['autodocs'],
  parameters: {
    docs: {
      component: 'Tooltip',
    },
  },
  decorators: [withActions],
  argTypes: {
    display: {
      options: [TooltipDisplay.INLINE_BLOCK, TooltipDisplay.BLOCK],
      control: {type: 'inline-radio'},
    },
    inlineAlign: {
      options: [TooltipInlineAlign.CENTER, TooltipInlineAlign.START, TooltipInlineAlign.END],
      control: {type: 'inline-radio'},
    },
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    display: TooltipDisplay.INLINE_BLOCK,
    inlineAlign: TooltipInlineAlign.CENTER,
  },
  render: ({display, inlineAlign}) =>
    html`
      <!-- scroll container  -->
      <div style="block-size: 100vb; overflow: auto;">
        <p>
          Here's an example sentence that has
          <atp-tooltip .display=${display} .inlineAlign=${inlineAlign}>
            <span slot="trigger"><strong>some trigger text</strong></span>
            <span slot="tooltip">And here's a tooltip for it.</span>
          </atp-tooltip>
          in the middle of it. Hover over (or focus) that text to see the tooltip.
        </p>

        <p>
          <atp-tooltip .display=${display} .inlineAlign=${inlineAlign}>
            <span slot="trigger"><atp-tag label="This trigger tag"></atp-tag></span>
            <span slot="tooltip"
              >And here's a tooltip that is really really really really really really really really
              really long.
            </span>
          </atp-tooltip>

          has a tooltip with very long content, so you can see that tooltips have a maximum width.
        </p>

        <p style="text-align: end">
          There's also a tooltip for
          <atp-tooltip .display=${display} .inlineAlign=${inlineAlign}>
            <span slot="trigger"><atp-tag label="This right-aligned tag"></atp-tag></span>
            <span slot="tooltip"
              ><span style="white-space:nowrap">This is a long tooltip for the tag.</span></span
            >
          </atp-tooltip>
        </p>

        <p style="margin-block-start: var(--atp-space-l)">
          To see a a tooltip that sits below, to the left, or to the right of the trigger:
        </p>
        <ul>
          <li>
            <strong>Below:</strong> scroll down until one of the triggers is right at the top of the
            viewport.
          </li>
          <li>
            <strong>Left or right:</strong> view the Primary story directly (not through the
            overview Docs page.) That will position the trigger tags (above) at the left and right
            edges of the viewport.
          </li>
        </ul>
        <p>
          In this example,
          <atp-tooltip .display=${display} .inlineAlign=${inlineAlign}>
            <span slot="trigger"><strong>the trigger</strong></span>
            <span slot="tooltip"></span>
          </atp-tooltip>
          doesn't do anything because the tooltip content is empty, so we don't render a tooltip.
        </p>

        <p>
          And in this example,
          <atp-tooltip .display=${display} .inlineAlign=${inlineAlign}>
            <span slot="trigger"><strong>the trigger</strong></span>
          </atp-tooltip>
          also doesn't do anything because the there's no tooltip content slot at all.
        </p>
        <p style="margin-block-start: var(--atp-space-xl)">
          Here is some more content so that you can scroll down far enough to get a trigger to the
          very top of the window:
        </p>
        <p>more content</p>
        <p>more content</p>
        <p>more content</p>
        <p>more content</p>
        <p>more content</p>
        <p>more content</p>
        <p>more content</p>
        <p>more content</p>
        <p>more content</p>
        <p>more content</p>
        <p>more content</p>
        <p>more content</p>
        <p>more content</p>
        <p>more content</p>
        <p>more content</p>
        <p>more content</p>
      </div>
    `,
  parameters: {
    docs: {
      source: {
        code: ` 
        <atp-tooltip>
          <span slot="trigger">Trigger content</span>
          <span slot="tooltip">Tooltip content</span>
        </atp-tooltip>`,
      },
    },
  },
};

export const Display: Story = {
  args: {
    display: TooltipDisplay.INLINE_BLOCK,
    inlineAlign: TooltipInlineAlign.CENTER,
  },
  render: ({display, inlineAlign}) =>
    html`
      <p>
        Setting the <code>display</code> property changes the CSS <code>display</code> property on
        the tooltip container and the trigger.
        <atp-tooltip .display=${display} .inlineAlign=${inlineAlign}>
          <span slot="trigger"><strong>This trigger</strong></span>
          <span slot="tooltip">And here's a tooltip.</span>
        </atp-tooltip>
        is using block, rather than the default of inline-block.
      </p>
    `,
  parameters: {
    docs: {
      source: {
        code: ` 
        <atp-tooltip [display]="{{TooltipDisplay.BLOCK}}">
          <span slot="trigger">Trigger content</span>
          <span slot="tooltip">Tooltip content</span>
        </atp-tooltip>`,
      },
    },
  },
};

export const InlineAlign: Story = {
  render: () =>
    html`
      <!-- scroll container  -->
      <div style="block-size: 100vb; overflow: auto;">
        <div
          style="display: flex; flex-direction: column; gap: var(--atp-space-l); margin-top: var(--atp-space-l);"
        >
          <p>
            This
            <atp-tooltip
              .display=${TooltipDisplay.INLINE_BLOCK}
              .inlineAlign=${TooltipInlineAlign.START}
            >
              <span slot="trigger">
                <span
                  style="background-color: var(--atp-element-fill-green-medium-enabled); padding: 0 var(--atp-space-xs);"
                >
                  inline trigger
                </span>
              </span>
              <span slot="tooltip"><span style="white-space:nowrap">Here it is.</span></span>
            </atp-tooltip>
            has a tooltip that will be aligned to the start (left).
          </p>

          <atp-tooltip .display=${TooltipDisplay.BLOCK} .inlineAlign=${TooltipInlineAlign.START}>
            <span slot="trigger">
              <div
                style="background-color: var(--atp-element-fill-green-medium-enabled); display: block; padding: var(--atp-space-s);"
              >
                This is a block-level trigger. Its tooltip will be aligned to the start (left).
              </div>
            </span>
            <span slot="tooltip"><span style="white-space:nowrap">Here it is.</span></span>
          </atp-tooltip>

          <p>
            This
            <atp-tooltip
              .display=${TooltipDisplay.INLINE_BLOCK}
              .inlineAlign=${TooltipInlineAlign.END}
            >
              <span slot="trigger">
                <span
                  style="background-color: var(--atp-element-fill-green-medium-enabled); padding: 0 var(--atp-space-xs);"
                >
                  inline trigger
                </span>
              </span>
              <span slot="tooltip"><span style="white-space:nowrap">Here it is.</span></span>
            </atp-tooltip>
            has a tooltip that will be aligned to the end (right).
          </p>

          <atp-tooltip .display=${TooltipDisplay.BLOCK} .inlineAlign=${TooltipInlineAlign.END}>
            <span slot="trigger">
              <div
                style="background-color: var(--atp-element-fill-green-medium-enabled); display: block; padding: var(--atp-space-s);"
              >
                This is a block-level trigger. Its tooltip will be aligned to the end (right).
              </div>
            </span>
            <span slot="tooltip"><span style="white-space:nowrap">Here it is.</span></span>
          </atp-tooltip>
        </div>
      </div>
    `,
  parameters: {
    docs: {
      source: {
        code: ` 
        <atp-tooltip .inlineAlign="TooltipInlineAlign.START">
          <span slot="trigger">Trigger content</span>
          <span slot="tooltip">Tooltip content</span>
        </atp-tooltip>`,
      },
    },
  },
};
