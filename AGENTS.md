# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (technical reference for an AI support or administering agent) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **The daemon runs as `root`, overriding the image's `node` user, for two specific reasons** — it writes `/data/accounts.yaml` to persist the hashed password, and it reads LND's root-owned `admin.macaroon` off the dependency mount. Don't drop the override without solving both.
- **Import LND's host id and port from `lnd-startos/startos/interfaces`** rather than hardcoding, so a change on LND's side is a compile error here.
- **No separate macaroon watch is needed.** LND publishes the gRPC binding at the same moment the admin macaroon appears, so watching the binding covers both.
- **`NO_VERSION_CHECK` stays true.** The package controls the version; the upstream nag would point users at an upgrade they cannot take.
