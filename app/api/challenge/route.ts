// app/api/challenge/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getChallengeState, startNewChallenge } from '@/lib/services/challengeService';
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
    const newChallenge = await startNewChallenge(userId);
    return NextResponse.json(newChallenge, { status: 201 });
  } catch (error: any) {
    if (error.message.includes('already exists')) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    console.error('Start challenge error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const userId = await getUserIdFromToken(request);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const challengeState = await getChallengeState(userId);
    if (!challengeState) {
      return NextResponse.json({ error: 'No active challenge found' }, { status: 404 });
    }
    return NextResponse.json(challengeState);
  } catch (error) {
    console.error('Get challenge state error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
