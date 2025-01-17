import axios from 'axios';

const API_ENDPOINT = `${process.env.REACT_APP_BACKEND_ENDPOINT}`;

axios.interceptors.request.use(
  (config) => config,
  (error) => {
    const req = error.request;
    // eslint-disable-next-line no-console
    console.error(`The server doesn't seem to be responding: ${req}`);
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const res = error.response;
    if (res.status === 401) {
      window.location.href = '/login';
    }
    // eslint-disable-next-line no-console
    console.error(`Looks like there was a problem. Status Code: ${res.status}`);
    return Promise.reject(error);
  },
);

export const getData = async (path) => {
  const response = await axios.get(`${API_ENDPOINT}/${path}`);
  return response.data;
};

export const postData = async (path, data) => {
  const response = await axios.post(`${API_ENDPOINT}/${path}`, data);
  return response.data;
};

export const putData = async (path, data) => {
  const response = await axios.put(`${API_ENDPOINT}/${path}`, data);
  return response.data;
};

export const deleteData = async (path, data) => {
  const response = await axios.delete(`${API_ENDPOINT}/${path}`, data);
  return response.data;
};
