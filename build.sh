#!/bin/bash
set -e

echo "Installing dependencies..."
pnpm install --frozen-lockfile

echo "Building frontend app..."
cd apps/frontend
pnpm build

echo "Build complete!"