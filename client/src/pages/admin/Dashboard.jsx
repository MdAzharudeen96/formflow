import { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { getForms, getAdminSubmissions } from '../../services/api';

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    totalForms: 0,
    totalSubmissions: 0,
    pendingReviews: 0,
    approved: 0,
    rejected: 0,
  });

  const [recentSubmissions, setRecentSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [formsResponse, submissionsResponse] =
          await Promise.all([
            getForms(),
            getAdminSubmissions(),
          ]);

        const forms = formsResponse.data?.forms || [];
        const submissions = submissionsResponse.data || [];

        setMetrics({
          totalForms: forms.length,

          totalSubmissions: submissions.filter(
            (submission) => submission.status !== 'draft'
          ).length,

          pendingReviews: submissions.filter(
            (submission) => submission.status === 'submitted'
          ).length,

          approved: submissions.filter(
            (submission) => submission.status === 'approved'
          ).length,

          rejected: submissions.filter(
            (submission) => submission.status === 'rejected'
          ).length,
        });

        setRecentSubmissions(
          submissions
            .filter((submission) => submission.status !== 'draft')
            .sort(
              (a, b) =>
                new Date(b.updatedAt || b.createdAt) -
                new Date(a.updatedAt || a.createdAt)
            )
            .slice(0, 5)
        );
      } catch (err) {
        setError(
          err.response?.data?.message ||
            'Unable to load dashboard data.'
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const metricCards = [
    [
      'Total Forms',
      metrics.totalForms,
      'Your form library',
    ],
    [
      'Total Submissions',
      metrics.totalSubmissions,
      'Responses received',
    ],
    [
      'Pending Reviews',
      metrics.pendingReviews,
      'Waiting for your review',
    ],
    [
      'Approved',
      metrics.approved,
      'Accepted submissions',
    ],
    [
      'Rejected',
      metrics.rejected,
      'Submissions needing changes',
    ],
  ];

  return (
    <AdminLayout
      currentPath="/admin"
      eyebrow="Overview"
      title="Dashboard"
    >
      <section className="welcome-row">
        <div>
          <span className="section-kicker">
            Good to see you
          </span>

          <h2>Your workspace at a glance.</h2>

          <p>
            Keep your forms organized and your review queue moving.
          </p>
        </div>

        <div className="date-stamp">
          Today{' '}
          <strong>
            {new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </strong>
        </div>
      </section>

      {error && (
        <section className="empty-page-panel">
          <h3>Unable to load dashboard</h3>
          <p>{error}</p>
        </section>
      )}

      <section
        className="metric-grid"
        aria-label="Dashboard metrics"
      >
        {metricCards.map(([label, value, note]) => (
          <article
            className="metric-card"
            key={label}
          >
            <span>{label}</span>

            <strong>
              {loading ? '—' : value}
            </strong>

            <small>{note}</small>
          </article>
        ))}
      </section>

      <section className="activity-panel">
        <div className="panel-heading">
          <div>
            <span className="section-kicker">
              Timeline
            </span>

            <h2>Recent activity</h2>
          </div>

          <span className="panel-count">
            {loading
              ? '—'
              : `${recentSubmissions.length} recent`}
          </span>
        </div>

        {loading ? (
          <div className="empty-state">
            <h3>Loading activity...</h3>
          </div>
        ) : recentSubmissions.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">◌</div>

            <h3>No activity yet</h3>

            <p>
              Activity from your forms and submissions will
              appear here.
            </p>
          </div>
        ) : (
          <div className="activity-list">
            {recentSubmissions.map((submission) => (
              <article
                className="activity-item"
                key={submission._id}
              >
                <div className="activity-main">
                  <span className="section-kicker">
                    {submission.formId?.title || 'Untitled form'}
                  </span>

                  <h3>
                    Submission #{submission._id.slice(-6)}
                  </h3>

                  <p>
                    {new Date(
                      submission.updatedAt ||
                        submission.createdAt
                    ).toLocaleString()}
                  </p>
                </div>

                <div className="activity-right">
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
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </AdminLayout>
  );
}