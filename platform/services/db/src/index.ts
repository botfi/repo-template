import { env } from '@botfi/env'
import { PrismaClient } from '@prisma/client'

const _prisma = new PrismaClient({
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
