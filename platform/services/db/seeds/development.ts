import { prisma } from '@botfi/db'
import * as AccountFactory from '@botfi/db/factories/Account'
import * as UserFactory from '@botfi/db/factories/User'

const main = async () => {
  try {
    console.log('Seeding database')
    await prisma.$connect()

    for (let i = 0; i < 5; i++) {
      const user = await UserFactory.create()
      const account = await AccountFactory.create({ userId: user.id })
      console.log(`Created user ${user.id} with account ${account.id}`)
    }

    await prisma.$disconnect()
    console.log('Seeding database complete!')
  } catch (error) {
    console.error(error)
  }
}

main()
