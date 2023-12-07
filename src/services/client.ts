import axios from "axios";

console.log(import.meta.env.VITE_BASEURL);

const proposerClient = axios.create({
  baseURL: import.meta.env.VITE_BASEURL + "/v1/proposer",
  headers: {
    "Content-Type": "application/json",
  },
});

export { proposerClient };
