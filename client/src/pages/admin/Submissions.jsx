import AdminLayout from '../../components/AdminLayout';

export default function Submissions() {
  return (
    <AdminLayout currentPath="/admin/submissions" eyebrow="Workspace" title="Submissions">
      <section className="page-intro"><div><span className="section-kicker">Response inbox</span><h2>Submissions</h2><p>Review submitted form responses.</p></div></section>
      <section className="empty-page-panel">
        <div className="empty-icon">◌</div><h3>No submissions yet.</h3><p>Submitted responses will appear here once your forms are live.</p>
      </section>
    </AdminLayout>
  );
}
