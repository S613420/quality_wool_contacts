# GitHub Pages Deployment Guide

This guide will help you deploy your Vue.js Quality Wool Contacts application to GitHub Pages with CI/CD.

## 🔒 Security Setup (Firebase Configuration)

Your repository is already configured to handle Firebase secrets securely using environment variables.

### Required GitHub Secrets

Go to your repository: **Settings → Secrets and variables → Actions** and add these secrets:

| Secret Name | Description | Where to find it |
|-------------|-------------|------------------|
| `VITE_FIREBASE_API_KEY` | Firebase API key | Firebase Console → Project Settings → General |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | Firebase Console → Project Settings → General |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID | Firebase Console → Project Settings → General |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | Firebase Console → Project Settings → General |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Messaging sender ID | Firebase Console → Project Settings → General |
| `VITE_FIREBASE_APP_ID` | Firebase app ID | Firebase Console → Project Settings → General |

## 🚀 Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings → Pages**
3. Under "Source", select **"GitHub Actions"**
4. Save the settings

## 🔄 Deployment Process

The deployment is fully automated:

1. **Push to main branch** → Triggers deployment
2. **GitHub Actions will:**
   - Install dependencies
   - Run tests
   - Build the project with your Firebase secrets
   - Deploy to GitHub Pages

## 🌐 Your Live Site

Once deployed, your site will be available at:
**https://S613420.github.io/quality_wool_contacts/**

## 🛠️ Local Development

### 1. Clone and Setup
```bash
git clone https://github.com/S613420/quality_wool_contacts.git
cd quality_wool_contacts
npm install
```

### 2. Configure Environment
```bash
# Copy the example environment file
cp .env.example .env.local

# Edit .env.local with your Firebase values
# This file is gitignored and safe from commits
```

### 3. Start Development
```bash
npm run dev
```

## 📋 Deployment Checklist

- [ ] GitHub Secrets configured with Firebase values
- [ ] GitHub Pages enabled in repository settings
- [ ] Repository is public (required for GitHub Pages on free plan)
- [ ] All tests passing (`npm test`)
- [ ] Build works locally (`npm run build`)

## 🔍 Troubleshooting

### Build Fails in GitHub Actions
- Check that all required secrets are set correctly
- Verify Firebase project settings allow your domain
- Check the Actions tab for detailed error logs

### Site Not Loading
- Ensure GitHub Pages is set to "GitHub Actions" source
- Check that the deployment completed successfully
- Verify the base URL in `vite.config.ts` matches your repository name

### Firebase Connection Issues
- Double-check all Firebase secrets are correctly set
- Ensure Firebase project is configured properly
- Check browser console for specific Firebase errors

## 🔐 Security Notes

✅ **Safe in this repository:**
- All Firebase config uses environment variables
- No sensitive data is committed to git
- GitHub secrets are only accessible during builds

❌ **Never commit:**
- Actual `.env` files with real values
- Service account keys
- API keys in source code

## 📚 Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Firebase Web Setup](https://firebase.google.com/docs/web/setup)