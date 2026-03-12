import { env } from '@botfi/env/db'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'

const adapter = new PrismaNeon(
  {
    connectionString: env.DB_URL,
  },
  {
    schema: `repo-template-${env.NODE_ENV}`,
  },
)

const _prisma = new PrismaClient({
  adapter,
  log: env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  errorFormat: env.NODE_ENV === 'development' ? 'pretty' : 'minimal',
})

const globalForPrisma = globalThis as unknown as {
  prisma: typeof _prisma | undefined
}

export const prisma = globalForPrisma.prisma ?? _prisma

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export type PrismaTransaction = Omit<
  typeof prisma,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>

export * from '@prisma/client'
