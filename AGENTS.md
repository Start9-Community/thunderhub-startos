# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (architecture, for developers and LLMs) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **Package id is `thunderhub`.** A UI-only LND node manager with a hard dependency on `lnd` (no interfaces are exported for dependents — it's a leaf service). `main.ts` resolves LND's gRPC endpoint over the LXC bridge (host id `grpc`, imported from `lnd-startos/startos/interfaces`) and writes it into `accounts.yaml`; LND's volume is mounted read-only at `/mnt/lnd` for the admin macaroon + TLS cert. The container runs as `root` so it can write `/data/accounts.yaml` and read LND's root-owned macaroon.

## Inspecting a running install

To run a command inside the service's container (read its generated config, grep app logs), use `start-cli package attach thunderhub -n thunderhub -- <cmd>`. Select the subcontainer by **name** with `-n` (the name passed to `SubContainer.of` in `main.ts` — here `thunderhub-sub`) or by image with `-i`. Note: `-s/--subcontainer` matches the internal **Guid**, not the name, so passing a name to `-s` fails with "no matching subcontainers".
