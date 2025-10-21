import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '@pages/HomePage';
import LoginPage from '@pages/LoginPage';
import RegisterPage from '@pages/RegisterPage';
import DemoPage from '@pages/DemoPage';
import DashboardPage from '@pages/DashboardPage';
import CustomerMenuPage from '@pages/CustomerMenuPage';

function App() {
  return (
    <Router basename="/menucraft">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/menu/:restaurantId" element={<CustomerMenuPage />} />
      </Routes>
    </Router>
  );
}

export default App;