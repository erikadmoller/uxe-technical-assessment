import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {withActions} from 'storybook/actions/decorator';
import {html} from 'lit';
import './input';
import '../dropdown/dropdown';
import {DropdownPosition} from './input';

const meta: Meta = {
  component: 'atp-input',
  title: 'Components/Input',
  tags: ['autodocs'],
  parameters: {
    docs: {
      component: 'Input',
    },
    actions: {
      handles: [],
    },
  },
  decorators: [withActions],
  argTypes: {
    dropdownPosition: {
      options: [DropdownPosition.LEFT, DropdownPosition.RIGHT],
      control: {type: 'inline-radio'},
    },
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    required: true,
    iconLeft: {icon: 'search', height: 16},
    isError: false,
    disabled: false,
  },
  render: ({required, iconLeft, isError, disabled}) =>
    html` <atp-input
      style="max-width: 385px; display: block;"
      class="atp-body-s"
      .required=${required}
      .iconLeft=${iconLeft}
      .isError=${isError}
      .disabled=${disabled}
    >
      <label slot="label" for="test-id" id="label">This is a label</label>
      <input aria-describedby="help-text" name="test-id" id="test-id" type="text" />
      <span slot="help-text" id="help-text">This is some help text</span>
    </atp-input>`,
  parameters: {
    docs: {
      source: {
        code: `
        <!--TODO: add examples for different frameworks, as this only works in certain JS contexts -->
        <atp-input
          .required=\${required}
          .iconLeft=\${iconLeft}
          .isError=\${isError}
          .disabled=\${disabled}
        >
        <label slot="label" for="myExampleInput" id="myExampleLabel">This is a label</label>
        <input aria-describedby="myHelpText" name="myExampleName" id="myExampleInput" type="text" />
        <span slot="help-text" id="myHelpText">This is some help text</span>
      </atp-input>`,
      },
    },
  },
};

export const Select: Story = {
  args: {
    itemsList: Array(10)
      .fill(0)
      .map((item, i) => {
        return {name: `Item ${i}`, id: `Item ${i}`};
      }),
    activeIds: [],
    required: true,
    iconLeft: null,
    iconRight: {icon: 'chevron-down', height: 16, label: 'Toggle dropdown menu'},
    isError: false,
    disabled: false,
  },
  render: ({required, iconLeft, iconRight, isError, disabled, itemsList, activeIds}) =>
    html` <style>
        .input {
          max-width: 300px;
          display: block;
          margin-left: 100px;
        }
      </style>

      <atp-input
        id="input"
        class="input atp-body-s"
        .required=${required}
        .iconLeft=${iconLeft}
        .iconRight=${iconRight}
        .iconRightClickable=${true}
        .isError=${isError}
        .disabled=${disabled}
      >
        <label slot="label" for="form-field" id="label">This is a label</label>
        <input
          placeholder="Select An Option"
          aria-describedby="help-text"
          name="form-field"
          id="form-field"
          type="text" />
        <span slot="help-text" id="help-text">This is some help text</span>
        <atp-dropdown
          class="dropdown"
          slot="dropdown"
          id="dropdown"
          .itemsList=${itemsList}
          .activeIds=${activeIds}
        ></atp-dropdown
      ></atp-input>

      <script>
        inputField = document.getElementById('form-field');
        dropdown = document.getElementById('dropdown');

        dropdown?.addEventListener('itemSelectedOutput', ({detail}) => {
          dropdown.activeIds = [detail[0]];
          inputField.value = detail[0];
        });
      </script>`,
  parameters: {
    docs: {
      source: {
        code: ` 
    <!--TODO: add examples for different frameworks, as this only works in certain JS contexts -->
        
        <style>
        .input {
          max-width: 385px;
          display: block;
        }
      </style>

      <atp-input
        id="input"
        class="input"
        .required=\${required}
        .iconLeft=\${iconLeft}
        .iconRight=\${iconRight}
        .isError=\${isError}
        .disabled=\${disabled}
        >
        <label slot="label" for="myExampleInput" id="myExampleLabel">This is a label</label>
        <input aria-describedby="myHelpText" name="myExampleName" id="myExampleInput" type="text" />
        <span slot="help-text" id="myHelpText">This is some help text</span>
        <atp-dropdown
          slot="dropdown"
          id="myExampleDropdown"
          .itemsList=\${itemsList}
          .activeIds=\${activeIds}
        ></atp-dropdown
      ></atp-input>

      <script>
        inputField = document.getElementById('myExampleInput');
        dropdown = document.getElementById('myExampleDropdown');

        dropdown?.addEventListener('itemSelectedOutput', ({detail}) => {
          inputField.value = detail.name;
          dropdown.activeIds = [detail.id];
        });
      </script>`,
      },
    },
  },
};
Select.storyName = 'with Dropdown (single select)';

