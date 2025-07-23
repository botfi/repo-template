import { faker } from '@faker-js/faker'
import { Account, prisma } from '@botfi/db'

import { build as buildUser } from '@botfi/db/factories/User'

export const attributes = (attrs: Partial<Account> = {}): Account => {
  const { userId: providedUserId, ...rest } = attrs
  const userId = providedUserId ?? faker.string.uuid()

  return {
    id: faker.string.uuid(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    userId,
    ...rest,
  }
}

export const build = (attrs: Partial<Account> = {}): Account => {
  return attributes(attrs)
}

export const create = async (attrs: Partial<Account> = {}): Promise<Account> => {
  const { userId, ...data } = attributes(attrs)

  return await prisma.account.create({
    data: {
      ...data,
      user: {
        connectOrCreate: {
          where: { id: userId },
          create: buildUser({ id: userId }),
        },
      },
    },
  })
}
