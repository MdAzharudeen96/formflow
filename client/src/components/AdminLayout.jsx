import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

export default function AdminLayout({ children, currentPath, eyebrow, title }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-shell">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} currentPath={currentPath} />
      <div className="admin-main">
        <Header onMenuClick={() => setSidebarOpen(true)} eyebrow={eyebrow} title={title} />
        <main className="content-area">{children}</main>
      </div>
    </div>
  );
}
