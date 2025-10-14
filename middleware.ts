// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('Please define the JWT_SECRET environment variable inside .env');
}

const secret = new TextEncoder().encode(JWT_SECRET);

export async function middleware(req: NextRequest) {
  const token = req.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    return new NextResponse(
      JSON.stringify({ error: 'Authentication token required' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    // You can add the payload to the request headers if you want to access it in the API route
    // const requestHeaders = new Headers(req.headers);
    // requestHeaders.set('x-user-id', payload.userId as string);
    // return NextResponse.next({ request: { headers: requestHeaders } });
    return NextResponse.next();
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ error: 'Invalid or expired token' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/api/challenge/:path*', '/api/users/me'],
};
