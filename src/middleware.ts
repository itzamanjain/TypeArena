import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    // Redirect to the home page if the user is not authenticated

    const path = request.nextUrl.pathname

    const isPublicPath = path === '/login' || path === '/signup' || path === '/playground' || path === '/lobby' || path === '/leaderboard' || path === '/'

    const token = request.cookies.get('token')?.value || ''

    if (token && isPublicPath) {
        return NextResponse.redirect(new URL('/profile', request.url))
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }






  //return NextResponse.redirect(new URL('/home', request.url))

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/signup',
    '/login',
    '/profile',

  ]
}