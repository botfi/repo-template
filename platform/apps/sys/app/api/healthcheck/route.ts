import { env } from '@botfi/env'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'OK', env: env.NEXT_PUBLIC_ENV })
}
