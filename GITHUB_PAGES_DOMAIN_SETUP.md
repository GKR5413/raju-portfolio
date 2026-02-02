# Complete Guide: Hosting Your Portfolio on GitHub Pages with Custom Domain

## 📋 Prerequisites

- GitHub account
- Domain name: `rajugottumukkala.com`
- Access to your domain's DNS settings
- Repository: `https://github.com/GKR5413/raju-portfolio`

---

## 🚀 Step-by-Step Setup Process

### **Step 1: Verify Repository Configuration**

Your repository is already configured with:
- ✅ CNAME file in `public/CNAME` with `rajugottumukkala.com`
- ✅ GitHub Actions workflow for automatic deployment
- ✅ Build scripts configured

**Verify CNAME file exists:**
```bash
cat public/CNAME
# Should output: rajugottumukkala.com
```

---

### **Step 2: Configure DNS Records**

You need to add DNS records at your domain registrar (where you bought `rajugottumukkala.com`).

#### **2.1 Login to Your Domain Registrar**

Go to your domain registrar's website (e.g., GoDaddy, Namecheap, Google Domains, etc.) and access DNS management.

#### **2.2 Add A Records (for root domain)**

Add **4 A records** pointing to GitHub Pages IP addresses:

| Type | Name/Host | Value | TTL |
|------|-----------|-------|-----|
| A | @ | 185.199.108.153 | 3600 (or default) |
| A | @ | 185.199.109.153 | 3600 (or default) |
| A | @ | 185.199.110.153 | 3600 (or default) |
| A | @ | 185.199.111.153 | 3600 (or default) |

**Note:** Some registrars use different notation:
- **Name/Host = @** means root domain (`rajugottumukkala.com`)
- **Name/Host = blank/empty** also means root domain
- **Name/Host = * (asterisk)** means wildcard (don't use this)

#### **2.3 Add CNAME Record (for www subdomain)**

Add **1 CNAME record** for the www subdomain:

| Type | Name/Host | Value | TTL |
|------|-----------|-------|-----|
| CNAME | www | rajugottumukkala.com | 3600 (or default) |

**Note:** The value should be your root domain (`rajugottumukkala.com`), NOT `GKR5413.github.io`.

#### **2.4 Remove Conflicting Records**

- ❌ Remove any existing A records pointing to other IPs
- ❌ Remove any CNAME records for `@` (root domain)
- ✅ Keep only the 4 A records and 1 CNAME (www) as shown above

---

### **Step 3: Enable GitHub Pages**

#### **3.1 Go to Repository Settings**

1. Open your repository: `https://github.com/GKR5413/raju-portfolio`
2. Click **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar)

#### **3.2 Configure GitHub Pages**

1. Under **Source**, select:
   - **Deploy from a branch** → **main** branch
   - **Folder**: `/ (root)` or `/docs` (if using docs folder)
   
   **OR** (Recommended - since you have GitHub Actions):
   
   - **Source**: **GitHub Actions** (this uses your workflow)

2. Under **Custom domain**, enter:
   ```
   rajugottumukkala.com
   ```

3. Check **Enforce HTTPS** (recommended, but may take time to enable)

4. Click **Save**

#### **3.3 Verify CNAME File**

GitHub will automatically create/update a CNAME file. Verify it contains:
```
rajugottumukkala.com
```

---

### **Step 4: Verify Build Configuration**

Your `vite.config.ts` should use absolute paths for custom domain:

```typescript
base: "/"  // For custom domain (root path)
```

**Current status:** Your config uses `base: "./"` which works but `base: "/"` is better for custom domains.

---

### **Step 5: Push Changes and Deploy**

#### **5.1 Ensure All Changes Are Committed**

```bash
cd /Users/spider_myan/Cursor/Portfolio/raju-portfolio
git status
git add .
git commit -m "Configure for GitHub Pages deployment"
```

#### **5.2 Push to GitHub**

```bash
git push origin main
```

#### **5.3 Monitor Deployment**

1. Go to: `https://github.com/GKR5413/raju-portfolio/actions`
2. Watch the "Deploy to GitHub Pages" workflow run
3. Wait for it to complete (usually 2-5 minutes)

---

### **Step 6: Verify DNS Propagation**

DNS changes can take **5 minutes to 48 hours** to propagate globally.

#### **6.1 Check DNS Records**

Use online tools to verify your DNS records:

1. **MXToolbox**: https://mxtoolbox.com/DNSLookup.aspx
   - Enter: `rajugottumukkala.com`
   - Check A records show the 4 GitHub IPs

2. **DNS Checker**: https://dnschecker.org/
   - Enter: `rajugottumukkala.com`
   - Select record type: **A**
   - Verify all 4 IPs appear globally

#### **6.2 Test Domain Resolution**

