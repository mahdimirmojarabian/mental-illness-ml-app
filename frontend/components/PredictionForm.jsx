// import 'react-toastify/dist/ReactToastify.css';

// import { useState } from 'react';
// import axios from 'axios';

// export default function PredictionForm() {
//   const [schizophrenia, setSchizophrenia] = useState('');
//   const [depression, setDepression] = useState('');
//   const [anxiety, setAnxiety] = useState('');
//   const [bipolar, setBipolar] = useState('');
//   const [predictionResult, setPredictionResult] = useState(null);
//   const [error, setError] = useState(null);

//   const handlePredict = (e) => {
//     e.preventDefault();
//     setError(null);

//     const payload = {
//       schizophrenia: parseFloat(schizophrenia),
//       depression: parseFloat(depression),
//       anxiety: parseFloat(anxiety),
//       bipolar: parseFloat(bipolar)
//     };

//     axios.post('http://localhost:8000/predict', payload, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//       }
//     })
//     .then((response) => {
//       setPredictionResult(response.data.prediction);
//     })
//     .catch((err) => {
//       console.error(err);
//       setError(err.response?.data?.detail || "Prediction failed");
//     });
//   };

//   return (
//     <form onSubmit={handlePredict}>
//       <input type="number" step="0.01" value={schizophrenia} onChange={(e)=>setSchizophrenia(e.target.value)} required />
//       <input type="number" step="0.01" value={depression} onChange={(e)=>setDepression(e.target.value)} required />
//       <input type="number" step="0.01" value={anxiety} onChange={(e)=>setAnxiety(e.target.value)} required />
//       <input type="number" step="0.01" value={bipolar} onChange={(e)=>setBipolar(e.target.value)} required />
//       <button type="submit">Predict</button>

//       {error && <div>{error}</div>}
//       {predictionResult && <div>Result: {predictionResult}</div>}
//     </form>
//   );
// }


import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PredictionForm() {
  const [schizophrenia, setSchizophrenia] = useState('');
  const [depression, setDepression] = useState('');
  const [anxiety, setAnxiety] = useState('');
  const [bipolar, setBipolar] = useState('');
  const [predictionResult, setPredictionResult] = useState(null);
  const [error, setError] = useState(null);

  const handlePredict = (e) => {
    e.preventDefault();
    setError(null);

    axios.post('http://localhost:8000/predict', {
      schizophrenia: parseFloat(schizophrenia),
      depression: parseFloat(depression),
      anxiety: parseFloat(anxiety),
      bipolar: parseFloat(bipolar)
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((response) => {
      console.log("Prediction Response:", response.data);
      setPredictionResult(response.data.prediction);
    })
    .catch((err) => {
      console.error("Error in prediction:", err.message);
      if (err.response) {
        const errorData = err.response.data.detail;
        if (Array.isArray(errorData)) {
          const formattedError = errorData.map((errObj) => errObj.msg).join(", ");
          setError(formattedError);
        } else {
          setError(errorData || "Prediction failed.");
        }
      } else {
        setError("Server not reachable. Check backend is running.");
      }
    });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Predict Eating Disorders</h2>
      <p>Below are the average values for each disorder for your reference:</p>
      <ul>
        <li><strong>Schizophrenia disorders (Avg: 0.266)</strong></li>
        <li><strong>Depressive disorders (Avg: 3.767)</strong></li>
        <li><strong>Anxiety disorders (Avg: 4.102)</strong></li>
        <li><strong>Bipolar disorders (Avg: 0.637)</strong></li>
        <li><strong>Eating disorders (Predicted, Avg: 0.195)</strong></li>
      </ul>

      <form onSubmit={handlePredict}>
        <div>
          <label>Schizophrenia Disorders:</label>
          <input
            type="number"
            step="0.01"
            placeholder="Enter schizophrenia value"
            value={schizophrenia}
            onChange={(e) => setSchizophrenia(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Depressive Disorders:</label>
          <input
            type="number"
            step="0.01"
            placeholder="Enter depression value"
            value={depression}
            onChange={(e) => setDepression(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Anxiety Disorders:</label>
          <input
            type="number"
            step="0.01"
            placeholder="Enter anxiety value"
            value={anxiety}
            onChange={(e) => setAnxiety(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Bipolar Disorders:</label>
          <input
            type="number"
            step="0.01"
            placeholder="Enter bipolar value"
            value={bipolar}
            onChange={(e) => setBipolar(e.target.value)}
            required
          />
        </div>

        <button type="submit" style={{ marginTop: '10px' }}>Predict</button>
      </form>

      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

      {predictionResult && (
        <div style={{ marginTop: '10px', color: 'green' }}>
          <strong>Predicted Eating Disorders Value:</strong> {predictionResult}
        </div>
      )}
    </div>
  );
}
