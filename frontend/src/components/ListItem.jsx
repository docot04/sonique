import React from "react";
import { FaSpotify, FaYoutube } from "react-icons/fa"; // FontAwesome icons
import "./components.scss";

export default function ListItem({
  title = "Song Title...",
  artist = "Song Artist...",
  cover,
  link1,
  link2,
}) {
  return (
    <div className="list-item">
      <img src={cover} alt={title} className="list-item__cover" />

      <div className="list-item__info">
        <div className="list-item__title">{title}</div>
        <div className="list-item__artist">{artist}</div>
      </div>

      <div className="list-item__actions">
        <a
          href={link1}
          target="_blank"
          rel="noopener noreferrer"
          className="btn spotify"
        >
          <FaSpotify className="icon" />
        </a>
        <a
          href={link2}
          target="_blank"
          rel="noopener noreferrer"
          className="btn youtube"
        >
          <FaYoutube className="icon" />
        </a>
      </div>
    </div>
  );
}
