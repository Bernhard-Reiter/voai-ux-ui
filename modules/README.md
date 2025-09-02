# Module Integration

This directory contains the integrated modules for voai-next:

- `voai-core-main/` - Core workflow engine and ingest processing
- `voai-billing-main/` - Stripe billing integration

## Setup

Place the extracted repositories here:
```
modules/
  voai-core-main/     # from ZIP
  voai-billing-main/  # from ZIP
```

These modules are integrated via pnpm workspaces and accessed through facade patterns in the main application.