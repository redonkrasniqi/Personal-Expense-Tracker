import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './authentication/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import AuthPage from "./authentication/AuthPage";
import Dashboard from "./dashboard/Dashboard";
import Navbar from "./dashboard/Navbar";
import "antd/dist/reset.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Dashboard />
                </>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
