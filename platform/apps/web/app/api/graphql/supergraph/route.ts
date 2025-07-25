import { createHandler } from '@botfi/api/supergraph'
import { getApiUrl, X_BOTFI_INTERNAL_API_KEY } from '@botfi/api/utils'
import { env } from '@botfi/env/web'
import { NextRequest } from 'next/server'

console.log(createHandler)

import supergraphJSON from './supergraph.json'

const preprocess = async (req: NextRequest) => {
  const userSub = 'user-sub-123'

  if (userSub) {
    req.headers.set(X_BOTFI_INTERNAL_API_KEY, env.INTERNAL_API_KEY)
  }
}

const supergraphSdl = supergraphJSON.data.core_schema
if (typeof supergraphSdl !== 'string' || supergraphSdl.length === 0) {
  throw new Error('Supergraph SDL not found')
}

const apiUrl = new URL(getApiUrl('supergraph'))

const { GET: getHandler, POST: postHandler } = createHandler(apiUrl.pathname, supergraphSdl)

export const GET = async (req: NextRequest) => {
  await preprocess(req)

  try {
    return getHandler(req)
  } catch (error) {
    console.error(error)
    return new Response('Internal Server Error', { status: 500 })
  }
}

export const POST = async (req: NextRequest) => {
  await preprocess(req)

  try {
    return postHandler(req)
  } catch (error) {
    console.error(error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
