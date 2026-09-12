/**
 * How many entries of each highlight group are on the page before the reader
 * asks for the rest. Two rather than one because the groups are seven, four
 * and three long, and a single entry under a heading reads as a stub rather
 * than a sample — and because the grid is two columns from `sm` up, so two
 * fills a row exactly and the expansion continues on a fresh one with no gap
 * to patch.
 *
 * It lives here rather than in components/role-highlights.tsx, which is the
 * only thing that renders against it, because components/sections/experience.tsx needs it
 * too — the expand label carries the number of entries still folded away, and
 * that string is built on the server so the CV copy stays out of the client
 * bundle. A `'use client'` module cannot supply it: the server sees a client
 * reference in place of every export, so the constant arrives as an object and
 * the arithmetic silently yields NaN rather than failing the build.
 */
export const PREVIEW_PER_GROUP = 2;
