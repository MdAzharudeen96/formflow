import { useEffect, useState } from 'react';
import {
  createSubmission,
  getPublicForm,
  getSubmission,
  submitSubmission,
  updateSubmission,
} from '../services/api';

export default function PublicForm({ formId }) {
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [form, setForm] = useState(null);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [pageError, setPageError] = useState('');
  const [message, setMessage] = useState('');
  const [rejectionComment, setRejectionComment] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [action, setAction] = useState('');

  const params = new URLSearchParams(window.location.search);
  const submissionId = params.get('submission');
  const isEditable = !submissionId || submissionStatus === 'draft' || submissionStatus === 'rejected';
  const isRejected = submissionStatus === 'rejected';

  useEffect(() => {
    async function loadPage() {
      try {
        const formResponse = await getPublicForm(formId);
        const loadedForm = formResponse.data.form;

        setForm(loadedForm);

        if (submissionId) {
          const submissionResponse = await getSubmission(submissionId);
          const submission = submissionResponse.data.submission;

          console.log('Submission ID:', submissionId);
          console.log('Loaded submission:', submission);
          console.log('Submission status:', submission.status);
          console.log('Rejection comment:', submission.rejectionComment);

          if (submission.formId?.toString() !== formId) {
            throw new Error('This submission does not belong to this form.');
          }

          setValues(submission.data || {});
          setRejectionComment(submission.rejectionComment || '');
          setSubmissionStatus(submission.status);

        }
      } catch (requestError) {
        setPageError(
          requestError.response?.data?.message ||
            requestError.message ||
            'Unable to load this form.'
        );
      } finally {
        setLoading(false);
      }
    }

    loadPage();
  }, [formId, submissionId]);

  function updateValue(fieldId, value) {
    setValues((current) => ({
      ...current,
      [fieldId]: value,
    }));

    setErrors((current) => ({
      ...current,
      [fieldId]: '',
    }));

    setMessage('');
  }

  function validate() {
    const nextErrors = {};

    form.fields.forEach((field) => {
      const value = values[field._id];

      if (
        field.required &&
        (value === undefined ||
          value === null ||
          String(value).trim() === '')
      ) {
        nextErrors[field._id] = `${field.label} is required.`;
      }
    });

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  function cleanValues() {
    return Object.fromEntries(
      Object.entries(values).map(([key, value]) => [
        key,
        typeof value === 'string' ? value.trim() : value,
      ])
    );
  }

  async function saveDraft() {
    setAction('draft');
    setMessage('');
    setPageError('');

    try {
      const cleanedData = cleanValues();

      if (submissionId) {
        await updateSubmission(submissionId, cleanedData);
        setMessage('Draft saved successfully.');
      } else {
        const response = await createSubmission({
          formId,
          data: cleanedData,
        });

        const newSubmissionId = response.data.submission._id;

        window.history.replaceState(
          {},
          '',
          `/forms/${formId}?submission=${newSubmissionId}`
        );

        setMessage('Draft saved successfully.');
      }
    } catch (requestError) {
      setPageError(
        requestError.response?.data?.message ||
          'Unable to save the draft.'
      );
    } finally {
      setAction('');
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage('');
    setPageError('');

    if (!validate()) return;

    setAction('submit');

    try {
      const cleanedData = cleanValues();

      let currentSubmissionId = submissionId;

      if (currentSubmissionId) {
        await updateSubmission(currentSubmissionId, cleanedData);
      } else {
        const response = await createSubmission({
          formId,
          data: cleanedData,
        });

        currentSubmissionId = response.data.submission._id;

        window.history.replaceState(
          {},
          '',
          `/forms/${formId}?submission=${currentSubmissionId}`
        );
      }

      await submitSubmission(currentSubmissionId);

      setMessage('Form submitted successfully.');
    } catch (requestError) {
      setPageError(
        requestError.response?.data?.message ||
          'Unable to submit the form.'
      );
    } finally {
      setAction('');
    }
  }

  if (isLoading) {
    return (
      <main className="public-form-page">
        <p className="loading-copy">Loading form...</p>
      </main>
    );
  }

  if (pageError && !form) {
    return (
      <main className="public-form-page">
        <section className="public-message">
          <h1>{pageError}</h1>
          <a href="/">Return home</a>
        </section>
      </main>
    );
  }

  return (
    <main className="public-form-page">
      <section className="public-form-card">
        <header className="public-form-header">
          <a className="public-brand" href="/">
            FormFlow
          </a>

          <span className="section-kicker">
            {submissionId ? 'Edit response' : 'Response form'}
          </span>

          <h1>{form.title}</h1>

          {form.description && <p>{form.description}</p>}
        </header>

        {isRejected && (
          <section className="rejection-message">
            <div className="rejection-header">
              <span className="rejection-icon">!</span>

              <div>
                <strong>Submission rejected</strong>
                <p>Please review and correct the information below.</p>
              </div>
            </div>

            <div className="rejection-reason">
              <span>Reviewer comment</span>
              <p>{rejectionComment || 'No rejection reason provided.'}</p>
            </div>
          </section>
        )}

        {isRejected && (
          <div className="edit-instruction">
            Update the required information and submit your response again.
          </div>
        )}

        <form
          className="public-form"
          onSubmit={handleSubmit}
          noValidate
        >
          {form.fields.map((field) => (
            <div className="public-field" key={field._id}>
              <label htmlFor={`public-${field._id}`}>
                {field.label}

                {field.required && (
                  <span className="required-mark">*</span>
                )}
              </label>

              {field.type === 'dropdown' ? (
                <select
                  id={`public-${field._id}`}
                  value={values[field._id] ?? ''}
                  onChange={(event) =>
                    updateValue(field._id, event.target.value)
                  }
                  aria-invalid={Boolean(errors[field._id])}
                  disabled={!isEditable}
                >
                  <option value="">Select an option</option>

                  {field.options.map((option) => (
                    <option value={option} key={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={`public-${field._id}`}
                  type={field.type}
                  value={values[field._id] ?? ''}
                  onChange={(event) =>
                    updateValue(field._id, event.target.value)
                  }
                  aria-invalid={Boolean(errors[field._id])}
                  disabled={!isEditable}
                />
              )}

              {errors[field._id] && (
                <span className="field-error">
                  {errors[field._id]}
                </span>
              )}
            </div>
          ))}

          {pageError && (
            <p className="form-error" role="alert">
              {pageError}
            </p>
          )}

          {message && (
            <p className="form-success" role="status">
              {message}
            </p>
          )}

          {isEditable && (
            <div className="public-actions">
              <button
                className="secondary-button public-action"
                type="button"
                disabled={Boolean(action)}
                onClick={saveDraft}
              >
                {action === 'draft' ? 'Saving...' : 'Save Changes'}
              </button>

              <button
                className="primary-button public-action"
                type="submit"
                disabled={Boolean(action)}
              >
                {action === 'submit' ? 'Submitting...' : 'Submit Again'}
                <span aria-hidden="true">→</span>
              </button>
            </div>
          )}
        </form>

        {submissionId && !isEditable && (
          <div className="submission-status-message">
            <strong>
              This submission is {submissionStatus}.
            </strong>

            <p>
              This submission can no longer be edited.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}