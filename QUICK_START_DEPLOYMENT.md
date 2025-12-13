# 🚀 Quick Start: Deploy to rajugottumukkala.in

## ✅ Pre-Flight Checklist

Your repository is already configured with:
- ✅ CNAME file: `public/CNAME` → `rajugottumukkala.in`
- ✅ GitHub Actions workflow: `.github/workflows/deploy.yml`
- ✅ Vite config: `base: "/"` (optimized for custom domain)
- ✅ Build script: `npm run build:custom`

---

## 📋 3-Step Deployment Process

### **Step 1: Configure DNS (At Your Domain Registrar)**

Add these DNS records:

**A Records (4 records for root domain):**
```
Type: A, Name: @, Value: 185.199.108.153
Type: A, Name: @, Value: 185.199.109.153
Type: A, Name: @, Value: 185.199.110.153
Type: A, Name: @, Value: 185.199.111.153
```

**CNAME Record (for www):**
```
Type: CNAME, Name: www, Value: rajugottumukkala.in
```

**Where to add:** Your domain registrar's DNS management panel (GoDaddy, Namecheap, etc.)

---

### **Step 2: Enable GitHub Pages**

1. Go to: `https://github.com/GKR5413/raju-portfolio/settings/pages`
2. Under **Source**: Select **GitHub Actions**
3. Under **Custom domain**: Enter `rajugottumukkala.in`
4. Click **Save**
5. Check **Enforce HTTPS** (after DNS propagates)

---

### **Step 3: Push and Deploy**

```bash
cd /Users/spider_myan/Cursor/Portfolio/raju-portfolio
git add .
git commit -m "Configure for custom domain deployment"
git push origin main
```

**Monitor deployment:**
- Go to: `https://github.com/GKR5413/raju-portfolio/actions`
- Wait 2-5 minutes for deployment to complete

---

## ⏱️ Timeline

- **DNS Propagation**: 5 minutes to 48 hours (usually 1-2 hours)
- **GitHub Pages Deployment**: 2-5 minutes after push
- **HTTPS Certificate**: 24-48 hours after DNS is correct

---

## 🧪 Test Your Site

After DNS propagates:

1. **Root domain**: `http://rajugottumukkala.in`
2. **WWW subdomain**: `http://www.rajugottumukkala.in`
3. **HTTPS**: `https://rajugottumukkala.in` (after certificate is issued)

---

## 🔍 Verify DNS

Use these tools to check if DNS is ready:

1. **DNS Checker**: https://dnschecker.org/#A/rajugottumukkala.in
2. **MXToolbox**: https://mxtoolbox.com/DNSLookup.aspx

**Command line:**
```bash
dig rajugottumukkala.in +short
# Should return 4 IP addresses
```

---

## ❗ Common Issues

### White Screen?
- Check browser console (F12) for errors
- Verify `dist/CNAME` exists after build
- Ensure DNS is fully propagated

### DNS Not Working?
- Wait 24-48 hours for full propagation
- Verify all 4 A records are added correctly
- Check with dnschecker.org

### HTTPS Not Working?
- Wait 24-48 hours after DNS is correct
- Enable "Enforce HTTPS" in GitHub Pages settings
- Clear browser cache

---

## 📚 Full Documentation

For detailed step-by-step instructions, see:
- **Complete Guide**: `GITHUB_PAGES_DOMAIN_SETUP.md`
- **Deployment Guide**: `DEPLOYMENT.md`

---

## ✅ Success Checklist

- [ ] DNS records added at registrar
- [ ] GitHub Pages enabled with custom domain
- [ ] Code pushed to GitHub
- [ ] GitHub Actions deployment successful
- [ ] DNS propagated (check with dnschecker.org)
- [ ] Website loads at rajugottumukkala.in
- [ ] HTTPS works (may take 24-48 hours)

---

**Repository**: https://github.com/GKR5413/raju-portfolio  
**Domain**: rajugottumukkala.in  
**Actions**: https://github.com/GKR5413/raju-portfolio/actions

