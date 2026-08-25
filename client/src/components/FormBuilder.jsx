import { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { createForm, getForm, updateForm } from '../services/api';

const fieldTypes = [
  { value: 'text', label: 'Text' },
  { value: 'number', label: 'Number' },
  { value: 'dropdown', label: 'Dropdown' },
  { value: 'date', label: 'Date' },
];

function newField() {
  return { label: '', type: 'text', required: false, options: [] };
}

export default function FormBuilder({ formId }) {
  const isEditing = Boolean(formId);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fields, setFields] = useState([]);
  const [error, setError] = useState('');
  const [isSaving, setSaving] = useState(false);
  const [isLoading, setLoading] = useState(isEditing);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!isEditing) return undefined;

    getForm(formId)
      .then(({ data }) => {
        setTitle(data.form.title);
        setDescription(data.form.description ?? '');
        setFields(data.form.fields.map((field) => ({ ...field, options: field.options ?? [] })));
      })
      .catch((requestError) => {
        if (requestError.response?.status === 404) setNotFound(true);
        else setError(requestError.response?.data?.message ?? 'Unable to load the form.');
      })
      .finally(() => setLoading(false));
  }, [formId, isEditing]);

  function updateField(index, key, value) {
    setFields((current) => current.map((field, fieldIndex) => fieldIndex === index ? { ...field, [key]: value } : field));
  }

  function changeType(index, type) {
    setFields((current) => current.map((field, fieldIndex) => fieldIndex === index ? { ...field, type, options: type === 'dropdown' ? field.options : [] } : field));
  }

  function addOption(fieldIndex) {
    setFields((current) => current.map((field, index) => index === fieldIndex ? { ...field, options: [...field.options, ''] } : field));
  }

  function updateOption(fieldIndex, optionIndex, value) {
    setFields((current) => current.map((field, index) => index === fieldIndex ? { ...field, options: field.options.map((option, currentOption) => currentOption === optionIndex ? value : option) } : field));
  }

  function removeOption(fieldIndex, optionIndex) {
    setFields((current) => current.map((field, index) => index === fieldIndex ? { ...field, options: field.options.filter((_option, currentOption) => currentOption !== optionIndex) } : field));
  }

  function validate() {
    if (!title.trim()) return 'Form title is required.';
    if (fields.some((field) => !field.label.trim())) return 'Field label is required.';
    if (fields.some((field) => field.type === 'dropdown' && (!field.options.length || field.options.some((option) => !option.trim())))) return 'Dropdown must have at least one option.';
    return '';
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationError = validate();
    setError(validationError);
    if (validationError) return;

    setSaving(true);
    try {
      const payload = {
        title,
        description,
        fields: fields.map(({ label, type, required, options }) => ({ label, type, required, ...(type === 'dropdown' ? { options } : {}) })),
      };
      if (isEditing) await updateForm(formId, payload);
      else await createForm(payload);
      window.history.pushState({}, '', '/admin/forms');
      window.dispatchEvent(new PopStateEvent('popstate'));
    } catch (requestError) {
      setError(requestError.response?.data?.message ?? `Unable to ${isEditing ? 'update' : 'create'} the form. Please try again.`);
    } finally {
      setSaving(false);
    }
  }

  if (isLoading) return <AdminLayout currentPath="/admin/forms" eyebrow="Form library" title="Edit form"><p className="loading-copy">Loading form...</p></AdminLayout>;
  if (notFound) return <AdminLayout currentPath="/admin/forms" eyebrow="Form library" title="Edit form"><section className="empty-page-panel"><h3>Form not found.</h3><a className="secondary-button" href="/admin/forms">Back to Forms</a></section></AdminLayout>;

  return (
    <AdminLayout currentPath="/admin/forms" eyebrow="Form library" title={isEditing ? 'Edit form' : 'Create form'}>
      <form className="builder-form" onSubmit={handleSubmit}>
        <section className="builder-heading"><div><span className="section-kicker">{isEditing ? 'Update workspace asset' : 'New workspace asset'}</span><h2>{isEditing ? 'Edit Form' : 'Create Form'}</h2><p>{isEditing ? 'Keep your form structure current.' : 'Build the structure your audience will complete later.'}</p></div><div className="builder-actions"><a className="secondary-button" href="/admin/forms">Cancel</a><button className="primary-button" type="submit" disabled={isSaving}>{isSaving ? 'Saving...' : isEditing ? 'Save Changes' : 'Save Form'} <span aria-hidden="true">→</span></button></div></section>
        {error && <p className="form-error" role="alert">{error}</p>}
        <section className="builder-card form-details"><div className="builder-section-title"><span>01</span><div><h3>Form details</h3><p>Give this form a clear name and purpose.</p></div></div><label htmlFor="form-title">Form title</label><input id="form-title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Employee information" /><label htmlFor="form-description">Description <span className="optional">Optional</span></label><textarea id="form-description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="What is this form for?" rows="3" /></section>
        <section className="builder-card fields-card"><div className="builder-section-title"><span>02</span><div><h3>Fields</h3><p>Add the questions your form should ask.</p></div><span className="field-count">{fields.length} {fields.length === 1 ? 'field' : 'fields'}</span></div>{fields.length === 0 && <div className="builder-empty"><span>+</span><p>No fields added yet.</p><small>Start with the first field below.</small></div>}<div className="field-list">{fields.map((field, index) => <article className="field-editor" key={`${index}-${field.type}`}><div className="field-editor-top"><strong>Field {index + 1}</strong><button className="text-button danger" type="button" onClick={() => setFields((current) => current.filter((_item, itemIndex) => itemIndex !== index))}>Remove</button></div><div className="field-grid"><div><label htmlFor={`field-label-${index}`}>Label</label><input id={`field-label-${index}`} value={field.label} onChange={(event) => updateField(index, 'label', event.target.value)} placeholder="Question label" /></div><div><label htmlFor={`field-type-${index}`}>Type</label><select id={`field-type-${index}`} value={field.type} onChange={(event) => changeType(index, event.target.value)}>{fieldTypes.map((type) => <option value={type.value} key={type.value}>{type.label}</option>)}</select></div></div><label className="checkbox-label"><input type="checkbox" checked={field.required} onChange={(event) => updateField(index, 'required', event.target.checked)} /> Required</label>{field.type === 'dropdown' && <div className="options-editor"><div className="options-heading"><label>Options</label><span>One option per choice</span></div>{field.options.map((option, optionIndex) => <div className="option-row" key={optionIndex}><input aria-label={`Option ${optionIndex + 1}`} value={option} onChange={(event) => updateOption(index, optionIndex, event.target.value)} placeholder={`Option ${optionIndex + 1}`} /><button className="text-button danger" type="button" onClick={() => removeOption(index, optionIndex)}>Remove</button></div>)}<button className="secondary-button" type="button" onClick={() => addOption(index)}>+ Add option</button></div>}</article>)}</div><button className="add-field-button" type="button" onClick={() => setFields((current) => [...current, newField()])}>+ Add Field</button></section>
      </form>
    </AdminLayout>
  );
}
