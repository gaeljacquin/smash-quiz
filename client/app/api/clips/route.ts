import { NextResponse } from 'next/server';

import type { Clip } from '@/interfaces/clip';

export async function GET() {
  try {
    const response = await fetch(`${process.env.backendUrl}/clips/all`);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json() as Clip[];

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message, status: 500 });
  }
}
