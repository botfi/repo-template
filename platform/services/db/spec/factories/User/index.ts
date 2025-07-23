import { prisma, User } from '@botfi/db'
import { faker } from '@faker-js/faker'

export const attributes = (attrs: Partial<User> = {}): User => {
  return {
    id: faker.string.uuid(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    name: faker.person.fullName(),
    ...attrs,
  }
}

export const build = (attrs: Partial<User> = {}): User => {
  return attributes(attrs)
}

export const create = async (attrs: Partial<User> = {}): Promise<User> => {
  const { id, ...restAttrs } = attrs
  const data = attributes(restAttrs)
  return await prisma.user.create({
    data: {
      ...data,
      id,
    },
  })
}
