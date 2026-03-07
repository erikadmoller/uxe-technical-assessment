import type { BreadcrumbItem, MenuListItem, SidebarItem } from '@atpco/atp-web';

declare global {
  interface AtpHeaderElement extends HTMLElement {
    label: string;
    org: string;
  }

  interface AtpSidebarElement extends HTMLElement {
    items: SidebarItem[];
    activeId: string;
    outputNavigationEvents: boolean;
  }

  interface AtpBreadcrumbsElement extends HTMLElement {
    itemsList: BreadcrumbItem[];
  }

  interface AtpInputElement extends HTMLElement {
    isError: boolean;
  }

  interface AtpCheckboxElement extends HTMLElement {
    checked: boolean;
  }

  interface AtpDropdownElement extends HTMLElement {
    itemsList: MenuListItem[];
    activeIds: string[];
    isMenuVisible: boolean;
    closeOnClickOutside: boolean;
  }

  interface HTMLElementTagNameMap {
    'atp-header': AtpHeaderElement;
    'atp-sidebar': AtpSidebarElement;
    'atp-breadcrumbs': AtpBreadcrumbsElement;
    'atp-input': AtpInputElement;
    'atp-checkbox': AtpCheckboxElement;
    'atp-dropdown': AtpDropdownElement;
  }

  namespace React.JSX {
    interface IntrinsicElements {
      'atp-header': React.HTMLAttributes<AtpHeaderElement> & {
        label?: string;
        org?: string;
        ref?: React.Ref<AtpHeaderElement>;
      };
      'atp-sidebar': React.HTMLAttributes<AtpSidebarElement> & {
        items?: SidebarItem[];
        activeId?: string;
        outputNavigationEvents?: boolean;
        ref?: React.Ref<AtpSidebarElement>;
        onNavigationEventOutput?: (event: CustomEvent<{ id?: string }>) => void;
      };
      'atp-breadcrumbs': React.HTMLAttributes<AtpBreadcrumbsElement> & {
        itemsList?: BreadcrumbItem[];
        ref?: React.Ref<AtpBreadcrumbsElement>;
      };
      'atp-input': React.HTMLAttributes<AtpInputElement> & {
        required?: boolean;
        disabled?: boolean;
        textarea?: boolean;
        isError?: boolean;
        ref?: React.Ref<AtpInputElement>;
      };
      'atp-checkbox': React.HTMLAttributes<AtpCheckboxElement> & {
        label?: string;
        name?: string;
        value?: string;
        required?: boolean;
        disabled?: boolean;
        bordered?: boolean;
        ariaLabel?: string;
        ref?: React.Ref<AtpCheckboxElement>;
      };
      'atp-button': React.HTMLAttributes<HTMLElement> & {
        label?: string;
        appearance?: 'fill' | 'outline' | 'text';
        disabled?: boolean;
        isLoading?: boolean;
        ref?: React.Ref<HTMLElement>;
      };
      'atp-alert': React.HTMLAttributes<HTMLElement> & {
        label?: string;
        appearance?: 'full' | 'page' | 'expandable' | 'toast';
        color?: 'danger' | 'warning' | 'info';
        hasClose?: boolean;
        ref?: React.Ref<HTMLElement>;
      };
      'atp-card': React.HTMLAttributes<HTMLElement> & {
        density?: 'default' | 'compact' | 'wide';
        divider?: 'default' | 'header' | 'footer' | 'both';
        collapsible?: boolean;
        open?: boolean;
        fullBleed?: boolean;
        ref?: React.Ref<HTMLElement>;
      };
      'atp-card-header': React.HTMLAttributes<HTMLElement> & {
        density?: 'default' | 'compact' | 'wide';
        ref?: React.Ref<HTMLElement>;
      };
      'atp-card-footer': React.HTMLAttributes<HTMLElement> & {
        density?: 'default' | 'compact' | 'wide';
        ref?: React.Ref<HTMLElement>;
      };
      'atp-dropdown': React.HTMLAttributes<AtpDropdownElement> & {
        slot?: string;
        ref?: React.Ref<AtpDropdownElement>;
        onItemSelectedOutput?: (event: CustomEvent<string[]>) => void;
        onDropdownClosedOutput?: (event: CustomEvent) => void;
      };
    }
  }
}

export {};