export const Multiselect: Story = {
  args: {
    itemsList: Array(10)
      .fill(0)
      .map((item, i) => {
        return {name: `Item ${i}`, id: `Item ${i}`};
      }),
    activeIds: [],
    required: true,
    iconLeft: null,
    iconRight: {icon: 'chevron-down', height: 16, label: 'Toggle dropdown menu'},
    isError: false,
    disabled: false,
    tags: [],
    dropdownPosition: DropdownPosition.LEFT,
  },
  render: ({
    required,
    iconLeft,
    iconRight,
    isError,
    tags,
    disabled,
    itemsList,
    activeIds,
    dropdownPosition,
  }) =>
    html` <style>
        .input {
          max-width: 300px;
          display: block;
          margin-left: 100px;
        }
      </style>

      <atp-input
        id="input"
        class="input atp-body-s"
        .required=${required}
        .iconLeft=${iconLeft}
        .iconRight=${iconRight}
        .iconRightClickable=${true}
        .isError=${isError}
        .dropdownPosition=${dropdownPosition}
        .tags=${tags}
        .disabled=${disabled}
      >
        <label slot="label" for="test-id" id="label">This is a label</label>
        <input
          id="test-id"
          placeholder="Select Multiple"
          aria-describedby="help-text"
          name="test-id"
          type="text" />
        <span slot="help-text" id="help-text">This is some help text</span>
        <atp-dropdown
          style="width: 400px"
          slot="dropdown"
          id="dropdown"
          .itemsList=${itemsList}
          .activeIds=${activeIds}
          .closeOnClickOutside=${false}
        ></atp-dropdown
      ></atp-input>

      <script>
        input = document.getElementById('input');
        dropdown = document.getElementById('dropdown');

        input?.addEventListener('tagRemoveOutput', ({detail}) => {
          dropdown.activeIds = dropdown.activeIds.filter((id) => id !== detail);
          input.tags = dropdown.activeIds.map((id) => {
            return {label: id, isAction: true, icon: {icon: 'x'}};
          });
        });

        dropdown?.addEventListener('itemSelectedOutput', ({detail}) => {
          dropdown.activeIds = detail;
          input.tags = dropdown.activeIds.map((id) => {
            return {label: id, isAction: true, icon: {icon: 'x'}};
          });
        });
      </script>`,
  parameters: {
    docs: {
      source: {
        code: `
      <!--TODO: add examples for different frameworks, as this only works in certain JS contexts -->
        <style>
        .input {
          max-width: 385px;
          display: block;
        }
      </style>

       <atp-input
        id="input"
        class="input atp-body-s"
        .required=\${required}
        .iconLeft=\${iconLeft}
        .iconRight=\${iconRight}
        .isError=\${isError}
        .dropdownPosition=\${dropdownPosition}
        .tags=\${tags}
        .disabled=\${disabled}
        >
        <label slot="label" for="myExampleInput" id="myExampleLabel">This is a label</label>
        <input aria-describedby="myHelpText" name="myExampleName" id="myExampleInput" type="text" />
        <span slot="help-text" id="myHelpText">This is some help text</span>
        <atp-dropdown
          style="width: 400px"
          slot="dropdown"
          id="myExampleDropdown"
          .itemsList=\${itemsList}
          .activeIds=\${activeIds}
          .closeOnClickOutside=\${false}
        ></atp-dropdown
      ></atp-input>

      <script>
        input = document.getElementById('myExampleInput');
        dropdown = document.getElementById('myExampleDropdown');

        input?.addEventListener('tagRemoveOutput', ({detail}) => {
          handleId(detail);
        });

        dropdown?.addEventListener('itemSelectedOutput', ({detail}) => {
          handleId(detail.id);
        });

        function handleId(newId) {
          if (dropdown?.activeIds.includes(newId)) {
            dropdown.activeIds = dropdown.activeIds.filter((id) => id !== newId);
          } else {
            dropdown.activeIds = [...dropdown.activeIds, newId];
          }
          input.tags = dropdown.activeIds.map((id) => {
            return {label: id, isAction: true, icon: {icon: 'x'}};
          });
        }
      </script>`,
      },
    },
  },
};
Multiselect.storyName = 'with Dropdown (multi-select)';

export const Textarea: Story = {
  args: {
    required: true,
    isError: false,
    disabled: false,
  },
  render: ({required, isError, disabled}) =>
    html` <atp-input
      style="max-width: 385px; display: block"
      class="atp-body-s"
      .required=${required}
      .isError=${isError}
      .disabled=${disabled}
      textarea
    >
      <label slot="label" for="test-id" id="label">This is a label</label>
      <textarea aria-describedby="help-text" name="test-id" id="test-id" rows="5"></textarea>
      <span slot="help-text" id="help-text">This is some help text</span>
    </atp-input>`,
  parameters: {
    docs: {
      source: {
        code: `
        <atp-input
          .required=\${required}
          .isError=\${isError}
          .disabled=\${disabled}
          textarea
        >
        <label slot="label" for="myExampleInput" id="myExampleLabel">This is a label</label>
        <textarea aria-describedby="myHelpText" name="myExampleName" id="myExampleInput" rows="5"></textarea>
        <span slot="help-text" id="myHelpText">This is some help text</span>
      </atp-input>`,
      },
    },
  },
};
