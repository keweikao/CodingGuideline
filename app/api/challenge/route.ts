// app/api/challenge/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getChallengeState, startNewChallenge } from '@/lib/services/challengeService';
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

    const newChallenge = await startNewChallenge(userId);
    return NextResponse.json(newChallenge, { status: 201 });
  } catch (error) {
    const err = error as Error & { name?: string };
    if (err.message.includes('already exists')) {
      return NextResponse.json({ error: err.message }, { status: 409 });
    }
    if (err.name === 'JWTExpired' || err.name === 'JWSInvalid') {
        return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }
    console.error('Start challenge error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
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

    const challengeState = await getChallengeState(userId);
    if (!challengeState) {
      return NextResponse.json({ error: 'No active challenge found' }, { status: 404 });
    }
    return NextResponse.json(challengeState);
  } catch (error) {
    const err = error as Error & { name?: string };
    console.error('Get challenge state error:', err);
    if (err.name === 'JWTExpired' || err.name === 'JWSInvalid') {
        return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
