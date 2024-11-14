import { NextResponse } from "next/server";

// Define the matcher configuration for middleware
export const config = {
    matcher: [
        '/profile/:path*',
        '/updateprofile/:path*',
        '/latestnews/:path*',
        '/talktous/:path*',
        '/chatai/:path*',
        '/auth/login',
        '/auth/signup',
        '/auth/password-reset',
        '/'
    ],
};

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // Access the access token from cookies
    const accessToken = request.cookies.get('accessToken');

    // Log values for debugging
    // console.log("Pathname:", pathname);
    // console.log("Access Token:", accessToken);

    if (accessToken) {
        // If authenticated, redirect away from public routes
        if (pathname.startsWith('/auth') || pathname === '/') {
            return NextResponse.redirect(new URL('/profile', request.url));
        }
    } else {
        // If not authenticated, redirect protected routes to login
        if (pathname.startsWith('/profile') || pathname.startsWith('/updateprofile') || 
            pathname.startsWith('/latestnews') || pathname.startsWith('/talktous') || 
            pathname.startsWith('/chatai')) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
    }

    return NextResponse.next();
}