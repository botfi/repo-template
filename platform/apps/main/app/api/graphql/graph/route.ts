import { createHandler } from '@botfi/api/graph'
import type { NextRequest } from 'next/server'

const preprocess = async (req: NextRequest) => {
  const userSub = 'user-sub-123'

  return userSub
}

export async function GET(request: NextRequest) {
  const sub = await preprocess(request)
  if (!sub) {
    return new Response('Unauthorized', { status: 401 })
  }

  return createHandler(sub)(request)
}

export async function POST(request: NextRequest) {
  const sub = await preprocess(request)
  if (!sub) {
    return new Response('Unauthorized', { status: 401 })
  }

  return createHandler(sub)(request)
}
