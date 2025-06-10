# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability within this application, please send an email to [your-email@domain.com]. All security vulnerabilities will be promptly addressed.

Please do not report security vulnerabilities through public GitHub issues.

## Security Measures

This application implements the following security measures:

### Authentication & Authorization
- NextAuth.js for secure authentication
- Password hashing using bcryptjs with salt rounds
- Session-based authentication
- Protected admin routes with middleware

### Database Security
- Parameterized queries to prevent SQL injection
- Database connection via secure SSL
- Environment variables for database credentials

### Environment Variables
- All sensitive data stored in environment variables
- `.env.local` excluded from version control
- Separate configuration for development and production

### Input Validation
- Form validation on both client and server side
- Input sanitization for all user inputs
- CSRF protection via NextAuth.js

### Production Deployment
- HTTPS enforcement recommended
- Secure headers configuration
- Environment-specific configuration

## Best Practices

1. **Never commit sensitive data** to version control
2. **Use strong passwords** for admin accounts
3. **Keep dependencies updated** regularly
4. **Monitor for security vulnerabilities** in dependencies
5. **Use HTTPS** in production
6. **Regular security audits** recommended

## Environment Variables Security

The following environment variables contain sensitive information and must be kept secure:

- `DATABASE_URL` - Database connection string
- `NEXTAUTH_SECRET` - NextAuth.js encryption key
- `PGPASSWORD` - Database password
- All Stack Auth variables

## Development vs Production

### Development
- Uses `localhost` for NEXTAUTH_URL
- Development database credentials
- Debug logging enabled

### Production
- Must use HTTPS domain for NEXTAUTH_URL
- Production database credentials
- Debug logging disabled
- Strong NEXTAUTH_SECRET (minimum 32 characters)

## Dependencies Security

Run security audits regularly:

```bash
npm audit
npm audit fix
```

Keep dependencies updated:

```bash
npm update
```
