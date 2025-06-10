# Vercel Deployment Instructions

## Environment Variables Setup

Add these environment variables in your Vercel dashboard:

### Required Variables:
- `DATABASE_URL`: Your PostgreSQL connection string
- `NEXTAUTH_SECRET`: A secure 32+ character secret key
- `NEXTAUTH_URL`: Your Vercel deployment URL (e.g., https://your-app.vercel.app)

### Optional (if using Stack Auth):
- `NEXT_PUBLIC_STACK_PROJECT_ID`: Your Stack project ID
- `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY`: Your Stack publishable key
- `STACK_SECRET_SERVER_KEY`: Your Stack secret key

## Database Setup

1. Create a PostgreSQL database (recommended: Neon, Supabase, or PlanetScale)
2. Run the initialization script in your database:

```sql
-- Copy the contents from database/init.sql
CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reservations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  guests INTEGER NOT NULL CHECK (guests > 0),
  special_requests TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

3. Create an admin user:

```sql
-- Replace with your own secure values
INSERT INTO admins (username, email, password) 
VALUES ('admin', 'admin@yourrestaurant.com', '$2a$12$hashedPasswordHere');
```

## Deployment Steps

1. **Connect GitHub**: Link your GitHub repository to Vercel
2. **Environment Variables**: Add all required environment variables
3. **Deploy**: Vercel will automatically build and deploy
4. **Test**: Verify all functionality works correctly

## Post-Deployment

1. **Test the reservation form**: Make a test reservation
2. **Test admin login**: Access `/auth/login` and log in
3. **Change default password**: Use the password change feature
4. **Monitor logs**: Check Vercel function logs for any errors

## Troubleshooting

### Build Errors:
- Ensure all environment variables are set
- Check for TypeScript errors
- Verify database connection string format

### Runtime Errors:
- Check Vercel function logs
- Verify database connectivity
- Ensure NEXTAUTH_URL matches your domain

### Database Issues:
- Confirm database allows external connections
- Check SSL settings
- Verify connection string format

## Security Checklist

- [ ] NEXTAUTH_SECRET is strong and unique
- [ ] Database uses SSL connections
- [ ] Default passwords changed
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Environment variables secure
