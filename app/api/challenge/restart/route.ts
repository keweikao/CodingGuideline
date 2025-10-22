// app/api/challenge/restart/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { restartChallenge } from '@/lib/services/challengeService';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}
const secret = new TextEncoder().encode(JWT_SECRET);

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Authentication token required' }, { status: 401 });
    }
    const { payload } = await jwtVerify(token, secret);
    const userId = payload.userId as string;
    if (!userId) {
      return NextResponse.json({ error: 'Invalid token payload' }, { status: 401 });
    }

    await restartChallenge(userId);
    return NextResponse.json({ message: 'Challenge restarted successfully' });
  } catch (error) {
    const err = error as Error & { name?: string };
    console.error('Restart challenge error:', err);
    if (err.name === 'JWTExpired' || err.name === 'JWSInvalid') {
        return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
