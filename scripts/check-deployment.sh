#!/bin/bash

echo "🔍 Checking Deployment Readiness..."
echo "=================================="

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Not in a Git repository"
    exit 1
fi

echo "✅ Git repository found"

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found"
    exit 1
fi

echo "✅ package.json found"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "❌ node_modules not found. Run 'npm install'"
    exit 1
fi

echo "✅ Dependencies installed"

# Check if build works
echo "🔨 Testing build process..."
if npm run build > /dev/null 2>&1; then
    echo "✅ Build successful"
else
    echo "❌ Build failed. Check 'npm run build'"
    exit 1
fi

# Check if tests pass
echo "🧪 Running tests..."
if npm run test:run > /dev/null 2>&1; then
    echo "✅ Tests passing"
else
    echo "❌ Tests failing. Check 'npm run test:run'"
    exit 1
fi

# Check if Firebase config exists
if [ -f "firebase.json" ]; then
    echo "✅ Firebase configuration found"
else
    echo "❌ firebase.json not found"
fi

# Check GitHub Actions workflows
if [ -f ".github/workflows/firebase-deploy.yml" ]; then
    echo "✅ Firebase deployment workflow configured"
else
    echo "❌ Firebase deployment workflow missing"
fi

if [ -f ".github/workflows/ci.yml" ]; then
    echo "✅ CI workflow configured"
else
    echo "❌ CI workflow missing"
fi

echo ""
echo "🎯 Next Steps:"
echo "1. Add FIREBASE_SERVICE_ACCOUNT secret to GitHub"
echo "2. Push to main branch to trigger deployment"
echo "3. Check GitHub Actions for deployment status"
echo ""
echo "📖 See DEPLOYMENT_STATUS.md for detailed instructions"

# Check current git status
echo ""
echo "📝 Git Status:"
git status --porcelain