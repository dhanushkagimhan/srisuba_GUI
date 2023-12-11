import axios from "axios";
import { useCookies } from "react-cookie";

const proposerClient = axios.create({
  baseURL: import.meta.env.VITE_BASEURL + "/v1/proposer",
  headers: {
    "Content-Type": "application/json",
  },
});

const useProposerAuthClient = () => {
  const [cookies] = useCookies(["proposerJwt"]);

  return axios.create({
    baseURL: import.meta.env.VITE_BASEURL + "/v1/proposer/p",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.proposerJwt}`,
    },
  });
};

export { proposerClient, useProposerAuthClient };
