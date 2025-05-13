import PredictionHistory from '../components/PredictionHistory';
import ProtectedRoute from '../components/ProtectedRoute';

export default function HistoryPage() {
  return (
    <ProtectedRoute>
      <PredictionHistory />
    </ProtectedRoute>
  );
}
