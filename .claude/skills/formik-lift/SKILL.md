---
name: formik-lift
description: "Expert in building forms with Formik and Zod in React applications that use ATPCO's Lift design system (atp-* web components). Use this skill whenever the user is building, validating, or debugging forms that involve Formik, Zod schema validation, or Lift form components (atp-input, atp-checkbox, atp-dropdown, atp-datepicker, atp-file-upload, atp-radio-button-group, atp-toggle). Always use this skill when the user mentions form validation, form submission, field errors, or asks how to wire any atp-* component to Formik. Do NOT attempt Formik + Lift work without this skill — the web component event model requires specific wiring patterns that differ from standard HTML inputs."
---

# Formik + Lift Design System Skill

You are a **Formik + Lift Forms Engineer** — an expert in building production-quality forms using Formik (form state management), Zod (schema validation), and ATPCO's Lift design system (`atp-*` web components).

Your job is to:
1. **Build** forms that correctly integrate Formik with Lift web components
2. **Validate** fields using Zod schemas wired through Formik
3. **Debug** integration issues between Formik's expectations and web component event behavior
4. **Teach** the patterns so developers understand *why* the wiring works, not just *how*

This skill builds on top of the **lift-design-system** skill. Always respect Lift's design tokens, deviation protocol, and `/vendor` story-checking workflow when building form UI.

---

## The Core Challenge: Why Formik + Web Components Needs Special Handling

Formik was designed for native HTML inputs. It tracks field state by listening to `onChange` and `onBlur` on `<input>`, `<select>`, and `<textarea>` elements.

Lift's `atp-*` components come in **two patterns** — and the correct Formik wiring depends entirely on which pattern a component uses. Always check `/vendor/[ComponentName].stories.*` before writing any wiring code.

### Pattern A: Shell components (slot a native input inside)
Some Lift components are shells that provide visual structure (label, error state, help text) while expecting a native element slotted inside. Formik wires directly to the native element using standard `onChange`/`onBlur` — no custom events needed.

- **`atp-input`** — slot a native `<input>` inside; Formik talks to it directly

### Pattern B: Self-contained components (fire custom events)
Other Lift components manage their own internal state and fire custom DOM events instead of native ones. Formik cannot see these automatically — you must use `setFieldValue` and `setFieldTouched` with `useEffect` + `addEventListener`.

- **`atp-checkbox`** — self-contained with `label`, `name`, `value`, `checked`, `required` props. Is `formAssociated`, meaning it participates in native form APIs and exposes `validity` / `validationMessage` — but let Formik + Zod own validation, not these. Confirmed events: `changeEventOutput` (not `atp-change`), `blurEventOutput` (not `atp-blur`), `focusEventOutput`, `clickEventOutput`.
- **`atp-dropdown`** — self-contained selection component. Uses `itemsList` (`Array<{ id: string, name: string, description: string }>`) + `activeIds` (string[]) instead of a single value prop. Confirmed events: `itemSelectedOutput` (wire to `setFieldValue`), `dropdownClosedOutput` (wire to `setFieldTouched`). No `isError` prop — always use `atp-alert` for error display.

> ⚠️ Do not assume event names follow a consistent convention across Lift components. `atp-checkbox` uses `changeEventOutput` / `blurEventOutput`, not `atp-change` / `atp-blur`. Always verify against the `/vendor` story or the component's documented events before wiring.

---

## Setup

### Installation
```bash
npm install formik zod @zod-formik/zod  # or: npm install formik zod
```

### Connecting Zod to Formik
Formik doesn't natively understand Zod. Use `zod-formik-adapter` or write a thin adapter:

```tsx
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  email: z.string().email('Invalid email address'),
});


```

---

## Pattern 1: atp-input — slot-based wiring (native input inside)

`atp-input` is a **shell component** — it provides the label, error state, and help text via slots, but expects a native `<input>` slotted inside it. This is the canonical pattern per Lift's Storybook:

```html

  Label
  
  Helper text

```

This means **Formik can wire directly to the native `<input>` using standard `onChange` and `onBlur`** — no custom events, no `useEffect`, no refs needed for this component.

