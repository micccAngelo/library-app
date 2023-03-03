import BaseURL from '../API/BaseURL'

export const LoginAPI = async (email, password) => {
  try {
    const response = await BaseURL.post(
      `/perpustakaan/api/v1/user/login`,
      { email, password }
    );
    return response.data.data;
  } catch (error) {
    throw new Error('Invalid email or password');
  }
};

export default LoginAPI;