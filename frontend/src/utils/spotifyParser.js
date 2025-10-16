export async function getTracksInfo(trackIds = []) {
  if (trackIds.length === 0) return [];

  try {
    const SPOTIFY_CLIENT_ID = "c53313a4e7514b70a3811982d809c867";
    const SPOTIFY_CLIENT_SECRET = "fefe1454b1334dd69984cc634eb10df5";

    const tokenResp = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " + btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`),
      },
      body: "grant_type=client_credentials",
    });
    const tokenData = await tokenResp.json();
    const token = tokenData.access_token;

    const idsParam = trackIds.join(",");
    const resp = await fetch(
      `https://api.spotify.com/v1/tracks?ids=${idsParam}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await resp.json();

    return data.tracks.filter(Boolean).map((track) => ({
      title: track.name,
      artist: track.artists.map((a) => a.name).join(", "),
      cover: track.album.images[0]?.url,
      link1: track.external_urls.spotify,
      link2: ``,
    }));
  } catch (err) {
    console.error("Error fetching tracks:", err);
    return [];
  }
}
