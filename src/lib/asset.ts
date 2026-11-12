/**
 * Resuelve rutas a archivos de `public/` respetando el `base` configurado en Vite.
 * En GitHub Pages el sitio vive en `/Portafolio-Alan/`, así que una ruta absoluta
 * como `/cv-alan-sastre-es.pdf` apuntaría al dominio raíz y daría 404.
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}
