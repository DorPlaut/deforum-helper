import { NextResponse, NextRequest } from 'next/server';

// get request
export async function GET(req, params) {
  try {
    return NextResponse.json({ Hello: 'world' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
// POST request - create a timeline
export async function POST(req) {
  try {
    const body = await req.json(); // res now contains body
    // console.log(body);
    const { fps, frameCount } = body;
    return NextResponse.json({ fps, frameCount });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
