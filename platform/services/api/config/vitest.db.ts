import { exec as execCb } from 'node:child_process'
import { promisify } from 'node:util'

const exec = promisify(execCb)

async function prismaMigrate(): Promise<void> {
  const { stdout, stderr } = await exec('pnpm --prefix ../../services/db db:recreate', {
    env: {
      ...process.env,
      DB_URL: process.env.DB_URL!.replace('development', 'test'),
      DB_DIRECT_URL: process.env.DB_DIRECT_URL!.replace('development', 'test'),
    },
  })
  console.log(stdout)
  console.log(stderr)
}

export async function setup() {
  await prismaMigrate()
}
