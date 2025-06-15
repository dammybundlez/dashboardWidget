// /app/api/login/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const client_id = process.env.SPOTIFY_CLIENT_ID!;
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI!;
  const scope = 'user-read-playback-state user-read-currently-playing';

  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(
    scope
  )}&redirect_uri=${encodeURIComponent(redirect_uri)}`;

  return NextResponse.redirect(authUrl);
}
