import BaseURL from '../API/BaseURL';

export const LoginAPI = async (email, password) => {
  try {
    const response = await BaseURL.post('/perpustakaan/api/v1/user/login', { email, password });
    const { data } = response;
    if (data.status && data.code === 200) {
      return data.data;
    } else {
      throw new Error(data.message || "Failed to login");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to login");
  }
};

export default LoginAPI;
