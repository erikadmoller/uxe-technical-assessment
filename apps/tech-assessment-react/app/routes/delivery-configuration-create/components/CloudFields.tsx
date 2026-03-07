import type { FormikProps } from 'formik';
import type { FormValues } from '../types';

interface CloudFieldsProps {
  bucketRef: React.RefObject<HTMLElementTagNameMap['atp-input'] | null>;
  credentialsFileRef: React.RefObject<HTMLElementTagNameMap['atp-input'] | null>;
  uploadOptionRef: React.RefObject<HTMLElementTagNameMap['atp-input'] | null>;
  formik: FormikProps<FormValues>;
}

export function CloudFields({ bucketRef, credentialsFileRef, uploadOptionRef, formik }: CloudFieldsProps) {
  return (
    <atp-card density="default">
      <div className="conditional-fields">
        <atp-input ref={bucketRef} required>
          <label slot="label" htmlFor="bucket">Bucket</label>
          <input
            id="bucket"
            aria-label="Bucket name"
            name="bucket"
            type="text"
            value={formik.values.bucket}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.bucket && formik.errors.bucket && (
            <span slot="help-text" className="field-error">
              {String(formik.errors.bucket)}
            </span>
          )}
        </atp-input>

        <atp-input ref={credentialsFileRef} required>
          <label slot="label" htmlFor="credentialsFile">Credentials file</label>
          <input
            id="credentialsFile"
            aria-label="Credentials file path"
            name="credentialsFile"
            type="text"
            value={formik.values.credentialsFile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.credentialsFile && formik.errors.credentialsFile && (
            <span slot="help-text" className="field-error">
              {String(formik.errors.credentialsFile)}
            </span>
          )}
        </atp-input>

        <atp-input ref={uploadOptionRef} required>
          <label slot="label" htmlFor="uploadOption">Upload option</label>
          <input
            id="uploadOption"
            aria-label="Upload option"
            name="upload_option"
            type="text"
            value={formik.values.upload_option}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.upload_option && formik.errors.upload_option && (
            <span slot="help-text" className="field-error">
              {String(formik.errors.upload_option)}
            </span>
          )}
        </atp-input>
      </div>
    </atp-card>
  );
}
