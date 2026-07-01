import api from "./api";

export const getAnalytics = async () => {
  try {
    const response =
      await api.get(
        "/analytics"
      );

    return response.data;

  } catch (error) {

    throw (
      error.response?.data ||

      {
        detail:
          "Failed to fetch analytics",
      }
    );

  }
};
