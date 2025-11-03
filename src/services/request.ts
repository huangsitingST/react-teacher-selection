import axios from "axios";
import host from "./host.json";
import { history } from "umi";
import userState, { IUserState } from "@/models/userState";
import { getLocalInfo } from "@/utils/syncLocal";

const request = axios.create({
  baseURL: host.TEACHER_AWARDS,
  timeout: 10000,
});

request.interceptors.request.use((config) => {
  const localUser: IUserState = getLocalInfo(userState.namespace, {});
  try {
    if (localUser.user.token) {
      (config.headers || (config.headers = {} as any))["auth-token"] =
        `${localUser.user.token}`;
    }
  } catch {
    history.push("/");
  }
  return config;
});

request.interceptors.response.use((response) => {
  const { status, data } = response;
  return data;
});

export default request;
