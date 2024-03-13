import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_IMAGE_PATH + '/v1709157376/hero-image.png');

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch image' }, { status: response.status });
    }

    return new Response(response.body, {
      status: response.status,
      headers: response.headers,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
