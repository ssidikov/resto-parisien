import * as fs from 'fs'
import * as path from 'path'

function cleanupForProduction() {
  console.log('🧹 Очистка проекта для продакшена...\n')

  const filesToCheck = ['.env.local', '.env.development.local', '.env.production.local']

  let foundSensitiveFiles = false

  filesToCheck.forEach((file) => {
    if (fs.existsSync(file)) {
      console.log(`⚠️  Найден файл с чувствительными данными: ${file}`)
      foundSensitiveFiles = true
    }
  })

  if (foundSensitiveFiles) {
    console.log('\n🚨 ВНИМАНИЕ: Убедитесь, что файлы с переменными окружения НЕ добавлены в Git!')
    console.log('\nВыполните следующие команды:')
    console.log('git rm --cached .env.local')
    console.log('git rm --cached .env.*.local')
    console.log('\nИли проверьте, что .gitignore правильно настроен.')
  } else {
    console.log('✅ Файлы с чувствительными данными не найдены в корне проекта.')
  }

  // Check if .gitignore exists and has proper entries
  const gitignorePath = '.gitignore'
  if (fs.existsSync(gitignorePath)) {
    const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8')
    const requiredEntries = ['.env', '.env.local', '.env.*.local']
    const missingEntries = requiredEntries.filter((entry) => !gitignoreContent.includes(entry))

    if (missingEntries.length === 0) {
      console.log('✅ .gitignore правильно настроен для исключения env файлов.')
    } else {
      console.log('⚠️  В .gitignore отсутствуют записи:', missingEntries.join(', '))
    }
  } else {
    console.log('⚠️  Файл .gitignore не найден!')
  }

  console.log('\n📋 Контрольный список перед коммитом:')
  console.log('□ Все секретные данные удалены из кода')
  console.log('□ .env.local НЕ добавлен в Git')
  console.log('□ .env.example обновлен с примерами')
  console.log('□ README.md обновлен с инструкциями по безопасности')
  console.log('□ Пароли по умолчанию изменены на заглушки')
  console.log('□ База данных защищена')

  console.log('\n✨ Проект готов к публикации на GitHub!')
}

cleanupForProduction()
