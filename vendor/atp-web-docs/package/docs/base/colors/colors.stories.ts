import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';

const meta: Meta = {
  component: 'Colors',
  title: 'Foundations/Colors',
  parameters: {
    docs: {
      component: 'Colors',
    },
  },

  argTypes: {},
};

export default meta;

type Story = StoryObj;

export const Text: Story = {
  render: () => html`
    <style>
      .font-colors {
        display: flex;
        flex-direction: column;
        gap: var(--atp-space-xs);
        margin-block-start: var(--atp-space-xs);
      }
      .example {
        padding: var(--atp-space-xs);
        border: 1px solid var(--atp-element-border-primary-medium-enabled);
        border-radius: var(--atp-border-radius-m);
      }
      .inverse {
        background: var(--atp-element-fill-primary-strong-enabled);
      }
    </style>

    <div class="atp-display-flex atp-gap-xl" style="margin-inline-start: var(--atp-space-s)">
      <div>
        <h3>Regular text colors</h3>
        <div class="font-colors">
          <div class="example atp-color-strong">
            <code>.atp-color-strong</code>
          </div>

          <div class="example atp-color-medium">
            <code>.atp-color-medium</code>
          </div>

          <div class="example atp-color-weak">
            <code>.atp-color-weak</code>
          </div>

          <div class="example atp-color-inverse inverse">
            <code>.atp-color-inverse</code>
          </div>
        </div>
      </div>

      <div>
        <h3>Disabled text colors</h3>
        <div class="font-colors">
          <div class="example atp-color-strong-disabled">
            <code>.atp-color-strong-disabled</code>
          </div>

          <div class="example atp-color-medium-disabled">
            <code>.atp-color-medium-disabled</code>
          </div>

          <div class="example atp-color-weak-disabled">
            <code>.atp-color-weak-disabled</code>
          </div>
        </div>
      </div>
    </div>
  `,
};

const paletteColorsToShow = [
  [
    '--atp-blue-100',
    '--atp-blue-200',
    '--atp-blue-300',
    '--atp-blue-400',
    '--atp-blue-500',
    '--atp-blue-600',
    '--atp-blue-700',
    '--atp-blue-800',
    '--atp-blue-900',
  ],
  [
    '--atp-green-100',
    '--atp-green-200',
    '--atp-green-300',
    '--atp-green-400',
    '--atp-green-500',
    '--atp-green-600',
    '--atp-green-700',
    '--atp-green-800',
    '--atp-green-900',
  ],
  [
    '--atp-neutral-0',
    '--atp-neutral-100',
    '--atp-neutral-200',
    '--atp-neutral-300',
    '--atp-neutral-400',
    '--atp-neutral-500',
    '--atp-neutral-600',
    '--atp-neutral-700',
    '--atp-neutral-800',
    '--atp-neutral-900',
  ],
  [
    '--atp-orange-100',
    '--atp-orange-200',
    '--atp-orange-300',
    '--atp-orange-400',
    '--atp-orange-500',
    '--atp-orange-600',
    '--atp-orange-700',
    '--atp-orange-800',
    '--atp-orange-900',
  ],
  [
    '--atp-purple-100',
    '--atp-purple-200',
    '--atp-purple-300',
    '--atp-purple-400',
    '--atp-purple-500',
    '--atp-purple-600',
    '--atp-purple-700',
    '--atp-purple-800',
    '--atp-purple-900',
  ],
  [
    '--atp-red-100',
    '--atp-red-200',
    '--atp-red-300',
    '--atp-red-400',
    '--atp-red-500',
    '--atp-red-600',
    '--atp-red-700',
    '--atp-red-800',
    '--atp-red-900',
  ],
  [
    '--atp-slate-50',
    '--atp-slate-100',
    '--atp-slate-200',
    '--atp-slate-300',
    '--atp-slate-400',
    '--atp-slate-500',
    '--atp-slate-600',
    '--atp-slate-700',
    '--atp-slate-800',
    '--atp-slate-900',
    '--atp-slate-1000',
  ],
];

let paletteContent = '';
paletteColorsToShow.forEach((category) => {
  paletteContent += '<div class="palette-category">';
  category.forEach((color) => {
    paletteContent += `<div class="palette-color" style="background: var(${color})"><span class="name">${color}</span></div>`;
  });
  paletteContent += '</div>';
});
const paletteNode = document.createElement('div');
paletteNode.classList.add('palette-container');
paletteNode.innerHTML = paletteContent;

export const Palette: Story = {
  render: () => html`
    <style>
      .palette-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: var(--atp-space-s) var(--atp-space-xxs);
      }
      .palette-category {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        height: 100%;
      }
      .palette-color {
        padding: var(--atp-space-xxs);
        text-align: center;
        border: 1px dashed hsl(0 0% 80%);
      }
      .palette-color .name {
        padding: var(--atp-space-xxxs);
        font-size: var(--atp-font-size-body-xs);
        background: hsl(0 0 100% / 80%);
        border-radius: var(--atp-border-radius-s);
        text-shadow: 0 0 2px hsl(0 0 100%);
      }
    </style>
    ${paletteNode}
  `,
};
