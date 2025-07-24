# 🚀 Dual Site Deployment Setup

## Overview

You now have **two publicly accessible Firebase hosting sites**:

1. **🏭 Production Site** (`main` branch)
2. **🧪 Development/Staging Site** (`develop` branch)

Both sites are **publicly accessible** and **automatically deployed** via GitHub Actions.

## 🌐 Site URLs

### **Production Site**
- **URL**: `https://{your-project-id}.web.app`
- **Alt URL**: `https://{your-project-id}.firebaseapp.com`
- **Branch**: `main`
- **Purpose**: Live production site for users

### **Development/Staging Site**  
- **URL**: `https://{your-project-id}-dev.web.app`
- **Alt URL**: `https://{your-project-id}-dev.firebaseapp.com`
- **Branch**: `develop` 
- **Purpose**: Public testing site for development when away from home

## 🔄 Deployment Workflow

### **Development Workflow**
```bash
# 1. Work on feature branches
git checkout feature/dark-mode-toggle
# Make your changes

# 2. Test locally
npm run dev

# 3. Deploy to development site for public testing
git checkout develop
git merge feature/dark-mode-toggle
git push origin develop
# → Deploys to: https://{project-id}-dev.web.app

# 4. When ready for production
git checkout main  
git merge develop
git push origin main
# → Deploys to: https://{project-id}.web.app
```

### **Quick Development Testing**
```bash
# Push directly to develop for quick testing
git checkout develop
git add .
git commit -m "🧪 Test new feature"
git push origin develop
# → Available at your dev URL in ~2-3 minutes
```

## 🛠️ Firebase Configuration

### **Hosting Targets**
Your `firebase.json` now supports multiple hosting targets:

```json
{
  "hosting": [
    {
      "target": "production",
      "public": "dist"
    },
    {
      "target": "development", 
      "public": "dist"
    }
  ]
}
```

### **Required Firebase Setup**

You'll need to configure the hosting targets in your Firebase project:

```bash
# Set up hosting targets (run once)
firebase target:apply hosting production {your-project-id}
firebase target:apply hosting development {your-project-id}-dev
```

**Note**: Your AI assistant can help set this up, or you can do it manually in Firebase Console.

## 🤖 GitHub Actions Workflows

### **Production Deployment** (`firebase-deploy.yml`)
- **Trigger**: Push to `main` branch
- **Target**: Production hosting  
- **URL**: `https://{project-id}.web.app`

### **Development Deployment** (`firebase-deploy-staging.yml`)
- **Trigger**: Push to `develop` branch
- **Target**: Development hosting
- **URL**: `https://{project-id}-dev.web.app`

### **Manual Deployment**
Both workflows support manual triggers:
- Go to **GitHub Actions** tab
- Select workflow
- Click "**Run workflow**"
- Choose branch to deploy

## 🎯 Use Cases

### **When Away From Home**
```bash
# Test your changes on the public dev site
git checkout develop
git merge feature/your-feature
git push origin develop

# Access from anywhere: https://{project-id}-dev.web.app
# Share with team for feedback
# Test on different devices/networks
```

### **Production Release**
```bash
# When development testing is complete
git checkout main
git merge develop  
git push origin main

# Live at: https://{project-id}.web.app
```

## 📱 Environment Detection

Your app can detect which environment it's running in:

```typescript
// In your Vue app
const isDevelopment = import.meta.env.VITE_APP_ENV === 'staging'
const isProduction = import.meta.env.VITE_APP_ENV !== 'staging'

// Show environment indicator
if (isDevelopment) {
  console.log('🧪 Running on development site')
}
```

## 🔐 Security & Access

### **Both Sites Are Public**
- ✅ **Production**: Public for users
- ✅ **Development**: Public for testing (intended)
- ✅ **Same Firebase project**: Shared database/auth
- ✅ **Same permissions**: No additional security needed

### **Data Sharing**
Both sites use the **same Firebase project**, so:
- ✅ **Shared Firestore database**
- ✅ **Shared Authentication**  
- ✅ **Shared Storage**
- ⚠️ **Development changes affect live data**

## 🚀 Dark Mode Feature Deployment

### **Current Status**
Your dark mode feature is ready on the `feature/dark-mode-toggle` branch.

### **Deploy to Development Site**
```bash
git checkout develop
git merge feature/dark-mode-toggle
git push origin develop
# → Test at: https://{project-id}-dev.web.app
```

### **Deploy to Production** 
```bash  
git checkout main
git merge develop
git push origin main
# → Live at: https://{project-id}.web.app
```

## 📊 Monitoring & Management

### **GitHub Actions**
- Monitor deployments in **Actions** tab
- View build logs and status
- Manual deployment triggers available

### **Firebase Console**
- View both hosting sites in Firebase Console
- Monitor performance and usage
- Manage custom domains if needed

## 🎉 Benefits

✅ **Public Development Site**: Test anywhere, anytime  
✅ **Automated Deployments**: Push and deploy automatically  
✅ **Same Firebase Project**: No duplicate setup needed  
✅ **Team Collaboration**: Share dev URL for feedback  
✅ **Production Safety**: Test before going live  
✅ **Mobile Testing**: Test on real devices remotely  

Your dual-site setup is now ready! You can develop and test publicly while keeping production stable. 🌟