import { useState } from "react";
import api from "../services/api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/register", form);
      alert("Registration successful!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center">
    <form
      onSubmit={handleSubmit}
      className="w-96 p-8 border rounded-lg shadow-lg"
    >
      <h1 className="text-3xl font-bold mb-6 text-center">
        Register
      </h1>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="w-full border p-3 mb-4 rounded"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
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
        className="w-full bg-blue-600 text-white p-3 rounded"
      >
        Register
      </button>
    </form>
  </div>
);
}