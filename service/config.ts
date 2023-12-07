import axios from "axios";

// Set config defaults when creating the instance
export const api = axios.create({
  baseURL: process.env.API_URL,
});

// Alter defaults after instance has been created
// instance.defaults.headers.common["Authorization"] = AUTH_TOKEN;
