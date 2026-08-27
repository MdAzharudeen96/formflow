import { useEffect, useMemo, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { getForms, deleteForm } from '../../services/api';

const ITEMS_PER_PAGE = 5;

export default function Forms() {
  const [forms, setForms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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

  async function handleDeleteForm(form) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${form.title}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteForm(form._id);

      setForms((currentForms) =>
        currentForms.filter((item) => item._id !== form._id)
      );
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          'Unable to delete the form.'
      );
    }
  }

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

  const totalPages = Math.ceil(
    forms.length / ITEMS_PER_PAGE
  );

  const paginatedForms = useMemo(() => {
    const startIndex =
      (currentPage - 1) * ITEMS_PER_PAGE;

    return forms.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [forms, currentPage]);

  function goToPreviousPage() {
    setCurrentPage((page) => Math.max(page - 1, 1));
  }

  function goToNextPage() {
    setCurrentPage((page) =>
      Math.min(page + 1, totalPages)
    );
  }

  return (
    <AdminLayout
      currentPath="/admin/forms"
      eyebrow="Workspace"
      title="Forms"
    >
      <section className="page-intro">
        <div>
          <span className="section-kicker">
            Form library
          </span>

          <h2>Your forms, all in one place</h2>

          <p>
            Manage your FormFlow forms.
          </p>
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

      {!isLoading &&
        !error &&
        paginatedForms.length > 0 && (
          <>
            <section className="forms-list">
              {paginatedForms.map((form) => (
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

                      <button
                        type="button"
                        className="text-button delete-form-button"
                        onClick={() => handleDeleteForm(form)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            {totalPages > 1 && (
              <nav
                className="submission-pagination"
                aria-label="Form pagination"
              >
                <button
                  type="button"
                  className="pagination-button"
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                >
                  ← Previous
                </button>

                <span className="pagination-info">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  type="button"
                  className="pagination-button"
                  onClick={goToNextPage}
                  disabled={
                    currentPage === totalPages
                  }
                >
                  Next →
                </button>
              </nav>
            )}
          </>
        )}
    </AdminLayout>
  );
}