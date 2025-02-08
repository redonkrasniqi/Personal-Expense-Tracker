import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./authentication/AuthPage";
import Dashboard from "./dashboard/Dashboard";
import Navbar from "./dashboard/Navbar";
import AuthWrapper from "./authentication/AuthWrapper";
import { AuthProvider } from "./authentication/AuthContext";
import "antd/dist/reset.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route
            path="/dashboard"
            element={
              <AuthWrapper>
                <Dashboard />
              </AuthWrapper>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
