import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../constants/api";
import "./ChatInterface.css"; // For custom responsive styles
import Divider from "./ui/Divider";

function ChatInterface() {
  const [code, setCode] = useState("");
  const [domain, setDomain] = useState("");
  const [level, setLevel] = useState("");
  const [responseMessage, setResponseMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // data
  const [milestones, setMilestones] = useState([]);
  const [domains, setDomains] = useState([]);

  useEffect(() => {
    fetchMilestoneCodes();
    fetchDomains();
  }, []);

  const fetchMilestoneCodes = () => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/milestone/milestones`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.milestoneCodes);
        setMilestones(data.milestoneCodes);
        setError("");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Error while loading milestone codes.");
        setLoading(false);
      });
  };

  const fetchDomains = () => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/milestone/domains`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.domains);
        setDomains(data.domains);
        setError("");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Error while loading domains.");
        setLoading(false);
      });
  };

  const handleCodeChange = (event) => setCode(event.target.value);
  const handleDomainChange = (event) => setDomain(event.target.value);
  const handleLevelChange = (event) => setLevel(event.target.value);

  const handleSubmitMilestone = async () => {
    if (!code) return setError("Please enter a milestone code.");
    setLoading(true);
    setError("");
    setResponseMessage(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chatbot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: code }),
      });
      if (!response.ok) throw new Error("Network response was not ok.");
      const data = await response.json();
      if (data.reply) setResponseMessage(data.reply);
    } catch (error) {
      setError("Failed to fetch milestone. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitDomain = async () => {
    if (!domain || !level) return setError("Please select a domain and level.");
    setLoading(true);
    setError("");
    setResponseMessage(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chatbot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: `Domain: ${domain}, Level: ${level}` }),
      });
      if (!response.ok) throw new Error("Network response was not ok.");
      const data = await response.json();
      if (data.reply) setResponseMessage(data.reply);
    } catch (error) {
      setError("Failed to fetch domain information. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        <h2 className="heading">Look Milestone via Code</h2>

        <div className="input-section">
          <select
            value={code}
            onChange={handleCodeChange}
            disabled={loading}
            className="chat-select"
          >
            <option value="">Select Code</option>
            {milestones?.map((item, ind) => (
              <option key={ind} value={item}>
                {item}
              </option>
            ))}
          </select>
          <button onClick={handleSubmitMilestone} disabled={loading}>
            Lookup Milestone
          </button>
        </div>

        <Divider>OR</Divider>

        <h2 className="heading"> Look Milestone via Domain and level</h2>

        <div className="input-section">
          <select
            value={domain}
            onChange={handleDomainChange}
            disabled={loading}
            className="chat-select"
          >
            <option value="">Select Domain</option>
            {domains?.map((item, ind) => (
              <option key={ind} value={item}>
                {item}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Level"
            value={level}
            onChange={handleLevelChange}
            disabled={loading}
            className="chat-input"
          />
          <button onClick={handleSubmitDomain} disabled={loading}>
            List Domain
          </button>
        </div>

        {loading && <p>Loading...</p>}
        {responseMessage && (
          <p className="response-message">{responseMessage}</p>
        )}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default ChatInterface;
