import { useEffect, useMemo, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { getAdminSubmissions } from '../../services/api';

const filters = [
  { key: 'all', label: 'All' },
  { key: 'draft', label: 'Draft' },
  { key: 'submitted', label: 'Submitted' },
  { key: 'approved', label: 'Approved' },
  { key: 'rejected', label: 'Rejected' },
];

export default function Submissions() {
  const [submissions, setSubmissions] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadSubmissions() {
      try {
        const response = await getAdminSubmissions();
        setSubmissions(response.data || []);
      } catch (err) {
        setError(
          err.response?.data?.message || 'Unable to load submissions.'
        );
      } finally {
        setLoading(false);
      }
    }

    loadSubmissions();
  }, []);

  const counts = useMemo(() => {
    return {
      all: submissions.length,
      draft: submissions.filter((item) => item.status === 'draft').length,
      submitted: submissions.filter(
        (item) => item.status === 'submitted'
      ).length,
      approved: submissions.filter(
        (item) => item.status === 'approved'
      ).length,
      rejected: submissions.filter(
        (item) => item.status === 'rejected'
      ).length,
    };
  }, [submissions]);

  const filteredSubmissions = useMemo(() => {
    if (selectedFilter === 'all') {
      return submissions;
    }

    return submissions.filter(
      (submission) => submission.status === selectedFilter
    );
  }, [submissions, selectedFilter]);

  return (
    <AdminLayout
      currentPath="/admin/submissions"
      eyebrow="Workspace"
      title="Submissions"
    >
      <section className="page-intro">
        <div>
          <span className="section-kicker">Response inbox</span>
          <h2>Submissions</h2>
          <p>Review submitted form responses.</p>
        </div>
      </section>

      {!loading && !error && submissions.length > 0 && (
        <section
          className="submission-filters"
          aria-label="Submission filters"
        >
          {filters.map((filter) => (
            <button
              key={filter.key}
              type="button"
              className={`filter-button ${
                selectedFilter === filter.key ? 'active' : ''
              }`}
              onClick={() => setSelectedFilter(filter.key)}
            >
              {filter.label}
              <span>{counts[filter.key]}</span>
            </button>
          ))}
        </section>
      )}

      {loading && (
        <section className="empty-page-panel">
          <h3>Loading submissions...</h3>
        </section>
      )}

      {error && (
        <section className="empty-page-panel">
          <h3>Unable to load submissions</h3>
          <p>{error}</p>
        </section>
      )}

      {!loading && !error && submissions.length === 0 && (
        <section className="empty-page-panel">
          <div className="empty-icon">◌</div>
          <h3>No submissions yet.</h3>
          <p>
            Submitted responses will appear here once your forms are live.
          </p>
        </section>
      )}

      {!loading &&
        !error &&
        submissions.length > 0 &&
        filteredSubmissions.length === 0 && (
          <section className="empty-page-panel">
            <h3>No {selectedFilter} submissions</h3>
            <p>There are no submissions with this status.</p>
          </section>
        )}

      {!loading &&
        !error &&
        filteredSubmissions.length > 0 && (
          <section className="submissions-list">
            {filteredSubmissions.map((submission) => (
              <article
                className="submission-card"
                key={submission._id}
              >
                <div>
                  <span className="section-kicker">
                    {submission.formId?.title || 'Untitled form'}
                  </span>

                  <h3>
                    Submission #{submission._id.slice(-6)}
                  </h3>

                  <p>
                    Created{' '}
                    {new Date(
                      submission.createdAt
                    ).toLocaleString()}
                  </p>
                </div>

                <span
                  className={`status-badge status-${submission.status}`}
                >
                  {submission.status}
                </span>

                <a
                  href={`/admin/submissions/${submission._id}`}
                  className="button button-secondary"
                >
                  View
                </a>
              </article>
            ))}
          </section>
        )}
    </AdminLayout>
  );
}