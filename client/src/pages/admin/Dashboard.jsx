import AdminLayout from '../../components/AdminLayout';

const metrics = [
  ['Total Forms', '0', 'Your form library'],
  ['Total Submissions', '0', 'Responses received'],
  ['Pending Reviews', '0', 'Waiting for your review'],
  ['Approved', '0', 'Accepted submissions'],
];

export default function Dashboard() {
  return (
    <AdminLayout currentPath="/admin" eyebrow="Overview" title="Dashboard">
      <section className="welcome-row">
        <div>
          <span className="section-kicker">Good to see you</span>
          <h2>Your workspace at a glance.</h2>
          <p>Keep your forms organized and your review queue moving.</p>
        </div>
        <div className="date-stamp">Today <strong>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</strong></div>
      </section>
      <section className="metric-grid" aria-label="Dashboard metrics">
        {metrics.map(([label, value, note]) => (
          <article className="metric-card" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{note}</small>
          </article>
        ))}
      </section>
      <section className="activity-panel">
        <div className="panel-heading"><div><span className="section-kicker">Timeline</span><h2>Recent activity</h2></div><span className="panel-count">0 events</span></div>
        <div className="empty-state"><div className="empty-icon">○</div><h3>No activity yet</h3><p>Activity from your forms and submissions will appear here.</p></div>
      </section>
    </AdminLayout>
  );
}
