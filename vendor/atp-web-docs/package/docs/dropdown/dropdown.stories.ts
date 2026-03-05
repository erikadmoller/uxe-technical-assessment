import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {withActions} from 'storybook/actions/decorator';
import './dropdown';
import '../button/button';
import {html} from 'lit';
import {VisualPosition} from '../shared/enums';

const meta: Meta = {
  component: 'atp-dropdown',
  title: 'Components/Dropdown',
  tags: ['autodocs'],
  argTypes: {
    itemsList: {},
    visualPosition: {
      options: [
        VisualPosition.RIGHT,
        VisualPosition.LEFT,
        VisualPosition.TOP,
        VisualPosition.BOTTOM,
      ],
      control: {type: 'inline-radio'},
    },
  },
  parameters: {
    actions: {
      handles: ['dropdownClosedOutput', 'itemSelectedOutput'],
    },
  },
  decorators: [withActions],
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    itemsList: [
      {name: 'Item 1', description: 'Item 1 description', id: 'item-1'},
      {name: 'Item 2', description: 'Item 2 description', id: 'item-2'},
      {name: 'Item 3', description: 'Item 3 description', id: 'item-3'},
      {name: 'Item 4', description: 'Item 4 description', id: 'item-4'},
      {name: 'Item 5', description: 'Item 5 description', id: 'item-5'},
    ],
    activeIds: ['item-3'],
    isSearchVisible: false,
    searchValue: '',
    placeholder: 'Search',
    openAtActiveIndex: false,
    visualPosition: VisualPosition.RIGHT,
  },
  render: ({
    itemsList,
    activeIds,
    openAtActiveIndex,
    isSearchVisible,
    searchValue,
    placeholder,
    visualPosition,
  }) => html`
    <atp-dropdown
      style="width: 300px;"
      .itemsList=${itemsList}
      .activeIds=${activeIds}
      .isMenuVisible=${true}
      .isSearchVisible=${isSearchVisible}
      .placeholder=${placeholder}
      .searchValue=${searchValue}
      .openAtActiveIndex=${openAtActiveIndex}
      .visualPosition=${visualPosition}
    ></atp-dropdown>
  `,
  parameters: {
    docs: {
      source: {
        code: `<atp-dropdown
      style="width: 300px; height: 300px;"
      .itemsList=\${itemsList}
      .activeIds=\${activeIds}
      .isSearchVisible=\${isSearchVisible}
      .placeholder=\${placeholder}
      .searchValue=\${searchValue}
      .openAtActiveIndex=\${openAtActiveIndex}
    ></atp-dropdown>`,
      },
    },
  },
};

export const SimpleDropdown: Story = {
  args: {
    itemsList: [
      {name: 'Option 1', id: 'item-1'},
      {name: 'Option 2', id: 'item-2'},
      {name: 'Option 3', id: 'item-3'},
    ],
    activeIds: ['item-15'],
    isSearchVisible: false,
    searchValue: '',
    placeholder: 'Search',
    openAtActiveIndex: false,
  },
  render: ({
    itemsList,
    activeIds,
    openAtActiveIndex,
    isSearchVisible,
    searchValue,
    placeholder,
  }) => html`
    <div class="wrapper">
      <atp-button id="button" label="Toggle Dropdown"></atp-button>
      <atp-dropdown
        id="dropdown"
        style="width: 200px;"
        .itemsList=${itemsList}
        .activeIds=${activeIds}
        .isSearchVisible=${isSearchVisible}
        .placeholder=${placeholder}
        .searchValue=${searchValue}
        .openAtActiveIndex=${openAtActiveIndex}
        .showCheckmarks=${false}
      ></atp-dropdown>
    </div>

    <script>
      button = document.getElementById('button');
      dropdown = document.getElementById('dropdown');
      showToggle = false;

      button?.addEventListener('clickEventOutput', () => {
        handleClick(!showToggle);
      });

      dropdown?.addEventListener('itemSelectedOutput', ({detail}) => {
        dropdown.disableKeyScrolling();
        showToggle = false;
      });

      dropdown?.addEventListener('dropdownClosedOutput', () => {
        dropdown.disableKeyScrolling();
        showToggle = false;
      });

      function handleClick(status) {
        showToggle = status;
        if (showToggle) {
          dropdown.startKeyScrolling();
        } else {
          dropdown.disableKeyScrolling();
        }
      }
    </script>
  `,
  parameters: {
    docs: {
      source: {
        code: ` <div class="wrapper">
      <atp-button id="button" label="Toggle Dropdown"></atp-button>
      <atp-dropdown
        id="dropdown"
        style="width: 200px;"
        .itemsList=\${itemsList}
        .activeIds=\${activeIds}
        .isSearchVisible=\${isSearchVisible}
        .placeholder=\${placeholder}
        .searchValue=\${searchValue}
        .openAtActiveIndex=\${openAtActiveIndex}
        .showCheckmarks=\${true}
      ></atp-dropdown>
    </div>`,
      },
    },
  },
};

