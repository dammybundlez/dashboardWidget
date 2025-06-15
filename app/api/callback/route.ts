// /app/api/callback/route.ts
import { NextResponse } from 'next/server';
import querystring from 'querystring';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI!;
  const client_id = process.env.SPOTIFY_CLIENT_ID!;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;

  if (!code) {
    return NextResponse.json({ error: 'Missing code' }, { status: 400 });
  }

  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
      code,
      redirect_uri,
      grant_type: 'authorization_code',
    }),
  });

  const tokenData = await tokenRes.json();

  if (tokenData.access_token) {
    return NextResponse.redirect(
      `http://127.0.0.1:3000/spotify?access_token=${tokenData.access_token}`
    );
  } else {
    return NextResponse.json({ error: 'Failed to get token', details: tokenData });
  }
}
