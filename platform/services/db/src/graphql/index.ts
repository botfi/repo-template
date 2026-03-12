/* eslint-disable */
import type { PothosPrismaDatamodel } from '@pothos/plugin-prisma'
import type {
  Account,
  Prisma,
  User,
} from '/workspace/platform/node_modules/.pnpm/@prisma+client@7.5.0_prisma@7.5.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__r_91089ffd60048d4eaa65cb128d7b1531/node_modules/@prisma/client/index.js'
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
export function getDatamodel(): PothosPrismaDatamodel {
  return JSON.parse(
    '{"datamodel":{"models":{"User":{"fields":[{"type":"String","kind":"scalar","name":"id","isRequired":true,"isList":false,"hasDefaultValue":true,"isUnique":false,"isId":true,"isUpdatedAt":false},{"type":"DateTime","kind":"scalar","name":"createdAt","isRequired":true,"isList":false,"hasDefaultValue":true,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"DateTime","kind":"scalar","name":"updatedAt","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":true},{"type":"String","kind":"scalar","name":"name","isRequired":false,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"Account","kind":"object","name":"accounts","isRequired":true,"isList":true,"hasDefaultValue":false,"isUnique":false,"isId":false,"relationName":"AccountToUser","relationFromFields":[],"isUpdatedAt":false}],"primaryKey":null,"uniqueIndexes":[]},"Account":{"fields":[{"type":"String","kind":"scalar","name":"id","isRequired":true,"isList":false,"hasDefaultValue":true,"isUnique":false,"isId":true,"isUpdatedAt":false},{"type":"DateTime","kind":"scalar","name":"createdAt","isRequired":true,"isList":false,"hasDefaultValue":true,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"DateTime","kind":"scalar","name":"updatedAt","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":true},{"type":"String","kind":"scalar","name":"userId","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"User","kind":"object","name":"user","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"relationName":"AccountToUser","relationFromFields":["userId"],"isUpdatedAt":false}],"primaryKey":null,"uniqueIndexes":[]}}}}',
  )
}
