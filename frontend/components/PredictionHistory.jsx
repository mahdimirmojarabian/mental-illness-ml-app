import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PredictionHistory() {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/history', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => setHistory(res.data))
    .catch(err => setError(err.response?.data?.detail || "Unable to fetch history"));
  }, []);

  return (
    <div>
      <h2>Prediction History</h2>
      {error && <div>{error}</div>}
      {history.length === 0 ? "No predictions yet." :
        <ul>
          {history.map((item, idx) => (
            <li key={idx}>
              Features: {item.features} <br />
              Prediction: {item.result}
            </li>
          ))}
        </ul>
      }
    </div>
  );
}
