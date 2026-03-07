import type { BreadcrumbItem, MenuListItem, SidebarItem } from '@atpco/atp-web';
import type { FormValues } from './types';

export const SIDEBAR_ITEMS: SidebarItem[] = [
  { name: 'Collections', id: 'collections', route: 'collections', children: [] },
  {
    name: 'Manage',
    id: 'manage',
    route: 'manage',
    children: [
      { name: 'Input configurations', id: 'input-configurations', route: 'input-configurations' },
      {
        name: 'Output configurations',
        id: 'output-configurations',
        route: 'output-configurations',
      },
      {
        name: 'Packaging configurations',
        id: 'packaging-configurations',
        route: 'packaging-configurations',
      },
      {
        name: 'Delivery configuration',
        id: 'delivery-configuration',
        route: 'delivery-configuration',
      },
    ],
  },
];

export const BREADCRUMB_ITEMS: BreadcrumbItem[] = [
  { name: 'Manage', href: '/manage' },
  { name: 'Delivery configuration', href: '/delivery-configuration' },
];

export const LOCATION_ITEMS: MenuListItem[] = [
  { id: 'email', name: 'Email' },
  { id: 'gcloud', name: 'GCloud' },
  { id: 'azure', name: 'Azure' },
  { id: 's3', name: 'S3' },
];

export const TEST_DATA: FormValues = {
  deliveryName: 'Daily Sales Export',
  customer: 'Acme Travel',
  deliveryFrequency: '20 * * * *',
  last_file_suffix: '_20260214',
  deliveryLocation: 'email',
  recipients: 'ops@example.com',
  subject: 'Delivery Complete',
  body: 'Your delivery is complete.',
  bucket: '',
  credentialsFile: '',
  upload_option: '',
  deliveryFileName: 'sales-export',
  combineFiles: true,
  maximumFileSize: 5,
  compression: true,
  specificDirectory: true,
  virusScan: true,
  encrypt: true,
};
