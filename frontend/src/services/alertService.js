import api from "./api";

export const getAlerts = async () => {
  try {
    const response =
      await api.get(
        "/alerts"
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
