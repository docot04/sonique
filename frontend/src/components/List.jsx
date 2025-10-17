import { useState } from "react";
import { FaSyncAlt, FaSort } from "react-icons/fa";
import ListItemCollapsed from "./ListItemCollapsed";

export default function List() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/dashboard");
      const json = await res.json();

      const mappedData = json.data.map((item) => ({
        spotify: item.spotify_ID,
        youtube: item.youtube_ID,
        entries: item.entry_count,
      }));

      setData(mappedData);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setLoading(false);
    }
  };

  const handleSort = (field) => {
    setSortBy(field);
    setSortOpen(false);

    const sortedData = [...data].sort((a, b) => {
      if (field === "entries") return b.entries - a.entries;
      return a[field].localeCompare(b[field]);
    });

    setData(sortedData);
  };

  return (
    <div className="list-container">
      <div className="list-header">
        <h2>Database ({loading ? "..." : data.length})</h2>
        <div className="header-buttons">
          <div className="sort-dropdown">
            <button className="sort-btn" onClick={() => setSortOpen(!sortOpen)}>
              <FaSort />
            </button>
            {sortOpen && (
              <div className="sort-options">
                <div onClick={() => handleSort("spotify")}>Spotify ID</div>
                <div onClick={() => handleSort("youtube")}>YouTube ID</div>
                <div onClick={() => handleSort("entries")}>Entries</div>
              </div>
            )}
          </div>

          <button
            className={`refresh-btn ${loading ? "loading" : ""}`}
            onClick={fetchData}
            disabled={loading}
          >
            <FaSyncAlt className="refresh-icon" />
          </button>
        </div>
      </div>

      <div className="list-scroll">
        {loading
          ? Array.from({ length: 5 }).map((_, idx) => (
              <ListItemCollapsed
                key={idx}
                spotify="..."
                youtube="..."
                entries="..."
              />
            ))
          : data.map((item) => (
              <ListItemCollapsed
                key={item.spotify} // use unique spotify ID as key
                {...item}
              />
            ))}
      </div>
    </div>
  );
}
