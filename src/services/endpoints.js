import { BASEURL } from "../config/constants";

const ENDPOINTS = {
  AUTH: {
    LOGIN: BASEURL + "/auth/login",
    REFRESH: BASEURL + "/auth/refresh",
  },
  USER: {
    POST: BASEURL + "/db/users",
    GET: BASEURL + "/db/users",
    PATCH: BASEURL + "/db/users/",
  },
};

export default ENDPOINTS;
