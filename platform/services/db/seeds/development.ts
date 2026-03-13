import { prisma } from '@botfi/db'
import * as AccountFactory from '@botfi/db/factories/Account'
import * as UserFactory from '@botfi/db/factories/User'

const SEED_USERS = [
  { id: 'user_alice_001', name: 'Alice Johnson' },
  { id: 'user_bob_002', name: 'Bob Smith' },
  { id: 'user_charlie_003', name: 'Charlie Le' },
]

const main = async () => {
  try {
    console.log('Seeding database')
    await prisma.$connect()

    for (const attrs of SEED_USERS) {
      const user = await UserFactory.create(attrs)
      const account = await AccountFactory.create({ userId: user.id })
      console.log(`Created user ${user.name} (${user.id}) with account ${account.id}`)
    }

    for (let i = 0; i < 7; i++) {
      const user = await UserFactory.create()
      const account = await AccountFactory.create({ userId: user.id })
      console.log(`Created user ${user.name} (${user.id}) with account ${account.id}`)
    }

    console.log('Seeded 10 users with accounts')
    await prisma.$disconnect()
    console.log('Seeding database complete!')
  } catch (error) {
    console.error(error)
  }
}

main()
