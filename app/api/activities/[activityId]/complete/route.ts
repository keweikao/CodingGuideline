// app/api/activities/[activityId]/complete/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { completeActivity } from '@/lib/services/challengeService';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}
const secret = new TextEncoder().encode(JWT_SECRET);

async function getUserIdFromToken(request: NextRequest): Promise<string | null> {
  const token = request.headers.get('authorization')?.split(' ')[1];
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload.userId as string;
  } catch (e) {
    return null;
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { activityId: string } }
) {
  const userId = await getUserIdFromToken(request);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const updatedActivity = await completeActivity(userId, params.activityId);
    return NextResponse.json(updatedActivity);
  } catch (error: any) {
    console.error('Complete activity error:', error);
    if (error.message.includes('not found')) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
