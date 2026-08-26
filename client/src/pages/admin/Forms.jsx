import { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { getForms } from '../../services/api';

export default function Forms() {
  const [forms, setForms] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copiedFormId, setCopiedFormId] = useState('');

  useEffect(() => {
    getForms()
      .then(({ data }) => setForms(data.forms))
      .catch((requestError) =>
        setError(
          requestError.response?.data?.message ??
            'Unable to load forms.'
        )
      )
      .finally(() => setLoading(false));
  }, []);

  async function copyFormLink(formId) {
    const formUrl = `${window.location.origin}/forms/${formId}`;

    try {
      await navigator.clipboard.writeText(formUrl);

      setCopiedFormId(formId);

      setTimeout(() => {
        setCopiedFormId('');
      }, 2000);
    } catch {
      setError('Unable to copy the form link.');
    }
  }

  return (
    <AdminLayout
      currentPath="/admin/forms"
      eyebrow="Workspace"
      title="Forms"
    >
      <section className="page-intro">
        <div>
          <span className="section-kicker">Form library</span>

          <h2>Forms</h2>

          <p>Manage your FormFlow forms.</p>
        </div>

        <a
          className="primary-button"
          href="/admin/forms/new"
        >
          Create Form <span aria-hidden="true">+</span>
        </a>
      </section>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      {isLoading && (
        <p className="loading-copy">
          Loading forms...
        </p>
      )}

      {!isLoading &&
        !error &&
        forms.length === 0 && (
          <section className="empty-page-panel">
            <div className="empty-icon">□</div>

            <h3>No forms created yet.</h3>

            <p>
              Your created forms will appear here when you
              are ready to build one.
            </p>
          </section>
        )}

      {!isLoading && forms.length > 0 && (
        <section className="forms-list">
          {forms.map((form) => (
            <article
              className="form-list-item"
              key={form._id}
            >
              <div>
                <h3>{form.title}</h3>

                <p>
                  {form.description ||
                    'No description provided.'}
                </p>
              </div>

              <div className="form-list-meta">
                <span>
                  {form.fields.length}{' '}
                  {form.fields.length === 1
                    ? 'field'
                    : 'fields'}
                </span>

                <small>
                  Created:{' '}
                  {new Date(
                    form.createdAt
                  ).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </small>

                <div className="form-list-actions">
                  <a
                    className="text-button"
                    href={`/admin/forms/${form._id}/edit`}
                  >
                    Edit
                  </a>

                  <button
                    type="button"
                    className="text-button copy-link-button"
                    onClick={() =>
                      copyFormLink(form._id)
                    }
                  >
                    {copiedFormId === form._id
                      ? '✓ Link Copied'
                      : 'Copy Form Link'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </AdminLayout>
  );
}