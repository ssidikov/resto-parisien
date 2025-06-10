# Deployment Guide

## Environment Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/resto-parisien.git
cd resto-parisien
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Copy the example environment file:
```bash
cp .env.example .env.local
```

Fill in the required environment variables in `.env.local`:

#### Required Variables:
- `DATABASE_URL` - Your PostgreSQL database connection string
- `NEXTAUTH_SECRET` - A secure random string (minimum 32 characters)
- `NEXTAUTH_URL` - Your application URL

#### Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

### 4. Database Setup

Initialize your database with the provided schema:
```bash
npm run db:init
```

Create an admin user:
```bash
npm run create-admin
```

## Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production Deployment

### Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy

3. **Environment Variables in Vercel:**
   ```
   DATABASE_URL=your_production_database_url
   NEXTAUTH_SECRET=your_secure_secret_key
   NEXTAUTH_URL=https://your-domain.vercel.app
   ```

### Other Platforms

#### Netlify
- Build command: `npm run build`
- Publish directory: `.next`
- Add environment variables in Netlify dashboard

#### Railway/Render
- Add environment variables
- Connect to PostgreSQL database
- Set build and start commands

## Database Providers

### Neon (Recommended)
1. Create account at [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string to `DATABASE_URL`

### Supabase
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Get connection string from dashboard

### PlanetScale
1. Create account at [planetscale.com](https://planetscale.com)
2. Create database
3. Get connection string

## Security Checklist

- [ ] All environment variables set correctly
- [ ] `NEXTAUTH_SECRET` is strong and unique
- [ ] Database uses SSL connection
- [ ] `NEXTAUTH_URL` uses HTTPS in production
- [ ] Admin password is secure
- [ ] `.env.local` is not committed to Git

## Post-Deployment

1. **Test the application:**
   - Visit your deployed URL
   - Test reservation form
   - Test admin login
   - Test password change functionality

2. **Create admin user:**
   ```bash
   npm run create-admin
   ```

3. **Monitor logs** for any errors

## Troubleshooting

### Common Issues:

1. **Database Connection Error:**
   - Check `DATABASE_URL` format
   - Ensure database allows external connections
   - Verify SSL settings

2. **NextAuth Error:**
   - Check `NEXTAUTH_SECRET` is set
   - Verify `NEXTAUTH_URL` matches your domain
   - Ensure HTTPS in production

3. **Build Errors:**
   - Clear `.next` folder
   - Run `npm install` again
   - Check for TypeScript errors

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgres://user:pass@host:5432/db` |
| `NEXTAUTH_SECRET` | NextAuth.js secret key | Random 32+ character string |
| `NEXTAUTH_URL` | Application URL | `https://your-domain.com` |
| `PGHOST` | PostgreSQL host | `ep-xxx.region.aws.neon.tech` |
| `PGUSER` | PostgreSQL username | `neondb_owner` |
| `PGPASSWORD` | PostgreSQL password | Secure password |
| `PGDATABASE` | PostgreSQL database name | `neondb` |

## Support

For deployment issues, check:
1. Application logs
2. Database connectivity
3. Environment variables
4. SSL certificate status
