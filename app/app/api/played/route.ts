import { type NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const request = await req.json() as NextRequest;

  try {
    const response = await fetch(`${process.env.NEXT_BACKEND_URL}/log`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error('Response not OK 😭');
    }

    const message = await response.json() as NextResponse;
    console.log(message);

    return NextResponse.json({ message:'OK', status: 200 });
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message, status: 500 });
  }
}
