# ADR 0003 - The 5-section navigation model is locked

Date: 2026-06-06  |  Status: Accepted

## Context

Cross-product drift is the most common UX failure: a user moves from the ThoxOS Forge dashboard to the iOS terminal to the web Studio and is greeted with three different navigation taxonomies. The TXF spec calls for one navigation model everywhere.

## Decision

Exactly five sections: **Home, Agents, Projects, Devices, Vault**, in that order. Locked at the spec level. Validators block release if a TXF-certified app adds, removes, renames, or reorders sections.

The labels and icons are also locked. Sub-routes within a section are owned by the product.

## Consequences

- Users can predict where things live before opening any THOX product.
- Cross-surface deep links (`/devices/nova-01`, `/projects/foo/workflows/bar`) work uniformly.
- Products lose some local freedom but gain familiarity and certification trust.
- Future expansion happens via sub-routes, not new top-level sections.
