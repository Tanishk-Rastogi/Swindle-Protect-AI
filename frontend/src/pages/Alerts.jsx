import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";
import ErrorMessage from "../components/ErrorMessage";

import { getAlerts } from "../services/alertService";

function Alerts() {

  const [alerts, setAlerts] =
    useState([]);
  const [error, setError] =
    useState("");

  useEffect(() => {

    const fetchAlerts =
      async () => {

        try {

          const data =
            await getAlerts();

          setAlerts(data);

        } catch (err) {

          setError(
            err.detail ||
            "Failed to load alerts"
          );

        }

      };

    fetchAlerts();

  }, []);

  return (

    <MainLayout>

      <h1 className="text-3xl font-bold mb-8">

        Alerts

      </h1>

      {error && (
        <ErrorMessage
          message={error}
        />
      )}

      <div className="overflow-x-auto">

        <table className="w-full border">

          <thead>

            <tr className="border-b">

              <th className="p-3 text-left">

                Severity

              </th>

              <th className="p-3 text-left">

                Message

              </th>

              <th className="p-3 text-left">

                Status

              </th>

              <th className="p-3 text-left">

                Created At

              </th>

            </tr>

          </thead>

          <tbody>

            {alerts.map((alert) => (

              <tr
                key={alert.id}

                className="border-b"
              >

                <td className="p-3">

                  {alert.severity}

                </td>

                <td className="p-3">

                  {alert.message}

                </td>

                <td className="p-3">

                  {alert.status}

                </td>

                <td className="p-3">

                  {alert.created_at}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </MainLayout>

  );
}

export default Alerts;
