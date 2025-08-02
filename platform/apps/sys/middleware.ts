import { NextRequest } from 'next/server'

import { updateSession } from './lib/sb/middleware'

export default async function middleware(_req: NextRequest) {
  return updateSession(_req)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - assets (static assets)
     * - favicon.ico (favicon file)
     * - sw.js (service worker)
     * - site.webmanifest (web manifest)
     * - Static image files (.svg, .png, .jpg, .jpeg, .gif, .webp)
     */
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
