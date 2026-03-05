import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {withActions} from 'storybook/actions/decorator';
import {html} from 'lit';

import {DialogDrawer, DialogPosition} from './dialog';
import {ButtonAppearance} from '../button/button';
import './dialog';

const meta: Meta = {
  component: 'atp-dialog',
  title: 'Components/Dialog',
  tags: ['autodocs'],
  parameters: {
    docs: {
      component: 'Dialog Element',
    },
  },
  decorators: [withActions],
  argTypes: {
    label: {},
    iconConfig: {},
    position: {
      options: [DialogPosition.BLOCK_START, DialogPosition.CENTER],
    },
    drawer: {
      option: [DialogDrawer.BLOCK_START, DialogDrawer.INLINE_END, DialogDrawer.BLOCK_END],
    },
    preventClickOnBackdrop: {
      option: [true, false],
    },
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    label: 'Hello World',
    iconConfig: {
      icon: 'help',
      height: 16,
    },
    position: DialogPosition.BLOCK_START,
    drawer: null,
    preventClickOnBackdrop: false,
  },

  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: var(--atp-space-xs)">
      <atp-button
        onClick="document.getElementById('myDialog').open = true"
        label="Open the dialog"
      ></atp-button>

      <atp-dialog
        id="myDialog"
        .label=${args['label']}
        .iconConfig=${args['iconConfig']}
        .drawer=${args['drawer']}
        .position=${args['position']}
        .preventClickOnBackdrop=${args['preventClickOnBackdrop']}
      >
        <p>
          Some dialog content Etenim, siste, me iuva, auscultaque. Gelu redivit cum inventione
          novissima. Gelu redivit cum inventione novissima. Gelu redivit cum inventione novissima.
        </p>

        <div slot="footer">
          <atp-button label="Other action" .appearance=${ButtonAppearance.OUTLINE}></atp-button>
          <atp-button
            .appearance=${ButtonAppearance.FILL}
            @clickEventOutput=${() => {
              (document.getElementById('myDialog') as any).open = false;
            }}
            label="Close"
          ></atp-button>
        </div>
      </atp-dialog>

      <atp-button
        onClick="document.getElementById('myTallDialog').open = true"
        label="Open the super tall dialog"
      ></atp-button>
      <atp-dialog
        id="myTallDialog"
        .label=${args['label']}
        .iconConfig=${args['iconConfig']}
        .drawer=${args['drawer']}
        .position=${args['position']}
        .preventClickOnBackdrop=${args['preventClickOnBackdrop']}
      >
        <p style="border: 3px dotted pink; height: 110vh">Some dialog content.</p>

        <div slot="footer">
          <atp-button label="Other action" .appearance=${ButtonAppearance.OUTLINE}></atp-button>
          <atp-button
            .appearance=${ButtonAppearance.FILL}
            @clickEventOutput=${() => {
              (document.getElementById('myTallDialog') as any).open = false;
            }}
            label="Close"
          ></atp-button>
        </div>
      </atp-dialog>
    </div>
  `,
  parameters: {
    docs: {
      source: {
        code: `
          <atp-button
            onClick="document.getElementById('myDialog').open = true"
            label="Open the dialog"
          ></atp-button>

          <atp-dialog
            id="myDialog"
            label="Hello World"
            .iconConfig=\${myIconConfig}
          >
            <p>
              Some dialog content Etenim, siste, me iuva, auscultaque. Gelu redivit cum inventione
              novissima. Gelu redivit cum inventione novissima. Gelu redivit cum inventione novissima.
            </p>

            <div slot="footer">
              <atp-button label="Other action" .appearance=\${ButtonAppearance.OUTLINE}></atp-button>
              <atp-button
                .appearance=\${ButtonAppearance.FILL}
                @clickEventOutput=\${() => {
                  (document.getElementById('myDialog') as any).open = false;
                }}
                label="Close"
              ></atp-button>
            </div>
          </atp-dialog>
        `,
      },
    },
  },
};
/* TODO: update stories to include header and other stuff */

export const NoHeaderIcon: Story = {
  args: {
    label: 'Hello World',
    iconConfig: null,
    position: DialogPosition.BLOCK_START,
    drawer: null,
    preventClickOnBackdrop: false,
  },

  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: var(--atp-space-xs)">
      <atp-button
        onClick="document.getElementById('myNoHeaderDialog').open = true"
        label="Open the dialog"
      ></atp-button>

      <atp-dialog
        id="myNoHeaderDialog"
        .label=${args['label']}
        .drawer=${args['drawer']}
        .position=${args['position']}
        .preventClickOnBackdrop=${args['preventClickOnBackdrop']}
      >
        <p>This dialog's header has no icon.</p>

        <div slot="footer">
          <atp-button label="Other action" .appearance=${ButtonAppearance.OUTLINE}></atp-button>
          <atp-button
            .appearance=${ButtonAppearance.FILL}
            @clickEventOutput=${() => {
              (document.getElementById('myNoHeaderDialog') as any).open = false;
            }}
            label="Close"
          ></atp-button>
        </div>
      </atp-dialog>
    </div>
  `,
  parameters: {
    docs: {
      source: {
        code: `
          <atp-button
            onClick="document.getElementById('myDialog').open = true"
            label="Open the dialog"
          ></atp-button>

          <atp-dialog
            id="myDialog"
            label="Hello World"
          >
            <p>This dialog's header has no icon.</p>

            <div slot="footer">
              <atp-button label="Other action" .appearance=\${ButtonAppearance.OUTLINE}></atp-button>
              <atp-button
                .appearance=\${ButtonAppearance.FILL}
                @clickEventOutput=\${() => {
                  (document.getElementById('myDialog') as any).open = false;
                }}
                label="Close"
              ></atp-button>
            </div>
          </atp-dialog>
        `,
      },
    },
  },
};

