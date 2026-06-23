import Axios, { AxiosRequestConfig } from "axios";

const axios = Axios.create();

export const http = {
  get: async function get<Response = unknown>(
    url: string,
    option: AxiosRequestConfig = {},
  ) {
    const result = await axios.get<Response>(url, option);

    return result.data;
  },
};
