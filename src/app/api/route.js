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
