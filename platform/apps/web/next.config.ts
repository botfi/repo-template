import { env } from '@botfi/env/web'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@botfi/ui', '@botfi/api'],
  allowedDevOrigins: [new URL(env.NEXT_PUBLIC_URL_WEB).hostname],
}

export default nextConfig
