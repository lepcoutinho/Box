
import { sign } from "crypto";
import { NextResponse } from "next/server";


export async function GET(req) {

  const { searchParams } = new URL(req.url);

  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (!code || !state) {
    return NextResponse.redirect(
      "/#" + new URLSearchParams({ error: "state_mismatch" }).toString()
    );
  }
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = "http://192.168.1.12:3000/api/callback";

  const authOptions = new URLSearchParams({
    code: code,
    redirect_uri: redirect_uri,
    grant_type: "authorization_code",
  });

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
      body: authOptions,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Erro ao obter token");
    }

      const accessToken = data.access_token;

    return NextResponse.redirect(new URL(`/autentificado?token=${accessToken}`, req.url));
 
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}