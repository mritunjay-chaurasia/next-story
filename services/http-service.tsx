import {
  getLocalStorageItem,
  removeLocalStorageItem,
} from "@/lib/localStorage";
import { createBackendUrl } from "@/utils/helpers";
import axios from "axios";

//axios request timout
const axiosClient = axios.create({
  timeout: 240000,
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  function (config) {
    const token = getLocalStorageItem("authToken");
    if (token) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const sendRequest = async (
  path: string,
  method = "GET",
  data = {},
  headers = null,
  contentType = "application/json"
) => {
  return new Promise((resolve, reject) => {
    //create request as per paramaters
    const params: any = {
      url: createBackendUrl(path),
      method,
      headers: {
        "Content-Type": contentType,
        ...(headers || {}),
      },
      params: {},
      data: {},
    };

    if (data !== null) {
      if (method == "GET") {
        params.params = data;
      } else if (["POST", "PATCH", "PUT"].includes(method)) {
        params.data = data;
      }
    }

    axiosClient(params)
      .then((response) => {
        return resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (
          error?.response?.status === 403 ||
          error?.response?.status === 401
        ) {
          removeLocalStorageItem("authToken");
          if (!window.location.href.includes("/login")) {
            window.location.replace("/login");
          }
        }
        return reject(error?.response?.data);
      });
  });
};