export const CheckDropdown: Story = {
  args: {
    itemsList: [
      {name: 'Title 1', id: 'item-1', isTitle: true, titleAction: true},
      {
        name: 'Item 1 Which has a longlonglonglonglonglonglonglong title',
        isParentItem: true,
        id: 'item-1',
      },
      {name: 'Title 2', id: 'item-2', isTitle: true, titleAction: true},
      {
        name: 'Item 2',
        id: 'item-2',
        isParentItem: true,
        description: 'Long Description Test Test Test Test Test Test Test Test Test',
      },
      {name: 'Item 3', id: 'item-3', description: 'Description'},
      {
        name: 'Item 4 which has a longer title',
        description: 'And also a description',
        id: 'item-4',
      },
      {
        name: 'Item 5 There is a description on this item too but it is hidden because the title is large',
        description: 'description',
        id: 'item-5',
      },
      {
        name: 'Item 6',
        id: 'item-6',
        description: 'Long Description Test Test Test Test Test Test Test Test Test',
      },
      {name: 'Item 7', id: 'item-7'},
      {name: 'Item 8', id: 'item-8', isTitle: true, titleAction: false},
      {name: 'Item 9', id: 'item-9'},
      {name: 'Item 10', id: 'item-10'},
      {name: 'Item 11', id: 'item-11'},
      {name: 'Item 12', id: 'item-12'},
      {name: 'Item 13', id: 'item-13'},
      {name: 'Item 14', id: 'item-14'},
    ],
    activeIds: ['item-12'],
    isSearchVisible: false,
    searchValue: '',
    placeholder: 'Search',
    openAtActiveIndex: true,
    visualPosition: VisualPosition.RIGHT,
    showCheckmarks: true,
  },
  render: ({
    itemsList,
    activeIds,
    openAtActiveIndex,
    isSearchVisible,
    searchValue,
    placeholder,
    visualPosition,
    showCheckmarks,
  }) => html`
    <div class="wrapper">
      <atp-button id="button" label="Toggle Dropdown"></atp-button>
      <atp-dropdown
        id="dropdown"
        style="width: 300px;"
        .itemsList=${itemsList}
        .activeIds=${activeIds}
        .isSearchVisible=${isSearchVisible}
        .placeholder=${placeholder}
        .searchValue=${searchValue}
        .openAtActiveIndex=${openAtActiveIndex}
        .visualPosition=${visualPosition}
        .showCheckmarks=${showCheckmarks}
      >
      </atp-dropdown>
    </div>

    <script>
      button = document.getElementById('button');
      dropdown = document.getElementById('dropdown');
      showToggle = false;

      button?.addEventListener('clickEventOutput', () => {
        handleClick(!showToggle);
      });

      dropdown?.addEventListener('itemSelectedOutput', ({detail}) => {
        dropdown.activeIds = detail;
      });

      dropdown?.addEventListener('dropdownClosedOutput', () => {
        dropdown.disableKeyScrolling();
        showToggle = false;
      });

      function handleClick(status) {
        showToggle = status;
        if (showToggle) {
          dropdown.startKeyScrolling();
        } else {
          dropdown.disableKeyScrolling();
        }
      }
    </script>
  `,
  parameters: {
    docs: {
      source: {
        code: `<div class="wrapper">
      <atp-button id="button" label="Toggle Dropdown"></atp-button>
      <atp-dropdown
        id="dropdown"
        style="width: 300px;"
        .itemsList=\${itemsList}
        .activeIds=\${activeIds}
        .isSearchVisible=\${isSearchVisible}
        .placeholder=\${placeholder}
        .searchValue=\${searchValue}
        .openAtActiveIndex=\${openAtActiveIndex}
        .visualPosition=\${VisualPosition}
        .showCheckmarks=\${showCheckmarks}
      >
      </atp-dropdown>
    </div>`,
      },
    },
  },
};

