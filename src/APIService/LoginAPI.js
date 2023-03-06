import BaseURL from '../API/BaseURL';

export const LoginAPI = async (email, password) => {
  try {
    const response = await BaseURL.post('/perpustakaan/api/v1/user/login', { email, password });
    const { data } = response;
    if (data.status && data.message === 'Success') {
      return data.data;
    } else {
      return Promise.resolve();
    }
  } catch (error) {
    console.log(error);
    return Promise.resolve();
  }
};

export default LoginAPI;
