import api from "./api";

export const getTransactions = async () => {
  try {
    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await api.get(
        "/transactions",

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;

  } catch (error) {

    throw (
      error.response?.data ||

      {
        detail:
          "Failed to fetch transactions",
      }
    );

  }
};

export const createTransaction = async (data) => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    "/transactions",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};