// app/api/activities/[activityId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { updateActivityDescription } from '@/lib/services/challengeService';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}
const secret = new TextEncoder().encode(JWT_SECRET);

export async function PUT(request: NextRequest) {
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

    const activityId = request.nextUrl.pathname.split('/').pop() || '';

    const { description } = await request.json();
    if (!description) {
      return NextResponse.json({ error: 'Description is required' }, { status: 400 });
    }

    const updatedActivity = await updateActivityDescription(userId, activityId, description);
    return NextResponse.json(updatedActivity);
  } catch (error: any) {
    console.error('Update activity error:', error);
    if (error.message.includes('not found')) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    if (error.name === 'JWTExpired' || error.name === 'JWSInvalid') {
        return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
