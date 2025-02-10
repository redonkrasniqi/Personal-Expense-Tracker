import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./authentication/AuthPage";
import Dashboard from "./dashboard/Dashboard";
import Navbar from "./dashboard/Navbar";
import AuthWrapper from "./authentication/AuthWrapper";
import { useAuth } from "./authentication/AuthContext";
import "antd/dist/reset.css";

const App = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/login" element={<AuthPage />} />
        <Route
          path="/dashboard"
          element={
            <AuthWrapper>
              <>
                <Navbar />
                <Dashboard />
              </>
            </AuthWrapper>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
