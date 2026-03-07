import type { FormikProps } from 'formik';
import type { FormValues } from '../types';

interface EmailFieldsProps {
  recipientsRef: React.RefObject<HTMLElementTagNameMap['atp-input'] | null>;
  subjectRef: React.RefObject<HTMLElementTagNameMap['atp-input'] | null>;
  bodyRef: React.RefObject<HTMLElementTagNameMap['atp-input'] | null>;
  formik: FormikProps<FormValues>;
}

export function EmailFields({ recipientsRef, subjectRef, bodyRef, formik }: EmailFieldsProps) {
  return (
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
  );
}
