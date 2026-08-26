import { useAuth } from '../context/AuthContext';

const links = [
  { href: '/admin', label: 'Dashboard', icon: '01' },
  { href: '/admin/forms', label: 'Forms', icon: '02' },
  { href: '/admin/submissions', label: 'Submissions', icon: '03' },
];

export default function Sidebar({ isOpen, onClose, currentPath }) {
  const { logout } = useAuth();

  async function handleLogout() {
    await logout();
    window.history.replaceState({}, '', '/login');
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  return (
    <>
      {isOpen && <button className="sidebar-backdrop" aria-label="Close navigation" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="brand-lockup">
          <div className="brand-mark">F</div>
          <div>
            <strong>FormFlow</strong>
            <span>Admin workspace</span>
          </div>
        </div>
        <nav className="sidebar-nav" aria-label="Admin navigation">
          <span className="nav-label">Workspace</span>
          {links.map((link) => (
            <a
              className={`nav-link ${currentPath === link.href ? 'nav-link-active' : ''}`}
              href={link.href}
              key={link.href}
              onClick={onClose}
            >
              <span className="nav-icon">{link.icon}</span>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="workspace-note">
            <span className="status-dot" />
            <span>
              <strong>Workspace ready</strong>
              {/* <small>Phase 5 foundation</small> */}
            </span>
          </div>
          <button className="logout-button" type="button" onClick={handleLogout}>Log out</button>
        </div>
      </aside>
    </>
  );
}
