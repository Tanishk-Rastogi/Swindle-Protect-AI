import api from "./api";

export const getAnalytics = async () => {
  try {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await api.get(
        "/analytics",

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
          "Failed to fetch analytics",
      }
    );

  }
};