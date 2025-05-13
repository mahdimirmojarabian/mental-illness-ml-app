import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div>
      <Navbar />
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Welcome to Mental Health Predictor</h1>
        <p>Predict mental health disorder risks based on key features.</p>
      </div>
    </div>
  );
}
