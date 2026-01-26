import { AppConfig } from "@/application.config.js";
import axios from "axios";

export const ApiEndpoint = axios.create({
  baseURL: AppConfig.apiUrl,
  withCredentials: true,
});
