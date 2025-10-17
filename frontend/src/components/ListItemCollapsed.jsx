import React, { useState } from "react";
import ListItem from "./ListItem";
import {
  FaSpotify,
  FaYoutube,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

export default function ListItemCollapsed({ spotify, youtube, entries }) {
  const [expanded, setExpanded] = useState(false);
  const [songData, setSongData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleExpand = async () => {
    setExpanded(true);

    if (!songData) {
      setLoading(true);
      setSongData({});

      try {
        const res = await fetch("/api/dashboard", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ spotify_id: spotify }),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setSongData({
          title: data.title,
          artists: data.artists,
          cover: data.cover,
          spotify: data.spotify_ID,
          youtube: data.youtube_ID,
        });
      } catch (err) {
        console.error("Error fetching song:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCollapse = () => {
    setExpanded(false);
  };

  return (
    <div className={`list-item-collapsed ${expanded ? "expanded" : ""}`}>
      <div className="collapsed-view">
        <div className="collapsed-info">
          <a
            className="collapsed-icon-container"
            href={`https://open.spotify.com/track/${spotify}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaSpotify className="collapsed-icon" />
            {spotify}
          </a>
          <a
            className="collapsed-icon-container"
            href={`https://www.youtube.com/watch?v=${youtube}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className="collapsed-icon" />
            {youtube}
          </a>
          <span>{entries} Hashes</span>
        </div>

        <button
          className="expand-btn"
          onClick={expanded ? handleCollapse : handleExpand}
        >
          {expanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>

      {expanded && (
        <div className="expanded-view">
          <ListItem {...songData} loading={loading} />
        </div>
      )}
    </div>
  );
}
