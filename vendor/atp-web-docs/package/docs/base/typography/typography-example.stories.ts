import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';

const meta: Meta = {
  component: 'Typography',
  title: 'Foundations/Typography/Typography Examples',

  parameters: {
    docs: {
      component: 'Typography',
    },
  },

  argTypes: {},
};

export default meta;

type Story = StoryObj;

const markup = html`
  <h1 class="atp-heading-l atp-font-weight-bold">
    Page title as H1, using Heading L and Font Weight Bold
  </h1>
  <h2 class="atp-heading-m">H2 section heading using Heading M, followed by text</h2>
  <p class="atp-body-m">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </p>
  <h3 class="atp-heading-s atp-font-weight-semi-bold">
    H3 subheading using Heading S and Font Weight Semi-Bold, followed by text
  </h3>
  <p class="atp-body-m">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </p>
  <h2 class="atp-heading-m">H2 section heading using Heading M, followed by text</h2>
  <p class="atp-body-m">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </p>
  <p class="atp-body-m">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </p>
`;

export const Primary: Story = {
  render: () => markup,
};

Primary.args = {};

export const Headings: Story = {
  render: () => html`
    <div class="atp-heading-xl">
      Heading XL: Inter is a humanist typeface, with a soft, friendly appearance; it has organic,
      open forms based on handwritten text.
    </div>
    <div class="atp-heading-l">
      Heading L: Inter is a humanist typeface, with a soft, friendly appearance; it has organic,
      open forms based on handwritten text.
    </div>
    <div class="atp-heading-m">
      Heading M: Inter is a humanist typeface, with a soft, friendly appearance; it has organic,
      open forms based on handwritten text.
    </div>
    <div class="atp-heading-s">
      Heading S: Inter is a humanist typeface, with a soft, friendly appearance; it has organic,
      open forms based on handwritten text.
    </div>
    <div class="atp-heading-xs">
      Heading XS: Inter is a humanist typeface, with a soft, friendly appearance; it has organic,
      open forms based on handwritten text.
    </div>
  `,
};

export const Body: Story = {
  render: () => html`
    <div class="atp-body-l">
      Body L: Inter is a humanist typeface, with a soft, friendly appearance; it has organic, open
      forms based on handwritten text.
    </div>
    <div class="atp-body-m">
      Body M: Inter is a humanist typeface, with a soft, friendly appearance; it has organic, open
      forms based on handwritten text.
    </div>
    <div class="atp-body-s">
      Body S: Inter is a humanist typeface, with a soft, friendly appearance; it has organic, open
      forms based on handwritten text.
    </div>
    <div class="atp-body-xs">
      Body XS: Inter is a humanist typeface, with a soft, friendly appearance; it has organic, open
      forms based on handwritten text.
    </div>
  `,
};

export const HeadingXL: Story = {
  render: () => html`
    <div class="atp-heading-xl">
      Inter is a humanist typeface, with a soft, friendly appearance; it has organic, open forms
      based on handwritten text.
    </div>
  `,
};

export const HeadingL: Story = {
  render: () => html`
    <div class="atp-heading-l">
      Inter is a humanist typeface, with a soft, friendly appearance; it has organic, open forms
      based on handwritten text.
    </div>
  `,
};

export const HeadingM: Story = {
  render: () => html`
    <div class="atp-heading-m">
      Inter is a humanist typeface, with a soft, friendly appearance; it has organic, open forms
      based on handwritten text.
    </div>
  `,
};

export const HeadingS: Story = {
  render: () => html`
    <div class="atp-heading-s">
      Inter is a humanist typeface, with a soft, friendly appearance; it has organic, open forms
      based on handwritten text.
    </div>
  `,
};

export const HeadingXS: Story = {
  render: () => html`
    <div class="atp-heading-xs">
      Inter is a humanist typeface, with a soft, friendly appearance; it has organic, open forms
      based on handwritten text.
    </div>
  `,
};

export const BodyL: Story = {
  render: () => html`
    <div class="atp-body-l">
      Inter is a humanist typeface, with a soft, friendly appearance; it has organic, open forms
      based on handwritten text.
    </div>
  `,
};

export const BodyM: Story = {
  render: () => html`
    <div class="atp-body-m">
      Inter is a humanist typeface, with a soft, friendly appearance; it has organic, open forms
      based on handwritten text.
    </div>
  `,
};

export const BodyS: Story = {
  render: () => html`
    <div class="atp-body-s">
      Inter is a humanist typeface, with a soft, friendly appearance; it has organic, open forms
      based on handwritten text.
    </div>
  `,
};

export const BodyXS: Story = {
  render: () => html`
    <div class="atp-body-xs">
      Inter is a humanist typeface, with a soft, friendly appearance; it has organic, open forms
      based on handwritten text.
    </div>
  `,
};

export const FontWeights: Story = {
  render: () => html`
    <div class="atp-font-weight-bold">
      Bold: Inter is a humanist typeface, with a soft, friendly appearance; it has organic, open
      forms based on handwritten text.
    </div>
    <div class="atp-font-weight-semibold">
      Semi-Bold: Inter is a humanist typeface, with a soft, friendly appearance; it has organic,
      open forms based on handwritten text.
    </div>
    <div class="atp-font-weight-medium">
      Medium: Inter is a humanist typeface, with a soft, friendly appearance; it has organic, open
      forms based on handwritten text.
    </div>
    <div class="atp-font-weight-regular">
      Regular: Inter is a humanist typeface, with a soft, friendly appearance; it has organic, open
      forms based on handwritten text.
    </div>
    <div class="atp-font-weight-light">
      Light: Inter is a humanist typeface, with a soft, friendly appearance; it has organic, open
      forms based on handwritten text.
    </div>
  `,
};

export const FontWeightBold: Story = {
  render: () => html`
    <div class="atp-font-weight-bold">
      Inter is a humanist typeface, with a soft, friendly appearance; it has organic, open forms
      based on handwritten text.
    </div>
  `,
};

export const FontWeightSemiBold: Story = {
  render: () => html`
    <div class="atp-font-weight-semi-bold">
      Inter is a humanist typeface, with a soft, friendly appearance; it has organic, open forms
      based on handwritten text.
    </div>
  `,
};

export const FontWeightMedium: Story = {
  render: () => html`
    <div class="atp-font-weight-medium">
      Inter is a humanist typeface, with a soft, friendly appearance; it has organic, open forms
      based on handwritten text.
    </div>
  `,
};

export const FontWeightRegular: Story = {
  render: () => html`
    <div class="atp-font-weight-regular">
      Inter is a humanist typeface, with a soft, friendly appearance; it has organic, open forms
      based on handwritten text.
    </div>
  `,
};

export const FontWeightLight: Story = {
  render: () => html`
    <div class="atp-font-weight-light">
      Inter is a humanist typeface, with a soft, friendly appearance; it has organic, open forms
      based on handwritten text.
    </div>
  `,
};
