import { api } from "../config";

const authSignin = async (email?: string, password?: string) => {
  try {
    const response = await api({
      method: "post",
      url: "/user/auth",
      data: {
        email,
        password,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const authSignup = async (email: string, password: string) => {
  try {
    const response = await api({
      method: "POST",
      url: "/user/create",
      data: {
        email,
        password,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export { authSignin, authSignup };
