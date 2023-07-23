import { NextResponse, NextRequest } from 'next/server';

export async function GET() {
  try {
    const response = {
      fps: 15,
      max_frames: 150,
      animation_mode: '3D',
      border: 'wrap',
      translation_x: '0:(0)',
      translation_y: '0:(0)',
      translation_z: '0:(0)',
      rotation_3d_x: '0:(0)',
      rotation_3d_y: '0:(0)',
      rotation_3d_z: '0:(0)',
    };

    const content = JSON.stringify(response, null, 2);
    const headers = {
      'Content-Disposition': 'attachment; filename="settings.txt"',
      'Content-Type': 'text/plain',
    };

    return new Response(content, { headers });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}

// POST request - Download setting as settings.txt file
export async function POST(req) {
  try {
    const response = await req.json();

    const content = JSON.stringify(response, null, 2);
    const headers = {
      'Content-Disposition': 'attachment; filename="settings.txt"',
      'Content-Type': 'text/plain',
    };

    return new Response(content, { headers });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
