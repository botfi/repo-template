import { z } from 'zod'

export const UserScalarFieldEnumSchema = z.enum(['id', 'createdAt', 'updatedAt', 'name'])

export default UserScalarFieldEnumSchema
