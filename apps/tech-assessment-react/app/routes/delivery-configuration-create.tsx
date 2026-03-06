import { useEffect, useRef, useState } from 'react';
import type { BreadcrumbItem, MenuListItem, SidebarItem } from '@atpco/atp-web';

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

const LOCATION_ITEMS: MenuListItem[] = [
  { id: 'email', name: 'Email' },
  { id: 'gcloud', name: 'GCloud' },
  { id: 'azure', name: 'Azure' },
  { id: 's3', name: 'S3' },
];

const TEST_DATA = {
  deliveryName: 'Daily Sales Export',
  customer: 'Acme Travel',
  deliveryFrequency: '20****',
  last_file_suffix: '_20260214',
  deliveryLocation: 'email' as DeliveryLocation,
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
  const [locationMenuVisible, setLocationMenuVisible] = useState(false);

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

  const locationDropdownRef = useRef<HTMLElement>(null);

  // Refs for atp-checkbox and atp-button (checked / isLoading JS properties)
  const combineFilesRef = useRef<HTMLElement>(null);
  const compressionRef = useRef<HTMLElement>(null);
  const specificDirectoryRef = useRef<HTMLElement>(null);
  const virusScanRef = useRef<HTMLElement>(null);
  const encryptRef = useRef<HTMLElement>(null);
  const submitBtnRef = useRef<HTMLElement>(null);
  const fillFormBtnRef = useRef<HTMLElement>(null);
  const forceErrorBtnRef = useRef<HTMLElement>(null);
  const alertRef = useRef<HTMLElement>(null);

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
    fetchDeliveries();
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

  // Sync atp-dropdown properties whenever menu visibility or selection changes
  useEffect(() => {
    const el = locationDropdownRef.current;
    if (!el) return;
    (el as any).itemsList = LOCATION_ITEMS;
    (el as any).activeIds = [form.deliveryLocation];
    (el as any).isMenuVisible = locationMenuVisible;
    (el as any).closeOnClickOutside = true;
  }, [form.deliveryLocation, locationMenuVisible]);

  // Handle item selection from atp-dropdown
  useEffect(() => {
    const el = locationDropdownRef.current;
    if (!el) return;
    const handler = (e: Event) => {
      const ids = (e as CustomEvent<string[]>).detail;
      if (ids.length > 0) {
        setForm((prev) => ({ ...prev, deliveryLocation: ids[0] as DeliveryLocation }));
        setLocationMenuVisible(false);
      }
    };
    el.addEventListener('itemSelectedOutput', handler);
    return () => el.removeEventListener('itemSelectedOutput', handler);
  }, []);

  // Sync close when dropdown closes externally (e.g. click outside)
  useEffect(() => {
    const el = locationDropdownRef.current;
    if (!el) return;
    const handler = () => setLocationMenuVisible(false);
    el.addEventListener('dropdownClosedOutput', handler);
    return () => el.removeEventListener('dropdownClosedOutput', handler);
  }, []);

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

  // Scroll button into view after alert appears and pushes it down
  useEffect(() => {
    if (submitState === 'success' || submitState === 'error') {
      submitBtnRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      setTimeout(() => window.scrollBy({ top: 80, behavior: 'smooth' }), 300);
    }
  }, [submitState]);

  // Close alert when user clicks the X button
  useEffect(() => {
    const el = alertRef.current;
    if (!el) return;
    const handler = () => setSubmitState('idle');
    el.addEventListener('closeEventOutput', handler);
    return () => el.removeEventListener('closeEventOutput', handler);
  }, [submitState]); // re-run when submitState changes so ref is current after alert mounts

  const setFieldError = (field: string, value: string) => {
    setErrors((prev) => ({ ...prev, [field]: value.trim() === '' }));
  };

  const fillTestData = () => {
    setForm(TEST_DATA);
    setErrors({});
  };

  const doSubmit = async (data: typeof form, endpoint: string) => {
    setSubmitState('loading');

    const payload: Record<string, unknown> = {
      deliveryName: data.deliveryName,
      customer: data.customer,
      deliveryLocation: data.deliveryLocation,
      deliveryFileName: data.deliveryFileName,
      combineFiles: data.combineFiles,
      specificDirectory: data.specificDirectory,
      virusScan: data.virusScan,
      encrypt: data.encrypt,
    };

    if (data.deliveryFrequency) payload['deliveryFrequency'] = data.deliveryFrequency;
    if (data.last_file_suffix) payload['last_file_suffix'] = data.last_file_suffix;

    if (data.deliveryLocation === 'email') {
      payload['recipients'] = data.recipients;
      payload['subject'] = data.subject;
      payload['body'] = data.body;
    } else {
      payload['bucket'] = data.bucket;
      payload['credentialsFile'] = data.credentialsFile;
      payload['upload_option'] = data.upload_option;
    }

    if (data.combineFiles) {
      payload['maximumFileSize'] = data.maximumFileSize;
      payload['compression'] = data.compression;
    }

    try {
      const [res] = await Promise.all([
        fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }),
        new Promise((resolve) => setTimeout(resolve, 700)),
      ]);

      if (res.ok) {
        setSubmitState('success');
      } else {
        const data = await res.json();
        setApiErrorMessage(data.message && 'Submission failed. Please reload the page and try again.');
        setSubmitState('error');
      }
    } catch {
      setApiErrorMessage('Network error. Please reload the page and try again.');
      setSubmitState('error');
    }
  };

  const handleSubmit = async () => {
    if (submitState === 'loading') return;

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
      return;
    }

    await doSubmit(form, '/api/three-v-deliveries');
  };

  const handleForceError = async () => {
    if (submitState === 'loading') return;
    fillTestData();
    await doSubmit(TEST_DATA, '/api/three-v-deliveries?error=true');
  };

  // Submit button click listener
  useEffect(() => {
    const btn = submitBtnRef.current;
    if (!btn) return;
    btn.addEventListener('clickEventOutput', handleSubmit);
    return () => btn.removeEventListener('clickEventOutput', handleSubmit);
  });

  useEffect(() => {
    const btn = fillFormBtnRef.current;
    if (!btn) return;
    btn.addEventListener('clickEventOutput', fillTestData);
    return () => btn.removeEventListener('clickEventOutput', fillTestData);
  });

  useEffect(() => {
    const btn = forceErrorBtnRef.current;
    if (!btn) return;
    btn.addEventListener('clickEventOutput', handleForceError);
    return () => btn.removeEventListener('clickEventOutput', handleForceError);
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
            <atp-input required>
              <label slot="label" htmlFor="deliveryLocation">Delivery location</label>
              <input
                id="deliveryLocation"
                type="text"
                readOnly
                value={LOCATION_ITEMS.find((item) => item.id === form.deliveryLocation)?.name ?? ''}
                onClick={() => setLocationMenuVisible((prev) => !prev)}
              />
              <atp-dropdown slot="dropdown" ref={locationDropdownRef}></atp-dropdown>
            </atp-input>

            {/* Conditional: email fields */}
            {form.deliveryLocation === 'email' && (
              <atp-card density="default">
                <div className="conditional-fields">
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
              </atp-card>
            )}

            {/* Conditional: cloud fields */}
            {form.deliveryLocation !== 'email' && (
              <atp-card density="default">
                <div className="conditional-fields">
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
              </atp-card>
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
              <atp-card density="default">
                <div className="conditional-fields">
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
            {submitState === 'success' && (
              <atp-alert
                ref={alertRef}
                label="Delivery configuration created successfully."
                appearance="page"
                color="info"
                hasClose
              ></atp-alert>
            )}
            {submitState === 'error' && (
              <atp-alert
                ref={alertRef}
                label={apiErrorMessage}
                appearance="page"
                color="danger"
                hasClose
              ></atp-alert>
            )}

            {/* Submit */}
            <div className="form-actions">
              <atp-button
                ref={submitBtnRef}
                label={submitState === 'success' ? 'Saved' : 'Save'}
                isLoading={submitState === 'loading'}
                disabled={submitState === 'loading'}
                appearance="fill"
              ></atp-button>
              <atp-button
                ref={fillFormBtnRef}
                label="Fill form"
                appearance="outline"
                disabled={submitState === 'loading'}
              ></atp-button>
              <atp-button
                ref={forceErrorBtnRef}
                label="Trigger error"
                appearance="outline"
                disabled={submitState === 'loading'}
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
