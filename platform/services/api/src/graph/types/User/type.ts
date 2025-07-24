import { builder } from '../../builder'

export const User = builder.prismaObject('User', {
  name: 'User',
  fields: (t) => ({
    id: t.exposeID('id'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
    name: t.exposeString('name', { nullable: true }),
  }),
})