export const PositionCenter: Story = {
  args: {
    label: 'Hello World',
    iconConfig: {
      icon: 'help',
      height: 16,
    },
    position: DialogPosition.CENTER,
    drawer: null,
    preventClickOnBackdrop: false,
  },

  render: (args) => html`
    <atp-button
      onClick="document.getElementById('myPositionCenterDialog').open = true"
      label="Open the dialog"
    ></atp-button>
    <atp-dialog
      id="myPositionCenterDialog"
      .label=${args['label']}
      .iconConfig=${args['iconConfig']}
      .drawer=${args['drawer']}
      .position=${args['position']}
      .preventClickOnBackdrop=${args['preventClickOnBackdrop']}
    >
      Some dialog content.

      <div slot="footer">
        <atp-button label="Other action" .appearance=${ButtonAppearance.OUTLINE}></atp-button>
        <atp-button
          .appearance=${ButtonAppearance.FILL}
          @clickEventOutput=${() => {
            (document.getElementById('myPositionCenterDialog') as any).open = false;
          }}
          label="Close"
        ></atp-button>
      </div>
    </atp-dialog>
  `,
  parameters: {
    docs: {
      source: {
        code: `
          <atp-button
            onClick="document.getElementById('myDialog').open = true"
            label="Open the dialog"
          ></atp-button>

          <atp-dialog
            id="myDialog"
            label="Hello World"
            .position=\${DialogPosition.center}
            .iconConfig=\${myIconConfig}
          >
            Some dialog content.

            <div slot="footer">
              <atp-button label="Other action" .appearance=\${ButtonAppearance.OUTLINE}></atp-button>
              <atp-button
                .appearance=\${ButtonAppearance.FILL}
                @clickEventOutput=\${() => {
                  (document.getElementById('myDialog') as any).open = false;
                }}
                label="Close"
              ></atp-button>
            </div>
          </atp-dialog>
        `,
      },
    },
  },
};

