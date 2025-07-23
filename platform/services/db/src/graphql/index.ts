/* eslint-disable */
import type {
  Account,
  Prisma,
  User,
} from '/workspace/platform/node_modules/.pnpm/@prisma+client@6.12.0_prisma@6.12.0_typescript@5.8.3__typescript@5.8.3/node_modules/@prisma/client/index.js'
export default interface PrismaTypes {
  User: {
    Name: 'User'
    Shape: User
    Include: Prisma.UserInclude
    Select: Prisma.UserSelect
    OrderBy: Prisma.UserOrderByWithRelationInput
    WhereUnique: Prisma.UserWhereUniqueInput
    Where: Prisma.UserWhereInput
    Create: {}
    Update: {}
    RelationName: 'accounts'
    ListRelations: 'accounts'
    Relations: {
      accounts: {
        Shape: Account[]
        Name: 'Account'
        Nullable: false
      }
    }
  }
  Account: {
    Name: 'Account'
    Shape: Account
    Include: Prisma.AccountInclude
    Select: Prisma.AccountSelect
    OrderBy: Prisma.AccountOrderByWithRelationInput
    WhereUnique: Prisma.AccountWhereUniqueInput
    Where: Prisma.AccountWhereInput
    Create: {}
    Update: {}
    RelationName: 'user'
    ListRelations: never
    Relations: {
      user: {
        Shape: User
        Name: 'User'
        Nullable: false
      }
    }
  }
}
