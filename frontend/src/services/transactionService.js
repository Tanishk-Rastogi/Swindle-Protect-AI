import api from "./api";

export const getTransactions = async () => {
  try {
    const response =
      await api.get(
        "/transactions"
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
  try {
    const response = await api.post(
      "/transactions",
      data
    );

    return response.data;

  } catch (error) {

    throw (
      error.response?.data ||

      {
        detail:
          "Failed to create transaction",
      }
    );

  }
};
