import { useState } from "react";

export default function ProcessTracks() {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const addEntry = () => setEntries([...entries, { type: "song", id: "" }]);
  const removeEntry = (index) =>
    setEntries(entries.filter((_, i) => i !== index));
  const updateEntry = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    setEntries(newEntries);
  };

  // extract just the ID from Spotify link or leave as is
  const extractId = (value) => {
    const match = value.match(/spotify\.com\/(?:track|album)\/([a-zA-Z0-9]+)/);
    return match ? match[1] : value.trim();
  };

  const handleProcess = async () => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const song_ids = entries
        .filter((e) => e.type === "song" && e.id.trim() !== "")
        .map((e) => extractId(e.id));

      const album_ids = entries
        .filter((e) => e.type === "album" && e.id.trim() !== "")
        .map((e) => extractId(e.id));

      if (song_ids.length === 0 && album_ids.length === 0) {
        setError("Please add at least one song or album ID.");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/load", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ track_ids: song_ids, album_ids: album_ids }),
      });

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();
      setResult(data);
      setOverlayOpen(false); // optionally close overlay
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="process-tracks">
      <button className="process-btn" onClick={() => setOverlayOpen(true)}>
        Process Tracks
      </button>

      {overlayOpen && (
        <div className="overlay">
          <div className="overlay-content">
            <h3>Process Tracks/Albums</h3>

            <div className="entries-container">
              {entries.map((entry, idx) => (
                <div className="entry" key={idx}>
                  <div className="radio-group">
                    <label>
                      <input
                        type="radio"
                        name={`type-${idx}`}
                        value="song"
                        checked={entry.type === "song"}
                        onChange={() => updateEntry(idx, "type", "song")}
                      />
                      Song
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`type-${idx}`}
                        value="album"
                        checked={entry.type === "album"}
                        onChange={() => updateEntry(idx, "type", "album")}
                      />
                      Album
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter ID or link"
                    value={entry.id}
                    onChange={(e) => updateEntry(idx, "id", e.target.value)}
                  />
                  <button
                    className="remove-btn"
                    onClick={() => removeEntry(idx)}
                  >
                    -
                  </button>
                </div>
              ))}
            </div>

            <button className="add-btn" onClick={addEntry}>
              + Add Entry
            </button>

            <div className="overlay-actions">
              <button
                className="process-btn"
                onClick={handleProcess}
                disabled={loading}
              >
                {loading ? "Processing..." : "Process"}
              </button>
              <button
                className="cancel-btn"
                onClick={() => setOverlayOpen(false)}
              >
                Cancel
              </button>
            </div>

            {error && <div className="error">{error}</div>}
            {result && (
              <div className="result">
                <pre>{JSON.stringify(result, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
