import { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import {
  getAdminSubmission,
  approveSubmission,
  rejectSubmission,
} from '../../services/api';

export default function SubmissionDetails({ submissionId }) {
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectionComment, setRejectionComment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadSubmission() {
      try {
        const response = await getAdminSubmission(submissionId);
        setSubmission(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message || 'Unable to load submission.'
        );
      } finally {
        setLoading(false);
      }
    }

    loadSubmission();
  }, [submissionId]);

  async function handleApprove() {
    try {
      setActionLoading(true);
      const response = await approveSubmission(submissionId);
      setSubmission((current) => ({
        ...current,
        status: response.data.status,
      }));
    } catch (err) {
      setError(
        err.response?.data?.message || 'Unable to approve submission.'
      );
    } finally {
      setActionLoading(false);
    }
  }

  async function handleReject() {
    if (!rejectionComment.trim()) {
        setError('Please enter a rejection reason.');
        return;
    }

    try {
        setActionLoading(true);
        setError('');

        const response = await rejectSubmission(
        submissionId,
        rejectionComment
        );

        setSubmission((current) => ({
        ...current,
        status: response.data.status,
        rejectionComment: response.data.rejectionComment,
        }));

        setShowRejectForm(false);
        setRejectionComment('');
    } catch (err) {
        setError(
        err.response?.data?.message || 'Unable to reject submission.'
        );
    } finally {
        setActionLoading(false);
    }
  }

  if (loading) {
    return (
      <AdminLayout
        currentPath="/admin/submissions"
        eyebrow="Workspace"
        title="Submission"
      >
        <section className="empty-page-panel">
          <h3>Loading submission...</h3>
        </section>
      </AdminLayout>
    );
  }

  if (error || !submission) {
    return (
      <AdminLayout
        currentPath="/admin/submissions"
        eyebrow="Workspace"
        title="Submission"
      >
        <section className="empty-page-panel">
          <h3>Unable to load submission</h3>
          <p>{error || 'Submission not found.'}</p>
        </section>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      currentPath="/admin/submissions"
      eyebrow="Workspace"
      title="Submission Details"
    >
      <section className="page-intro">
        <div>
          <span className="section-kicker">
            {submission.formId?.title || 'Untitled form'}
          </span>
          <h2>Submission Details</h2>
          <p>Review the submitted information.</p>
        </div>
      </section>

      <section className="submission-detail-card">
        {submission.formId?.fields?.map((field) => (
          <div className="submission-field" key={field._id}>
            <span>{field.label}</span>
            <strong>
              {submission.data?.[field._id] !== undefined
                ? String(submission.data[field._id])
                : '-'}
            </strong>
          </div>
        ))}

        <div className="submission-field">
          <span>Status</span>
          <strong className={`status-badge status-${submission.status}`}>
            {submission.status}
          </strong>
        </div>
      </section>

      {submission.status === 'submitted' && (
        <section className="submission-actions">
            <button
                type="button"
                className="submission-approve-button"
                onClick={handleApprove}
                disabled={actionLoading}
            >
                {actionLoading ? 'Processing...' : 'Approve'}
            </button>

            <button
                type="button"
                className="submission-reject-button"
                onClick={() => {
                setError('');
                setShowRejectForm(true);
                }}
                disabled={actionLoading}
            >
                Reject
            </button>
        </section>
      )}

      {showRejectForm && submission.status === 'submitted' && (
        <section className="reject-form-panel">
            <h3>Reject submission</h3>
            <p>Please provide a reason for rejecting this submission.</p>

            <textarea
            value={rejectionComment}
            onChange={(event) => setRejectionComment(event.target.value)}
            placeholder="Enter rejection reason"
            rows="4"
            />

            <div className="submission-actions">
                <button
                    type="button"
                    className="submission-cancel-button"
                    onClick={() => {
                    setShowRejectForm(false);
                    setRejectionComment('');
                    setError('');
                    }}
                    disabled={actionLoading}
                >
                    Cancel
                </button>

                <button
                    type="button"
                    className="submission-reject-button"
                    onClick={handleReject}
                    disabled={actionLoading}
                >
                    {actionLoading ? 'Rejecting...' : 'Confirm Reject'}
                </button>
            </div>
        </section>
      )}
    </AdminLayout>
  );
}