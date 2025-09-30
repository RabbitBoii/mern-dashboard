import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";


export async function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/login' || path === 'signup';

    const token = request.cookies.get('token')?.value || "";

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }


    if (!isPublicPath && token) {
        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
            await jwtVerify(token, secret);
            return NextResponse.next();
        }
        catch (error) {
            console.error("JWT verification error", error);
            const response = NextResponse.redirect(new URL('/login', request.nextUrl));
            response.cookies.delete("token");
            return response
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};