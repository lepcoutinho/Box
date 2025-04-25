import { NextResponse } from 'next/server';
import querystring from 'querystring';

export async function GET() {
  console.log('teste')
  const client_id = process.env.SPOTIFY_CLIENT_ID; // Defina no .env.local
  const redirect_uri = 'http://192.168.1.12:3000/api/callback';

  function generateRandomString(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  const state = generateRandomString(16);
  const scope = 'user-read-playback-state';

  const url =
    'https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    });

  return NextResponse.redirect(url);
}