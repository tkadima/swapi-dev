import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import fs from 'fs'
import path from 'path'

async function seedDatabase() {
  const db = await open({
    filename: path.join(process.cwd(), 'src', 'database', 'db.sqlite'),
    driver: sqlite3.Database,
  })

  const migrationFilePath = path.resolve(
    __dirname,
    'migrations',
    '0001_initial.sql',
  )

  // Ensure the table creation script has been run
  const tableCreationScript = await fs.promises.readFile(
    migrationFilePath,
    'utf-8',
  )
  await db.exec(tableCreationScript)

  const stmt = await db.prepare(
    'INSERT INTO users (name, dob, email) VALUES (?, ?, ?)',
  )

  await stmt.run('John Doe', '1990-01-01', 'john.doe@example.com')
  await stmt.finalize()

  console.log('Database seeded successfully!')
}

seedDatabase().catch((err) => {
  console.error('Error seeding database:', err)
})
