// app/api/activities/[activityId]/complete/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { completeActivity } from '@/lib/services/challengeService';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}
const secret = new TextEncoder().encode(JWT_SECRET);

export async function PATCH(request: NextRequest) {
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

    const activityId = request.nextUrl.pathname.split('/').slice(-2, -1)[0];

    const updatedActivity = await completeActivity(userId, activityId);
    return NextResponse.json(updatedActivity);
  } catch (error) {
    const err = error as Error & { name?: string };
    console.error('Complete activity error:', err);
    if (err.message.includes('not found')) {
      return NextResponse.json({ error: err.message }, { status: 404 });
    }
    if (err.name === 'JWTExpired' || err.name === 'JWSInvalid') {
        return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
