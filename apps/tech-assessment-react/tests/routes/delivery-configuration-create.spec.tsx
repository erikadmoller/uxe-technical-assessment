import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { RefObject } from 'react';
import DeliveryConfigurationCreateRoute from '../../app/routes/delivery-configuration-create/index';
import { CloudFields } from '../../app/routes/delivery-configuration-create/components/CloudFields';
import type { FormikProps } from 'formik';
import type { FormValues } from '../../app/routes/delivery-configuration-create/types';

beforeEach(() => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ data: [] }),
  }) as unknown as typeof fetch;
});

afterEach(() => {
  vi.resetAllMocks();
});

// Minimal formik mock for sub-component tests
function makeFormikMock(overrides: Partial<FormValues> = {}): FormikProps<FormValues> {
  return {
    values: {
      deliveryName: '', customer: '', deliveryFrequency: '', last_file_suffix: '',
      deliveryLocation: 'email', recipients: '', subject: '', body: '',
      bucket: '', credentialsFile: '', upload_option: '',
      deliveryFileName: '', combineFiles: false, maximumFileSize: 10,
      compression: false, specificDirectory: false, virusScan: false, encrypt: false,
      ...overrides,
    },
    touched: {},
    errors: {},
    handleChange: vi.fn(),
    handleBlur: vi.fn(),
    setFieldValue: vi.fn(),
    setFieldTouched: vi.fn(),
  } as unknown as FormikProps<FormValues>;
}

// Test 1: location dropdown shows "Email" by default
test('location input displays "Email" by default', () => {
  render(<DeliveryConfigurationCreateRoute />);
  const input = document.getElementById('deliveryLocation') as HTMLInputElement;
  expect(input).not.toBeNull();
  expect(input.value).toBe('Email');
});

// Test 2: email fields rendered when delivery location is email (default)
test('email fields are rendered when delivery location is email', () => {
  render(<DeliveryConfigurationCreateRoute />);
  // getByLabelText throws if element is not found — implicitly asserts presence
  screen.getByLabelText('Recipient email');
  screen.getByLabelText('Subject');
});

// Test 3: CloudFields shows bucket, credentials, and upload option inputs
// (tests the conditional rendering for non-email locations via the sub-component directly)
test('cloud fields render bucket, credentials, and upload option inputs', () => {
  const noop = { current: null } as unknown as RefObject<null>;
  render(
    <CloudFields
      formik={makeFormikMock({ deliveryLocation: 'gcloud' })}
      bucketRef={noop}
      credentialsFileRef={noop}
      uploadOptionRef={noop}
    />
  );
  screen.getByLabelText('Bucket name');
  screen.getByLabelText('Credentials file path');
  screen.getByLabelText('Upload option');
});

// Test 4 (Accessibility): key inputs have aria-labels and the page has a descriptive heading
test('key form inputs have accessible labels and the page has a descriptive heading', () => {
  render(<DeliveryConfigurationCreateRoute />);
  screen.getByRole('heading', { name: 'Create delivery configuration' });
  screen.getByLabelText('Delivery configuration name');
  screen.getByLabelText('Customer name');
  screen.getByLabelText('Delivery location');
  screen.getByLabelText('Delivery file name');
});

/*
  Suggested tests (not implemented — future additions):

  - Cloud field visibility via event: dispatch CustomEvent('itemSelectedOutput', { detail: ['gcloud'] })
    on the atp-dropdown element, then assert that 'Bucket name' input appears and 'Recipient email' disappears.
    Requires React 19 web component event listener wiring to be active in the test environment.

  - Form validation: click Save with empty required fields, assert that the error alert
    "Please fix the errors above before saving." is rendered.

  - API success flow: mock fetch POST to return { ok: true }, fill required fields via fireEvent,
    submit the form, assert that a success message appears.

  - API error flow: mock fetch POST to return a 500 error, submit the form,
    assert that the error alert appears.

  - combineFiles conditional fields: dispatch 'clickEventOutput' CustomEvent on the
    atp-checkbox[name="combineFiles"] element, assert that 'Maximum file size in megabytes'
    input appears.
*/
