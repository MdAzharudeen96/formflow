import AdminLayout from '../../components/AdminLayout';

export default function Forms() {
  return (
    <AdminLayout currentPath="/admin/forms" eyebrow="Workspace" title="Forms">
      <section className="page-intro">
        <div><span className="section-kicker">Form library</span><h2>Forms</h2><p>Manage your FormFlow forms.</p></div>
        <button className="primary-button" type="button" disabled>Create form <span aria-hidden="true">+</span></button>
      </section>
      <section className="empty-page-panel">
        <div className="empty-icon">□</div><h3>No forms created yet.</h3><p>Your created forms will appear here when you are ready to build one.</p>
      </section>
    </AdminLayout>
  );
}
