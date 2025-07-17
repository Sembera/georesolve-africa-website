# 🚀 GeoResolve Deployment Workflow

## Quick Reference

**Vercel (Staging)**: `develop` branch auto-deploys
**Site123 (Production)**: Manual upload from `main` branch

## 🔄 Standard Workflow

### 1. Development
```bash
git checkout develop
git checkout -b feature/my-update
# Make changes...
git commit -m "feat: update news section"
git push origin feature/my-update
```

### 2. Staging (Vercel)
```bash
git checkout develop
git merge feature/my-update
git push origin develop
# Vercel auto-deploys to staging URL
```

### 3. Production (Site123)
```bash
# After staging approval
git checkout main
git merge develop
git tag v1.1.0
git push origin main --tags

# Build for Site123
./deploy-to-site123.sh v1.1.0

# Upload site123-deploy/ folder to Site123
```

## 📦 Key Commands

```bash
bun run deploy:site123        # Create Site123 package
bun run version:minor         # Bump version number
bun run build                 # Standard build
```

## ✅ Deployment Checklist

**Before Production:**
- [ ] Staging tested and approved
- [ ] All images load correctly
- [ ] Navigation works completely
- [ ] Mobile responsive
- [ ] Free tools functional

**After Site123 Upload:**
- [ ] Production URL loads
- [ ] All sections accessible
- [ ] Images display properly
- [ ] Contact forms work
