import { useEffect, useState } from "react";

import Loading from "../components/Loading";

import MainLayout from "../layouts/MainLayout";

import { getTransactions } from "../services/transactionService";

function Transactions() {

  const [transactions, setTransactions] =
  useState([]);

const [loading, setLoading] =
  useState(true);

  useEffect(() => {

    const fetchTransactions =
      async () => {
        setLoading(true);
        try {

          const data =
            await getTransactions();

          setTransactions(data);

        } catch (err) {

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

      <h1 className="text-3xl font-bold mb-8">

        Transactions

      </h1>

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