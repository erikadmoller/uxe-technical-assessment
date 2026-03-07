# Implementation Notes

## Technology Stack
- React
- [Formik](https://formik.org/) — manages form state, touched/error tracking, and submission lifecycle via `useFormik`
- [Zod](https://zod.dev/) + [zod-formik-adapter](https://github.com/robertLichtnow/zod-formik-adapter) — schema-based validation bridged into Formik's `validationSchema` prop

Source code found in `apps/tech-assessment-react/app/routes/delivery-configuration-create/index.tsx`

**TypeScript**
- Custom global declarations in `app/types/atp-components.d.ts` extend JSX intrinsic elements with ATP-Web component types and their custom event signatures

---
## Features Implemented to quickly test UI
- **Delivery configurations list** -
In addition to fetching `GET /api/three-v-deliveries` and logging them to the console, a Get Deliveries button was created to retrieve the latest addition after file is posted.
- **Shortcut capabilities** - 
Button `Fill form` fills the form with valid mock data.
Button `Trigger API` error adds the `?error=true` to the POST url to trigger the error alert display.
- **Unit and integration tests** — Some unit tests are written in /tests/routes folder in a file called `delivery-configuration-create.spec.tsx`

## Future enhancements
- More unit tests the cover all components, all accessibility workflows including aria labels and keyboard, API, and validation tests.
- Refactor the Delivery location into a separate React component to remove the conditional rendering.
- State management with like Redux if the app scales

---

## AI Usage

### Planning session
At the start of the project, a planning session was run with Claude to map out the implementation approach — you can view the plan at `@/.claude/session-notes-plan.md`

### Claude Skills
Two custom Claude Code skills were created in `.claude/skills/` to support this project:

- **`lift-design-system`** — Loads Claude as a Lift design system engineer. Enforces correct use of `atp-*` components, Lift CSS tokens, and the `/vendor` stories workflow. Flags any deviation from the design system before allowing custom CSS or raw values.

- **`formik-lift`** — Specializes Claude in wiring Formik + Zod to Lift web components. Covers the two integration patterns: shell components like `atp-input` (native `<input>` slotted inside, standard Formik `onChange`/`onBlur`) vs. self-contained components like `atp-checkbox` and `atp-dropdown` (custom DOM events, `setFieldValue`/`setFieldTouched` via `useEffect`).

### Lift compliance review
A compliance review session was run using the `lift-design-system` skill against the completed form. The session output is saved in `.claude/skills/lift-design-system/session-lift-feedback.md`. The skill identified 8 deviations: raw colors, hard-coded values, and wrong props, demonstrating fidelity to the design system.

---

## Insights

### Formik + Zod struggled with Input Dropdown component (cross-field)

Zod handles validation for fields that are always required. But some fields are only required depending on other field values — for example, email fields only matter when `deliveryLocation` is `'email'`. Zod struggles with cross-field logic (Location dropdown dynamic field groupings), so those rules live in a separate Formik `validate()` function instead. Formik combines errors from both sources automatically - the rest of the form code is indifferent to it.

### Checkbox ariaLabel prop
Rendering issues - the aria label renders, but the value does not. Removed it.