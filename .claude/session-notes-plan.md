# Session Notes: UXE Technical Assessment

A record of the planning conversation — from initial project review through implementation planning.

---

## Project Review

**User:** Review the README and project so I can ask you questions about how to test and initiate actions.

**Claude:** Reviewed the full project. Summary:

- Nx monorepo with three apps: Angular starter, React starter, local API server
- API runs on port 3333, proxied through the dev server at `/api/*`
- The scaffold at `/delivery-configuration/create` has header, sidebar, and breadcrumbs — but the form itself is empty
- **What still needs to be built:** form UI, conditional fields, POST submission, GET on load, success/error feedback

---

## API Testing

**User:** I am already running the React app at localhost:4200. What are the ways to test the APIs?

**Claude:** Options:

1. **Browser (GET only)** — navigate to `http://localhost:3333/api/three-v-deliveries`
2. **curl GET** — `curl http://localhost:3333/api/three-v-deliveries`
3. **curl POST (sample payload)** — `curl -X POST http://localhost:3333/api/three-v-deliveries -H "Content-Type: application/json" --data @apps/tech-assessment-api/sample-payload.json`
4. **Force error** — add `?error=true` to the POST URL
5. **Test validation** — POST with missing fields to trigger 400 errors
6. **Browser DevTools** — Network tab once the form is wired up

> Note: The API stores data in-memory and resets on restart. `count: 0, data: []` is the expected initial state.

**User:** The terminal displays data, but localhost:3333 shows count: 0 and data: [].

**Claude:** That's expected and correct. The API starts empty every time the server boots. Run the sample POST to populate it, then refresh to see `count: 1` with an `acceptedAt` timestamp.

**User:** I see the data on localhost.

**Claude:** The API is fully working. GET, POST, and forced error response all confirmed.

---

## Assignment Briefing

**User:** Review the README. I want to tell you when you are finished reviewing so I can give you more context not in the README. After I provide those points, we'll plan. I want you to wait to plan until I say to start. Before planning, survey me for what's important to consider.

**Claude:** Finished reviewing. Go ahead and share the additional context.

**User:** Here are key aspects about the assignment dependencies:

1. The ATPCO design system is not integrated into this environment — it is hosted externally in a Storybook and provides code snippets.
2. The component code snippets are web components, which may pose risks or dependencies to consider when setting up the project environment.
3. The design system components are built with accessibility and responsiveness.

Keep this in mind for the survey. Tell me when you are ready.

**Claude:** Noted all three points:

- Lift Design System is **externally hosted in Storybook** — snippets are copied in, not auto-imported
- Components are **web components** — real integration considerations around React/Angular rendering, event systems, and property binding
- **Accessibility and responsiveness** are baked in — worth leveraging, not overriding

Ready to survey whenever you are.

---

## Pre-Planning Survey

**User:** Yes, ready.

**Claude:** Survey questions:

1. **Framework** — Angular or React?
2. **Design System Access** — Do you have the Figma mockup and Storybook access?
3. **Web Component Verification** — Have existing components (atp-header, atp-sidebar) rendered correctly in your chosen framework?
4. **Scope & Priorities** — Are you aiming to complete all requirements, or prioritize if time is short?
5. **Submission & Review** — Live technical interview or async submission?
6. **Stretch Goals** — Form validation UX, loading states, TypeScript strictness, unit tests?

---

**User:**
1. React
2. Yes and yes
3. Yes
4. Completing it correctly is more important — time is not a factor
5. Live technical interview
6. Form validation and unit tests would be great, but save them for the end

Before we move on — can you explain more about loading states?

---

**Claude:** Loading states are UI feedback shown while async operations are in progress. Two moments apply here:

**On page load (GET request)**
While fetching existing configs, a subtle loading indicator could show. Since we're only logging to console (not rendering the data in the UI), this is less critical — but worth noting.

**On form submission (POST request)**
This is the important one. Between Submit click and API response, you want to:
- Disable the submit button to prevent duplicate submissions
- Optionally show a spinner or change the label to "Submitting…"
- Transition to success or error once the response arrives

**Why it matters for the interview:** It shows real-world UX thinking beyond "it works." A form that allows double-submit or gives no feedback while waiting feels unfinished — especially notable at a UX-focused company like ATPCO.

**Recommendation:** Keep it simple — disable the button and show a loading state during submission. Lightweight, no extra dependencies, easy to explain.

**User:** Yes, that makes sense. Let's start planning.

---

## Planning Session

### Clarifying Questions

**Claude:** Do you have access to the Figma mockup and can you share it?

**User:** I'll share it now. *(shared two screenshots — email variant and S3 variant)*

---

**Claude:** Two quick questions before finalizing the plan:

**After a successful form submission, what should happen?**

**User:** Show success alert, keep form as-is.

**What label should the submit button have?**

**User:** Save.

---

### Approved Plan Summary

**3 files to modify:**

| File | Change |
|------|--------|
| `delivery-configuration-create.tsx` | Full form implementation |
| `app/types/atp-components.d.ts` | Add TypeScript declarations for form components |
| `styles.css` | Form layout and conditional section styles |

**Form field order (from Figma):**

1. Delivery configuration name `*`
2. Customer `*`
3. Delivery frequency in cron format *(optional, with helper link)*
4. Last file suffix *(optional, with helper text)*
5. Delivery location `*` — select dropdown (Email / GCloud / Azure / S3)
   - **If Email:** Recipient email, Subject, Body (textarea)
   - **If cloud:** Bucket, Credentials file, Upload option
6. Delivery file name `*`
7. Combine files — checkbox
   - **If checked:** Maximum file size (MB), Check file size post compression
8. Place files into specific delivery directory
9. Virus scan
10. Use encryption
11. Save button

**Key technical decisions:**

- **`atp-input` with slotted native `<input>`** — label goes in `slot="label"`, value tracked with React `onChange` directly on the native element. Clean React pattern, no extra event plumbing.
- **Native `<select>` for Delivery location** — `atp-dropdown` is a complex popover component requiring toggle state management. Native select matches the Figma visually, is more accessible, and is straightforward to defend in the interview.
- **`atp-checkbox` via refs** — `checked` is a JS property, not an HTML attribute. Synced via `useEffect` + `ref`; state changes tracked via `clickEventOutput` event listener.
- **`atp-button` loading state** — `disabled` and `isLoading` properties set via ref, synced in `useEffect` on `submitState` change.
- **`atp-alert` for feedback** — `color="info"` on success, `color="danger"` on error. Rendered conditionally in JSX.
- **GET on mount** — fetch existing configs, sort by `acceptedAt` oldest → newest, `console.log`.
- **POST on submit** — conditionally build payload based on `deliveryLocation` and `combineFiles`, handle 200/error responses.

---

*Implementation was completed in the same session. Build passed with zero errors.*
