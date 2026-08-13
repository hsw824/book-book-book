import Axios, { AxiosRequestConfig } from 'axios';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return '';
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'http://localhost:3000';
};

const axios = Axios.create({ baseURL: getBaseUrl() });

export const http = {
  get: async function get<Response = unknown>(url: string, option: AxiosRequestConfig = {}) {
    const result = await axios.get<Response>(url, option);
    return result.data;
  },

  post: async function post<Request = unknown, Response = unknown>(url: string, data: Request) {
    const result = await axios.post<Response>(url, data);
    return result.data;
  },
  delete: async function remove(url: string) {
    await axios.delete(url);
  },
  put: async function put<Request = unknown, Response = unknown>(url: string, data: Request) {
    const result = await axios.put<Response>(url, data);
    return result.data;
  },
};
