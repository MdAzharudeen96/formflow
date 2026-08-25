import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (!form.email || !form.password) {
      setError('Email and password are required.');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setSubmitting(true);
    try {
      await login(form);
      window.history.replaceState({}, '', '/admin');
      window.dispatchEvent(new PopStateEvent('popstate'));
    } catch (requestError) {
      setError(requestError.response?.data?.message ?? 'Unable to sign in. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-intro">
        <div className="intro-brand"><span className="brand-mark">F</span><strong>FormFlow</strong></div>
        <div className="intro-copy">
          <span className="section-kicker">Admin workspace</span>
          <h1>Make every form feel considered.</h1>
          <p>Shape clear experiences, keep responses moving, and give your team one calm place to manage the work.</p>
        </div>
        <div className="intro-footer"><span className="status-dot" /> Secure workspace access</div>
      </section>
      <section className="login-panel">
        <div className="login-form-wrap">
          <span className="section-kicker">Welcome back</span>
          <h2>Sign in to FormFlow</h2>
          <p className="form-description">Use your administrator credentials to continue.</p>
          <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" autoComplete="email" value={form.email} onChange={updateField} placeholder="admin@example.com" />
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" autoComplete="current-password" value={form.password} onChange={updateField} placeholder="Enter your password" />
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="primary-button login-button" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Signing in...' : 'Sign in'} <span aria-hidden="true">→</span></button>
          </form>
        </div>
        <p className="login-note">FormFlow admin access is limited to authorized team members.</p>
      </section>
    </main>
  );
}
