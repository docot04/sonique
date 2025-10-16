import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import { getTracksInfo } from "../utils/spotifyParser";

export default function List({ songIDs = [] }) {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTracks() {
      setLoading(true);
      try {
        const results = await getTracksInfo(songIDs);
        setTracks(results);
      } catch (err) {
        console.error("Error fetching tracks:", err);
      } finally {
        setLoading(false);
      }
    }

    if (songIDs.length > 0) fetchTracks();
    else setLoading(false);
  }, [songIDs]);

  if (loading) return <div>Loading songs...</div>;
  if (tracks.length === 0) return <div>No songs found.</div>;

  return (
    <div className="list">
      {tracks.map((track, index) => (
        <ListItem
          key={index}
          title={track.title}
          artist={track.artist}
          cover={track.cover}
          link1={track.link1}
          link2={track.link2}
        />
      ))}
    </div>
  );
}