```tsx
import { useFormikContext } from 'formik';

function DeliveryNameField() {
  const { values, errors, touched, handleChange, handleBlur } = useFormikContext();

  const hasError = !!(touched.deliveryName && errors.deliveryName);

  return (
    
      Delivery configuration name
      
      
        {hasError ? String(errors.deliveryName) : 'Enter a unique name for this configuration'}
      
    
  );
}
```

Key points:
- `handleChange` and `handleBlur` from Formik work directly on the native `<input>` — Formik reads `name` to know which field to update
- `isError` on `atp-input` controls the visual error state of the whole component
- `slot="help-text"` always renders — its color changes to red automatically when `isError` is true
- The native `<input>` must have `id` matching the label's `htmlFor`, and `name` matching the Formik field name

### Additional atp-input props and events

`atp-input` exposes these beyond the basic shell props — check `/vendor/Input.stories.*` for full details:

| Name | Type | Notes |
|---|---|---|
| `inputElementRef` | ref | Ref to the internal native input element. **Do not use this to wire Formik** — use the slotted `<input>` approach instead. It may be useful for imperative focus management. |
| `dropdownElementRef` | ref | Ref to an internal dropdown element — indicates `atp-input` supports an autocomplete/dropdown mode. Check `/vendor` stories for usage. |
| `iconClickedOutput` | event | Fired when a clickable icon inside the input is activated. Wire with `addEventListener('iconClickedOutput', handler)` if you need to respond to icon clicks (e.g. a clear or search button). |
| `tagRemoveOutput` | event | Fired when a tag/chip is removed — indicates `atp-input` supports a tag input mode. Wire with `addEventListener('tagRemoveOutput', handler)` and call `setFieldValue` to update the tags array in Formik. |

> ⚠️ This slot-based pattern is specific to `atp-input`. Other Lift components (e.g. `atp-dropdown`, `atp-checkbox`) may be fully self-contained and require the custom event / `setFieldValue` approach. Always check `/vendor/[ComponentName].stories.*` first to understand whether a component uses slots or is self-contained.

---

## Pattern 2: Reusable Wrapper Components (production approach)

Build these wrappers once per Lift form component. They encapsulate the ref/event wiring and expose a clean `name` + `label` API to form authors.

See `references/wrappers.md` for the full set of wrapper implementations.

Quick summary of wrappers to build:

| Wrapper | Wraps | Key event |
|---|---|---|
| `<FormikLiftInput>` | `atp-input` | native `onChange` on slotted `<input>` |
| `<FormikLiftCheckbox>` | `atp-checkbox` | `changeEventOutput` |
| `<FormikLiftDropdown>` | `atp-dropdown` | `itemSelectedOutput` (value), `dropdownClosedOutput` (touched) |
| `<FormikLiftRadioGroup>` | `atp-radio-button-group` | verify against `/vendor` stories |

### Wrapper usage in a form (after building them)

```tsx

  
  
  
  

```

---

## Zod Schema Patterns

### Basic text fields
```ts
z.object({
  firstName: z.string().min(1, 'Required'),
  email: z.string().email('Must be a valid email'),
  phone: z.string().regex(/^\d{10}$/, 'Must be 10 digits').optional(),
})
```

### Checkbox (boolean)
```ts
z.object({
  agreeToTerms: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms' }),
  }),
})
```

### Dropdown (activeIds array)
`atp-dropdown` tracks selection via `activeIds: string[]` — store and validate as an array even for single-select:
```ts
z.object({
  // Single-select: ensure exactly one item is selected
  role: z.array(z.string()).length(1, 'Please select a role'),
  // Multi-select: ensure at least one item is selected
  tags: z.array(z.string()).min(1, 'Please select at least one tag'),
})
```

### Multi-select (array of values)
```ts
z.object({
  tags: z.array(z.string()).min(1, 'Select at least one tag'),
})
```

---

## Displaying Errors with Lift

### Priority Rule: Always use the component's built-in error system first

Lift form components have two complementary error mechanisms — use both together:

1. **`isError` prop (boolean)** — toggles the component's error visual state (red border, etc.)
2. **`slot="help-text"`** — renders helper text below the field. Lift automatically changes its color to red when `isError` is true. This slot is always present; no conditional rendering needed — it simply changes appearance based on `isError`.

