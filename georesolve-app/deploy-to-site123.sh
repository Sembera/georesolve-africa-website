#!/bin/bash

# GeoResolve Africa - Site123 Production Deployment Script
# Usage: ./deploy-to-site123.sh [version]

set -e

VERSION=${1:-$(date +%Y%m%d%H%M%S)}
PROJECT_NAME="georesolve-africa"
BUILD_DIR="dist"
DEPLOY_DIR="site123-deploy"

echo "🚀 Starting deployment to Site123 - Version: $VERSION"

# 1. Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf $BUILD_DIR $DEPLOY_DIR

# 2. Install dependencies
echo "📦 Installing dependencies..."
bun install

# 3. Build for production
echo "🔨 Building for production..."
bun run build

# 4. Create deployment package
echo "📦 Creating Site123 deployment package..."
mkdir -p $DEPLOY_DIR
cp -r $BUILD_DIR/* $DEPLOY_DIR/

# 5. Create deployment instructions
cat > $DEPLOY_DIR/DEPLOYMENT_INSTRUCTIONS.md << EOF
# Site123 Deployment Instructions - Version $VERSION

## 📁 Files to Upload
Upload ALL files from this directory to your Site123 website root.

## 🔧 Upload Steps
1. Login to Site123 dashboard
2. Go to Website Manager → Files
3. Delete old files (keep backups)
4. Upload all files from this directory
5. Ensure index.html is in the root directory

## ✅ Verification
- Visit your Site123 URL
- Check all navigation works
- Test responsive design on mobile
- Verify all images load correctly

## 📋 Version Information
- Build Date: $(date)
- Git Commit: $(git rev-parse HEAD)
- Git Branch: $(git branch --show-current)
- Version Tag: $VERSION

## 🔄 Rollback
If issues occur, use previous version backup from git tag.
EOF

# 6. Create version zip
echo "📦 Creating version archive..."
cd $DEPLOY_DIR
zip -r9 "../${PROJECT_NAME}-site123-v${VERSION}.zip" .
cd ..

echo "✅ Deployment package ready!"
echo "📁 Files location: ./$DEPLOY_DIR/"
echo "📦 Archive: ./${PROJECT_NAME}-site123-v${VERSION}.zip"
echo ""
echo "🔧 Next steps:"
echo "1. Review files in ./$DEPLOY_DIR/"
echo "2. Upload to Site123 following DEPLOYMENT_INSTRUCTIONS.md"
echo "3. Test production site"
echo "4. Tag this version: git tag production-v$VERSION"
