import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Alerts from "./pages/Alerts";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/transactions"
          element={<Transactions />}
        />

        <Route
          path="/alerts"
          element={<Alerts />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;