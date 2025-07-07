#!/bin/bash
echo "🌐 Starting frontend install + dev server..."
cd ~/axis-system/frontend || { echo '[✘] frontend folder missing'; exit 1; }
npm install
npm run dev
