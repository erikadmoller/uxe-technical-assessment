import type { HTMLAttributes } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'atp-header': HTMLAttributes<HTMLElement>;
      'atp-sidebar': HTMLAttributes<HTMLElement>;
      'atp-breadcrumbs': HTMLAttributes<HTMLElement>;
      'atp-card': HTMLAttributes<HTMLElement>;
      'atp-card-header': HTMLAttributes<HTMLElement>;
      'atp-card-footer': HTMLAttributes<HTMLElement>;
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
