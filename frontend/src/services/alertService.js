import api from "./api";

export const getAlerts = async () => {
  try {
    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await api.get(
        "/alerts",

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
          "Failed to fetch alerts",
      }
    );

  }
};