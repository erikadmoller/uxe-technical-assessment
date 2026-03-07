import { z } from 'zod';

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
  const ranges: [number, number][] = [[0, 59], [0, 23], [1, 31], [1, 12], [0, 7]];
  const nameMap: (Record<string, string> | null)[] = [null, null, null, CRON_MONTH_NAMES, CRON_DOW_NAMES];
  return parts.every((part, i) => {
    const normalized = nameMap[i] ? normalizeCronField(part, nameMap[i]!) : part;
    return isValidCronField(normalized, ranges[i][0], ranges[i][1]);
  });
}

// On blur: insert spaces between fields if the user typed a compact expression (e.g. "20****")
export function formatCronInput(value: string): string {
  const trimmed = value.trim();
  if (!trimmed || /\s/.test(trimmed)) return trimmed.replace(/\s+/g, ' ');
  const tokens: string[] = [];
  const re = /(\*(?:\/\d+)?|[^\s*]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(trimmed)) !== null && tokens.length < 5) tokens.push(m[1]);
  return tokens.length === 5 && tokens.join('').length === trimmed.length
    ? tokens.join(' ')
    : trimmed;
}

export const schema = z.object({
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
