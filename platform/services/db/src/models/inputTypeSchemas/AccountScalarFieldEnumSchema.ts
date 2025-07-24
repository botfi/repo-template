import { z } from 'zod'

export const AccountScalarFieldEnumSchema = z.enum(['id', 'createdAt', 'updatedAt', 'userId'])

export default AccountScalarFieldEnumSchema
