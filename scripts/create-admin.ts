import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

async function createAdmin() {
  try {
    console.log('=== Création d\'un administrateur ===');
    console.log('⚠️  IMPORTANT: Changez ces valeurs par défaut après création!\n');
    
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined in environment variables');
    }
    
    const sql = neon(process.env.DATABASE_URL);
    
    // Default values - MUST be changed in production
    const username = 'admin';
    const email = 'admin@lemoderne.fr';
    const defaultPassword = 'ChangeMe123!';
    
    console.log('Création avec les valeurs par défaut:');
    console.log(`Nom d'utilisateur: ${username}`);
    console.log(`Email: ${email}`);
    console.log(`Mot de passe temporaire: ${defaultPassword}`);
    console.log('\n🚨 CHANGEZ CES INFORMATIONS APRÈS LA PREMIÈRE CONNEXION!\n');
    
    // Hash the password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(defaultPassword, saltRounds);
    
    // Delete existing admin with same username and create new one
    await sql`DELETE FROM admins WHERE username = ${username}`;
    
    await sql`
      INSERT INTO admins (username, email, password) 
      VALUES (${username}, ${email}, ${hashedPassword})
    `;
    
    console.log('✅ Administrateur créé avec succès!');
    console.log('\n📋 Informations de connexion:');
    console.log(`URL: http://localhost:3000/auth/login`);
    console.log(`Nom d'utilisateur: ${username}`);
    console.log(`Mot de passe: ${defaultPassword}`);
    console.log('\n⚠️  IMPORTANT: Utilisez la fonction "Changer le mot de passe" après votre première connexion!');
    
  } catch (error) {
    console.error('\n❌ Échec de la création de l\'administrateur:', error);
    process.exit(1);
  }
}

createAdmin();
