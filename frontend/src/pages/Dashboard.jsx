import { useEffect, useState } from "react";

import { getAnalytics } from "../services/analyticsService";

import MainLayout from "../layouts/MainLayout";

import Loading from "../components/Loading";

import ErrorMessage from "../components/ErrorMessage";

function Dashboard() {
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

    "Failed to load dashboard"
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

  return (
  <MainLayout>

    <h1 className="text-3xl font-bold mb-8">

      Dashboard

    </h1>

    <div className="grid grid-cols-2 gap-6">

      <div className="p-6 rounded-lg shadow bg-blue-100">

        <p>Total Transactions</p>

        <h2 className="text-3xl font-bold">

          {analytics.total_transactions}

        </h2>

      </div>

      <div className="p-6 rounded-lg shadow bg-green-100">

        <p>Total Amount</p>

        <h2 className="text-3xl font-bold">

          ₹{analytics.total_amount}

        </h2>

      </div>

      <div className="p-6 rounded-lg shadow bg-red-100">

        <p>Fraud Count</p>

        <h2 className="text-3xl font-bold">

          {analytics.fraud_count}

        </h2>

      </div>

      <div className="p-6 rounded-lg shadow bg-yellow-100">

        <p>Fraud Rate</p>

        <h2 className="text-3xl font-bold">

          {analytics.fraud_rate}%

        </h2>

      </div>

    </div>
<div className="mt-10 border rounded-lg p-6 shadow">

  <h2 className="text-2xl font-bold mb-6">

    Latest Transaction

  </h2>

  <div className="space-y-2">

    <p>

      <strong>Merchant:</strong>

      {" "}

      {analytics.latest_transaction?.merchant}

    </p>

    <p>

      <strong>Amount:</strong>

      {" "}

      ₹{analytics.latest_transaction?.amount}

    </p>

    <p>

      <strong>Category:</strong>

      {" "}

      {analytics.latest_transaction?.merchant_category}

    </p>

    <p>

      <strong>Risk Score:</strong>

      {" "}

      {analytics.latest_transaction?.risk_score}

    </p>

    <p>

      <strong>Fraud:</strong>

      {" "}

      {analytics.latest_transaction?.is_fraud

        ? "Yes"

        : "No"}

    </p>

  </div>

</div>
  </MainLayout>
);
}

export default Dashboard;