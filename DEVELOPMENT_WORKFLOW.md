# 🚀 Development Workflow Guide

## Current Setup Overview

### **🔥 Firebase Hosting Configuration**
- **Production**: Single Firebase project (`quality-wool-contacts`)
- **URL**: `https://{your-project-id}.web.app`
- **Deployment**: Automatic on push to `main` branch

### **🌿 Branch Strategy**
- **`main`**: Production deployments
- **`develop`**: Development deployments (optional)
- **`feature/*`**: Feature branches with preview channels

## 🛠️ Development Workflow Options

### **Option 1: Local Development Only (Current)**
```bash
# Work on your feature branch
git checkout feature/dark-mode-toggle
npm run dev

# Test locally at http://localhost:5173
# When ready, merge to main for production
```

**Pros**: 
- ✅ Simple setup
- ✅ Fast feedback
- ✅ No additional Firebase projects needed

**Cons**: 
- ❌ No live testing with real data
- ❌ Can't share work-in-progress easily

---

### **Option 2: Firebase Preview Channels (Recommended)**
Deploy feature branches to temporary URLs that auto-expire.

#### **Setup Steps:**
1. **Push your feature branch**:
   ```bash
   git push origin feature/dark-mode-toggle
   ```

2. **Automatic preview deployment**:
   - Creates temporary URL: `https://{project-id}--preview-feature-dark-mode-toggle-{hash}.web.app`
   - URL available for 7 days
   - Perfect for testing and sharing

#### **Usage:**
```bash
# Work on feature
git checkout feature/dark-mode-toggle
git add .
git commit -m "✨ Add dark mode toggle"
git push origin feature/dark-mode-toggle

# GitHub Actions automatically creates preview URL
# Check Actions tab for the deployment link
```

**Pros**:
- ✅ Real Firebase environment
- ✅ Shareable URLs for testing
- ✅ Automatic cleanup (7-day expiry)
- ✅ No extra Firebase projects needed

---

### **Option 3: Separate Development Environment**
Use a completely separate Firebase project for development.

#### **Setup Required:**
1. **Create development Firebase project**
2. **Add development secrets to GitHub**:
   - `VITE_FIREBASE_PROJECT_ID_DEV`
   - `VITE_FIREBASE_API_KEY_DEV`
   - `FIREBASE_SERVICE_ACCOUNT_DEV`
   - (All other dev environment variables)

3. **Create `develop` branch workflow**

#### **Usage:**
```bash
# Work on develop branch
git checkout develop
git merge feature/dark-mode-toggle
git push origin develop

# Deploys to: https://your-dev-project-id.web.app
```

**Pros**:
- ✅ Persistent development environment
- ✅ Separate data and configuration
- ✅ Team development environment

**Cons**:
- ❌ Requires additional Firebase project
- ❌ More complex setup and maintenance

## 🎯 **Recommended Workflow for Your Dark Mode Feature**

### **Immediate Testing (Option 1)**
```bash
# Current approach - test locally
npm run dev
# Visit http://localhost:5173 to test dark mode
```

### **Live Testing (Option 2 - Recommended)**
I've created the preview workflow. To enable it:

1. **Commit the workflow**:
   ```bash
   git add .github/workflows/firebase-preview.yml
   git commit -m "🚀 Add Firebase preview deployment workflow"
   git push origin feature/dark-mode-toggle
   ```

2. **Preview URL will be generated**:
   - Check GitHub Actions tab
   - Look for "Deploy Preview to Firebase Hosting"
   - Preview URL will be in the action logs

### **Production Deployment**
```bash
# When ready for production
git checkout main
git merge feature/dark-mode-toggle
git push origin main
# Automatically deploys to production
```

## 📱 **Current URLs & Access**

### **Production**
- **URL**: `https://{your-firebase-project-id}.web.app`
- **Alternative**: `https://{your-firebase-project-id}.firebaseapp.com`
- **Trigger**: Push to `main` branch

### **Local Development**
- **URL**: `http://localhost:5173` (Vite dev server)
- **Command**: `npm run dev`
- **Features**: Hot reload, debugging

### **Preview Channels** (After enabling)
- **URL**: `https://{project-id}--preview-{branch-name}-{hash}.web.app`
- **Trigger**: Push to feature branches
- **Expiry**: 7 days automatic cleanup

## 🔧 **GitHub Actions Workflows**

### **Current Workflows:**
1. **`firebase-deploy.yml`**: Production deployment (main branch)
2. **`firebase-app-hosting.yml`**: App hosting deployment (main branch)  
3. **`ci.yml`**: Testing and linting (main, develop, PRs)

### **New Workflows Available:**
4. **`firebase-preview.yml`**: Preview deployments (feature branches)
5. **`firebase-deploy-dev.yml`**: Development environment (develop branch)

## 🎉 **Next Steps for Dark Mode**

### **Immediate (Recommended)**
```bash
# Test locally first
npm run dev
# Test the dark mode toggle functionality

# Then push for preview
git push origin feature/dark-mode-toggle
# Check GitHub Actions for preview URL
```

### **For Production**
```bash
# When satisfied with testing
git checkout main
git merge feature/dark-mode-toggle
git push origin main
# Dark mode goes live!
```

## 🔐 **Security Notes**

- **Environment Variables**: All Firebase config is stored in GitHub Secrets
- **Service Accounts**: Securely managed through GitHub Actions
- **Preview URLs**: Temporary and auto-expire for security
- **Production Access**: Only main branch can deploy to production

Your dark mode feature is ready to deploy! Choose the workflow that best fits your testing needs. The preview channel option gives you the best of both worlds - live testing without affecting production. 🌙✨