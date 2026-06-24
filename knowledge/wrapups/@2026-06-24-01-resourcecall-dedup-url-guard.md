# Wrapup: ResourceCall dedup-path URL guard + knowledge base seed

**Date:** 2026-06-24
**Branch:** legacy
**Baseline:** start of day (no prior wrapup)
**HEAD at wrapup:** 79ddba7203fe23be13b62647532f23c7f8fcb084
**Note:** —

---

## Summary
Fixed a latent crash in `ResourceCall` where an errored request on the
dedup/shadow path threw a `TypeError` that masked the real HTTP error. Also
seeded a `knowledge/` base and an `AGENTS.md` describing Kawax's reducer/action
routing and component re-render gotchas. A follow-up then repaired the broken
test + lint toolchains, added a regression test for the fix, and got both
`yarn test` and `yarn lint` green. This is the first wrapup on this branch.

## What We Did
- **`ResourceCall` error path** (`src/internal/ResourceCall.js:119` + both
  `dist/cjs` and `dist/es` builds) — guarded `this.preflightRequestUrl.toString()`
  with a null check. `preflightRequestUrl` is left unset when an identical
  in-flight request short-circuits (dedup/shadow path), so a deduped request that
  then errors (e.g. a 404) previously threw a `TypeError` in the error-payload
  builder and masked the real HTTP error. Now emits `url: null` instead.
- **Knowledge base seed** — added `knowledge/INDEX.md`,
  `knowledge/js-kawax-reducers.md`, `knowledge/js-kawax-components.md` documenting
  the `DOMAIN.SLICE.VERB` type→reducer routing and two component re-render gotchas
  (stable `actions` ref defeating prevProps edge-detection; latch a local flag).
- **`AGENTS.md`** — top-level agent guidance pointing at the knowledge base.
- **Test toolchain repair** — the suite was unrunnable (missing deps + broken
  config). Added `enzyme`, `enzyme-adapter-react-16`, `jest-enzyme`,
  `jest-environment-jsdom@^29` as devDeps; pinned `cheerio` to `1.0.0-rc.10`
  (enzyme 3.11 needs the older `cheerio/lib/utils`, since removed in cheerio 1.2);
  set `testEnvironment: "jsdom"`; anchored `modulePathIgnorePatterns` to
  `<rootDir>/tests/legacy` (the bare `"legacy"` pattern matched the repo's own
  `.legacy/` path and silently ignored every test); replaced the deprecated
  `@babel/polyfill` import with `core-js/stable` + `regenerator-runtime/runtime`
  (core-js is already a dep); and fixed the `.babelrc` `test` env `"env"` preset
  reference → `@babel/preset-env`.
- **Regression test** (`tests/internal/ResourceCall.test.js`) — covers
  `httpErrorParser` on the dedup path (asserts `url: null`, no throw) and the
  normal path (asserts the request URL). Verified red→green: reverting the guard
  reproduces `TypeError: Cannot read properties of undefined (reading 'toString')`.
- **Lint toolchain repair + cleanup** — installed `eslint@^8`,
  `eslint-plugin-import/jsx-a11y/react/react-hooks`, and `eslint-plugin-babel` so
  `yarn lint` runs. Code-fixed the safe offenses (`max-len` wraps in
  `Component.js`/`Reducer.js`, named the `promiseAll` function); extended
  `.eslintrc.js` with documented overrides for airbnb rules that conflict with
  deliberate framework patterns (e.g. `no-constructor-return` for `Smart`'s
  constructor, class-field propTypes/state, `Router` prop spreading, async
  promise executors). `eslint --fix` also applied cosmetic/equivalent reformats
  to a few `src/` and legacy-test files.

## Current Status
- The `ResourceCall` fix is complete in source and in both committed build
  outputs (`dist/cjs`, `dist/es`), and is now **verified by a regression test**.
- Knowledge base and `AGENTS.md` are authored.
- **Lint and the test suite both run green** — `yarn lint` exits 0; `yarn test`
  reports 2 suites / 3 tests passing. The `tests/legacy/` suite remains
  intentionally ignored (legacy fixtures, not part of the active suite).

## Open Issues / Risks
- The `ResourceCall` fix is a defensive guard; behavior on the non-dedup path is
  unchanged (`preflightRequestUrl` is truthy there), so risk is low.
- The lint cleanup relies on `.eslintrc.js` rule overrides for framework-level
  patterns rather than rewriting shipped framework code — a deliberate, low-risk
  choice for a published library, but it means those airbnb rules no longer guard
  the codebase.
- `tests/legacy/` lints clean but is excluded from the jest run; those suites are
  not exercised.

## Pending / Cleanup
- [ ] If desired, migrate `.eslintrc.js` from the legacy `babel`/`babel-*` plugin
  to the installed `@babel/eslint-plugin` (`@babel/*` rule names) and drop the
  deprecated `eslint-plugin-babel`.
- [ ] Consider revisiting whether the `tests/legacy/` suites should run or be
  retired.

## Next Steps
1. Optionally expand test coverage around the `ResourceCall` dedup/throttle path
   end-to-end (currently only `httpErrorParser` is unit-tested).
2. Decide the fate of `tests/legacy/` (run vs retire).

## Notes & Decisions
- Kept the build outputs (`dist/`) edited in lockstep with `src/` since `dist/`
  is committed and shipped (`package.json` `files`), avoiding a separate rebuild.
- Lint was made green by calibrating the ruleset to the library's intentional
  conventions (extending the existing `.eslintrc.js` overrides) rather than
  refactoring working, shipped framework code with no behavioral coverage.

## Lint & Test Status
- ESLint: ✅ `yarn lint` exits 0 (toolchain installed; offenses fixed/configured).
- Jest: ✅ `yarn test` — 2 suites, 3 tests, 0 failures (`tests/legacy/` ignored).

---

## Changed Files (since baseline)
```
 # Commit 1 (764e408) — the fix + knowledge base
 dist/cjs/internal/ResourceCall.js | 6 +++++-
 dist/es/internal/ResourceCall.js  | 6 +++++-
 src/internal/ResourceCall.js      | 6 +++++-
 AGENTS.md, CHANGELOG.md, knowledge/INDEX.md,
 knowledge/js-kawax-reducers.md, knowledge/js-kawax-components.md (new)

 # Commit 2 — toolchain repair, regression test, lint cleanup
 .babelrc, .eslintrc.js, jest.config.js, package.json, yarn.lock
 src/Component.js, src/Reducer.js, src/Store.js, src/helpers/promiseAll.js
 tests/setupTests.js, tests/.eslintrc.js,
 tests/legacy/Reducer.test.js, tests/legacy/helpers/testUtils.js
 tests/internal/ResourceCall.test.js (new)
```

## Commits (since baseline)
```
764e408  Wrapup 2026-06-24: ResourceCall dedup-path URL guard + knowledge base seed
(+ a follow-up commit: test/lint toolchain repair, regression test, lint cleanup)
```

---
*Generated by `/forge:wrapup`. Load the latest wrapup with `/forge:resume`.*
