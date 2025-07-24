# 🚨 URGENT: Fix Development Site Deployment

## 🎯 **Problem Identified**

Your development backend `zidov-net-dev` exists but isn't getting deployments because:

1. **Wrong backend ID**: Workflow uses `quality-wool-contacts` instead of `zidov-net`
2. **Missing develop branch**: Workflow only triggers on `main` branch  
3. **No dual-site logic**: Can't deploy to different backends based on branch

## 🔧 **Solution: Update App Hosting Workflow**

Your AI assistant needs to update `.github/workflows/firebase-app-hosting.yml`:

### **Current (Broken) Configuration:**
```yaml
on:
  push:
    branches: [ main ]  # ❌ Missing develop branch

backend: quality-wool-contacts  # ❌ Wrong backend ID
```

### **Fixed Configuration Needed:**
```yaml
name: Deploy to Firebase App Hosting

on:
  push:
    branches: [ main, develop ]  # ✅ Add develop branch
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to deploy to'
        required: true
        default: 'production'
        type: choice
        options:
          - production
          - development

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test:run

      - name: Run linting
        run: npm run lint

      - name: Build project
        run: npm run build
        env:
          VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
          VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
          VITE_FIREBASE_PROJECT_ID: ${{ secrets.VITE_FIREBASE_PROJECT_ID }}
          VITE_FIREBASE_STORAGE_BUCKET: ${{ secrets.VITE_FIREBASE_STORAGE_BUCKET }}
          VITE_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.VITE_FIREBASE_MESSAGING_SENDER_ID }}
          VITE_FIREBASE_APP_ID: ${{ secrets.VITE_FIREBASE_APP_ID }}
          VITE_APP_ENV: ${{ github.ref == 'refs/heads/main' && 'production' || 'development' }}

      - name: Deploy to Firebase App Hosting
        uses: FirebaseExtended/action-app-hosting-deploy@v0
        with:
          serviceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          projectId: ${{ secrets.VITE_FIREBASE_PROJECT_ID }}
          backend: ${{ github.ref == 'refs/heads/main' && 'zidov-net' || 'zidov-net-dev' }}
        
      - name: Display deployment info
        run: |
          if [[ "${{ github.ref }}" == "refs/heads/main" ]]; then
            echo "🏭 Production deployed to: https://quality-wool-contacts--zidov-net.asia-east1.hosted.app"
          else
            echo "🧪 Development deployed to: https://quality-wool-contacts--zidov-net-dev.asia-east1.hosted.app"
          fi
```

## 🚀 **What This Fixes**

### **Before (Current State):**
- ❌ Only deploys to production (`main` branch only)
- ❌ Uses wrong backend ID (`quality-wool-contacts` instead of `zidov-net`)
- ❌ Development site shows "Backend Not Found"

### **After (Fixed State):**
- ✅ **Main branch** → `zidov-net` backend (production)
- ✅ **Develop branch** → `zidov-net-dev` backend (development)  
- ✅ **Dark mode will deploy** to development site
- ✅ **Both URLs will work**:
  - Production: `https://quality-wool-contacts--zidov-net.asia-east1.hosted.app`
  - Development: `https://quality-wool-contacts--zidov-net-dev.asia-east1.hosted.app`

## 📋 **Quick Steps for AI Assistant**

1. **Update the workflow file** with the configuration above
2. **Push to develop branch** to trigger development deployment
3. **Verify dark mode works** at development URL
4. **When ready, deploy to production** by merging to main

## 🎯 **Expected Result**

After the fix:
- Push to `develop` → Dark mode deploys to `zidov-net-dev` backend
- Push to `main` → Stable features deploy to `zidov-net` backend
- Both sites publicly accessible for testing

The dark mode feature is **100% ready** - just needs this workflow fix to deploy! 🌙✨