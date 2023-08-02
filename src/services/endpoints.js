import { BASEURL } from "../config/constants";

const ENDPOINTS = {
  AUTH: {
    LOGIN: BASEURL + "/auth/login",
    REFRESH: BASEURL + "/auth/refresh-token",
  },
};

export default ENDPOINTS;
