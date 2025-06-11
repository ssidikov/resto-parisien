import bcrypt from 'bcryptjs'

async function generatePasswordHash() {
  const password = 'ChangeMe123!'
  const saltRounds = 12
  const hash = await bcrypt.hash(password, saltRounds)

  console.log('Password:', password)
  console.log('Hash for database:', hash)
  console.log('\nSQL command:')
  console.log(
    `INSERT INTO admins (username, email, password) VALUES ('admin', 'admin@lemoderne.fr', '${hash}');`
  )
}

generatePasswordHash()
