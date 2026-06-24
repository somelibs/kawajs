# Kawax Reducers & Actions — type-routed state, no refetch

How kawax turns a dispatched action into a targeted state update so connected
components re-render automatically. The headline rule: **to refresh a slice
after a mutation, make that slice's reducer listen to the action's type key and
transform state from `action.payload` — do NOT refetch from the API as the
primary mechanism.** Refetch is a fallback for when the action can't carry the
slice's shape.

**Related Patterns:** [Kawax Actions return value](#actions-the-payload-is-the-resolved-call-return)

---

## Core concept

Every action carries a **dot-namespaced type** and a **status**. Reducers
declare which `type` segments and which status they react to; the matched
reducer receives `(state, action)` and returns the next state for its slice.
Redux then re-renders every connected component reading that slice.

```
type:    "DOMAIN.SLICE.VERB"      status: pending → success | error
                │      │    │
       root match│      │    └─ slice reducer matchSuccess("VERB") → transform
        delegates│      └────── domain reducer matchSuccess/match("SLICE") → delegate
                 └───────────── root reducer match("DOMAIN") → delegate
```

So a `DOMAIN.SLICE.VERB` success flows: root `match("DOMAIN")` → domain
`match("SLICE")` → slice `matchSuccess("VERB")` → a helper that produces the new
slice value. Naming an action type with the right `DOMAIN.SLICE.VERB` segments
is what wires it to the reducer that owns that slice.

`match(map)` matches a key against the type with regex `(^[^.]?|[.])KEY` — i.e.
the key must appear at the **start of the type or right after a dot**. So
`"SLICE"` matches `DOMAIN.SLICE.VERB` (the `.SLICE` segment) but not a substring
mid-word.

---

## Actions: the payload IS the resolved `call` return

A reducer's `action.payload` is the **resolved return value of the action's
`call`** (not the call arguments). This is the single most important fact for
making reducers update correctly.

```js
class CreateThing extends Action {
  static type = "DOMAIN.THINGS.CREATE";
  call = async ({ name }) => Thing.create({ name }); // payload = the created thing
}
```

- `static type` — the `DOMAIN.SLICE.VERB` string that routes the action.
- `call` — does the work; **return exactly what the reducer needs** in state.
- status — `pending` while `call` runs, `success` on resolve, `error` on throw.
  `matchSuccess`/`matchError`/`matchPending`/`matchDone` gate on these. A reducer
  keyed with `matchSuccess` **only fires if `call` resolves** — if `call` throws,
  the slice is NOT updated.

> Consequence: if you `await` extra work after the mutation inside `call` and it
> throws, the action becomes `error` and the success reducer never runs — the
> slice stays stale. Make post-mutation side-work best-effort (`.catch`) so it
> can't flip the action to `error` and suppress the update.

A **top-level dispatched** action resolves to its action-id synchronously (the
real work runs detached); sub-actions invoked *inside* `call` resolve to their
real payloads. So chain dependent reloads inside `call`, not at the call site.

---

## Reducer helpers (transform state from payload)

Declared via `state = this.matchSuccess({ VERB: helper, ... })`:

| Helper | Effect on an **array** slice | Effect on an **object/scalar** slice | Typical verb |
|--------|------------------------------|--------------------------------------|--------------|
| `assign` | **UNION by id** (does NOT drop ids absent from payload) | replace with `payload` | `LOAD_MANY`, `LOAD` |
| `assignItem` | `[payload]` | `payload` | `CREATE` |
| `removeItem(predicate)` | drop matching entries | n/a | `DELETE`, `ACCEPT`, `DECLINE` |
| `mergeBy(unionKey, next)` | **UNION by key** (update-in-place + append) | — | `UPDATE_MANY` |
| `replace(next)` / `shallow(next)` | **UNION by id** (NOT a replace — see below) | shallow-merge | misc |
| `_forceAssign(() => payload)` | **TRUE replace** — slice becomes exactly `payload` | exactly `payload` | reset/resync a list |

Custom transforms are just `(state, { payload }) => nextState`, e.g. a
remove-by-id: `(state, { payload }) => (state || []).filter((i) => i.id !== payload.id)`.

### ⚠️ List slices UNION by id — `replace`/`assign`/`mergeBy` NEVER drop stale ids

This is the single most error-prone fact about kawax reducers. Every array
slice goes through `_parseArray`, which **unions the current slice with the new
payload by `id`**: matched ids are updated in place, new ids are appended, and
**any id in the current slice that is absent from the new payload is KEPT**. The
names `replace`/`assign` are misleading — on an array they do NOT replace.

Proven against `dist/cjs/Reducer.js` (full `onSuccess` pipeline):

```
current  = [{id:'A'},{id:'B'}]
payload  = [{id:'B'},{id:'C'}]          // 'A' is gone from the server

replace(payload)            → ['A','B','C']   // A LINGERS  ❌
assign                      → ['A','B','C']   // A LINGERS  ❌
mergeBy('id', payload)      → ['A','B','C']   // A LINGERS  ❌
_forceAssign(() => payload) → ['B','C']       // true replace ✅
```

**Consequence:** "reload a list with `assign`/`replace`" does NOT remove rows the
server dropped (deleted/approved/moved-off-page). They linger in the store —
which survives client-side route changes; only a full page reload empties it.
This is the recurring "stale row won't go away" / "item in two lists at once"
bug.

**Rules:**
- To make a list slice an **exact mirror** of the latest server response (the
  usual intent for `LOAD_*`), use `_forceAssign(() => payload)` — the ONLY helper
  that truly replaces an array.
- To remove a specific row, dispatch `removeItem(predicate)` explicitly — don't
  rely on a reload to drop it.
- Union (`assign`/`mergeBy`) is correct ONLY when you intend to accumulate and a
  later load will re-supply (and thus update-in-place) every row — e.g. a
  paginated list rendered page-by-page from server-provided page item-ids.
- Never split one logical list into "active" + "pending" slices and trust
  `replace` to keep them disjoint — an item that moves between them lingers in
  the old slice. Use `_forceAssign` per slice, or make the selector authoritative.

```js
class Things extends Reducer {
  static initialState = [];
  state = this.matchSuccess({
    LOAD_MANY: this.assign,      // DOMAIN.THINGS.LOAD_MANY → replace list
    CREATE:    this.assignItem,  // DOMAIN.THINGS.CREATE    → add one
    DELETE:    this.removeById,  // DOMAIN.THINGS.DELETE    → drop one
  });
  removeById = (state, { payload }) => (state || []).filter((t) => t.id !== payload.id);
}
```

### ⚠️ Id-keyed slices are UNION ARRAYS — never write one as an object map

A slice read by id (`select("slice.<id>")`) is stored as a union **array**
`[{id,…}]`, not a map `{ [id]: {…} }`. Writing an object map does NOT add a key —
an array and an object aren't both plain objects, so the merge **replaces the
whole slice with your object, wiping every other entry**:

```js
// state.users = [{id:'CUR'}]
onSuccess(() => ({ users: { [payload.id]: payload } }))  // ❌ → { M1:{…} }, CUR GONE
onSuccess(() => ({ users: [payload] }))                  // ✅ unions by id, CUR kept
```

Copy the shape the slice's other writers use. (In Genesis this wiped the
signed-in user out of `meta.users` and crashed the whole app via the header
avatar — see core `knowledge/js-genesis-spa.md`.)

