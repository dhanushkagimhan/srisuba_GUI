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

const commonClient = axios.create({
  baseURL: import.meta.env.VITE_BASEURL + "/v1/c",
  headers: {
    "Content-Type": "application/json",
  },
});

const marketerClient = axios.create({
  baseURL: import.meta.env.VITE_BASEURL + "/v1/marketer",
  headers: {
    "Content-Type": "application/json",
  },
});

const useMarketerAuthClient = () => {
  const [cookies] = useCookies(["marketerJwt"]);

  return axios.create({
    baseURL: import.meta.env.VITE_BASEURL + "/v1/marketer/p",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.marketerJwt}`,
    },
  });
};

export {
  proposerClient,
  useProposerAuthClient,
  commonClient,
  marketerClient,
  useMarketerAuthClient,
};