export const DrawerInlineEnd: Story = {
  args: {
    label: 'Hello World',
    iconConfig: {
      icon: 'help',
      height: 16,
    },
    position: DialogPosition.CENTER,
    drawer: DialogDrawer.INLINE_END,
    preventClickOnBackdrop: false,
  },

  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: var(--atp-space-xs)">
      <atp-button
        onClick="document.getElementById('myDrawerRightDialog').open = true"
        label="Open the dialog"
      ></atp-button>
      <atp-dialog
        id="myDrawerRightDialog"
        .label=${args['label']}
        .iconConfig=${args['iconConfig']}
        .drawer=${args['drawer']}
        .position=${args['position']}
        .preventClickOnBackdrop=${args['preventClickOnBackdrop']}
      >
        Some dialog content.

        <div slot="footer">
          <atp-button label="Other action" .appearance=${ButtonAppearance.OUTLINE}></atp-button>
          <atp-button
            .appearance=${ButtonAppearance.FILL}
            @clickEventOutput=${() => {
              (document.getElementById('myDrawerRightDialog') as any).open = false;
            }}
            label="Close"
          ></atp-button>
        </div>
      </atp-dialog>

      <atp-button
        onClick="document.getElementById('myDrawerRightTallDialog').open = true"
        label="Open a super tall dialog"
      ></atp-button>
      <atp-dialog
        id="myDrawerRightTallDialog"
        .label=${args['label']}
        .iconConfig=${args['iconConfig']}
        .drawer=${args['drawer']}
        .position=${args['position']}
        .preventClickOnBackdrop=${args['preventClickOnBackdrop']}
      >
        <p style="border: 3px dotted pink; height: 110vh">Some dialog content.</p>

        <div slot="footer">
          <atp-button label="Other action" .appearance=${ButtonAppearance.OUTLINE}></atp-button>
          <atp-button
            .appearance=${ButtonAppearance.FILL}
            @clickEventOutput=${() => {
              (document.getElementById('myDrawerRightTallDialog') as any).open = false;
            }}
            label="Close"
          ></atp-button>
        </div>
      </atp-dialog>
    </div>
  `,
  parameters: {
    docs: {
      source: {
        code: `
          <atp-button
            onClick="document.getElementById('myDialog').open = true"
            label="Open the dialog"
          ></atp-button>

          <atp-dialog
            id="myDialog"
            label="Hello World"
            .drawer=\${DialogDrawer.inlineEnd}
            .iconConfig=\${myIconConfig}
          >
            Some dialog content.

            <div slot="footer">
              <atp-button label="Other action" .appearance=\${ButtonAppearance.OUTLINE}></atp-button>
              <atp-button
                .appearance=\${ButtonAppearance.FILL}
                @clickEventOutput=\${() => {
                  (document.getElementById('myDialog') as any).open = false;
                }}
                label="Close"
              ></atp-button>
            </div>
          </atp-dialog>
        `,
      },
    },
  },
};
DrawerInlineEnd.storyName = 'Drawer Inline End (Right)';

export const DrawerBlockStart: Story = {
  args: {
    label: 'Hello World',
    iconConfig: {
      icon: 'help',
      height: 16,
    },
    position: DialogPosition.CENTER,
    drawer: DialogDrawer.BLOCK_START,
    preventClickOnBackdrop: false,
  },

  render: (args) => html`
    <atp-button
      onClick="document.getElementById('myDrawerTopDialog').open = true"
      label="Open the dialog"
    ></atp-button>
    <atp-dialog
      id="myDrawerTopDialog"
      .label=${args['label']}
      .iconConfig=${args['iconConfig']}
      .drawer=${args['drawer']}
      .position=${args['position']}
      .preventClickOnBackdrop=${args['preventClickOnBackdrop']}
    >
      Some dialog content.

      <div slot="footer">
        <atp-button label="Other action" .appearance=${ButtonAppearance.OUTLINE}></atp-button>
        <atp-button
          .appearance=${ButtonAppearance.FILL}
          @clickEventOutput=${() => {
            (document.getElementById('myDrawerTopDialog') as any).open = false;
          }}
          label="Close"
        ></atp-button>
      </div>
    </atp-dialog>
  `,
  parameters: {
    docs: {
      source: {
        code: `
          <atp-button
            onClick="document.getElementById('myDialog').open = true"
            label="Open the dialog"
          ></atp-button>

          <atp-dialog
            id="myDialog"
            label="Hello World"
            .drawer=\${DialogDrawer.BLOCK_START}
            .iconConfig=\${myIconConfig}
          >
            Some dialog content.

            <div slot="footer">
              <atp-button label="Other action" .appearance=\${ButtonAppearance.OUTLINE}></atp-button>
              <atp-button
                .appearance=\${ButtonAppearance.FILL}
                @clickEventOutput=\${() => {
                  (document.getElementById('myDialog') as any).open = false;
                }}
                label="Close"
              ></atp-button>
            </div>
          </atp-dialog>
        `,
      },
    },
  },
};
DrawerBlockStart.storyName = 'Drawer Block Start (Top)';

export const DrawerBlockEnd: Story = {
  args: {
    label: 'Hello World',
    iconConfig: {
      icon: 'help',
      height: 16,
    },
    position: DialogPosition.CENTER,
    drawer: DialogDrawer.BLOCK_END,
    preventClickOnBackdrop: false,
  },

  render: (args) => html`
    <atp-button
      onClick="document.getElementById('myDrawerBottomDialog').open = true"
      label="Open the dialog"
    ></atp-button>
    <atp-dialog
      id="myDrawerBottomDialog"
      .label=${args['label']}
      .iconConfig=${args['iconConfig']}
      .drawer=${args['drawer']}
      .position=${args['position']}
      .preventClickOnBackdrop=${args['preventClickOnBackdrop']}
    >
      Some dialog content.

      <div slot="footer">
        <atp-button label="Other action" .appearance=${ButtonAppearance.OUTLINE}></atp-button>
        <atp-button
          .appearance=${ButtonAppearance.FILL}
          @clickEventOutput=${() => {
            (document.getElementById('myDrawerBottomDialog') as any).open = false;
          }}
          label="Close"
        ></atp-button>
      </div>
    </atp-dialog>
  `,
  parameters: {
    docs: {
      source: {
        code: `
          <atp-button
            onClick="document.getElementById('myDialog').open = true"
            label="Open the dialog"
          ></atp-button>

          <atp-dialog
            id="myDialog"
            label="Hello World"
            .drawer=\${DialogDrawer.BLOCK_END}
            .iconConfig=\${myIconConfig}}
          >
            Some dialog content.

            <div slot="footer">
              <atp-button label="Other action" .appearance=\${ButtonAppearance.OUTLINE}></atp-button>
              <atp-button
                .appearance=\${ButtonAppearance.FILL}
                @clickEventOutput=\${() => {
                  (document.getElementById('myDialog') as any).open = false;
                }}
                label="Close"
              ></atp-button>
            </div>
          </atp-dialog>
        `,
      },
    },
  },
};
DrawerBlockEnd.storyName = 'Drawer Block End (Bottom)';

export const PreventClickOnBackdrop: Story = {
  args: {
    label: 'Hello World',
    iconConfig: {
      icon: 'help',
      height: 16,
    },
    position: DialogPosition.BLOCK_START,
    drawer: null,
    preventClickOnBackdrop: true,
  },

  render: (args) => html`
    <atp-button
      onClick="document.getElementById('myBackdropUnclickableDialog').open = true"
      label="Open the dialog"
    ></atp-button>
    <atp-dialog
      id="myBackdropUnclickableDialog"
      .label=${args['label']}
      .iconConfig=${args['iconConfig']}
      .drawer=${args['drawer']}
      .position=${args['position']}
      .preventClickOnBackdrop=${args['preventClickOnBackdrop']}
    >
      Some dialog content.

      <div slot="footer">
        <atp-button label="Other action" .appearance=${ButtonAppearance.OUTLINE}></atp-button>
        <atp-button
          .appearance=${ButtonAppearance.FILL}
          @clickEventOutput=${() => {
            (document.getElementById('myBackdropUnclickableDialog') as any).open = false;
          }}
          label="Close"
        ></atp-button>
      </div>
    </atp-dialog>
  `,
  parameters: {
    docs: {
      source: {
        code: `
          <atp-button
            onClick="document.getElementById('myDialog').open = true"
            label="Open the dialog"
          ></atp-button>

          <atp-dialog
            id="myDialog"
            label="Hello World"
            .iconConfig=\${myIconConfig}
            .preventClickOnBackdrop=\${true}
          >
            Some dialog content.

            <div slot="footer">
              <atp-button label="Other action" .appearance=\${ButtonAppearance.OUTLINE}></atp-button>
              <atp-button
                .appearance=\${ButtonAppearance.FILL}
                @clickEventOutput=\${() => {
                  (document.getElementById('myDialog') as any).open = false;
                }}
                label="Close"
              ></atp-button>
            </div>
          </atp-dialog>
        `,
      },
    },
  },
};