### ⚠️ The embedded reducer runs on EVERY dispatch tick (incl. pending) — use a lazy thunk

An action's `reducer` is evaluated on `pending` (payload `undefined`) before
`success`. An eager literal that dereferences payload throws on the pending tick,
*before* `onSuccess` can gate it — a computed key is the classic trap:

```js
onSuccess({ x: { [payload.id]: payload } })       // ❌ throws on pending: payload undefined
onSuccess(() => ({ x: { [payload.id]: payload } })) // ✅ read only on success
```

Wrap any bundled state that reads `payload`/`context` in `() => ({ … })`.

---

## Composing the reducer tree (`delegate`)

A parent reducer routes a sub-slice to a child reducer with `delegate()`:

```js
class Domain extends Reducer {
  static initialState = { things: Things.delegate() };
  state = this.matchSuccess({
    THINGS: { things: Things.delegate() }, // DOMAIN.THINGS.* → Things reducer owns `things`
  });
}
```

The root reducer does the same one level up (`DOMAIN` → domain reducer). This is
how `DOMAIN.SLICE.VERB` reaches the slice reducer that owns `SLICE`.

### Keyed slices

For per-entity maps (`{ [id]: value }`), a keyed base reducer derives the key
from `action.payload.id` or `action.context.<key>` (stamped by middleware before
the reducer runs — a reducer must never call `getState()`), then assigns under
that key. Writes for one key never disturb another.

---

## The per-action embedded reducer (cross-slice updates)

When the slice that needs updating is NOT the one the action's type routes to,
an action can carry a `static reducer` that runs at the **root**, at action
`depth === 1`, letting one action update arbitrary slices:

```js
class AcceptThing extends Action {
  static type = "DOMAIN.INBOX.ACCEPT";
  static reducer = ({ payload }) => ({ removeItem, onSuccess }) => onSuccess({
    inbox: { items: removeItem((i) => i.id === payload.id) },
  });
  call = async ({ id }) => Inbox.accept({ id }).then(() => ({ id }));
}
```

Use this for optimistic single-slice edits. It still only fires on `success`.

---

## The rule of thumb (avoid the "had to refresh" bug)

When a mutation should change the UI:

1. **List every slice the affected screens read.**
2. For each, make sure *something* updates it on the action's success:
   - the slice reducer has a `matchSuccess` key for the action's **VERB**, and
     `call` **returns the data that key needs**, OR
   - a refetch sub-action runs inside `call` whose own `LOAD_*` reducer reassigns
     the slice (use this when the mutation response can't carry the slice shape —
     e.g. the response is a different entity than the row the list renders).
3. Make any post-mutation reloads **best-effort** so a failure can't flip the
   action to `error` and suppress the success reducer.

A mutation that updates the server but no store slice leaves connected
components rendering stale data until a manual page reload — that defeats the
point of the connected store. Prefer a per-VERB reducer key; refetch only the
slices a reducer can't reconstruct from the action payload.

---

## Internal mechanism (for debugging)

- `match(map)` builds `new RegExp('(^[^.]?|[.])' + key)` and tests `action.type`.
- `matchSuccess(map) = onSuccess(match(map))`; `onSuccess` only applies when
  `action.status === 'success'` (similarly `onPending`/`onError`/`onDone`).
- `delegate()` returns a `ReducerDelegate`; the parent detects it (in
  `initialState` or a `match` pointer) and recurses into the child for that path.
- `applyEmbeddedReducer` (on by default) makes the root apply an action's
  `static reducer` once, at `action.depth === 1`.
- Array slices union-by-id by default in the framework's `_parseArray`; keyed
  reducers replicate this per key. `replace`/`shallow`/`assign`/`mergeBy` all route
  array values through `_parseArray` (so they union, not replace — see "List slices
  UNION by id" above). The only true array replace is a `_forceAssign` that ignores
  `current` and returns the payload: `_forceAssign(() => payload)`.
