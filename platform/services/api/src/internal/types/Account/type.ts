import { builder } from '../../builder'

export const Account = builder.prismaObject('Account', {
  name: 'Account',
  fields: (t) => ({
    id: t.exposeID('id'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
    user: t.relation('user'),
  }),
})
