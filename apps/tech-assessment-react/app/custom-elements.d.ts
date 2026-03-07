import type { HTMLAttributes } from 'react';
import type { BreadcrumbItem, MenuListItem, SidebarItem } from '@atpco/atp-web';

declare global {
  interface AtpHeader extends HTMLElement {
    label: string;
    org: string;
  }

  interface AtpSidebar extends HTMLElement {
    items: SidebarItem[];
    activeId: string;
    outputNavigationEvents: boolean;
  }

  interface AtpBreadcrumbs extends HTMLElement {
    itemsList: BreadcrumbItem[];
  }

  interface AtpInput extends HTMLElement {
    isError: boolean;
  }

  interface AtpCheckbox extends HTMLElement {
    checked: boolean;
  }

  interface AtpDropdown extends HTMLElement {
    itemsList: MenuListItem[];
    activeIds: string[];
    isMenuVisible: boolean;
    closeOnClickOutside: boolean;
  }

  interface HTMLElementTagNameMap {
    'atp-header': AtpHeader;
    'atp-sidebar': AtpSidebar;
    'atp-breadcrumbs': AtpBreadcrumbs;
    'atp-input': AtpInput;
    'atp-checkbox': AtpCheckbox;
    'atp-dropdown': AtpDropdown;
  }

  namespace JSX {
    interface IntrinsicElements {
      'atp-header': HTMLAttributes<HTMLElement>;
      'atp-sidebar': HTMLAttributes<HTMLElement> & {
        onNavigationEventOutput?: (event: CustomEvent<{ id?: string }>) => void;
      };
      'atp-breadcrumbs': HTMLAttributes<HTMLElement>;
      'atp-card': HTMLAttributes<HTMLElement> & {
        density?: 'default' | 'compact' | 'wide';
        divider?: 'default' | 'header' | 'footer' | 'both';
        collapsible?: boolean;
        open?: boolean;
        fullBleed?: boolean;
      };
      'atp-card-header': HTMLAttributes<HTMLElement> & {
        density?: 'default' | 'compact' | 'wide';
      };
      'atp-card-footer': HTMLAttributes<HTMLElement> & {
        density?: 'default' | 'compact' | 'wide';
      };
      'atp-button': HTMLAttributes<HTMLElement> & {
        label?: string;
        appearance?: 'fill' | 'outline' | 'text';
        disabled?: boolean;
      };
      'atp-input': HTMLAttributes<HTMLElement> & {
        required?: boolean;
        disabled?: boolean;
        textarea?: boolean;
        isError?: boolean;
      };
      'atp-checkbox': HTMLAttributes<HTMLElement> & {
        label?: string;
        name?: string;
        value?: string;
        required?: boolean;
        disabled?: boolean;
        bordered?: boolean;
      };
      'atp-alert': HTMLAttributes<HTMLElement> & {
        label?: string;
        appearance?: 'full' | 'page' | 'expandable' | 'toast';
        color?: 'danger' | 'warning' | 'info';
        hasClose?: boolean;
      };
    }
  }
}

export {};
