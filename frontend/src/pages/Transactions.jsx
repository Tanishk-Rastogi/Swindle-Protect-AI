import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import MainLayout from "../layouts/MainLayout";
import { getTransactions, createTransaction} from "../services/transactionService";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [formData, setFormData] = useState({
    day_of_week: 1,
    hour: 12,
    amount: "",
    merchant: "",
    merchant_category: "",
    is_new_device: false,
    distance_from_home_km: "",
    is_international: false,
    txn_velocity_1h: "",
    account_age_days: "",
  });
  const [loading, setLoading] =useState(true);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
        ...prev,
        [name]:
          type === "checkbox"
            ? checked
            : value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await createTransaction(formData);

      setAnalysisResult(result);

      console.log(result);

      console.log(result);

      setShowForm(false);

      const updatedTransactions =
        await getTransactions();

      setTransactions(updatedTransactions);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchTransactions =
      async () => {
        setLoading(true);
        try {
          const data = await getTransactions();
          setTransactions(data);
        } 
        catch (err) {
          console.log(err);
        }
        setLoading(false);
      };
    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <Loading />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Transactions
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Transaction
        </button>
      </div>
      {analysisResult && (
        <div className="border rounded p-4 mb-6 bg-green-50">
          <h2 className="text-xl font-bold mb-3">
            Fraud Analysis Result
          </h2>

          <p>
            <strong>Rule Score:</strong>{" "}
            {analysisResult.rule_score}
          </p>

          <p>
            <strong>ML Prediction:</strong>{" "}
            {analysisResult.ml_prediction
              ? "Fraud"
              : "Legitimate"}
          </p>

          <p>
            <strong>ML Probability:</strong>{" "}
            {analysisResult.ml_probability}%
          </p>

          <p>
            <strong>Final Risk Score:</strong>{" "}
            {analysisResult.final_risk_score}
          </p>

          <p>
            <strong>Fraud Detected:</strong>{" "}
            {analysisResult.is_fraud
              ? "YES"
              : "NO"}
          </p>
        </div>
      )}
      {showForm && (
        
        <form
          onSubmit={handleSubmit}
          className="border p-4 mb-6 rounded bg-gray-50"
        >
          <h2 className="text-xl font-semibold mb-4">
            Add Transaction
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-4">

            <input
              type="text"
              name="merchant"
              placeholder="Merchant"
              value={formData.merchant}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <input
              type="text"
              name="merchant_category"
              placeholder="Merchant Category"
              value={formData.merchant_category}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <input
              type="number"
              name="day_of_week"
              placeholder="Day of Week (0-6)"
              value={formData.day_of_week}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <input
              type="number"
              name="hour"
              placeholder="Hour (0-23)"
              value={formData.hour}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <input
              type="number"
              name="distance_from_home_km"
              placeholder="Distance From Home (km)"
              value={formData.distance_from_home_km}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <input
              type="number"
              name="txn_velocity_1h"
              placeholder="Transactions in Last Hour"
              value={formData.txn_velocity_1h}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <input
              type="number"
              name="account_age_days"
              placeholder="Account Age (days)"
              value={formData.account_age_days}
              onChange={handleChange}
              className="border p-2 rounded"
            />

          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_new_device"
              checked={formData.is_new_device}
              onChange={handleChange}
            />
            <label>New Device</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_international"
              checked={formData.is_international}
              onChange={handleChange}
            />
            <label>International Transaction</label>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded mr-2"
          >
            Run Fraud Check
          </button>

          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
          >
            Close
          </button>
        </form>
)}
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">
                Merchant
              </th>
              <th className="p-3 text-left">
                Amount
              </th>
              <th className="p-3 text-left">
                Category
              </th>
              <th className="p-3 text-left">
                Risk
              </th>
              <th className="p-3 text-left">
                Fraud
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr
                key={txn.id}
                className="border-b"
              >
                <td className="p-3">
                  {txn.merchant}
                </td>
                <td className="p-3">
                  ₹{txn.amount}
                </td>
                <td className="p-3">
                  {txn.merchant_category}
                </td>
                <td className="p-3">
                  {txn.risk_score}
                </td>
                <td className="p-3">
                  {txn.is_fraud
                    ? "Yes"
                    : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}

export default Transactions;