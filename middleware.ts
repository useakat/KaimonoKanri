import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Only apply to /api routes
  if (!request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  // Skip authentication for development environment
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next()
  }

  // Skip authentication for internal API calls (proxy endpoints)
  if (request.nextUrl.pathname.startsWith('/api/proxy')) {
    return NextResponse.next()
  }

  // Get the origin of the request
  const origin = request.headers.get('origin') || ''
  const host = request.headers.get('host') || ''

  // Allow requests from the same origin
  if (origin === `https://${host}`) {
    return NextResponse.next()
  }

  const apiKey = request.headers.get('x-api-key')
  const validApiKey = process.env.API_KEY

  // If API key is missing or invalid
  if (!apiKey || apiKey !== validApiKey) {
    return NextResponse.json(
      { error: 'Unauthorized - Invalid API Key' },
      { status: 401 }
    )
  }

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: '/api/:path*',
}
