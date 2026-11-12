#!/usr/bin/env bash
# Despliega el build (dist/) a la rama gh-pages, que GitHub Pages publica.
# Uso: npm run deploy
set -euo pipefail

REPO_URL="$(git remote get-url origin)"
OUT_DIR="${TMPDIR:-/tmp}/portafolio-pages-deploy"
COMMIT_MSG="${1:-deploy: $(date -u '+%Y-%m-%d %H:%M UTC')}"

npm run build

rm -rf "$OUT_DIR"
mkdir -p "$OUT_DIR"
cp -r dist/. "$OUT_DIR/"
touch "$OUT_DIR/.nojekyll"

git -C "$OUT_DIR" init -q -b gh-pages
git -C "$OUT_DIR" add -A
git -C "$OUT_DIR" commit -q -m "$COMMIT_MSG"
git -C "$OUT_DIR" remote add origin "$REPO_URL"
git -C "$OUT_DIR" push -f origin gh-pages

echo "Publicado en gh-pages. GitHub Pages lo toma en unos segundos."
