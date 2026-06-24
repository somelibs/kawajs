# Kawax (kawajs) — Agent Guidance

Kawax is a Redux-like state-management wrapper (actions + type-routed reducers +
connected components).

## Knowledge Base

Patterns live in `./knowledge/` (see `knowledge/INDEX.md`):

- **[Reducers & Actions](./knowledge/js-kawax-reducers.md)** — how a dispatched
  action's dot-namespaced `DOMAIN.SLICE.VERB` type + status routes to a slice
  reducer that transforms state from `action.payload`, so connected components
  re-render. **Key rule:** to refresh the UI after a mutation, make the relevant
  slice reducer listen to the action's VERB key (and return the needed data from
  `call`) — refetch is a fallback, not the primary mechanism.
- **[Components — re-render & transitions](./knowledge/js-kawax-components.md)** —
  how a `Component()` class re-renders, and two gotchas when a UI must react to an
  action's success. **(1)** `this.props.actions` is a STABLE per-instance
  ActionStack ref → `prevProps.actions === this.props.actions`, so prevProps
  edge-detection of pending→success never fires; latch a local flag instead.
  **(2)** don't depend on in-place re-render to swap which screen renders off a
  slice drop — force a remount by navigating to a DIFFERENT route (a same-URL push
  is a no-op) and gate the UI on a POSITIVE post-mutation fact, not the absence of
  old state. **Read before writing any `componentDidUpdate`/navigate transition.**
