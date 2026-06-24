import { NavLink, useNavigate } from "react-router-dom";

function MainLayout({ children }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <div className="flex min-h-screen">

      <aside className="w-64 border-r p-6">

        <h1 className="text-2xl font-bold mb-10">

          Swindle-Protect AI

        </h1>

        <nav className="flex flex-col gap-4">

        <NavLink
        to="/dashboard"

        className={({ isActive }) =>

            `p-3 rounded ${
            isActive
            ? "bg-blue-600 text-white"
            : "hover:bg-gray-100"
            }`
        }
        >
        Dashboard
        </NavLink>

          <NavLink
  to="/transactions"

  className={({ isActive }) =>

    `p-3 rounded ${
      isActive
      ? "bg-blue-600 text-white"
      : "hover:bg-gray-100"
    }`
  }
>
  Transactions
</NavLink>

          <NavLink
  to="/alerts"

  className={({ isActive }) =>

    `p-3 rounded ${
      isActive
      ? "bg-blue-600 text-white"
      : "hover:bg-gray-100"
    }`
  }
>
  Alerts
</NavLink>
          <NavLink
  to="/analytics"

  className={({ isActive }) =>

    `p-3 rounded ${
      isActive
      ? "bg-blue-600 text-white"
      : "hover:bg-gray-100"
    }`
  }
>
  Analytics
</NavLink>
        <button
            onClick={logout}

            className="mt-8 p-3 rounded text-left hover:bg-red-100"
            >
            Logout
        </button>

        </nav>

      </aside>

      <main className="flex-1 p-8">

        {children}

      </main>

    </div>
  );
}

export default MainLayout;