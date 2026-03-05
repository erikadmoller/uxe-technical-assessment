import { useEffect, useRef, useState } from 'react';
import type { BreadcrumbItem, SidebarItem } from '@atpco/atp-web';

type DeliveryLocation = 'email' | 'gcloud' | 'azure' | 's3';
type SubmitState = 'idle' | 'loading' | 'success' | 'error';

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

const LOCATION_OPTIONS: { value: DeliveryLocation; label: string }[] = [
  { value: 'email', label: 'Email' },
  { value: 'gcloud', label: 'GCloud' },
  { value: 'azure', label: 'Azure' },
  { value: 's3', label: 'S3' },
];

export default function DeliveryConfigurationCreateRoute() {
  const [activeSidebarId, setActiveSidebarId] = useState('delivery-configuration');

  const [form, setForm] = useState({
    deliveryName: '',
    customer: '',
    deliveryFrequency: '',
    last_file_suffix: '',
    deliveryLocation: 'email' as DeliveryLocation,
    // email conditional fields
    recipients: '',
    subject: '',
    body: '',
    // cloud conditional fields
    bucket: '',
    credentialsFile: '',
    upload_option: '',
    // file settings
    deliveryFileName: '',
    combineFiles: false,
    maximumFileSize: 10,
    compression: false,
    specificDirectory: false,
    virusScan: false,
    encrypt: false,
  });

  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [apiErrorMessage, setApiErrorMessage] = useState('');
  const [errors, setErrors] = useState<Partial<Record<string, boolean>>>({});

  // Refs for atp-input wrappers (isError JS property)
  const deliveryNameRef = useRef<HTMLElement>(null);
  const customerRef = useRef<HTMLElement>(null);
  const recipientsRef = useRef<HTMLElement>(null);
  const subjectRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLElement>(null);
  const bucketRef = useRef<HTMLElement>(null);
  const credentialsFileRef = useRef<HTMLElement>(null);
  const uploadOptionRef = useRef<HTMLElement>(null);
  const deliveryFileNameRef = useRef<HTMLElement>(null);

  // Refs for atp-checkbox and atp-button (checked / isLoading JS properties)
  const combineFilesRef = useRef<HTMLElement>(null);
  const compressionRef = useRef<HTMLElement>(null);
  const specificDirectoryRef = useRef<HTMLElement>(null);
  const virusScanRef = useRef<HTMLElement>(null);
  const encryptRef = useRef<HTMLElement>(null);
  const submitBtnRef = useRef<HTMLElement>(null);

  // Layout setup: header, sidebar, breadcrumbs
  useEffect(() => {
    const header = document.getElementById(
      'delivery-config-header',
    ) as HTMLElementTagNameMap['atp-header'] | null;
    const sidebar = document.getElementById(
      'delivery-config-sidebar',
    ) as HTMLElementTagNameMap['atp-sidebar'] | null;
    const breadcrumbs = document.getElementById(
      'delivery-config-breadcrumbs',
    ) as HTMLElementTagNameMap['atp-breadcrumbs'] | null;

    if (header) {
      header.label = 'PriceEye';
      header.org = 'ATPCO';
    }
    if (sidebar) {
      sidebar.items = SIDEBAR_ITEMS;
      sidebar.outputNavigationEvents = true;
    }
    if (breadcrumbs) {
      breadcrumbs.itemsList = BREADCRUMB_ITEMS;
    }
  }, []);

  // Sidebar active state + navigation listener
  useEffect(() => {
    const sidebar = document.getElementById(
      'delivery-config-sidebar',
    ) as HTMLElementTagNameMap['atp-sidebar'] | null;
    if (!sidebar) return;

    sidebar.activeId = activeSidebarId;

    const onSidebarNavigation = (event: Event) => {
      const detail = (event as CustomEvent<{ id?: string }>).detail;
      if (detail?.id) setActiveSidebarId(detail.id);
    };

    sidebar.addEventListener('navigationEventOutput', onSidebarNavigation);
    return () => sidebar.removeEventListener('navigationEventOutput', onSidebarNavigation);
  }, [activeSidebarId]);

  // GET on mount: log existing configs sorted by acceptedAt oldest → newest
  useEffect(() => {
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
  }, []);

  // Sync isError to all atp-input wrappers whenever errors change
  useEffect(() => {
    const syncList: Array<[React.RefObject<HTMLElement | null>, string]> = [
      [deliveryNameRef, 'deliveryName'],
      [customerRef, 'customer'],
      [recipientsRef, 'recipients'],
      [subjectRef, 'subject'],
      [bodyRef, 'body'],
      [bucketRef, 'bucket'],
      [credentialsFileRef, 'credentialsFile'],
      [uploadOptionRef, 'upload_option'],
      [deliveryFileNameRef, 'deliveryFileName'],
    ];
    for (const [ref, field] of syncList) {
      if (ref.current) (ref.current as any).isError = !!errors[field];
    }
  }, [errors]);

  // Sync checkbox `checked` properties to web components
  useEffect(() => {
    if (combineFilesRef.current) (combineFilesRef.current as any).checked = form.combineFiles;
  }, [form.combineFiles]);

  useEffect(() => {
    if (compressionRef.current) (compressionRef.current as any).checked = form.compression;
  }, [form.compression]);

  useEffect(() => {
    if (specificDirectoryRef.current)
      (specificDirectoryRef.current as any).checked = form.specificDirectory;
  }, [form.specificDirectory]);

  useEffect(() => {
    if (virusScanRef.current) (virusScanRef.current as any).checked = form.virusScan;
  }, [form.virusScan]);

  useEffect(() => {
    if (encryptRef.current) (encryptRef.current as any).checked = form.encrypt;
  }, [form.encrypt]);

  // Sync submit button loading/disabled state
  useEffect(() => {
    const btn = submitBtnRef.current;
    if (!btn) return;
    (btn as any).disabled = submitState === 'loading';
    (btn as any).isLoading = submitState === 'loading';
  }, [submitState]);

  // clickEventOutput listeners for each checkbox
  useEffect(() => {
    const el = combineFilesRef.current;
    if (!el) return;
    const handler = () => setForm((prev) => ({ ...prev, combineFiles: !prev.combineFiles }));
    el.addEventListener('clickEventOutput', handler);
    return () => el.removeEventListener('clickEventOutput', handler);
  }, []);

  useEffect(() => {
    const el = compressionRef.current;
    if (!el) return;
    const handler = () => setForm((prev) => ({ ...prev, compression: !prev.compression }));
    el.addEventListener('clickEventOutput', handler);
    return () => el.removeEventListener('clickEventOutput', handler);
  }, []);

  useEffect(() => {
    const el = specificDirectoryRef.current;
    if (!el) return;
    const handler = () =>
      setForm((prev) => ({ ...prev, specificDirectory: !prev.specificDirectory }));
    el.addEventListener('clickEventOutput', handler);
    return () => el.removeEventListener('clickEventOutput', handler);
  }, []);

  useEffect(() => {
    const el = virusScanRef.current;
    if (!el) return;
    const handler = () => setForm((prev) => ({ ...prev, virusScan: !prev.virusScan }));
    el.addEventListener('clickEventOutput', handler);
    return () => el.removeEventListener('clickEventOutput', handler);
  }, []);

  useEffect(() => {
    const el = encryptRef.current;
    if (!el) return;
    const handler = () => setForm((prev) => ({ ...prev, encrypt: !prev.encrypt }));
    el.addEventListener('clickEventOutput', handler);
    return () => el.removeEventListener('clickEventOutput', handler);
  }, []);

  const setFieldError = (field: string, value: string) => {
    setErrors((prev) => ({ ...prev, [field]: value.trim() === '' }));
  };

  const handleSubmit = async () => {
    if (submitState === 'loading') return;

    // Validate all required fields before submitting
    const requiredFields: string[] = ['deliveryName', 'customer', 'deliveryFileName'];
    if (form.deliveryLocation === 'email') {
      requiredFields.push('recipients', 'subject', 'body');
    } else {
      requiredFields.push('bucket', 'credentialsFile', 'upload_option');
    }

    const newErrors: Partial<Record<string, boolean>> = {};
    for (const field of requiredFields) {
      const val = form[field as keyof typeof form];
      newErrors[field] = typeof val === 'string' && val.trim() === '';
    }
    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      return; // block submission — errors are now displayed
    }

    setSubmitState('loading');

    const payload: Record<string, unknown> = {
      deliveryName: form.deliveryName,
      customer: form.customer,
      deliveryLocation: form.deliveryLocation,
      deliveryFileName: form.deliveryFileName,
      combineFiles: form.combineFiles,
      specificDirectory: form.specificDirectory,
      virusScan: form.virusScan,
      encrypt: form.encrypt,
    };

    if (form.deliveryFrequency) payload['deliveryFrequency'] = form.deliveryFrequency;
    if (form.last_file_suffix) payload['last_file_suffix'] = form.last_file_suffix;

    if (form.deliveryLocation === 'email') {
      payload['recipients'] = form.recipients;
      payload['subject'] = form.subject;
      payload['body'] = form.body;
    } else {
      payload['bucket'] = form.bucket;
      payload['credentialsFile'] = form.credentialsFile;
      payload['upload_option'] = form.upload_option;
    }

    if (form.combineFiles) {
      payload['maximumFileSize'] = form.maximumFileSize;
      payload['compression'] = form.compression;
    }

    try {
      const res = await fetch('/api/three-v-deliveries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitState('success');
      } else {
        const data = await res.json();
        setApiErrorMessage(data.message ?? 'Submission failed.');
        setSubmitState('error');
      }
    } catch {
      setApiErrorMessage('Network error. Please try again.');
      setSubmitState('error');
    }
  };

  // Submit button click listener
  useEffect(() => {
    const btn = submitBtnRef.current;
    if (!btn) return;
    btn.addEventListener('clickEventOutput', handleSubmit);
    return () => btn.removeEventListener('clickEventOutput', handleSubmit);
  });

  const updateField = (field: string, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="atp-layout">
      <atp-header id="delivery-config-header" className="layout-header"></atp-header>
      <atp-sidebar id="delivery-config-sidebar" className="layout-sidebar"></atp-sidebar>

      <div className="scroll-wrapper">
        <div className="page-content">
          <atp-breadcrumbs id="delivery-config-breadcrumbs"></atp-breadcrumbs>
          <h1 className="view-title">Create delivery configuration</h1>

          <div className="form-section">

            {/* Delivery configuration name */}
            <atp-input ref={deliveryNameRef} required>
              <label slot="label" htmlFor="deliveryName">Delivery configuration name</label>
              <input
                id="deliveryName"
                type="text"
                value={form.deliveryName}
                onChange={(e) => {
                  const val = e.target.value;
                  updateField('deliveryName', val);
                  setFieldError('deliveryName', val);
                }}
              />
              {errors.deliveryName && (
                <span slot="help-text" className="field-error">This field is required.</span>
              )}
            </atp-input>

            {/* Customer */}
            <atp-input ref={customerRef} required>
              <label slot="label" htmlFor="customer">Customer</label>
              <input
                id="customer"
                type="text"
                value={form.customer}
                onChange={(e) => {
                  const val = e.target.value;
                  updateField('customer', val);
                  setFieldError('customer', val);
                }}
              />
              {errors.customer && (
                <span slot="help-text" className="field-error">This field is required.</span>
              )}
            </atp-input>

            {/* Delivery frequency (optional — no validation) */}
            <atp-input>
              <label slot="label" htmlFor="deliveryFrequency">
                Delivery frequency in cron format
              </label>
              <input
                id="deliveryFrequency"
                type="text"
                placeholder="20****"
                value={form.deliveryFrequency}
                onChange={(e) => updateField('deliveryFrequency', e.target.value)}
              />
              <span slot="help-text">
                For more information on cron format, visit{' '}
                <a href="https://crontab.cronhub.io" target="_blank" rel="noreferrer">
                  crontab.cronhub.io
                </a>
              </span>
            </atp-input>

            {/* Last file suffix (optional — no validation) */}
            <atp-input>
              <label slot="label" htmlFor="lastFileSuffix">Last file suffix</label>
              <input
                id="lastFileSuffix"
                type="text"
                placeholder="ex. -final"
                value={form.last_file_suffix}
                onChange={(e) => updateField('last_file_suffix', e.target.value)}
              />
              <span slot="help-text">input can only contain letters, numbers, -, and _</span>
            </atp-input>

            {/* Delivery location */}
            <div className="form-field">
              <label htmlFor="deliveryLocation">
                Delivery location <span aria-hidden="true">*</span>
              </label>
              <select
                id="deliveryLocation"
                value={form.deliveryLocation}
                onChange={(e) =>
                  updateField('deliveryLocation', e.target.value as DeliveryLocation)
                }
              >
                {LOCATION_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Conditional: email fields */}
            {form.deliveryLocation === 'email' && (
              <div className="conditional-section">
                <atp-input ref={recipientsRef} required>
                  <label slot="label" htmlFor="recipients">Recipient email</label>
                  <input
                    id="recipients"
                    type="text"
                    value={form.recipients}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateField('recipients', val);
                      setFieldError('recipients', val);
                    }}
                  />
                  {errors.recipients && (
                    <span slot="help-text" className="field-error">This field is required.</span>
                  )}
                </atp-input>

                <atp-input ref={subjectRef} required>
                  <label slot="label" htmlFor="subject">Subject</label>
                  <input
                    id="subject"
                    type="text"
                    value={form.subject}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateField('subject', val);
                      setFieldError('subject', val);
                    }}
                  />
                  {errors.subject && (
                    <span slot="help-text" className="field-error">This field is required.</span>
                  )}
                </atp-input>

                <atp-input ref={bodyRef} required textarea>
                  <label slot="label" htmlFor="body">Body</label>
                  <textarea
                    id="body"
                    rows={3}
                    value={form.body}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateField('body', val);
                      setFieldError('body', val);
                    }}
                  />
                  {errors.body && (
                    <span slot="help-text" className="field-error">This field is required.</span>
                  )}
                </atp-input>
              </div>
            )}

            {/* Conditional: cloud fields */}
            {form.deliveryLocation !== 'email' && (
              <div className="conditional-section">
                <atp-input ref={bucketRef} required>
                  <label slot="label" htmlFor="bucket">Bucket</label>
                  <input
                    id="bucket"
                    type="text"
                    value={form.bucket}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateField('bucket', val);
                      setFieldError('bucket', val);
                    }}
                  />
                  {errors.bucket && (
                    <span slot="help-text" className="field-error">This field is required.</span>
                  )}
                </atp-input>

                <atp-input ref={credentialsFileRef} required>
                  <label slot="label" htmlFor="credentialsFile">Credentials file</label>
                  <input
                    id="credentialsFile"
                    type="text"
                    value={form.credentialsFile}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateField('credentialsFile', val);
                      setFieldError('credentialsFile', val);
                    }}
                  />
                  {errors.credentialsFile && (
                    <span slot="help-text" className="field-error">This field is required.</span>
                  )}
                </atp-input>

                <atp-input ref={uploadOptionRef} required>
                  <label slot="label" htmlFor="uploadOption">Upload option</label>
                  <input
                    id="uploadOption"
                    type="text"
                    value={form.upload_option}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateField('upload_option', val);
                      setFieldError('upload_option', val);
                    }}
                  />
                  {errors.upload_option && (
                    <span slot="help-text" className="field-error">This field is required.</span>
                  )}
                </atp-input>
              </div>
            )}

            {/* Delivery file name */}
            <atp-input ref={deliveryFileNameRef} required>
              <label slot="label" htmlFor="deliveryFileName">Delivery file name</label>
              <input
                id="deliveryFileName"
                type="text"
                value={form.deliveryFileName}
                onChange={(e) => {
                  const val = e.target.value;
                  updateField('deliveryFileName', val);
                  setFieldError('deliveryFileName', val);
                }}
              />
              <span slot="help-text">
                {errors.deliveryFileName && (
                  <span className="field-error">This field is required.<br /></span>
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
            {form.combineFiles && (
              <div className="conditional-section">
                <atp-input required>
                  <label slot="label" htmlFor="maximumFileSize">Maximum file size (MB)</label>
                  <input
                    id="maximumFileSize"
                    type="number"
                    value={form.maximumFileSize}
                    onChange={(e) => updateField('maximumFileSize', Number(e.target.value))}
                  />
                </atp-input>

                <atp-checkbox
                  ref={compressionRef}
                  label="Check file size post compression"
                  name="compression"
                ></atp-checkbox>
              </div>
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
            {submitState === 'success' && (
              <atp-alert
                label="Delivery configuration created successfully."
                appearance="page"
                color="info"
              ></atp-alert>
            )}
            {submitState === 'error' && (
              <atp-alert label={apiErrorMessage} appearance="page" color="danger"></atp-alert>
            )}

            {/* Submit */}
            <div className="form-actions">
              <atp-button ref={submitBtnRef} label="Save" appearance="fill"></atp-button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
