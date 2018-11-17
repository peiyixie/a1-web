import axios from "axios";
export const httpClientInstance = axios.create({
  baseURL: "http://localhost:8080/A1-war/webresources/"
});
