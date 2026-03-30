# GitHub Pages Deployment Guide

## What I've Set Up

✅ Configured Next.js for static export (`output: 'export'` in next.config.ts)
✅ Created GitHub Actions workflow (`.github/workflows/deploy.yml`)
✅ Added `.nojekyll` file to prevent Jekyll processing
✅ Tested build - works perfectly!

## Step-by-Step Deployment

### 1. Create GitHub Repository

Go to GitHub and create a new repository:
- **Repository name**: `ronak-portfolio` (or any name you prefer)
- **Visibility**: Public (required for free GitHub Pages)
- **Don't** initialize with README, .gitignore, or license (we already have these)

### 2. Initialize Git and Push

Run these commands in your project folder:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Terminal-style portfolio with 8 features"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/ronak-portfolio.git

# Push to main branch
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. In the left sidebar, click **Pages**
4. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
5. Save the settings

### 4. Automatic Deployment

That's it! Every time you push to the `main` branch:
- GitHub Actions will automatically build your site
- Deploy it to GitHub Pages
- Your site will be live at: `https://YOUR_USERNAME.github.io/ronak-portfolio/`

### 5. Check Deployment Status

1. Go to **Actions** tab in your repository
2. You'll see the "Deploy to GitHub Pages" workflow running
3. Wait for it to complete (usually 2-3 minutes)
4. Once successful, visit your site!

## Using Custom Domain (Optional)

If you want to use your own domain (e.g., `ronakneema.dev`):

1. **Update next.config.ts**:
```typescript
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '',  // Keep this empty for custom domain
  trailingSlash: true,
};
```

2. **Add CNAME file**:
```bash
echo "ronakneema.dev" > public/CNAME
```

3. **Configure DNS** (at your domain provider):
```
Type: A
Host: @
Value: 185.199.108.153

Type: A
Host: @
Value: 185.199.109.153

Type: A
Host: @
Value: 185.199.110.153

Type: A
Host: @
Value: 185.199.111.153

Type: CNAME
Host: www
Value: YOUR_USERNAME.github.io
```

4. **Enable in GitHub Settings**:
   - Go to Settings > Pages
   - Enter your custom domain
   - Check "Enforce HTTPS"

## Manual Deployment (Alternative)

If you prefer not to use GitHub Actions:

```bash
# Build locally
npm run build

# Install gh-pages package
npm install --save-dev gh-pages

# Add deploy script to package.json
"scripts": {
  "deploy": "gh-pages -d out"
}

# Deploy
npm run deploy
```

Then in GitHub Settings > Pages, select source as "gh-pages" branch.

## Troubleshooting

### Build fails?
- Check the Actions log for errors
- Make sure all dependencies are in package.json
- Verify the build works locally: `npm run build`

### Page shows 404?
- Wait a few minutes for DNS propagation
- Check that GitHub Pages is enabled
- Verify the workflow completed successfully

### Images not loading?
- Images are already optimized in config
- Make sure images are in the `public/` folder

### Links not working?
- Internal links should use `href="#section"` format
- Already implemented correctly in your site

## Current Configuration

**Your site will be deployed to**: `https://YOUR_USERNAME.github.io/ronak-portfolio/`

**Configuration files**:
- ✅ `next.config.ts` - Static export enabled
- ✅ `.github/workflows/deploy.yml` - Auto-deployment
- ✅ `public/.nojekyll` - Bypass Jekyll

**Build output**: Static HTML in `out/` folder (117KB main page)

## Next Steps After Deployment

1. Update social links to point to live site
2. Test all features on live site
3. Share your portfolio link!
4. Monitor GitHub Actions for future deployments

---

**Need Help?**
- Check deployment status: Repository > Actions tab
- View live site: `https://YOUR_USERNAME.github.io/ronak-portfolio/`
- GitHub Pages docs: https://docs.github.com/pages