```bash
# Check A records
dig rajugottumukkala.com +short
# Should return: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153

# Check CNAME for www
dig www.rajugottumukkala.com +short
# Should return: rajugottumukkala.com
```

---

### **Step 7: Test Your Website**

#### **7.1 Test Root Domain**

Open in browser:
```
http://rajugottumukkala.com
https://rajugottumukkala.com (after HTTPS is enabled)
```

#### **7.2 Test WWW Subdomain**

Open in browser:
```
http://www.rajugottumukkala.com
https://www.rajugottumukkala.com
```

#### **7.3 Verify HTTPS**

1. Wait 24-48 hours for GitHub to provision SSL certificate
2. Check that HTTPS works (green padlock in browser)
3. If not working, ensure "Enforce HTTPS" is enabled in GitHub Pages settings

---

## 🔧 Troubleshooting

### **Issue: White Screen / Blank Page**

**Possible Causes:**
1. **Asset paths incorrect**
   - Check browser console (F12) for 404 errors
   - Verify `vite.config.ts` has `base: "/"` for custom domain

2. **CNAME file missing**
   - Ensure `public/CNAME` exists with `rajugottumukkala.com`
   - Check `dist/CNAME` after build

**Solution:**
```bash
# Rebuild and verify CNAME is in dist/
npm run build
ls dist/CNAME  # Should exist
cat dist/CNAME  # Should show: rajugottumukkala.com
```

---

### **Issue: DNS Not Resolving**

**Possible Causes:**
1. DNS records not added correctly
2. DNS propagation not complete
3. Wrong IP addresses

**Solution:**
1. Double-check all 4 A records are added
2. Wait 24-48 hours for full propagation
3. Verify IPs are correct: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`

---

### **Issue: HTTPS Not Working**

**Possible Causes:**
1. SSL certificate not provisioned yet
2. "Enforce HTTPS" not enabled
3. DNS not fully propagated

**Solution:**
1. Wait 24-48 hours after DNS is correct
2. Enable "Enforce HTTPS" in GitHub Pages settings
3. Clear browser cache and try again

---

### **Issue: GitHub Actions Deployment Fails**

**Possible Causes:**
1. Build errors
2. Missing dependencies
3. Workflow permissions

**Solution:**
1. Check Actions tab for error messages
2. Test build locally: `npm run build`
3. Verify workflow file syntax is correct

---

### **Issue: www Subdomain Not Working**

**Possible Causes:**
1. CNAME record not added
2. CNAME value incorrect

**Solution:**
1. Verify CNAME record: `www` → `rajugottumukkala.com`
2. Wait for DNS propagation
3. Test: `dig www.rajugottumukkala.com`

---

## ✅ Verification Checklist

Before considering setup complete, verify:

- [ ] All 4 A records added at domain registrar
- [ ] CNAME record for www added
- [ ] GitHub Pages enabled in repository settings
- [ ] Custom domain entered in GitHub Pages settings
- [ ] CNAME file exists in `public/CNAME`
- [ ] GitHub Actions workflow runs successfully
- [ ] DNS propagation complete (check with dnschecker.org)
- [ ] Website loads at `http://rajugottumukkala.com`
- [ ] Website loads at `http://www.rajugottumukkala.com`
- [ ] HTTPS works (may take 24-48 hours)
- [ ] All assets load correctly (images, CSS, JS)
- [ ] No console errors in browser

---

## 📝 Quick Reference Commands

```bash
# Build locally
npm run build

# Preview production build
npm run preview

# Check git status
git status

# Push changes
git add .
git commit -m "Your message"
git push origin main

# Check DNS
dig rajugottumukkala.com +short
dig www.rajugottumukkala.com +short
```

---

## 🔗 Useful Links

- **GitHub Pages Docs**: https://docs.github.com/en/pages
- **Custom Domain Setup**: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
- **DNS Checker**: https://dnschecker.org/
- **MXToolbox**: https://mxtoolbox.com/
- **Your Repository**: https://github.com/GKR5413/raju-portfolio
- **Your Actions**: https://github.com/GKR5413/raju-portfolio/actions

---

## 🎉 Success Indicators

Your setup is complete when:

1. ✅ `rajugottumukkala.com` loads your portfolio
2. ✅ `www.rajugottumukkala.com` redirects to root domain
3. ✅ HTTPS works with green padlock
4. ✅ All pages and assets load correctly
5. ✅ No console errors in browser
6. ✅ GitHub Actions shows successful deployment

---

## 📞 Need Help?

If you encounter issues:

1. Check GitHub Actions logs: `https://github.com/GKR5413/raju-portfolio/actions`
2. Check browser console for errors (F12)
3. Verify DNS records with online tools
4. Review GitHub Pages documentation
5. Check repository settings → Pages section

---

**Last Updated:** Based on current repository configuration
**Repository:** https://github.com/GKR5413/raju-portfolio
**Domain:** rajugottumukkala.com


