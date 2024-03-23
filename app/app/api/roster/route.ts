import { NextResponse } from 'next/server';

import type { Roster } from '@/interfaces/roster';

export async function GET() {
  try {
    const response = await fetch(`${process.env.backendUrl}/fighters`);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json() as Roster;

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message, status: 500 });
  }
}
