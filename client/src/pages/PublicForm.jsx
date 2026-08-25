import { useEffect, useState } from 'react';
import { createSubmission, getPublicForm, submitSubmission } from '../services/api';

export default function PublicForm({ formId }) {
  const [form, setForm] = useState(null);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [pageError, setPageError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [action, setAction] = useState('');

  useEffect(() => {
    getPublicForm(formId)
      .then(({ data }) => setForm(data.form))
      .catch((requestError) => setPageError(requestError.response?.status === 404 ? 'Form not found.' : 'Unable to load this form.'))
      .finally(() => setLoading(false));
  }, [formId]);

  function updateValue(fieldId, value) {
    setValues((current) => ({ ...current, [fieldId]: value }));
    setErrors((current) => ({ ...current, [fieldId]: '' }));
    setMessage('');
  }

  function validate() {
    const nextErrors = {};
    form.fields.forEach((field) => {
      const value = values[field._id];
      if (field.required && (value === undefined || value === null || String(value).trim() === '')) {
        nextErrors[field._id] = `${field.label} is required.`;
      }
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function cleanValues() {
    return Object.fromEntries(Object.entries(values).map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value]));
  }

  async function saveDraft() {
    setAction('draft');
    setMessage('');
    setPageError('');
    try {
      await createSubmission({ formId, data: cleanValues(), status: 'draft' });
      setMessage('Draft saved successfully.');
    } catch (requestError) {
      setPageError(requestError.response?.data?.message ?? 'Unable to save the draft.');
    } finally {
      setAction('');
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');
    if (!validate()) return;

    setAction('submit');
    setPageError('');
    try {
      const { data } = await createSubmission({ formId, data: cleanValues(), status: 'draft' });
      await submitSubmission(data.submission._id);
      setMessage('Form submitted successfully.');
    } catch (requestError) {
      setPageError(requestError.response?.data?.message ?? 'Unable to submit the form.');
    } finally {
      setAction('');
    }
  }

  if (isLoading) return <main className="public-form-page"><p className="loading-copy">Loading form...</p></main>;
  if (pageError && !form) return <main className="public-form-page"><section className="public-message"><h1>{pageError}</h1><a href="/">Return home</a></section></main>;

  return (
    <main className="public-form-page">
      <section className="public-form-card">
        <header className="public-form-header"><a className="public-brand" href="/">FormFlow</a><span className="section-kicker">Response form</span><h1>{form.title}</h1>{form.description && <p>{form.description}</p>}</header>
        <form className="public-form" onSubmit={handleSubmit} noValidate>
          {form.fields.map((field) => <div className="public-field" key={field._id}><label htmlFor={`public-${field._id}`}>{field.label}{field.required && <span className="required-mark">*</span>}</label>{field.type === 'dropdown' ? <select id={`public-${field._id}`} value={values[field._id] ?? ''} onChange={(event) => updateValue(field._id, event.target.value)}><option value="">Select an option</option>{field.options.map((option) => <option value={option} key={option}>{option}</option>)}</select> : <input id={`public-${field._id}`} type={field.type} value={values[field._id] ?? ''} onChange={(event) => updateValue(field._id, event.target.value)} aria-invalid={Boolean(errors[field._id])} />}{errors[field._id] && <span className="field-error">{errors[field._id]}</span>}</div>)}
          {pageError && <p className="form-error" role="alert">{pageError}</p>}
          {message && <p className="form-success" role="status">{message}</p>}
          <div className="public-actions"><button className="secondary-button public-action" type="button" disabled={Boolean(action)} onClick={saveDraft}>{action === 'draft' ? 'Saving...' : 'Save Draft'}</button><button className="primary-button public-action" type="submit" disabled={Boolean(action)}>{action === 'submit' ? 'Submitting...' : 'Submit'} <span aria-hidden="true">→</span></button></div>
        </form>
      </section>
    </main>
  );
}
