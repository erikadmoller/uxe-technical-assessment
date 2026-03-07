import type { FormValues } from './types';

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

export async function submitToApi(
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

export function fetchDeliveries() {
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