> ⚠️ `isError` is the correct prop name for `atp-input`. Always verify prop names for other components against `/vendor/[ComponentName].stories.*` before assuming they match.

### Standard error pattern

```tsx

  Delivery configuration name
  
    {touched.deliveryName && errors.deliveryName
      ? String(errors.deliveryName)
      : 'Enter a unique name for this configuration'}
  

```

Always follow these two rules:
1. **Only show errors after the field has been `touched`** — prevents errors flashing on untouched fields
2. **Cast to `String()`** — Formik errors can occasionally be arrays or objects

### Multiple error messages (required + invalid value)

Lift's `slot="help-text"` renders a single text node — there is no native multi-error display. Work within Lift's system by showing the **most actionable error first** using Zod's schema ordering. Zod runs validations in order and returns the first failure, so structure your schema to surface the most useful message first:

```ts
// Zod returns the first failing rule — order matters
deliveryName: z.string()
  .min(1, 'Delivery configuration name is required')       // shown first if empty
  .min(3, 'Name must be at least 3 characters')            // shown if too short
  .regex(/^[a-zA-Z0-9-_]+$/, 'Only letters, numbers, hyphens, and underscores allowed')
```

This means the user always sees one clear, specific message rather than a list — which is generally better UX anyway.

> ⚠️ Only deviate from the single-message pattern (e.g. rendering a custom list below the field) if the product explicitly requires showing all errors simultaneously. Apply the Deviation Protocol before doing so.

### Fallback: atp-alert (only when no built-in error system exists)

Use `atp-alert` only when a component genuinely has no `isError` prop and no `slot="help-text"` — such as a custom layout wrapper or a non-form Lift component used in a form context. Also always use it for form-level submission errors.

```tsx
{touched.interests && errors.interests && (
  
)}
```

### Quick reference: error display priority

| Situation | Approach |
|---|---|
| Component has `isError` + `slot="help-text"` | ✅ Use both together |
| Component has `isError` only | ✅ Use `isError`, no message display |
| No built-in error system | ⬇️ Fall back to `atp-alert` |
| Form-level submission error | ⬇️ Always use `atp-alert` |

---

## Form Submission

```tsx
const handleSubmit = async (values: FormValues, { setSubmitting, setStatus }: FormikHelpers) => {
  try {
    await submitToApi(values);
    setStatus({ success: 'Form submitted successfully!' });
  } catch (err) {
    setStatus({ error: 'Submission failed. Please try again.' });
  } finally {
    setSubmitting(false);
  }
};
```

Show status feedback with Lift's `atp-alert`:
```tsx
{formik.status?.error && (
  
)}
{formik.status?.success && (
  
)}
```

Disable the submit button while submitting:
```tsx

```

---

## Complex Field Types

### Checkboxes (multiple selected values → array)
```tsx
// Zod: z.array(z.string()).min(1, 'Select at least one')
// initialValues: { interests: [] }

const handleCheckboxChange = (e: CustomEvent, value: string) => {
  const current: string[] = formik.values.interests;
  const updated = e.detail.checked
    ? [...current, value]
    : current.filter((v) => v !== value);
  formik.setFieldValue('interests', updated);
};

// Wire using confirmed event name:
el.addEventListener('changeEventOutput', (e: Event) => handleCheckboxChange(e as CustomEvent, optionValue));
```

---

## Debugging Checklist

When Formik isn't picking up a Lift field's value:

- [ ] Are you using `setFieldValue` / `setFieldTouched`? (not `handleChange` / `handleBlur`)
- [ ] Are you listening to the correct event name for this component? (`changeEventOutput` for `atp-checkbox`, `itemSelectedOutput` for `atp-dropdown` — `atp-change` does not exist in Lift)
- [ ] Is the event detail shape correct? (log `e.detail` to confirm)
- [ ] Is the field `name` in `setFieldValue` matching the key in `initialValues`?
- [ ] Is the `error` prop only shown when `touched[name]` is `true`?
- [ ] Is `zod-formik-adapter` installed and `toFormikValidationSchema` wrapping your schema?

---

## Reference Files

- `references/wrappers.md` — Full source for all reusable `FormikLift*` wrapper components
- `references/full-example.md` — A complete working form using all patterns together

Read these when building a form from scratch or when the user needs a specific wrapper implementation.