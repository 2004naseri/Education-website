# Deployment Guide

This guide will help you deploy your Education Website to production.

## 📋 Pre-Deployment Checklist

- [ ] **.env file is configured** with production API URL
- [ ] **API backend is live** at `https://education.baitulhekma.org/api`
- [ ] **All endpoints tested** using the API tester (`apiTester.testAll()` in console)
- [ ] **Build succeeds locally** (`npm run build`)
- [ ] **Preview works locally** (`npm run preview`)
- [ ] **Error handling tested** (disconnect internet, check error states)
- [ ] **Authentication configured** (if using protected routes)

---

## 🚀 Deployment Platforms

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy via Git** (easiest):
   - Push your code to GitHub
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Vite
   - Add environment variable: `VITE_API_URL = https://education.baitulhekma.org/api`
   - Click "Deploy"

3. **Deploy via CLI**:
   ```bash
   vercel
   ```
   - Follow prompts
   - Add environment variables in Vercel dashboard

**Configuration**: Already set up in `vercel.json`

---

### Option 2: Netlify

1. **Deploy via Git**:
   - Push code to GitHub
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Add environment variable: `VITE_API_URL = https://education.baitulhekma.org/api`
   - Click "Deploy"

2. **Deploy via Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod
   ```

**Configuration**: Already set up in `netlify.toml`

---

### Option 3: Manual Deployment (cPanel, VPS, etc.)

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Upload `dist` folder** to your web server

3. **Configure web server** for SPA routing:

   **Apache** (`.htaccess`):
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

   **Nginx** (`nginx.conf`):
   ```nginx
   location / {
     try_files $uri $uri/ /index.html;
   }
   ```

4. **Set environment variables** on your server

---

## 🔧 Environment Variables

Set these in your deployment platform:

| Variable | Value | Description |
|----------|-------|-------------|
| `VITE_API_URL` | `https://education.baitulhekma.org/api` | Production API endpoint |

---

## 🧪 Testing Your Deployment

### 1. Test API Connectivity

Open browser console on your deployed site:

```javascript
// Test all endpoints
apiTester.testAll()

// Test specific endpoint
apiTester.testEndpoint('books', 'getAll', { limit: 5 })

// Check configuration
apiTester.getConfig()
```

### 2. Manual Testing

- ✅ Navigate to different pages (Books, Articles, Quran, etc.)
- ✅ Test search functionality
- ✅ Test filters
- ✅ Check loading states
- ✅ Trigger error states (disconnect internet)
- ✅ Test on mobile devices
- ✅ Check browser console for errors

---

## 🐛 Troubleshooting

### API Errors (CORS, 404, etc.)

**Problem**: Getting CORS errors or API not reachable

**Solution**:
1. Check API URL is correct in environment variables
2. Verify backend CORS headers allow your domain
3. Ensure backend API endpoints match service files

### Build Fails

**Problem**: `npm run build` fails

**Solution**:
1. Check for TypeScript/ESLint errors
2. Run `npm install` to ensure all dependencies are installed
3. Check Node.js version (requires Node 18+)

### Blank Page After Deployment

**Problem**: Site shows blank page in production

**Solution**:
1. Check browser console for errors
2. Verify environment variables are set correctly
3. Check that SPA routing is configured (see Manual Deployment section)

### Images/Assets Not Loading

**Problem**: Static assets return 404

**Solution**:
1. Verify assets are in `public` folder (not `src/assets`)
2. Use absolute paths: `/images/logo.png` (not `./images/logo.png`)
3. Check build output in `dist` folder

---

## 📊 Performance Optimization

Already implemented:
- ✅ React Query caching (5min stale time)
- ✅ Code splitting with React.lazy
- ✅ Asset optimization via Vite
- ✅ Long-term caching for static assets
- ✅ Error boundaries for resilience

Optional improvements:
- [ ] Add service worker for offline support
- [ ] Enable Brotli/Gzip compression on server
- [ ] Add CDN for static assets
- [ ] Implement image lazy loading

---

## 🔒 Security

Implemented:
- ✅ Security headers (XSS, Frame, Content-Type protection)
- ✅ Authentication token system ready
- ✅ Error handling prevents data leaks
- ✅ Development tools disabled in production

---

## 📈 Monitoring

**Recommended tools**:
- [Vercel Analytics](https://vercel.com/analytics) (if using Vercel)
- [Google Analytics](https://analytics.google.com)
- [Sentry](https://sentry.io) for error tracking

---

## 🎉 You're Ready to Deploy!

Choose your platform and follow the steps above. Good luck! 🚀
