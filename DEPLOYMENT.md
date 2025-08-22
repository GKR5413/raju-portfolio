# Deployment Guide

## GitHub Pages with Custom Domain Setup

This project is configured to deploy to GitHub Pages with a custom domain (rajugottumukkala.in).

### Configuration Files

1. **CNAME**: Located in `public/CNAME` - contains your custom domain
2. **Vite Config**: Smart base path detection for different deployment scenarios
3. **GitHub Actions**: Automated deployment workflow

### Build Scripts

- `npm run build` - Default build (uses root path for custom domain)
- `npm run build:custom` - Explicit build for custom domain deployment
- `npm run build:github` - Build for GitHub Pages subdirectory (if needed)

### Deployment Process

1. **Automatic Deployment**:
   - Push to `main` branch triggers GitHub Actions
   - Builds the project with correct asset paths
   - Deploys to GitHub Pages with CNAME file

2. **Manual Deployment**:
   ```bash
   npm run build
   # Upload dist/ folder to GitHub Pages
   ```

### DNS Configuration

Ensure your domain has these DNS records:
```
Type: A
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153

Type: CNAME
Name: www
Value: rajugottumukkala.in
```

### Troubleshooting

**White Screen Issues**:
- Verify CNAME file exists in dist/
- Check browser console for asset loading errors
- Ensure DNS propagation is complete (can take up to 24 hours)

**Asset Loading Problems**:
- Vite config automatically handles base paths
- For custom domain: uses `/` (root path)
- For GitHub Pages: uses `/repo-name/` when GITHUB_ACTIONS is set

### Local Development

```bash
npm run dev  # Starts development server on localhost:8080
```

### Production Preview

```bash
npm run deploy:preview  # Build and preview production build locally
```