import api from "./api";

export const loginUser = async (credentials) => {
  try {
    const formData = new URLSearchParams();

    formData.append(
      "username",
      credentials.username
    );

    formData.append(
      "password",
      credentials.password
    );

    const response = await api.post(
      "/auth/login",
      formData,

      {
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
      }
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