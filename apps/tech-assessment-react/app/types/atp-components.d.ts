
/** The DOM element interface for <atp-header> */
export interface AtpHeaderElement extends HTMLElement {
  label?: string;
  org?: string;
}

export interface AtpSidebarElement extends HTMLElement {
  items?: any[];
  activeId?: string;
  outputNavigationEvents?: boolean;
}

export interface AtpBreadcrumbsElement extends HTMLElement {
  itemsList?: any[];
}

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      "atp-header": React.HTMLAttributes<AtpHeaderElement> & {
        label?: string;
        org?: string;
        ref?: React.Ref<AtpHeaderElement>;
      };
      "atp-sidebar": React.HTMLAttributes<AtpSidebarElement> & {
        items?: any[];
        activeId?: string;
        outputNavigationEvents?: boolean;
        ref?: React.Ref<AtpSidebarElement>;
      };
      "atp-breadcrumbs": React.HTMLAttributes<AtpBreadcrumbsElement> & {
        itemsList?: any[];
        ref?: React.Ref<AtpBreadcrumbsElement>;
      };
      "atp-input": React.HTMLAttributes<HTMLElement> & {
        required?: boolean;
        disabled?: boolean;
        textarea?: boolean;
        isError?: boolean;
        ref?: React.Ref<HTMLElement>;
      };
      "atp-checkbox": React.HTMLAttributes<HTMLElement> & {
        label?: string;
        name?: string;
        value?: string;
        required?: boolean;
        disabled?: boolean;
        bordered?: boolean;
        ref?: React.Ref<HTMLElement>;
      };
      "atp-button": React.HTMLAttributes<HTMLElement> & {
        label?: string;
        appearance?: "fill" | "outline" | "text";
        disabled?: boolean;
        ref?: React.Ref<HTMLElement>;
      };
      "atp-alert": React.HTMLAttributes<HTMLElement> & {
        label?: string;
        appearance?: "full" | "page" | "expandable" | "toast";
        color?: "danger" | "warning" | "info";
        hasClose?: boolean;
        ref?: React.Ref<HTMLElement>;
      };
    }
  }
}

export {};
