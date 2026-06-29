import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { Link } from "react-router-dom";


function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    setLoading(true);

    try {
      const data =
        await loginUser(form);

      console.log(data);

      localStorage.setItem(
        "token",
        data.access_token
      );

      navigate("/dashboard");

    } catch (err) {

      setError(
        err.detail ||
        "Invalid credentials"
      );

    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleSubmit}

        className="w-96 p-8 border rounded-lg shadow-lg"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        {error && (
          <p className="text-red-500 mb-4">
            {error}
          </p>
        )}

        <input
          type="text"

          name="username"

          placeholder="Username"

          value={form.username}

          onChange={handleChange}

          className="w-full border p-3 mb-4 rounded"
        />

        <input
          type="password"

          name="password"

          placeholder="Password"

          value={form.password}

          onChange={handleChange}

          className="w-full border p-3 mb-6 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </form>

    </div>
  );
}


export default Login;
