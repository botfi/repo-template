import { prisma } from '@botfi/db'
import { GraphQLError } from 'graphql'

import { builder } from '../../../builder'
import { User } from '../type'

export const meQuery = builder.queryField('me', (t) =>
  t.field({
    type: User,
    // authenticated: true,
    resolve: async (_, __, { sub }) => {
      const user = await prisma.user.findUnique({ where: { id: sub } })
      if (!user) {
        throw new GraphQLError('User not found', {
          extensions: {
            code: 'NOT_FOUND',
          },
        })
      }
      return user
    },
  }),
)
