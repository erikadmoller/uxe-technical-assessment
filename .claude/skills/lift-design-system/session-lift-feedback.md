## Lift Compliance Review

### ✅ Compliant

- All `atp-*` components used as custom elements (correct pattern)
- Spacing tokens used throughout: `var(--atp-space-*)` in styles.css and TSX layout classes
- `atp-checkbox` props (`label`, `name`, `checked`, `clickEventOutput`) match the story API
- `atp-button` props (`label`, `appearance`, `disabled`, `isLoading`, `clickEventOutput`) match the story API
- `atp-alert` props (`label`, `appearance`, `color`) confirmed by the story
- JS property syncing via `useEffect` + refs for web component properties — correct React/web-component integration pattern
- `var(--atp-color-danger)` used as primary token for `.field-error`

---

### ⚠️ Deviations Found

**[1] Raw hex border color on `.conditional-section`** — Severity: **High**
- Found in `styles.css:29`: `border: 1px solid #d1d5db`
- Issue: Raw hex instead of a Lift color token
- Action: Should I replace with a Lift neutral/border token (e.g., `var(--atp-neutral-300)` or equivalent)? Share `/vendor/atp-web-docs/package/docs/base/colors/colors.stories.ts` so I can confirm the correct token name.

**[2] Hardcoded `border-radius` on `.conditional-section`** — Severity: **High**
- Found in `styles.css:32`: `border-radius: 4px`
- Issue: Hardcoded value instead of a Lift border-radius token
- Action: Should I replace with a Lift token (e.g., `var(--atp-border-radius-s)` or similar)? I'd need to confirm from the border-radius stories.

**[3] Raw `<a>` tag instead of `atp-link`** — Severity: **Medium**
- Found in `delivery-configuration-create.tsx:443`: `<a href="https://crontab.cronhub.io" ...>`
- Issue: Lift provides `atp-link` for hyperlinks. Using a raw `<a>` tag bypasses the design system.
- Action: Replace with `<atp-link>` — should I do this? I'll need the `/vendor/link.stories.ts` to confirm props.

**[4] Unconfirmed `hasClose` prop on `atp-alert`** — Severity: **Medium**
- Found in `delivery-configuration-create.tsx:657` and `:666`: `hasClose`
- Issue: The `/vendor/alert.stories.ts` does not list `hasClose` as a prop — only `icon`, `label`, `appearance`, `color` are shown in `argTypes`. The `closeEventOutput` event exists, but close button rendering may be controlled differently.
- Action: This may be a non-documented prop that works, or it may be silently ignored. Can you verify if the close button actually renders? If not, I need to look deeper at the alert component source.

**[5] `isLoading` set as JSX attribute on `atp-button`** — Severity: **Medium**
- Found in `delivery-configuration-create.tsx:676`: `isLoading={submitState === 'loading'}`
- Issue: In React JSX, boolean props on custom elements become string attributes (`"true"`/`"false"`), not JS properties. The button story uses `.isLoading` (dot-prefix = JS property binding in Lit). The `checked` prop on checkboxes is correctly synced via `useEffect`+ref, but `isLoading` is not.
- Action: Should be synced via `submitBtnRef` in a `useEffect`, same as the checkbox pattern. Should I fix this?

**[6] Raw hex fallback in `.field-error`** — Severity: **Low**
- Found in `styles.css:47`: `color: var(--atp-color-danger, #dc2626)`
- Issue: The fallback `#dc2626` is a raw hex. If the Lift token fails to load, it falls back to a non-system value.
- Action: Either remove the fallback (trust the token), or replace with a second Lift token as fallback. Should I clean this up?

**[7] Hardcoded `max-width: 480px`** — Severity: **Low**
- Found in `styles.css:21`: `max-width: 480px`
- Issue: No Lift layout/space token for `480px`. This is a layout constraint.
- Action: Lift likely doesn't have an equivalent layout-width token, so this may be intentional. Flagging per the Deviation Protocol — confirm this is acceptable?

**[8] Inline `style` on native `<input>` inside `atp-input`** — Severity: **Low**
- Found in `delivery-configuration-create.tsx:469`: `style={{ cursor: 'pointer', caretColor: 'transparent' }}`
- Issue: `cursor` and `caretColor` are set as inline styles on the native `<input>`. These aren't Lift tokens, and `caretColor: transparent` is a workaround to hide the caret on a read-only input used as a dropdown trigger.
- Action: This is a functional workaround for the dropdown UX. Flagging — confirm this is acceptable?

---

**Priority to fix:** Items 1, 2, 5 are the most impactful. Want me to start with any of these?