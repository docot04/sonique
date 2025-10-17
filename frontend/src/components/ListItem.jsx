import { FaSpotify, FaYoutube } from "react-icons/fa";

export default function ListItem({
  title = "Song Title...",
  artists = "Song Artist...",
  cover,
  spotify,
  youtube,
  loading = false,
}) {
  if (loading) {
    return (
      <div className="list-item loading">
        <div className="list-item__cover skeleton cover"></div>
        <div className="list-item__info">
          <div className="list-item__title skeleton title"></div>
          <div className="list-item__artists skeleton artists"></div>
        </div>
        <div className="list-item__actions">
          <div className="list-item__button skeleton button"></div>
          <div className="list-item__button skeleton button"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="list-item">
      <img src={cover} alt={title} className="list-item__cover" />
      <div className="list-item__info">
        <div className="list-item__title">{title}</div>
        <div className="list-item__artists">{artists}</div>
      </div>
      <div className="list-item__actions">
        <a
          href={`https://open.spotify.com/track/${spotify}`}
          target="_blank"
          rel="noopener noreferrer"
          className="list-item__button spotify"
        >
          <FaSpotify />
        </a>
        <a
          href={`https://www.youtube.com/watch?v=${youtube}`}
          target="_blank"
          rel="noopener noreferrer"
          className="list-item__button youtube"
        >
          <FaYoutube />
        </a>
      </div>
    </div>
  );
}
