import { NextResponse, NextRequest } from 'next/server';

// get request
export async function GET(req, params) {
  try {
    return NextResponse.json({ fps: 15, frameCount: 50 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
