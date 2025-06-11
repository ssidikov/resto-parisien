#!/usr/bin/env node
/**
 * Environment Setup Diagnostic Tool
 * Helps identify and fix NextAuth configuration issues
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 NextAuth Configuration Diagnostic Tool\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
const envExists = fs.existsSync(envPath);

console.log(`📁 .env.local file: ${envExists ? '✅ Found' : '❌ Missing'}`);

if (envExists) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  
  console.log('\n🔍 Checking environment variables...');
  
  // Check NEXTAUTH_SECRET
  const hasSecret = envContent.includes('NEXTAUTH_SECRET=') && 
                   !envContent.includes('your_local_development_secret_key_here') &&
                   !envContent.includes('your_super_secure_production_secret');
  console.log(`🔑 NEXTAUTH_SECRET: ${hasSecret ? '✅ Configured' : '❌ Needs setup'}`);
  
  // Check DATABASE_URL
  const hasDB = envContent.includes('DATABASE_URL=') && 
                !envContent.includes('your_production_database_url_here') &&
                !envContent.includes('your_password@your_host');
  console.log(`🗄️  DATABASE_URL: ${hasDB ? '✅ Configured' : '❌ Needs setup'}`);
  
  // Check NEXTAUTH_URL
  const hasUrl = envContent.includes('NEXTAUTH_URL=http://localhost:3000');
  console.log(`🌐 NEXTAUTH_URL: ${hasUrl ? '✅ Configured' : '❌ Needs setup'}`);
  
  console.log('\n📋 Current .env.local content:');
  console.log('─'.repeat(50));
  console.log(envContent);
  console.log('─'.repeat(50));
  
  if (!hasSecret || !hasDB) {
    console.log('\n🚨 REQUIRED ACTIONS:');
    
    if (!hasSecret) {
      console.log('1️⃣  Generate a secure NEXTAUTH_SECRET:');
      console.log('   Run: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"');
      console.log('   Or use: openssl rand -hex 32');
    }
    
    if (!hasDB) {
      console.log('2️⃣  Configure DATABASE_URL:');
      console.log('   Get your Neon database URL from: https://console.neon.tech/');
      console.log('   Format: postgresql://username:password@hostname/dbname?sslmode=require');
    }
    
    console.log('\n💡 Example .env.local configuration:');
    console.log('─'.repeat(50));
    console.log(`# Local Development Environment
DATABASE_URL=postgresql://username:password@hostname.neon.tech/dbname?sslmode=require
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=${require('crypto').randomBytes(32).toString('hex')}`);
    console.log('─'.repeat(50));
  } else {
    console.log('\n✅ Environment configuration looks good!');
  }
} else {
  console.log('\n🚨 Create .env.local file with:');
  console.log('─'.repeat(50));
  console.log(`DATABASE_URL=your_neon_database_url_here
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=${require('crypto').randomBytes(32).toString('hex')}`);
  console.log('─'.repeat(50));
}

console.log('\n🔄 After updating .env.local, restart your development server:');
console.log('   npm run dev');
