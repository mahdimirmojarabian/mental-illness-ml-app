import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Navbar() {
  const [username, setUsername] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:8000/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("User Data:", response.data);
        setUsername(response.data.username);
      })
      .catch((err) => {
        console.log("Error:", err.response.data.detail);
        router.push('/login');
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div style={{ backgroundColor: '#0070f3', padding: '10px 20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', color: 'white' }}>
      <h2>Mental Health Predictor</h2>
      <div>
        {username && <span style={{ marginRight: '15px' }}>Hello, {username}</span>}
        <Link href="/">Home</Link>
        <Link href="/predict" style={{ marginLeft: '15px' }}>Predict</Link>
        <Link href="/history" style={{ marginLeft: '15px' }}>History</Link>
        {username ? (
          <button style={{ marginLeft: '15px' }} onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link href="/login" style={{ marginLeft: '15px' }}>Login</Link>
            <Link href="/register" style={{ marginLeft: '15px' }}>Register</Link>
          </>
        )}
      </div>
    </div>
  );
}
