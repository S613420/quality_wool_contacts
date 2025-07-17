# GitHub Pages Deployment Guide with CI/CD

This guide will help you convert your repository to public and deploy it to GitHub Pages while keeping sensitive information secure.

## 🔒 Security First: Handling Sensitive Files

### Step 1: Backup Your Sensitive Data
Before making your repository public, backup all sensitive files:
- Firebase configuration files
- API keys
- Service account keys
- Any `.env` files

### Step 2: Remove Sensitive Files from Git History
If you've already committed sensitive files, you need to remove them from Git history:

```bash
# Remove sensitive files from all commits (USE WITH CAUTION)
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch path/to/sensitive/file' \
  --prune-empty --tag-name-filter cat -- --all

# Force push to rewrite history
git push origin --force --all
```

### Step 3: Set Up GitHub Secrets
1. Go to your GitHub repository
2. Navigate to Settings → Secrets and variables → Actions
3. Add the following secrets:

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `FIREBASE_API_KEY` | Your Firebase API key | `AIzaSyC...` |
| `FIREBASE_AUTH_DOMAIN` | Firebase auth domain | `myapp.firebaseapp.com` |
| `FIREBASE_PROJECT_ID` | Firebase project ID | `my-project-123` |
| `FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | `myapp.appspot.com` |
| `FIREBASE_MESSAGING_SENDER_ID` | Messaging sender ID | `123456789` |
| `FIREBASE_APP_ID` | Firebase app ID | `1:123:web:abc` |
| `FIREBASE_MEASUREMENT_ID` | Analytics ID (optional) | `G-ABC123` |
| `CUSTOM_DOMAIN` | Your custom domain (optional) | `example.com` |

## 🚀 Setting Up GitHub Pages

### Step 1: Enable GitHub Pages
1. Go to your repository on GitHub
2. Navigate to Settings → Pages
3. Under "Source", select "GitHub Actions"
4. Save the settings

### Step 2: Configure Your Build Scripts
Update your `package.json` to include necessary build scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

### Step 3: Configure Vite for GitHub Pages
Create or update `vite.config.js`:

```javascript
import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
```

## 🔄 CI/CD Pipeline

The included GitHub Actions workflow (`.github/workflows/deploy.yml`) will:

1. **Trigger** on pushes to main branch
2. **Install** dependencies
3. **Create** Firebase config from secrets
4. **Run** tests
5. **Build** the project
6. **Deploy** to GitHub Pages

### Workflow Features:
- ✅ Automatic deployment on main branch pushes
- ✅ Test execution before deployment
- ✅ Secure handling of Firebase configuration
- ✅ Build optimization for production
- ✅ Custom domain support (optional)

## 🛠️ Local Development Setup

### 1. Clone and Install
```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
npm install
```

### 2. Set Up Local Firebase Config
```bash
# Copy the example config
cp src/config/firebase.example.js src/config/firebase.js

# Edit firebase.js with your actual values
# This file is gitignored and won't be committed
```

### 3. Start Development Server
```bash
npm run dev
```

## 📋 Pre-Deployment Checklist

- [ ] All sensitive files are in `.gitignore`
- [ ] Firebase config example file is committed
- [ ] GitHub secrets are configured
- [ ] Build script works locally (`npm run build`)
- [ ] Tests pass (`npm test`)
- [ ] GitHub Pages is enabled in repository settings

## 🔍 Troubleshooting

### Build Fails
- Check that all required secrets are set in GitHub
- Verify your build command in `package.json`
- Check the Actions tab for detailed error logs

### Pages Not Loading
- Ensure the base URL in `vite.config.js` matches your repository name
- Check that the `dist` folder is being generated correctly
- Verify GitHub Pages is pointing to the correct source

### Firebase Connection Issues
- Verify all Firebase secrets are correctly set
- Check browser console for specific Firebase errors
- Ensure Firebase project settings allow your domain

## 🌐 Going Live

Once everything is set up:

1. Push your changes to the main branch
2. GitHub Actions will automatically build and deploy
3. Your site will be available at: `https://yourusername.github.io/your-repo-name/`
4. (Optional) Configure a custom domain in GitHub Pages settings

## 🔐 Security Best Practices

1. **Never commit sensitive data** - Use environment variables and secrets
2. **Regular security audits** - Run `npm audit` regularly
3. **Keep dependencies updated** - Use tools like Dependabot
4. **Review PRs carefully** - Ensure no sensitive data is accidentally included
5. **Use HTTPS** - Always enable HTTPS for your deployed site

## 📚 Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)