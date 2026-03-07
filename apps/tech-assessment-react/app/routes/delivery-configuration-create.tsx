import { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';
import type { BreadcrumbItem, MenuListItem, SidebarItem } from '@atpco/atp-web';

type DeliveryLocation = 'email' | 'gcloud' | 'azure' | 's3';

type FormValues = {
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

const SIDEBAR_ITEMS: SidebarItem[] = [
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

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [
  { name: 'Manage', href: '/manage' },
  { name: 'Delivery configuration', href: '/delivery-configuration' },
];

const LOCATION_ITEMS: MenuListItem[] = [
  { id: 'email', name: 'Email' },
  { id: 'gcloud', name: 'GCloud' },
  { id: 'azure', name: 'Azure' },
  { id: 's3', name: 'S3' },
];

const TEST_DATA: FormValues = {
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

const CRON_MONTH_NAMES: Record<string, string> = {
  JAN: '1', FEB: '2', MAR: '3', APR: '4', MAY: '5', JUN: '6',
  JUL: '7', AUG: '8', SEP: '9', OCT: '10', NOV: '11', DEC: '12',
};

const CRON_DOW_NAMES: Record<string, string> = {
  SUN: '0', MON: '1', TUE: '2', WED: '3', THU: '4', FRI: '5', SAT: '6',
};

function normalizeCronField(field: string, names: Record<string, string>): string {
  return field.replace(/[A-Za-z]+/g, (m) => names[m.toUpperCase()] ?? m);
}

function isValidCronField(field: string, min: number, max: number): boolean {
  if (field === '*') return true;
  if (field.includes('/')) {
    const [base, step] = field.split('/');
    const stepNum = Number(step);
    if (!step || isNaN(stepNum) || stepNum < 1) return false;
    return base === '*' || isValidCronField(base, min, max);
  }
  if (field.includes(',')) {
    return field.split(',').every((part) => isValidCronField(part, min, max));
  }
  if (field.includes('-')) {
    const [a, b] = field.split('-').map(Number);
    return !isNaN(a) && !isNaN(b) && a >= min && b <= max && a <= b;
  }
  const n = Number(field);
  return !isNaN(n) && Number.isInteger(n) && n >= min && n <= max;
}

function isValidCron(value: string): boolean {
  const parts = value.trim().split(/\s+/);
  if (parts.length !== 5) return false;
  // [minute, hour, day-of-month, month, day-of-week]
  const ranges: [number, number][] = [[0, 59], [0, 23], [1, 31], [1, 12], [0, 7]];
  const nameMap: (Record<string, string> | null)[] = [null, null, null, CRON_MONTH_NAMES, CRON_DOW_NAMES];
  return parts.every((part, i) => {
    const normalized = nameMap[i] ? normalizeCronField(part, nameMap[i]!) : part;
    return isValidCronField(normalized, ranges[i][0], ranges[i][1]);
  });
}

// On blur: insert spaces between fields if the user typed a compact expression (e.g. "20****")
function formatCronInput(value: string): string {
  const trimmed = value.trim();
  if (!trimmed || /\s/.test(trimmed)) return trimmed.replace(/\s+/g, ' ');
  // Tokenize: each token is either `*`, `*/N`, or a non-* non-space sequence
  const tokens: string[] = [];
  const re = /(\*(?:\/\d+)?|[^\s*]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(trimmed)) !== null && tokens.length < 5) tokens.push(m[1]);
  // Only reformat if the tokens fill the entire string (no leftover characters)
  return tokens.length === 5 && tokens.join('').length === trimmed.length
    ? tokens.join(' ')
    : trimmed;
}

const schema = z
  .object({
    deliveryName: z.string().min(1, 'Required'),
    customer: z.string().min(1, 'Required'),
    deliveryFrequency: z.string().refine((val) => !val || isValidCron(val), 'Must be a valid 5-field cron expression (e.g. "20 * * * *")').optional(),
    last_file_suffix: z.string().regex(/^[a-zA-Z0-9_-]*$/, 'Only letters, numbers, -, and _ allowed').optional(),
    deliveryLocation: z.enum(['email', 'gcloud', 'azure', 's3']),
    recipients: z.string().optional(),
    subject: z.string().optional(),
    body: z.string().optional(),
    bucket: z.string().optional(),
    credentialsFile: z.string().optional(),
    upload_option: z.string().optional(),
    deliveryFileName: z.string().min(1, 'Required').regex(/^[a-zA-Z0-9_-]+$/, 'Only letters, numbers, -, and _ allowed'),
    maximumFileSize: z.number(),
    combineFiles: z.boolean(),
    compression: z.boolean(),
    specificDirectory: z.boolean(),
    virusScan: z.boolean(),
    encrypt: z.boolean(),
  });

function buildPayload(values: FormValues): Record<string, unknown> {
  const payload: Record<string, unknown> = {
    deliveryName: values.deliveryName,
    customer: values.customer,
    deliveryLocation: values.deliveryLocation,
    deliveryFileName: values.deliveryFileName,
    combineFiles: values.combineFiles,
    specificDirectory: values.specificDirectory,
    virusScan: values.virusScan,
    encrypt: values.encrypt,
  };

  if (values.deliveryFrequency) payload['deliveryFrequency'] = values.deliveryFrequency;
  if (values.last_file_suffix) payload['last_file_suffix'] = values.last_file_suffix;

  if (values.deliveryLocation === 'email') {
    payload['recipients'] = values.recipients;
    payload['subject'] = values.subject;
    payload['body'] = values.body;
  } else {
    payload['bucket'] = values.bucket;
    payload['credentialsFile'] = values.credentialsFile;
    payload['upload_option'] = values.upload_option;
  }

  if (values.combineFiles) {
    payload['maximumFileSize'] = values.maximumFileSize;
    payload['compression'] = values.compression;
  }

  return payload;
}

async function submitToApi(
  values: FormValues,
  endpoint: string,
): Promise<{ ok: boolean; message?: string }> {
  const [res] = await Promise.all([
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(buildPayload(values)),
    }),
    new Promise((resolve) => setTimeout(resolve, 700)),
  ]);

  if (res.ok) {
    return { ok: true };
  }
  const data = await res.json();
  return { ok: false, message: data.message };
}

function fetchDeliveries() {
  fetch('/api/three-v-deliveries')
    .then((r) => r.json())
    .then(({ data }) => {
      const sorted = [...data].sort(
        (a: { acceptedAt: string }, b: { acceptedAt: string }) =>
          new Date(a.acceptedAt).getTime() - new Date(b.acceptedAt).getTime(),
      );
      console.log('Existing delivery configurations (oldest → newest):', sorted);
    })
    .catch(console.error);
}

export default function DeliveryConfigurationCreateRoute() {
  const [activeSidebarId, setActiveSidebarId] = useState('delivery-configuration');
  const [locationMenuVisible, setLocationMenuVisible] = useState(false);

  // Refs for atp-input wrappers (isError JS property)
  const deliveryFrequencyRef = useRef<HTMLElementTagNameMap['atp-input']>(null);
  const deliveryNameRef = useRef<HTMLElementTagNameMap['atp-input']>(null);
  const customerRef = useRef<HTMLElementTagNameMap['atp-input']>(null);
  const recipientsRef = useRef<HTMLElementTagNameMap['atp-input']>(null);
  const subjectRef = useRef<HTMLElementTagNameMap['atp-input']>(null);
  const bodyRef = useRef<HTMLElementTagNameMap['atp-input']>(null);
  const bucketRef = useRef<HTMLElementTagNameMap['atp-input']>(null);
  const credentialsFileRef = useRef<HTMLElementTagNameMap['atp-input']>(null);
  const uploadOptionRef = useRef<HTMLElementTagNameMap['atp-input']>(null);
  const lastFileSuffixRef = useRef<HTMLElementTagNameMap['atp-input']>(null);
  const deliveryFileNameRef = useRef<HTMLElementTagNameMap['atp-input']>(null);

  const locationDropdownRef = useRef<HTMLElementTagNameMap['atp-dropdown']>(null);
  const sidebarRef = useRef<HTMLElementTagNameMap['atp-sidebar'] | null>(null);

  // Refs for atp-checkbox and atp-button
  const combineFilesRef = useRef<HTMLElementTagNameMap['atp-checkbox']>(null);
  const compressionRef = useRef<HTMLElementTagNameMap['atp-checkbox']>(null);
  const specificDirectoryRef = useRef<HTMLElementTagNameMap['atp-checkbox']>(null);
  const virusScanRef = useRef<HTMLElementTagNameMap['atp-checkbox']>(null);
  const encryptRef = useRef<HTMLElementTagNameMap['atp-checkbox']>(null);
  const submitBtnRef = useRef<HTMLElement>(null);

  const formik = useFormik<FormValues>({
    initialValues: {
      deliveryName: '',
      customer: '',
      deliveryFrequency: '20 * * * *',
      last_file_suffix: '',
      deliveryLocation: 'email',
      recipients: '',
      subject: '',
      body: '',
      bucket: '',
      credentialsFile: '',
      upload_option: '',
      deliveryFileName: '',
      combineFiles: false,
      maximumFileSize: 10,
      compression: false,
      specificDirectory: false,
      virusScan: false,
      encrypt: false,
    },
    validationSchema: toFormikValidationSchema(schema),
    validate: (values) => {
      const errors: Partial<Record<keyof FormValues, string>> = {};
      if (values.deliveryLocation === 'email') {
        if (!values.recipients?.trim()) errors.recipients = 'Required';
        if (!values.subject?.trim()) errors.subject = 'Required';
        if (!values.body?.trim()) errors.body = 'Required';
      } else {
        if (!values.bucket?.trim()) errors.bucket = 'Required';
        if (!values.credentialsFile?.trim()) errors.credentialsFile = 'Required';
        if (!values.upload_option?.trim()) errors.upload_option = 'Required';
      }
      if (values.combineFiles && !values.maximumFileSize) errors.maximumFileSize = 'Required';
      return errors;
    },
    onSubmit: async (values, { setStatus }) => {
      setStatus(null);
      const result = await submitToApi(values, '/api/three-v-deliveries');
      if (result.ok) {
        setStatus({ success: 'Delivery configuration created successfully.' });
      } else {
        setStatus({
          error: result.message || 'Submission failed. Please reload the page and try again.',
        });
      }
    },
  });

  // Keep a stable ref to formik so event handlers set up with [] deps always have current values
  const formikRef = useRef(formik);
  formikRef.current = formik;

  // Sync sidebar active item when state changes
  useEffect(() => {
    if (sidebarRef.current) sidebarRef.current.activeId = activeSidebarId;
  }, [activeSidebarId]);

  // GET on mount: log existing configs sorted by acceptedAt oldest → newest
  useEffect(() => {
    fetchDeliveries();
  }, []);

  // Sync isError to all atp-input wrappers whenever errors/touched change
  useEffect(() => {
    const syncList: Array<[React.RefObject<HTMLElementTagNameMap['atp-input'] | null>, keyof FormValues]> = [
      [deliveryFrequencyRef, 'deliveryFrequency'],
      [deliveryNameRef, 'deliveryName'],
      [customerRef, 'customer'],
      [recipientsRef, 'recipients'],
      [subjectRef, 'subject'],
      [bodyRef, 'body'],
      [bucketRef, 'bucket'],
      [credentialsFileRef, 'credentialsFile'],
      [uploadOptionRef, 'upload_option'],
      [lastFileSuffixRef, 'last_file_suffix'],
      [deliveryFileNameRef, 'deliveryFileName'],
    ];
    for (const [ref, field] of syncList) {
      if (ref.current)
        ref.current.isError = !!(formik.touched[field] && formik.errors[field]);
    }
  }, [formik.errors, formik.touched]);

  // Sync atp-dropdown properties whenever menu visibility or selection changes
  useEffect(() => {
    const el = locationDropdownRef.current;
    if (!el) return;
    el.itemsList = LOCATION_ITEMS;
    el.activeIds = [formik.values.deliveryLocation];
    el.isMenuVisible = locationMenuVisible;
    el.closeOnClickOutside = true;
  }, [formik.values.deliveryLocation, locationMenuVisible]);


  // Sync checkbox `checked` properties to web components — consolidated
  useEffect(() => {
    const pairs: Array<[React.RefObject<HTMLElementTagNameMap['atp-checkbox'] | null>, boolean]> = [
      [combineFilesRef, formik.values.combineFiles],
      [compressionRef, formik.values.compression],
      [specificDirectoryRef, formik.values.specificDirectory],
      [virusScanRef, formik.values.virusScan],
      [encryptRef, formik.values.encrypt],
    ];
    for (const [ref, value] of pairs) {
      if (ref.current) ref.current.checked = value;
    }
  }, [formik.values.combineFiles, formik.values.compression, formik.values.specificDirectory, formik.values.virusScan, formik.values.encrypt]);

  // clickEventOutput listeners for all checkboxes — consolidated, [] deps via formikRef
  useEffect(() => {
    const checkboxes: Array<[React.RefObject<HTMLElementTagNameMap['atp-checkbox'] | null>, keyof FormValues]> = [
      [combineFilesRef, 'combineFiles'],
      [compressionRef, 'compression'],
      [specificDirectoryRef, 'specificDirectory'],
      [virusScanRef, 'virusScan'],
      [encryptRef, 'encrypt'],
    ];
    const cleanups = checkboxes.map(([ref, field]) => {
      const el = ref.current;
      if (!el) return () => {};
      const handler = () => {
        formikRef.current.setFieldValue(field, !formikRef.current.values[field]);
        formikRef.current.setFieldTouched(field, true);
      };
      el.addEventListener('clickEventOutput', handler);
      return () => el.removeEventListener('clickEventOutput', handler);
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  // Scroll submit button into view after alert appears
  useEffect(() => {
    if (formik.status?.success || formik.status?.error) {
      submitBtnRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      setTimeout(() => window.scrollBy({ top: 80, behavior: 'smooth' }), 300);
    }
  }, [formik.status]);

  // Close alert when user clicks the X button
  const handleForceError = async () => {
    if (formik.isSubmitting) return;
    formik.setSubmitting(true);
    formik.setStatus(null);
    await formik.setValues(TEST_DATA);
    const result = await submitToApi(TEST_DATA, '/api/three-v-deliveries?error=true');
    if (result.ok) {
      formik.setStatus({ success: 'Delivery configuration created successfully.' });
    } else {
      formik.setStatus({
        error: result.message || 'Submission failed. Please reload the page and try again.',
      });
    }
    formik.setSubmitting(false);
  };

  return (
    <div className="atp-layout">
      <atp-header
        className="layout-header"
        ref={(el: HTMLElementTagNameMap['atp-header'] | null) => {
          if (el) { el.label = 'PriceEye'; el.org = 'ATPCO'; }
        }}
      ></atp-header>
      <atp-sidebar
        className="layout-sidebar"
        ref={(el: HTMLElementTagNameMap['atp-sidebar'] | null) => {
          sidebarRef.current = el;
          if (el) { el.items = SIDEBAR_ITEMS; el.outputNavigationEvents = true; }
        }}
        onNavigationEventOutput={(e) => {
          if (e.detail?.id) setActiveSidebarId(e.detail.id);
        }}
      ></atp-sidebar>

      <div className="scroll-wrapper">
        <div className="page-content">
          <atp-breadcrumbs
            ref={(el: HTMLElementTagNameMap['atp-breadcrumbs'] | null) => {
              if (el) el.itemsList = BREADCRUMB_ITEMS;
            }}
          ></atp-breadcrumbs>
          <h1 className="view-title">Create delivery configuration</h1>

          <div className="form-section">

            {/* Delivery configuration name */}
            <atp-input ref={deliveryNameRef} required>
              <label slot="label" htmlFor="deliveryName">Delivery configuration name</label>
              <input
                id="deliveryName"
                aria-label="Delivery configuration name"
                name="deliveryName"
                type="text"
                value={formik.values.deliveryName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.deliveryName && formik.errors.deliveryName && (
                <span slot="help-text" className="field-error">
                  {String(formik.errors.deliveryName)}
                </span>
              )}
            </atp-input>

            {/* Customer */}
            <atp-input ref={customerRef} required>
              <label slot="label" htmlFor="customer">Customer name</label>
              <input
                id="customer"
                aria-label="Customer name"
                name="customer"
                type="text"
                value={formik.values.customer}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.customer && formik.errors.customer && (
                <span slot="help-text" className="field-error">
                  {String(formik.errors.customer)}
                </span>
              )}
            </atp-input>

            {/* Delivery frequency (optional — cron format validation) */}
            <atp-input ref={deliveryFrequencyRef}>
              <label slot="label" htmlFor="deliveryFrequency">
                Delivery frequency in cron format
              </label>
              <input
                id="deliveryFrequency"
                aria-label="Delivery frequency in cron format"
                name="deliveryFrequency"
                type="text"
                placeholder="20 * * * *"
                value={formik.values.deliveryFrequency}
                onChange={formik.handleChange}
                onKeyDown={(e) => {
                  if (e.key === 'Tab') {
                    const formatted = formatCronInput(e.currentTarget.value);
                    if (formatted !== e.currentTarget.value) formik.setFieldValue('deliveryFrequency', formatted);
                  }
                }}
                onBlur={(e) => {
                  const formatted = formatCronInput(e.target.value);
                  if (formatted !== e.target.value) formik.setFieldValue('deliveryFrequency', formatted);
                  formik.handleBlur(e);
                }}
              />
              <span slot="help-text">
                {formik.touched.deliveryFrequency && formik.errors.deliveryFrequency
                  ? <span className="field-error">{String(formik.errors.deliveryFrequency)}</span>
                  : <>For more information on cron format, visit{' '}
                      <a href="https://crontab.cronhub.io" target="_blank" rel="noreferrer">
                        crontab.cronhub.io
                      </a>
                    </>
                }
              </span>
            </atp-input>

            {/* Last file suffix */}
            <atp-input ref={lastFileSuffixRef}>
              <label slot="label" htmlFor="lastFileSuffix">Last file suffix</label>
              <input
                id="lastFileSuffix"
                aria-label="Last file suffix"
                name="last_file_suffix"
                type="text"
                placeholder="ex. -final"
                value={formik.values.last_file_suffix}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span slot="help-text">
                {formik.touched.last_file_suffix && formik.errors.last_file_suffix
                  ? <span className="field-error">{String(formik.errors.last_file_suffix)}</span>
                  : 'input can only contain letters, numbers, -, and _'}
              </span>
            </atp-input>

            {/* Delivery location */}
            <atp-input required>
              <label slot="label" htmlFor="deliveryLocation">Delivery location</label>
              <input
                id="deliveryLocation"
                aria-label="Delivery location"
                type="text"
                readOnly
                value={LOCATION_ITEMS.find((item) => item.id === formik.values.deliveryLocation)?.name ?? ''}
                onClick={() => setLocationMenuVisible((prev) => !prev)}
              />
              <atp-dropdown
                slot="dropdown"
                ref={locationDropdownRef}
                onItemSelectedOutput={(e) => {
                  if (e.detail.length > 0) {
                    formik.setFieldValue('deliveryLocation', e.detail[0]);
                    formik.setFieldTouched('deliveryLocation', true);
                    setLocationMenuVisible(false);
                  }
                }}
                onDropdownClosedOutput={() => setLocationMenuVisible(false)}
              ></atp-dropdown>
            </atp-input>

            {/* Conditional: email fields */}
            {formik.values.deliveryLocation === 'email' && (
              <atp-card density="default">
                <div className="conditional-fields">
                  <atp-input ref={recipientsRef} required>
                    <label slot="label" htmlFor="recipients">Recipient email</label>
                    <input
                      id="recipients"
                      aria-label="Recipient email"
                      name="recipients"
                      type="text"
                      value={formik.values.recipients}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.recipients && formik.errors.recipients && (
                      <span slot="help-text" className="field-error">
                        {String(formik.errors.recipients)}
                      </span>
                    )}
                  </atp-input>

                  <atp-input ref={subjectRef} required>
                    <label slot="label" htmlFor="subject">Subject</label>
                    <input
                      id="subject"
                      aria-label="Subject"
                      name="subject"
                      type="text"
                      value={formik.values.subject}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.subject && formik.errors.subject && (
                      <span slot="help-text" className="field-error">
                        {String(formik.errors.subject)}
                      </span>
                    )}
                  </atp-input>

                  <atp-input ref={bodyRef} required textarea>
                    <label slot="label" htmlFor="body">Body</label>
                    <textarea
                      id="body"
                      aria-label="Body"
                      name="body"
                      rows={3}
                      value={formik.values.body}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.body && formik.errors.body && (
                      <span slot="help-text" className="field-error">
                        {String(formik.errors.body)}
                      </span>
                    )}
                  </atp-input>
                </div>
              </atp-card>
            )}

            {/* Conditional: cloud fields */}
            {formik.values.deliveryLocation !== 'email' && (
              <atp-card density="default">
                <div className="conditional-fields">
                  <atp-input ref={bucketRef} required>
                    <label slot="label" htmlFor="bucket">Bucket</label>
                    <input
                      id="bucket"
                      aria-label="Bucket name"
                      name="bucket"
                      type="text"
                      value={formik.values.bucket}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.bucket && formik.errors.bucket && (
                      <span slot="help-text" className="field-error">
                        {String(formik.errors.bucket)}
                      </span>
                    )}
                  </atp-input>

                  <atp-input ref={credentialsFileRef} required>
                    <label slot="label" htmlFor="credentialsFile">Credentials file</label>
                    <input
                      id="credentialsFile"
                      aria-label="Credentials file path"
                      name="credentialsFile"
                      type="text"
                      value={formik.values.credentialsFile}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.credentialsFile && formik.errors.credentialsFile && (
                      <span slot="help-text" className="field-error">
                        {String(formik.errors.credentialsFile)}
                      </span>
                    )}
                  </atp-input>

                  <atp-input ref={uploadOptionRef} required>
                    <label slot="label" htmlFor="uploadOption">Upload option</label>
                    <input
                      id="uploadOption"
                      aria-label="Upload option"
                      name="upload_option"
                      type="text"
                      value={formik.values.upload_option}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.upload_option && formik.errors.upload_option && (
                      <span slot="help-text" className="field-error">
                        {String(formik.errors.upload_option)}
                      </span>
                    )}
                  </atp-input>
                </div>
              </atp-card>
            )}

            {/* Delivery file name */}
            <atp-input ref={deliveryFileNameRef} required>
              <label slot="label" htmlFor="deliveryFileName">Delivery file name</label>
              <input
                id="deliveryFileName"
                aria-label="Delivery file name"
                name="deliveryFileName"
                type="text"
                value={formik.values.deliveryFileName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span slot="help-text">
                {formik.touched.deliveryFileName && formik.errors.deliveryFileName && (
                  <span className="field-error">
                    {String(formik.errors.deliveryFileName)}
                    <br />
                  </span>
                )}
                input can only contain letters, numbers, -, and _
              </span>
            </atp-input>

            {/* Combine files */}
            <atp-checkbox
              ref={combineFilesRef}
              label="Combine files"
              name="combineFiles"
            ></atp-checkbox>

            {/* Conditional: combine files sub-section */}
            {formik.values.combineFiles && (
              <atp-card density="default">
                <div className="conditional-fields">
                  <atp-input required>
                    <label slot="label" htmlFor="maximumFileSize">Maximum file size (MB)</label>
                    <input
                      id="maximumFileSize"
                      aria-label="Maximum file size in megabytes"
                      name="maximumFileSize"
                      type="number"
                      value={formik.values.maximumFileSize}
                      onChange={(e) =>
                        formik.setFieldValue('maximumFileSize', Number(e.target.value))
                      }
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.maximumFileSize && formik.errors.maximumFileSize && (
                      <span slot="help-text" className="field-error">
                        {String(formik.errors.maximumFileSize)}
                      </span>
                    )}
                  </atp-input>

                  <atp-checkbox
                    ref={compressionRef}
                    label="Check file size post compression"
                    name="compression"
                  ></atp-checkbox>
                </div>
              </atp-card>
            )}

            {/* Place files into specific delivery directory */}
            <atp-checkbox
              ref={specificDirectoryRef}
              label="Place files into specific delivery directory"
              name="specificDirectory"
            ></atp-checkbox>

            {/* Virus scan */}
            <atp-checkbox ref={virusScanRef} label="Virus scan" name="virusScan"></atp-checkbox>

            {/* Use encryption */}
            <atp-checkbox ref={encryptRef} label="Use encryption" name="encrypt"></atp-checkbox>

            {/* Success / Error alerts */}
            {formik.status?.success && (
              <atp-alert
                label={formik.status.success}
                appearance="page"
                color="info"
                hasClose
                ref={(el) => {
                  if (!el) return;
                  const handler = () => formikRef.current.setStatus(null);
                  el.addEventListener('closeEventOutput', handler);
                  return () => el.removeEventListener('closeEventOutput', handler);
                }}
              ></atp-alert>
            )}
            {formik.status?.error && (
              <atp-alert
                label={formik.status.error}
                appearance="page"
                color="danger"
                hasClose
                ref={(el) => {
                  if (!el) return;
                  const handler = () => formikRef.current.setStatus(null);
                  el.addEventListener('closeEventOutput', handler);
                  return () => el.removeEventListener('closeEventOutput', handler);
                }}
              ></atp-alert>
            )}

            {/* Validation error alert */}
            {formik.submitCount > 0 && Object.keys(formik.errors).length > 0 && (
              <atp-alert
                label="Please fix the errors above before saving."
                appearance="page"
                color="danger"
                hasClose={false}
              ></atp-alert>
            )}

            {/* Submit */}
            <div className="form-actions">
              <atp-button
                ref={submitBtnRef}
                label={formik.status?.success ? 'Saved' : 'Save'}
                disabled={formik.isSubmitting || (formik.submitCount > 0 && Object.keys(formik.errors).length > 0)}
                onClick={() => formik.submitForm()}
              ></atp-button>
              <atp-button
                label="Fill form"
                appearance="outline"
                disabled={formik.isSubmitting}
                onClick={() => formik.setValues(TEST_DATA)}
              ></atp-button>
              <atp-button
                label="Trigger API error"
                appearance="outline"
                disabled={formik.isSubmitting}
                onClick={handleForceError}
              ></atp-button>
              <atp-button
                label="Get deliveries"
                appearance="outline"
                onClick={fetchDeliveries}
              ></atp-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
