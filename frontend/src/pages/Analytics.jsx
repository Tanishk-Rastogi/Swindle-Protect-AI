import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";

import { getAnalytics } from "../services/analyticsService";

import {
  BarChart,

  Bar,

  XAxis,

  YAxis,

  Tooltip,

  CartesianGrid,

  ResponsiveContainer,

} from "recharts";

function Analytics() {

  const [analytics, setAnalytics] =
    useState(null);
  const [error, setError] =
    useState("");

  useEffect(() => {

    const fetchAnalytics =
      async () => {

        try {

          const data =
            await getAnalytics();

          setAnalytics(data);

        } catch (err) {

          setError(
            err.detail ||
            "Failed to load analytics"
          );

        }

      };

    fetchAnalytics();

  }, []);

  if (error) {

    return (
      <MainLayout>

        <ErrorMessage
          message={error}
        />

      </MainLayout>
    );

  }

  if (!analytics) {

    return (
      <MainLayout>

        <Loading />

      </MainLayout>
    );

  }

  const chartData = [

    {
      name: "Transactions",

      value:
        analytics.total_transactions,
    },

    {
      name: "Frauds",

      value:
        analytics.fraud_count,
    },

  ];

  return (

    <MainLayout>

      <h1 className="text-3xl font-bold mb-8">

        Analytics

      </h1>

      <div className="h-96">

        <ResponsiveContainer
          width="100%"

          height="100%"
        >

          <BarChart
            data={chartData}
          >

            <CartesianGrid />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="value" />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </MainLayout>

  );
}

export default Analytics;
