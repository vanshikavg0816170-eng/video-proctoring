import React, { useState } from "react";

const ReportsTest = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchReports = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${process.env.React_App_Backend_Url}/api/reports`); 
      // 🔥 change to your deployed backend URL when testing on Render
      const data = await res.json();

      if (data.success) {
        setReports(data.reports);
      } else {
        setError(data.message || "Failed to fetch reports");
      }
    } catch (err) {
      setError("Error fetching reports: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Reports API Test</h2>
      <button 
        onClick={fetchReports} 
        style={{
          padding: "10px 20px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Fetch Reports
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {reports.length > 0 && (
        <ul style={{ marginTop: "20px" }}>
          {reports.map((r) => (
            <li key={r.id || r._id}>
              <strong>{r.title || "Untitled"}</strong> - {r.status || "No status"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReportsTest;
