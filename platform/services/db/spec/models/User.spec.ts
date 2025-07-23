import { describe, it, expect, beforeEach, afterAll } from 'vitest'
import { prisma } from '@botfi/db'

import * as UserFactory from '../factories/User'

// Clean up users table before each test
beforeEach(async () => {
  await prisma.user.deleteMany()
})

afterAll(async () => {
  await prisma.$disconnect()
})

describe('User model', () => {
  it('creates a user with the factory and fetches it from the database', async () => {
    const user = await UserFactory.create()
    const found = await prisma.user.findUnique({ where: { id: user.id } })
    expect(found).not.toBeNull()
    expect(found?.id).toBe(user.id)
    expect(found?.name).toBe(user.name)
    expect(found?.createdAt).instanceOf(Date)
    expect(found?.updatedAt).instanceOf(Date)
  })

  it('allows creating a user with a custom name', async () => {
    const customName = 'Test User'
    const user = await UserFactory.create({ name: customName })
    const found = await prisma.user.findUnique({ where: { id: user.id } })
    expect(found?.name).toBe(customName)
  })
})
