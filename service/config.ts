import axios from "axios";

// Set config defaults when creating the instance
export const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Alter defaults after instance has been created
// instance.defaults.headers.common["Authorization"] = AUTH_TOKEN;
