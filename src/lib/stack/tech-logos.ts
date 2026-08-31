/**
 * Tech Logo Registry
 *
 * Maps a normalised slug (lowercase, punctuation-stripped) to a Devicons CDN
 * SVG URL and an optional CSS filter string.
 *
 * Usage:
 *   getTechLogo('react')   → { url: '...react-original.svg' }
 *   getTechLogo('nextjs')  → { url: '...nextjs-original.svg', filter: 'invert(1)' }
 *   getTechLogo('unknown') → null   (graceful fallback – no broken image)
 *
 * The `filter` field is needed for logos whose source SVG is black/monochrome
 * so they remain visible on the portfolio's dark-card backgrounds.
 */

const B = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

export type TechLogoEntry = {
  url: string;
  /** Optional CSS filter applied to the <img> element */
  filter?: string;
};

const WHITE = 'brightness(0) invert(1)'; // makes black SVG logos white

export const TECH_LOGOS: Record<string, TechLogoEntry> = {
  // ── Frontend ─────────────────────────────────────────────────────────────
  react:            { url: `${B}/react/react-original.svg` },
  nextjs:           { url: `${B}/nextjs/nextjs-original.svg`, filter: WHITE },
  typescript:       { url: `${B}/typescript/typescript-original.svg` },
  javascript:       { url: `${B}/javascript/javascript-original.svg` },
  tailwindcss:      { url: `${B}/tailwindcss/tailwindcss-original.svg` },
  tailwind:         { url: `${B}/tailwindcss/tailwindcss-original.svg` },
  html5:            { url: `${B}/html5/html5-original.svg` },
  html:             { url: `${B}/html5/html5-original.svg` },
  css3:             { url: `${B}/css3/css3-original.svg` },
  css:              { url: `${B}/css3/css3-original.svg` },
  sass:             { url: `${B}/sass/sass-original.svg` },
  vuejs:            { url: `${B}/vuejs/vuejs-original.svg` },
  vue:              { url: `${B}/vuejs/vuejs-original.svg` },
  angular:          { url: `${B}/angularjs/angularjs-original.svg` },
  svelte:           { url: `${B}/svelte/svelte-original.svg` },
  remix:            { url: `${B}/remix/remix-original.svg`, filter: WHITE },
  astro:            { url: `${B}/astro/astro-original.svg`, filter: WHITE },
  threejs:          { url: `${B}/threejs/threejs-original.svg`, filter: WHITE },
  webgl:            { url: `${B}/opengl/opengl-original.svg` },
  // ── Backend ──────────────────────────────────────────────────────────────
  nodejs:           { url: `${B}/nodejs/nodejs-original.svg` },
  node:             { url: `${B}/nodejs/nodejs-original.svg` },
  express:          { url: `${B}/express/express-original.svg`, filter: WHITE },
  fastify:          { url: `${B}/fastify/fastify-original.svg`, filter: WHITE },
  nestjs:           { url: `${B}/nestjs/nestjs-original.svg` },
  python:           { url: `${B}/python/python-original.svg` },
  django:           { url: `${B}/django/django-plain.svg`, filter: WHITE },
  flask:            { url: `${B}/flask/flask-original.svg`, filter: WHITE },
  go:               { url: `${B}/go/go-original.svg` },
  rust:             { url: `${B}/rust/rust-original.svg`, filter: WHITE },
  php:              { url: `${B}/php/php-original.svg` },
  laravel:          { url: `${B}/laravel/laravel-original.svg` },
  ruby:             { url: `${B}/ruby/ruby-original.svg` },
  rails:            { url: `${B}/rails/rails-original-wordmark.svg` },
  graphql:          { url: `${B}/graphql/graphql-plain.svg` },
  // ── Database ─────────────────────────────────────────────────────────────
  postgresql:       { url: `${B}/postgresql/postgresql-original.svg` },
  postgres:         { url: `${B}/postgresql/postgresql-original.svg` },
  mongodb:          { url: `${B}/mongodb/mongodb-original.svg` },
  mysql:            { url: `${B}/mysql/mysql-original.svg` },
  sqlite:           { url: `${B}/sqlite/sqlite-original.svg` },
  redis:            { url: `${B}/redis/redis-original.svg` },
  supabase:         { url: `${B}/supabase/supabase-original.svg` },
  prisma:           { url: `${B}/prisma/prisma-original.svg`, filter: WHITE },
  // ── Design ───────────────────────────────────────────────────────────────
  figma:            { url: `${B}/figma/figma-original.svg` },
  photoshop:        { url: `${B}/photoshop/photoshop-original.svg` },
  illustrator:      { url: `${B}/illustrator/illustrator-plain.svg` },
  xd:               { url: `${B}/xd/xd-original.svg` },
  sketch:           { url: `${B}/sketch/sketch-original.svg` },
  blender:          { url: `${B}/blender/blender-original.svg` },
  // ── Tools & DevOps ───────────────────────────────────────────────────────
  git:              { url: `${B}/git/git-original.svg` },
  github:           { url: `${B}/github/github-original.svg`, filter: WHITE },
  gitlab:           { url: `${B}/gitlab/gitlab-original.svg` },
  docker:           { url: `${B}/docker/docker-original.svg` },
  kubernetes:       { url: `${B}/kubernetes/kubernetes-original.svg` },
  vscode:           { url: `${B}/vscode/vscode-original.svg` },
  linux:            { url: `${B}/linux/linux-original.svg` },
  bash:             { url: `${B}/bash/bash-original.svg`, filter: WHITE },
  aws:              { url: `${B}/amazonwebservices/amazonwebservices-plain-wordmark.svg` },
  gcp:              { url: `${B}/googlecloud/googlecloud-original.svg` },
  azure:            { url: `${B}/azure/azure-original.svg` },
  nginx:            { url: `${B}/nginx/nginx-original.svg` },
  jest:             { url: `${B}/jest/jest-plain.svg` },
  vitest:           { url: `${B}/vitest/vitest-original.svg` },
  storybook:        { url: `${B}/storybook/storybook-original.svg` },
  webpack:          { url: `${B}/webpack/webpack-original.svg` },
  vite:             { url: `${B}/vitejs/vitejs-original.svg` },
  // ── Mobile ───────────────────────────────────────────────────────────────
  reactnative:      { url: `${B}/react/react-original.svg` },
  flutter:          { url: `${B}/flutter/flutter-original.svg` },
  dart:             { url: `${B}/dart/dart-original.svg` },
  swift:            { url: `${B}/swift/swift-original.svg` },
  kotlin:           { url: `${B}/kotlin/kotlin-original.svg` },
};

/**
 * Resolve a raw slug value (as stored in `Skill.icon`) to a logo entry.
 * Normalisation: lowercase + strip spaces, dots, hyphens, underscores.
 * Returns null when the slug is empty or unmapped – caller should show fallback.
 */
export function getTechLogo(slug: string | null | undefined): TechLogoEntry | null {
  if (!slug) return null;
  const key = slug.toLowerCase().replace(/[\s.\-_]/g, '');
  return TECH_LOGOS[key] ?? null;
}

/** All registered slugs – used to populate the <datalist> in the dashboard */
export const TECH_LOGO_SLUGS = Object.keys(TECH_LOGOS);
