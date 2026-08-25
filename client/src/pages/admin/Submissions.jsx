import { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { getAdminSubmissions } from '../../services/api';

export default function Submissions() {
  const [submissions, setSubmissions] = useState([]);
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
          <p>Submitted responses will appear here once your forms are live.</p>
        </section>
      )}

      {!loading && !error && submissions.length > 0 && (
        <section className="submissions-list">
          {submissions.map((submission) => (
            <article className="submission-card" key={submission._id}>
              <div>
                <span className="section-kicker">
                  {submission.formId?.title || 'Untitled form'}
                </span>

                <h3>
                  Submission #{submission._id.slice(-6)}
                </h3>

                <p>
                  Created{' '}
                  {new Date(submission.createdAt).toLocaleString()}
                </p>
              </div>

              <span className={`status-badge status-${submission.status}`}>
                {submission.status}
              </span>

              <a href={`/admin/submissions/${submission._id}`} className="button button-secondary" >
                View </a>
            </article>
          ))}
        </section>
      )}
    </AdminLayout>
  );
}