import api from "./api";

// store our JWT in LS and set axios headers if we do have a token

const setAuthToken = (token: any) => {
  if (token) {
    api.defaults.headers.common["x-auth-token"] = token;
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
  } else {
    delete api.defaults.headers.common["x-auth-token"];
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  }
};

export default setAuthToken;
