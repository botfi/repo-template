import { Account, prisma } from '@botfi/db'
import { faker } from '@faker-js/faker'

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
  const { id, ...restAttrs } = attrs
  const { userId, ...data } = attributes(restAttrs)

  return await prisma.account.create({
    data: {
      ...data,
      id,
      user: {
        connectOrCreate: {
          where: { id: userId },
          create: buildUser({ id: userId }),
        },
      },
    },
  })
}
