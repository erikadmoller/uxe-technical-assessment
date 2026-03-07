export type DeliveryLocation = 'email' | 'gcloud' | 'azure' | 's3';

export type FormValues = {
  deliveryName: string;
  customer: string;
  deliveryFrequency: string;
  last_file_suffix: string;
  deliveryLocation: DeliveryLocation;
  recipients: string;
  subject: string;
  body: string;
  bucket: string;
  credentialsFile: string;
  upload_option: string;
  deliveryFileName: string;
  combineFiles: boolean;
  maximumFileSize: number;
  compression: boolean;
  specificDirectory: boolean;
  virusScan: boolean;
  encrypt: boolean;
};