export const CustomIcons: Story = {
  args: {
    itemsList: [
      {name: 'All Statuses', id: 'item-1'},
      {
        name: 'Green',
        icon: {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
<circle cx="4" cy="4" r="4" fill="#519E8F"/>
</svg>`,
        },
        id: 'green',
      },
      {
        name: 'Purple',
        icon: {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
<circle cx="4" cy="4" r="4" fill="#9F80E4"/>
</svg>`,
        },
        id: 'purple',
      },
      {
        name: 'Orange',
        icon: {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
<circle cx="4" cy="4" r="4" fill="#EF9536"/>
</svg>`,
        },
        id: 'orange',
      },
      {
        name: 'Grey',
        icon: {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
<circle cx="4" cy="4" r="4" fill="#BFBFBF"/>
</svg>`,
        },
        id: 'grey',
      },
    ],
    activeIds: [],
    isSearchVisible: false,
    searchValue: '',
    placeholder: 'Search',
    openAtActiveIndex: false,
  },
  render: ({
    itemsList,
    activeIds,
    openAtActiveIndex,
    isSearchVisible,
    searchValue,
    placeholder,
  }) => html`
    <div class="wrapper">
      <atp-button id="button" label="Toggle Dropdown"></atp-button>
      <atp-dropdown
        id="dropdown"
        style="width: 200px;"
        .itemsList=${itemsList}
        .activeIds=${activeIds}
        .isSearchVisible=${isSearchVisible}
        .placeholder=${placeholder}
        .searchValue=${searchValue}
        .openAtActiveIndex=${openAtActiveIndex}
        .showCheckmarks=${false}
      ></atp-dropdown>
    </div>

    <script>
      button = document.getElementById('button');
      dropdown = document.getElementById('dropdown');
      showToggle = false;

      button?.addEventListener('clickEventOutput', () => {
        handleClick(!showToggle);
      });

      dropdown?.addEventListener('itemSelectedOutput', ({detail}) => {
        dropdown.disableKeyScrolling();
        showToggle = false;
      });

      dropdown?.addEventListener('dropdownClosedOutput', () => {
        dropdown.disableKeyScrolling();
        showToggle = false;
      });

      function handleClick(status) {
        showToggle = status;
        if (showToggle) {
          dropdown.startKeyScrolling();
        } else {
          dropdown.disableKeyScrolling();
        }
      }
    </script>
  `,
  parameters: {
    docs: {
      source: {
        code: ` <div class="wrapper">
      <atp-button id="button" label="Toggle Dropdown"></atp-button>
      <atp-dropdown
        id="dropdown"
        style="width: 200px;"
        .itemsList=\${itemsList}
        .activeIds=\${activeIds}
        .isSearchVisible=\${isSearchVisible}
        .placeholder=\${placeholder}
        .searchValue=\${searchValue}
        .openAtActiveIndex=\${openAtActiveIndex}
        .showCheckmarks=\${false}
      ></atp-dropdown>
    </div>`,
      },
    },
  },
};

export const NestedDropdown: Story = {
  args: {
    itemsList: [
      {
        name: 'Option 1',
        id: 'item-1',
      },
      {name: 'Option 2', id: 'item-2'},
      {
        name: 'Option 3',
        id: 'item-3',
        children: [
          {name: 'Option 1', id: 'child-1'},
          {name: 'Option 2', id: 'child-2'},
          {name: 'Option 3', id: 'child-3'},
        ],
      },
    ],
    activeIds: ['child-3'],
    isSearchVisible: false,
    searchValue: '',
    placeholder: 'Search',
    openAtActiveIndex: true,
  },
  render: ({
    itemsList,
    activeIds,
    openAtActiveIndex,
    isSearchVisible,
    searchValue,
    placeholder,
  }) => html`
    <div class="wrapper">
      <atp-button id="button" label="Toggle Dropdown"></atp-button>
      <atp-dropdown
        id="dropdown"
        style="width: 200px;"
        .itemsList=${itemsList}
        .activeIds=${activeIds}
        .isSearchVisible=${isSearchVisible}
        .placeholder=${placeholder}
        .searchValue=${searchValue}
        .openAtActiveIndex=${openAtActiveIndex}
        .showCheckmarks=${true}
      ></atp-dropdown>
    </div>

    <script>
      button = document.getElementById('button');
      dropdown = document.getElementById('dropdown');
      showToggle = false;

      button?.addEventListener('clickEventOutput', () => {
        handleClick(!showToggle);
      });

      dropdown?.addEventListener('itemSelectedOutput', ({detail}) => {
        dropdown.activeIds = [detail[0]];
        dropdown.disableKeyScrolling();
        showToggle = false;
      });

      dropdown?.addEventListener('dropdownClosedOutput', () => {
        dropdown.disableKeyScrolling();
        showToggle = false;
      });

      function handleClick(status) {
        showToggle = status;
        if (showToggle) {
          dropdown.startKeyScrolling();
        } else {
          dropdown.disableKeyScrolling();
        }
      }
    </script>
  `,
  parameters: {
    docs: {
      source: {
        code: ` <div class="wrapper">
      <atp-button id="button" label="Toggle Dropdown"></atp-button>
      <atp-dropdown
        id="dropdown"
        style="width: 200px;"
        .itemsList=\${itemsList}
        .activeIds=\${activeIds}
        .isSearchVisible=\${isSearchVisible}
        .placeholder=\${placeholder}
        .searchValue=\${searchValue}
        .openAtActiveIndex=\${openAtActiveIndex}
        .showCheckmarks=\${true}
      ></atp-dropdown>
    </div>`,
      },
    },
  },
};
