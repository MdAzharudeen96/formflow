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

const ITEMS_PER_PAGE = 5;

export default function Submissions() {
  const [submissions, setSubmissions] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  console.log("submissions", submissions);

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

  const totalPages = Math.ceil(
    filteredSubmissions.length / ITEMS_PER_PAGE
  );

  const paginatedSubmissions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredSubmissions.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [filteredSubmissions, currentPage]);

  function handleFilterChange(filterKey) {
    setSelectedFilter(filterKey);
    setCurrentPage(1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => Math.max(page - 1, 1));
  }

  function goToNextPage() {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  }

  return (
    <AdminLayout
      currentPath="/admin/submissions"
      eyebrow="Workspace"
      title="Submissions"
    >
      <section className="page-intro">
        <div>
          <span className="section-kicker">Response inbox</span>
          <h2>Your review queue</h2>
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
              onClick={() => handleFilterChange(filter.key)}
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
        paginatedSubmissions.length > 0 && (
          <>
            <section className="submissions-list">
              {paginatedSubmissions.map((submission) => (
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

                    {((submission.status === 'draft' && submission.draftAt) ||
                      (submission.status === 'submitted' && submission.submittedAt) ||
                      (submission.status === 'approved' && submission.approvedAt) ||
                      (submission.status === 'rejected' && submission.rejectedAt)) && (
                      <p>
                        {submission.status === 'draft' &&
                          `Draft saved: ${new Date(submission.draftAt).toLocaleString()}`}

                        {submission.status === 'submitted' &&
                          `Submitted: ${new Date(submission.submittedAt).toLocaleString()}`}

                        {submission.status === 'approved' &&
                          `Approved: ${new Date(submission.approvedAt).toLocaleString()}`}

                        {submission.status === 'rejected' &&
                          `Rejected: ${new Date(submission.rejectedAt).toLocaleString()}`}
                      </p>
                    )}
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

            {totalPages > 1 && (
              <nav
                className="submission-pagination"
                aria-label="Submission pagination"
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
                  disabled={currentPage === totalPages}
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

