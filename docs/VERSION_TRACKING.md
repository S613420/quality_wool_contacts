# 🚀 Version Tracking System

This document explains the automated version tracking system that displays deployment information throughout the application.

## 📍 Where Version Information Appears

### 1. **App Header (Toolbar)**
- **Location**: Top right of every page, next to sync status
- **Display**: `v1.0.0.123 (a1b2c3d)` or `v123` on mobile
- **Tooltip**: Shows full version details on hover

### 2. **Settings Page**
- **Location**: App Information section
- **Display**: Detailed breakdown including:
  - Version: `v1.0.0.123 (a1b2c3d)`
  - Build Number: `#123`
  - Commit Hash: `a1b2c3d`
  - Deployed: `12/25/2024`
  - Environment: `production`

## 🔄 How It Works

### Version Information Structure
```typescript
interface VersionInfo {
  version: string       // From package.json (e.g., "1.0.0")
  buildNumber: string   // GitHub Actions run number
  commitHash: string    // Git commit SHA
  buildDate: string     // ISO timestamp of build
  environment: string   // "production" | "development"
}
```

### Automatic Updates
1. **During CI/CD**: `scripts/update-version.js` runs before build
2. **Reads From**:
   - `package.json` for base version
   - `GITHUB_RUN_NUMBER` for build number
   - `GITHUB_SHA` for commit hash
   - `NODE_ENV` for environment
3. **Updates**: `src/version.ts` with current build info

## 🛠 Manual Usage

### Update Version Locally
```bash
npm run version:update
```

### Check Current Version
The version information is automatically imported and displayed in:
- `src/components/AppHeader.vue`
- `src/views/SettingsView.vue`

### Version Helper Functions
```typescript
import { getBuildInfo, getShortCommitHash, getDeploymentDate } from '../version'

getBuildInfo()        // "v1.0.0.123 (a1b2c3d)"
getShortCommitHash()  // "a1b2c3d"
getDeploymentDate()   // "12/25/2024"
```

## 🎯 Benefits

### For Developers
- **Easy Deployment Verification**: Instantly see if latest changes are live
- **Debugging**: Know exactly which build/commit is running
- **Environment Awareness**: Clear indication of dev vs production

### For Users
- **Transparency**: See app version and when it was last updated
- **Support**: Can provide specific build information when reporting issues

## 📈 Version Incrementing

### Automatic Incrementing
- **Build Number**: Increments with each GitHub Actions run
- **Commit Hash**: Updates with each new commit
- **Deploy Date**: Updates with each deployment

### Version Format Examples
```
Local Development:  v1.0.0.818447 (dev)
GitHub Actions:     v1.0.0.456 (a1b2c3d)
Production:         v1.0.0.456 (a1b2c3d)
```

## 🔧 Configuration

### Environment Variables (CI/CD)
- `GITHUB_RUN_NUMBER`: Used for build number
- `GITHUB_SHA`: Used for commit hash  
- `NODE_ENV`: Used for environment
- `ENVIRONMENT`: Alternative environment variable

### Fallbacks (Local Development)
- Build Number: Timestamp-based unique ID
- Commit Hash: "dev"
- Environment: "development"

## 📁 Files Involved

```
src/version.ts                    # Generated version info
src/components/AppHeader.vue      # Version badge in header  
src/views/SettingsView.vue        # Detailed version info
scripts/update-version.js         # Version update script
.github/workflows/*.yml           # CI/CD integration
```

## 🎨 Visual Indicators

### Header Badge
- **Color**: Blue with rocket emoji 🚀
- **Responsive**: Shows full info on desktop, abbreviated on mobile
- **Interactive**: Hover tooltip with full details

### Settings Display
- **Layout**: Clean two-column layout
- **Typography**: Monospace font for commit hash
- **Hierarchy**: Clear labels and values

## ⚡ Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run version:update` | Update version info manually |
| `npm run build` | Build with current version info |
| `npm run dev` | Start dev server (shows development version) |

The version badge in the header provides at-a-glance confirmation that your latest deployment is live! 🚀