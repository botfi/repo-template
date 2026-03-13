import { env } from '@botfi/env/db'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import { parseDbUrl } from './utils/parseDbUrl'

const { isNeonUrl, schema } = parseDbUrl(env.DB_URL)

const adapter = isNeonUrl
  ? new PrismaNeon({ connectionString: env.DB_URL }, schema ? { schema } : undefined)
  : new PrismaPg({ connectionString: env.DB_URL }, schema ? { schema } : undefined)

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
