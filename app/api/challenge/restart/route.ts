// app/api/challenge/restart/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { restartChallenge } from '@/lib/services/challengeService';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}
const secret = new TextEncoder().encode(JWT_SECRET);

async function getUserIdFromToken(request: Request): Promise<string | null> {
  const token = request.headers.get('authorization')?.split(' ')[1];
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload.userId as string;
  } catch (e) {
    return null;
  }
}

export async function POST(request: Request) {
  const userId = await getUserIdFromToken(request);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await restartChallenge(userId);
    return NextResponse.json({ message: 'Challenge restarted successfully' });
  } catch (error) {
    console.error('Restart challenge error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
