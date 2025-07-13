import { jwtDecode } from "jwt-decode";

export const decodeToken = () => {
  let encodedToken = localStorage.getItem("TOKEN");
  let DecodedToken = jwtDecode(encodedToken);
  return DecodedToken;
};
