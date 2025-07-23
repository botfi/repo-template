import { faker } from '@faker-js/faker'
import { prisma, User } from '@botfi/db'

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
  const data = attributes(attrs)
  return await prisma.user.create({
    data,
  })
}
