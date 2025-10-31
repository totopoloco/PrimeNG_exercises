#!/bin/bash
set -euo pipefail
# --- IGNORE HUSKY ---
export HUSKY=0

cd /workspace

# Ensure node_modules exists and is writable by the current user
mkdir -p /workspace/node_modules || true

# Use numeric UID:GID to avoid relying on $USER which may be unset in non-interactive shells
USER_UID=$(id -u)
USER_GID=$(id -g)

# Fix ownership and permissions recursively (idempotent)
sudo chown -R "${USER_UID}:${USER_GID}" /workspace/node_modules || true
sudo find /workspace/node_modules -type d -exec chmod 775 {} + 2>/dev/null || true
sudo find /workspace/node_modules -type f -exec chmod 664 {} + 2>/dev/null || true

echo "Installing"
npm install && npm start