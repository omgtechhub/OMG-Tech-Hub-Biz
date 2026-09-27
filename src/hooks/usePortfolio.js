import { useState, useEffect } from 'react';
import { projects as staticProjects } from '../data/projects';

const API_BASE = import.meta.env.VITE_API_BASE || '';

function resolveImage(image) {
  if (!image) return null;
  if (image.startsWith('http') || image.startsWith('/')) return image;
  return (API_BASE + '/' + image).replace(/([^:])\/\//g, '$1/');
}

function normaliseProject(p) {
  const images = (p.images?.length ? p.images : [p.image]).filter(Boolean).map(resolveImage);
  return {
    ...p,
    image: resolveImage(p.image) || images[0] || null,
    images,
    tags: p.tags || [],
    results: p.results || [],
  };
}

// Existing hardcoded cards stay exactly as they are (from src/data/projects.js).
// Anything uploaded through the admin panel (admin/upload_portfolio.php) is
// fetched at runtime from api/portfolio.php, keyed by slug so an uploaded
// project never collides with a hand-authored one. Uploaded projects are
// placed first (newest upload first, per api/portfolio.php's sort order) so
// they surface at the top of each category on the Portfolio page and in the
// homepage preview.
export function usePortfolio() {
  const [projects, setProjects] = useState(staticProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch(`${API_BASE}/api/portfolio.php`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!active) return;
        if (data?.ok && data.projects?.length) {
          const existingSlugs = new Set(staticProjects.map((p) => p.slug));
          const uploaded = data.projects
            .map(normaliseProject)
            .filter((p) => !existingSlugs.has(p.slug));
          setProjects([...uploaded, ...staticProjects]);
        }
        setLoading(false);
      })
      .catch(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return { projects, loading };
}
