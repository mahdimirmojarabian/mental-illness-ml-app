import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login', {
        username,
        password
      });

      // ✅ Save the Token to localStorage
      localStorage.setItem('token', response.data.access_token);

      // ✅ Set the Authorization Header for Future Requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;

      router.push('/predict');  // Redirect to Predict Page
    } catch (error) {
      alert("Login failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}
