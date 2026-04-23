<p align="center">
  <img src="icon.png" alt="ThunderHub Logo" width="21%">
</p>

# ThunderHub on StartOS

> **Upstream docs:** <https://github.com/apotdevin/thunderhub#readme>
>
> Everything not listed in this document should behave the same as upstream
> ThunderHub. If a feature, setting, or behavior is not mentioned here,
> the upstream documentation is accurate and fully applicable.

[ThunderHub](https://github.com/apotdevin/thunderhub) is an open-source LND node manager that lets you manage and monitor your Lightning node from any device or browser.

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Configuration Management](#configuration-management)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Dependencies](#dependencies)
- [Actions](#actions)
- [Backups and Restore](#backups-and-restore)
- [Health Checks](#health-checks)
- [Limitations and Differences](#limitations-and-differences)
- [What Is Unchanged from Upstream](#what-is-unchanged-from-upstream)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

| Property | Value |
|----------|-------|
| Image | `apotdevin/thunderhub` (unmodified) |
| Architectures | x86_64, aarch64 |

---

## Volume and Data Layout

| Volume | Mount Point | Purpose |
|--------|-------------|---------|
| `main` | `/data` | Configuration and persistent data |
| (LND dependency) | `/mnt/lnd` | Read-only access to LND macaroon and TLS cert |

**Key paths on the `main` volume:**

- `accounts.yaml` — ThunderHub account configuration (managed by StartOS)

---

## Installation and First-Run Flow

| Step | Upstream | StartOS |
|------|----------|---------|
| Installation | Docker or npm | Install from marketplace |
| LND connection | Manual configuration | Auto-configured via dependency |
| Authentication | Manual `accounts.yaml` | User-created master password |

**First-run steps:**

1. Install LND on StartOS.
2. Install ThunderHub from the marketplace.
3. A critical task prompts you to create your master password — run the **Create Master Password** action. A random password is generated and shown once.
4. Open the web UI and log in with the retrieved master password.

After initial setup, the action toggles to **Reset Master Password** and generates a new password on every invocation.

---

## Configuration Management

### accounts.yaml (auto-generated)

| Setting | Default | Purpose |
|---------|---------|---------|
| `masterPassword` | Empty (set via action) | Authentication password for all accounts |
| `accounts[0].serverUrl` | `lnd.startos:10009` | gRPC address of the local LND node |
| `accounts[0].macaroonPath` | `/mnt/lnd/data/chain/bitcoin/mainnet/admin.macaroon` | Admin macaroon for LND auth |
| `accounts[0].certificatePath` | `/mnt/lnd/tls.cert` | TLS certificate for LND connection |

### Environment Variables (fixed)

| Variable | Value | Purpose |
|----------|-------|---------|
| `ACCOUNT_CONFIG_PATH` | `/data/accounts.yaml` | Config file location |
| `PORT` | `3000` | Web UI port |
| `NO_VERSION_CHECK` | `true` | Disable upstream version checks |

---

## Network Access and Interfaces

| Interface | Port | Protocol | Purpose |
|-----------|------|----------|---------|
| Web UI | 3000 | HTTP | Node management dashboard |

---

## Dependencies

| Dependency | Required | Purpose |
|------------|----------|---------|
| LND | Required | Lightning node to manage |

ThunderHub is a UI-only service — it connects to LND for all Lightning operations. LND must be installed and running before ThunderHub can start.

---

## Actions

| Action | Purpose |
|--------|---------|
| Create/Reset Master Password | Generate (first run) or regenerate (subsequent runs) the password used to log into ThunderHub |

---

## Backups and Restore

**Included in backup:**

- `main` volume — accounts configuration

**Restore behavior:**

- Configuration restored; ThunderHub reconnects to LND automatically.

**Note:** ThunderHub stores no funds or critical data. All funds reside in LND. Back up LND, not ThunderHub.

---

## Health Checks

| Check | Display Name | Method | Messages |
|-------|--------------|--------|----------|
| Web UI | Web Interface | Port 3000 listening | Ready / Not ready |

---

## Limitations and Differences

1. **No external .onion LND connections** — cannot connect to LND nodes on Tor hidden services.
2. **Pre-configured account** — `accounts.yaml` is auto-generated for the local LND dependency.
3. **Single action surface** — password retrieval is the only custom action; all other management is done through the web UI.

---

## What Is Unchanged from Upstream

- Full LND node management (channels, payments, routing, balances)
- Wallet operations
- Channel management and monitoring
- Forward report and routing analysis
- All web UI features and dashboards

---

## Quick Reference for AI Consumers

```yaml
package_id: thunderhub
image: apotdevin/thunderhub
architectures: [x86_64, aarch64]
volumes:
  main: /data
ports:
  ui: 3000
dependencies:
  lnd (required)
actions:
  - master-password
health_checks:
  - ui: port_listening 3000
backup_volumes:
  - main
fixed_config:
  ACCOUNT_CONFIG_PATH: /data/accounts.yaml
  NO_VERSION_CHECK: "true"
```
