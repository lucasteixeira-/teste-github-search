import Axios from "axios";

const url = "https://api.github.com/users";

// Consulta API de Login
export const apiGithub = Axios.create({
  baseURL: `${url}`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

