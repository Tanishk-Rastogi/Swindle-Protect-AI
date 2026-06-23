import api from "./api";

export const loginUser = async (
  credentials
) => {
  try {

    const response =
      await api.post(
        "/auth/login",
        credentials
      );

    return response.data;

  } catch (error) {

    throw (
      error.response?.data ||

      {
        detail: "Login failed",
      }
    );
  }
};