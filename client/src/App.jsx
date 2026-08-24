import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [apiStatus, setApiStatus] = useState('Checking API connection...');

  useEffect(() => {
    axios
      .get('/api/health')
      .then(({ data }) => setApiStatus(data.message))
      .catch(() => setApiStatus('API connection unavailable'));
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900 sm:px-10">
      <section className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-5xl flex-col justify-between rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
        <header className="flex items-center justify-between gap-6">
          <a className="text-xl font-bold tracking-tight text-blue-600" href="/">
            FormFlow
          </a>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
            Foundation
          </span>
        </header>

        <div className="max-w-2xl py-16">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Phase 1
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Build better forms, one clear step at a time.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            The FormFlow development foundation is ready for the form management
            experience ahead.
          </p>
          <div className="mt-10 inline-flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" aria-hidden="true" />
            <span>{apiStatus}</span>
          </div>
        </div>

        <footer className="border-t border-slate-100 pt-6 text-sm text-slate-500">
          React + Vite frontend connected to the Express backend.
        </footer>
      </section>
    </main>
  );
}

export default App;