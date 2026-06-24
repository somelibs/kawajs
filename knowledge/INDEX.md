# Kawax Knowledge Base Index

**Last Updated:** 2026-06-15
**Total Files:** 2
**Total Patterns:** 4

---

## Files

### js-kawax-reducers.md
**Description:** How kawax routes a dispatched action (dot-namespaced `DOMAIN.SLICE.VERB` type + status) to a slice reducer that transforms state from `action.payload`, so connected components re-render — and why to prefer a per-VERB reducer key over an API refetch.
**Keywords:** reducer, action, matchSuccess, match, delegate, assign, assignItem, removeItem, mergeBy, keyed reducer, embedded reducer, payload, re-render, store propagation, no refetch

### js-kawax-components.md
**Description:** How a `Component()`-wrapped class re-renders, and two gotchas when a UI must react to an action's success: (1) `this.props.actions` is a STABLE per-instance ActionStack, so `prevProps.actions === this.props.actions` and prevProps edge-detection of pending→success never fires — latch a local flag instead; (2) don't depend on in-place re-render to swap which screen renders off a slice drop — force a remount by navigating to a DIFFERENT route (same-URL push is a no-op) and gate the UI on a POSITIVE post-mutation fact, not the absence of old state.
**Keywords:** Component, connect, re-render, ActionStack, actions prop stable reference, prevProps, componentDidUpdate, isPending, isSuccess, latch flag, navigate, route remount, same-url no-op, screen transition, stale render, areStatePropsEqual, gate on positive fact
