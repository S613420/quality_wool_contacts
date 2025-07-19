# Firebase CI/CD Setup Guide

This guide will help you set up continuous integration and deployment for your Vue.js application with Firebase Hosting.

## 🔥 Firebase Configuration Required

### Step 1: Generate Firebase Service Account

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Project Settings** (gear icon) → **Service accounts**
4. Click **"Generate new private key"**
5. Download the JSON file (keep it secure!)

### Step 2: Add GitHub Secrets

Go to your GitHub repository: **Settings → Secrets and variables → Actions** and add these secrets:

#### Firebase Configuration Secrets (already added):
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

#### Additional Secret Required for CI/CD:
- `FIREBASE_SERVICE_ACCOUNT`: Paste the **entire contents** of the service account JSON file you downloaded

## 🚀 Deployment Workflows

Your repository now has three deployment options:

### 1. Firebase Hosting (Recommended)
- **File**: `.github/workflows/firebase-deploy.yml`
- **Triggers**: Push to `main` branch or manual trigger
- **Deploys to**: Firebase Hosting
- **URL**: `https://your-project-id.web.app`

### 2. GitHub Pages (Alternative)
- **File**: `.github/workflows/deploy.yml`
- **Triggers**: Push to `main` branch
- **Deploys to**: GitHub Pages
- **URL**: `https://yourusername.github.io/repository-name`

### 3. Continuous Integration
- **File**: `.github/workflows/ci.yml`
- **Triggers**: Push to `main`/`develop` or PRs to `main`
- **Purpose**: Run tests and linting

## 🛠️ Local Development Setup

### Prerequisites
- Node.js 18+ installed
- Firebase CLI installed: `npm install -g firebase-tools`

### Setup Steps

1. **Clone and install dependencies**:
   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   npm install
   ```

2. **Configure environment variables**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Firebase configuration values
   ```

3. **Login to Firebase** (one-time setup):
   ```bash
   firebase login
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

## 🔄 Deployment Commands

### Local Deployment
```bash
# Build the project
npm run build

# Deploy to Firebase Hosting
npm run firebase:deploy:hosting

# Deploy everything (Firestore, Storage, Hosting)
npm run firebase:deploy:all
```

### CI/CD Deployment
- **Automatic**: Push to `main` branch triggers Firebase deployment
- **Manual**: Go to Actions tab → "Deploy to Firebase Hosting" → "Run workflow"

## 🌐 Going Live Checklist

- [ ] ✅ Firebase secrets added to GitHub (you've done this)
- [ ] Add `FIREBASE_SERVICE_ACCOUNT` secret to GitHub
- [ ] Push code to `main` branch to trigger deployment
- [ ] Check GitHub Actions for successful deployment
- [ ] Verify your site at `https://your-project-id.web.app`

## 📊 Monitoring & Analytics

### GitHub Actions Status
- Monitor deployments in the **Actions** tab of your repository
- Each deployment shows build logs and deployment status

### Firebase Console
- **Hosting**: View deployment history and configure custom domains
- **Analytics**: Monitor user engagement and app performance
- **Performance**: Track Core Web Vitals and loading metrics

## 🔒 Security Best Practices

### Secrets Management
- ✅ Never commit real environment variables to git
- ✅ Use GitHub Secrets for sensitive data
- ✅ Rotate service account keys periodically
- ✅ Limit service account permissions to minimum required

### Firebase Security
- Configure Firestore security rules properly
- Set up Firebase Storage security rules
- Enable Firebase App Check for production

## 🐛 Troubleshooting

### Common Issues

**Build fails in GitHub Actions:**
- Check that `FIREBASE_SERVICE_ACCOUNT` secret is correctly set
- Verify all Firebase environment variables are present
- Check the Actions logs for specific error messages

**Firebase deployment fails:**
- Ensure Firebase project exists and is active
- Check that the service account has Hosting Admin permissions
- Verify the project ID matches your Firebase project

**Site not loading after deployment:**
- Check Firebase Hosting dashboard for deployment status
- Verify Firebase configuration in your app
- Check browser console for errors

### Getting Help

1. **GitHub Actions logs**: Check the Actions tab for detailed error information
2. **Firebase Console**: Check the Hosting section for deployment status
3. **Local testing**: Run `npm run build && npm run preview` to test locally

## 🎯 Next Steps

After your first successful deployment:

1. **Set up custom domain** (optional):
   - Go to Firebase Console → Hosting → Add custom domain
   - Follow DNS configuration instructions

2. **Enable performance monitoring**:
   - Add Firebase Performance Monitoring to track app performance

3. **Set up alerts**:
   - Configure Firebase alerts for errors and performance issues

4. **Branch protection** (recommended):
   - Require PR reviews before merging to `main`
   - Require status checks to pass before merging

## 📚 Additional Resources

- [Firebase Hosting Documentation](https://firebase.google.com/docs/hosting)
- [GitHub Actions for Firebase](https://github.com/FirebaseExtended/action-hosting-deploy)
- [Vue.js Deployment Guide](https://vuejs.org/guide/best-practices/production-deployment.html)
- [Vite Production Build](https://vitejs.dev/guide/build.html)