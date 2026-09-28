import { useState, useEffect, useCallback } from 'react';

export interface RouteState {
  type: 'home' | 'category' | 'project';
  categorySlug?: string;
  projectSlug?: string;
  path: string;
}

const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, '');

function withoutBasePath(pathname: string): string {
  if (BASE_PATH && pathname.startsWith(BASE_PATH)) {
    return pathname.slice(BASE_PATH.length) || '/';
  }
  return pathname;
}

function parsePath(pathname: string, hash: string): RouteState {
  // Support both standard HTML5 paths (/projects/...) and hash paths (/#/projects/...)
  let effectivePath = withoutBasePath(pathname);
  if (hash.startsWith('#/projects/')) {
    effectivePath = hash.slice(1);
  }

  // Clean trailing slashes
  const cleanPath = effectivePath.replace(/\/+$/, '') || '/';

  if (cleanPath.startsWith('/projects/')) {
    const segments = cleanPath.replace('/projects/', '').split('/').filter(Boolean);
    if (segments.length === 1) {
      return {
        type: 'category',
        categorySlug: segments[0],
        path: cleanPath,
      };
    }
    if (segments.length >= 2) {
      return {
        type: 'project',
        categorySlug: segments[0],
        projectSlug: segments[1],
        path: cleanPath,
      };
    }
  }

  return {
    type: 'home',
    path: '/',
  };
}

export function useRoute() {
  const [route, setRoute] = useState<RouteState>(() =>
    parsePath(window.location.pathname, window.location.hash)
  );

  useEffect(() => {
    const handlePopState = () => {
      setRoute(parsePath(window.location.pathname, window.location.hash));
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigate = useCallback((to: string) => {
    // If navigating to home hash anchor like #work, #contact
    if (to.startsWith('#')) {
      const el = document.querySelector(to);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    const target = to.startsWith('/') ? `${BASE_PATH}${to}` || '/' : to;

    try {
      window.history.pushState({}, '', target);
    } catch {
      // In case of restricted iframe domain, fallback to hash
      window.location.hash = to;
    }

    setRoute(parsePath(target, ''));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goBack = useCallback(() => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigate('/');
    }
  }, [navigate]);

  return { route, navigate, goBack };
}
