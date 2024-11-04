import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Database } from './types/supabase'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Get the pathname of the request (e.g. /, /protected)
  const pathname = req.nextUrl.pathname

  // Check if the user is authenticated
  if (session) {
    // If the user is authenticated and the pathname is /login, redirect to /overview
    if (pathname === '/login') {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/overview'
      return NextResponse.redirect(redirectUrl)
    }
  } else {
    // If the user is not authenticated and the pathname is not /login, redirect to /login
    if (pathname !== '/login') {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/login'
      return NextResponse.redirect(redirectUrl)
    }
  }

  return res
}