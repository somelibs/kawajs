# Kawax Components — re-render, ActionStack & screen transitions

How a `Component()`-wrapped class actually re-renders, and two gotchas that
repeatedly cost real debugging time when a UI must change in response to an
action's success. Both are consequences of how the HOC wires `connect` +
the per-instance `ActionStack`. Read this **before** writing any
`componentDidUpdate`/transition logic that reacts to an action completing.

**Related Patterns:** [Kawax Reducers & state propagation](js-kawax-reducers.md)

---

## Background: how a connected component re-renders

`Component(Pure)` composes a React-Redux `connect` with these comparators:

| Option | Value | Effect |
|--------|-------|--------|
| `areStatesEqual` | `prev === next` | the root reducer **deep-clones** state every dispatch, so this is always `false` → `mapStateToProps` re-runs on every dispatch |
| `areStatePropsEqual` | `_.isEqual` (deep) | re-render only when the **computed props** differ deeply |

So in principle a connected component re-renders whenever any value its
`stateToProps` returns changes deeply. In practice, two things break the naive
mental model below.

---

## Gotcha 1 — `this.props.actions` is a STABLE reference (prevProps edge detection fails)

`this.props.actions` is a **single per-instance `ActionStack`** object, cached by
the HOC for the component's lifetime (`getActionStack(instanceKey)` returns the
same instance across renders). Therefore:

```
prevProps.actions === this.props.actions   // ALWAYS true
```

`isPending()` / `isSuccess()` / `isError()` are methods that read the stack's
**current** state. Because `prevProps.actions` is the *same object*,
`prevProps.actions.isPending('x')` returns the **current** value, not the value
at the previous render. So the classic React "rising edge" detection is broken:

```js
// ❌ BROKEN — never fires. prevProps.actions IS this.props.actions, so this
//    reads the CURRENT status twice; the pending→success transition is invisible.
componentDidUpdate(prevProps) {
  if (prevProps.actions.isPending('save') && this.props.actions.isSuccess('save')) {
    this.onSaved();
  }
}
```

**Fix — latch the intent locally, then react to the success state itself:**

```js
// ✅ Set a local flag when YOU initiate the action, then in componentDidUpdate
//    act once when the action reports success (and is no longer pending).
onClickSave = () => {
  this.saveSubmitted = true;          // local latch (instance field or state)
  this.props.save(payload);           // dispatch
};

componentDidUpdate() {
  const { actions } = this.props;
  if (this.handled || !this.saveSubmitted) return;
  if (actions.isSuccess('save') && !actions.isPending('save')) {
    this.handled = true;              // one-shot guard — componentDidUpdate re-fires
    this.onSaved();
  }
}
```

The component **does** re-render across the pending→success window (that's how a
button spinner driven by `isPending()` works), so `componentDidUpdate` runs at
the success render — you just can't compare against `prevProps.actions`. The
local latch supplies the "I started this" half; the success-state read supplies
the "it finished" half; the one-shot `handled` flag stops repeat firing on later
re-renders.

---

## Gotcha 2 — don't depend on in-place re-render to SWAP which screen renders

A parent screen often chooses *which child* to render from a store slice:

```js
// Parent.renderContent()
const pending = findPendingThing(thingsSlice, urlId);   // read from props/selector
if (pending) return <DoTheThingWizard thing={pending} />;
return <NormalScreen />;
```

The tempting assumption: "after the mutation drops `pending` from the slice, the
parent re-renders in place and swaps `<DoTheThingWizard>` → `<NormalScreen>`."
**This is unreliable.** Even though `areStatesEqual`/`areStatePropsEqual` say it
*should* happen, the combination of:

- the mutation running as a **nested sub-action** under the child's `instanceKey`
  (the child re-renders on its own ActionStack, the parent may not), and
- a freshly-mounted child re-fetching and momentarily **re-adding** the row it
  was supposed to drop (slice "lingers"),

means the parent keeps rendering the old child. You end up "stuck" on the wizard
until a **full page reload** rebuilds the store from scratch — the tell-tale sign
that the data is right server-side but the SPA store/render is stale.

**Robust fix — two independent moves, use both:**

### (a) Force a real remount by navigating to a DIFFERENT route

A `navigate(currentUrl)` is a **no-op** — React Router ignores a push to the
location you're already on, so nothing remounts. Navigate to a genuinely
different path that resolves (possibly via a route guard's redirect) back to the
screen you want. The route change forces an unmount/remount that reads the store
fresh:

```js
// ❌ no-op: you are already on this URL → no remount, stays stuck
navigate(`/things/${id}/edit`);

// ✅ different path → real route change. A guard on /things/:id sees the user
//    can't view it yet and redirects to /things/:id/edit, mounting it FRESH.
navigate(`/things/${id}`);
```

### (b) Gate the UI on a POSITIVE post-mutation fact, not the ABSENCE of old state

Deciding "show the wizard" from `pending` being *gone* is fragile — the old row
can linger in the store. Instead gate on something **unambiguously true after the
mutation**, read from a slice the mutation authoritatively (re)loaded:

```js
// ❌ fragile: relies on the pending row disappearing (it may linger)
if (pending) return <Wizard .../>;

// ✅ robust: once the mutation succeeded, the entity exists in its own slice;
//    gate on that POSITIVE fact. Lingering `pending` no longer matters.
const alreadyDone = !!_.find(entitiesSlice, { id: urlId });
if (pending && !alreadyDone) return <Wizard .../>;
return <NormalScreen />;
```

Combined: the navigate (a) guarantees a fresh mount, and the positive-fact gate
(b) guarantees the fresh mount picks the right screen even if the old slice value
hasn't been cleared. Relying on either alone left the UI stuck in practice.

---

## Checklist — "act when an action finishes" / "swap screen after a mutation"

1. Need to run code when an action completes? **Latch a local flag on dispatch**,
   then in `componentDidUpdate` check `actions.isSuccess(name) && !isPending(name)`
   with a one-shot guard. **Never** diff `prevProps.actions` (Gotcha 1).
2. Need to change which screen shows? Don't trust in-place re-render off a slice
   drop. **Navigate to a different route** (same-URL push is a no-op) and **gate
   on a positive post-mutation fact**, not on the old state being gone (Gotcha 2).
3. Still also propagate the slice correctly (see
   [js-kawax-reducers.md](js-kawax-reducers.md)) — the gotchas above are about the
   *render/transition*, which is separate from getting the *data* into the store.
