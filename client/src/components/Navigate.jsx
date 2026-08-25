import { useEffect } from 'react';

export function Navigate({ to }) {
  useEffect(() => {
    window.history.replaceState({}, '', to);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }, [to]);

  return null;
}
