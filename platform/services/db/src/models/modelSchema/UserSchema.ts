import { z } from 'zod'

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string().nullish(),
})

export type User = z.infer<typeof UserSchema>

export default UserSchema
