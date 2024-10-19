import { NextRequest, NextResponse } from 'next/server';
import log from '@/lib/logger';

export async function POST(request: NextRequest) {
  const { level, message, meta } = await request.json();

  if (!['error', 'warn', 'info', 'debug'].includes(level)) {
    return NextResponse.json({ error: 'Invalid log level' }, { status: 400 });
  }

  log[level as keyof typeof log](message, { ...meta, source: 'client' });

  return NextResponse.json({ success: true });
}