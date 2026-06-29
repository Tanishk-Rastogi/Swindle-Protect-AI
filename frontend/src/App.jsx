import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Alerts from "./pages/Alerts";
import ProtectedRoute from "./components/ProtectedRoute";
import Analytics from "./pages/Analytics";
import Register from "./pages/Register";



function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transactions"

          element={
            <ProtectedRoute>

              <Transactions />

            </ProtectedRoute>
          }
        />

        <Route
          path="/alerts"

          element={
            <ProtectedRoute>

              <Alerts />

            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"

          element={
            <ProtectedRoute>

              <Analytics />

            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;