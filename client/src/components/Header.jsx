import { useAuth } from '../context/AuthContext';

export default function Header({ onMenuClick, eyebrow, title }) {
  const { user } = useAuth();
  const initials = user?.name?.slice(0, 1).toUpperCase() ?? 'A';

  return (
    <header className="topbar">
      <button className="menu-button" type="button" aria-label="Open navigation" onClick={onMenuClick}>Menu</button>
      <div className="page-heading">
        <span>{eyebrow}</span>
        <h1>{title}</h1>
      </div>
      <div className="profile-chip">
        <span className="avatar">{initials}</span>
        <span className="profile-copy"><strong>{user?.name ?? 'Admin'}</strong><small>Administrator</small></span>
      </div>
    </header>
  );
}
