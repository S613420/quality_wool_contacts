# 🔥 Firebase Project ID Configuration Guide

## 🚨 Current Issue

Your app shows "your-project-id" in the settings page because the Firebase project ID is using a fallback placeholder value. This happens when the `VITE_FIREBASE_PROJECT_ID` environment variable is not available during the build process.

## ✅ Current Status

### GitHub Actions (✅ Working)
Your GitHub Actions workflows are **correctly configured** and should work fine:
- All required secrets are set in your GitHub repository
- `VITE_FIREBASE_PROJECT_ID` is properly configured as a secret
- Workflows use the secret during the build process
- Deployed app will show the correct project ID

### Local Development (❌ Needs Setup)
The placeholder "your-project-id" appears because:
- No `.env` file exists for local development
- The app falls back to the default placeholder value
- Environment variables are only available during build time

## 🔧 Solutions

### Option 1: For Local Development (Recommended)

1. **Create a `.env` file** (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

2. **Fill in your actual Firebase values** in the `.env` file:
   ```env
   VITE_FIREBASE_API_KEY=your-actual-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-actual-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-actual-sender-id
   VITE_FIREBASE_APP_ID=your-actual-app-id
   ```

3. **Find your Firebase values** in Firebase Console:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project
   - Go to **Project Settings** (gear icon) → **General**
   - Scroll to "Your apps" section
   - Copy the config values from your web app

### Option 2: Verify GitHub Secrets

1. **Go to your GitHub repository**
2. **Settings** → **Secrets and variables** → **Actions**
3. **Verify these secrets exist and have correct values**:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID` ← **This is the key one**
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `FIREBASE_SERVICE_ACCOUNT`

## 🚀 Testing Your Setup

### Test Local Development
```bash
# Verify your configuration
npm run firebase:verify

# Start development server
npm run dev
```

### Test GitHub Actions Deployment
1. Push changes to the `main` branch
2. Go to **Actions** tab in your GitHub repository
3. Watch the "Deploy to Firebase Hosting" workflow
4. Check the deployed site at `https://your-actual-project-id.web.app`

## 🔍 Understanding the Problem

### Why This Happens
- **Vite Environment Variables**: `VITE_*` variables are replaced at build time
- **Fallback Values**: The code uses fallbacks when env vars aren't available
- **Different Environments**: Local dev and GitHub Actions have different env var sources

### Code Location
The issue is in these files:
- `src/firebase.ts` (line 10): Main Firebase configuration
- `src/views/SettingsView.vue` (line 78): Settings display

### Current Code:
```typescript
projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'your-project-id'
```

This means:
- ✅ Uses actual project ID when `VITE_FIREBASE_PROJECT_ID` is available
- ❌ Falls back to "your-project-id" when the environment variable is missing

## 🛠 Quick Verification

Run this command to check your setup:
```bash
npm run firebase:verify
```

This will tell you:
- ✅ If your `.env` file exists and is configured
- ✅ If your GitHub Actions workflows are set up
- ⚠️  Any issues that need fixing

## 📝 Next Steps

1. **For immediate local testing**: Create and configure your `.env` file
2. **For production deployment**: Verify your GitHub secrets are correct
3. **For verification**: Run `npm run firebase:verify` to check everything

## 🎉 Expected Results

### After Local Setup
- Settings page shows your actual Firebase project ID
- App connects to your actual Firebase project
- All Firebase features work correctly

### After GitHub Deployment
- Deployed app shows correct project ID
- Production app connects to your Firebase project
- CI/CD pipeline deploys successfully

## 🆘 Troubleshooting

### Still seeing "your-project-id"?
1. Check if `.env` file exists and has correct values
2. Restart your development server after creating `.env`
3. Verify GitHub secrets are correctly named and valued
4. Check browser dev tools for any errors

### GitHub Actions failing?
1. Verify `FIREBASE_SERVICE_ACCOUNT` secret is valid JSON
2. Check that `VITE_FIREBASE_PROJECT_ID` matches your actual project
3. Review the Actions logs for specific error messages

### Need help?
Run `npm run firebase:verify` for a complete status check!