import api from "./api";
import { getToken } from "./auth";

const getChekToken = async () => {
  // ---
  const token = getToken();
  let result = { err: 0, message: "[ChekToken] No has Token" };

  if (token) {
    // ---
    result = await api
      .get("/api/v1/user/token")
      .then((resp) => {
        if (resp.data.err) {
          return { err: 1, message: resp.data.message };
        }
        return { err: 0, message: "[ChekToken] Validated Token" };
      })
      .catch((err) => {
        console.log("@GnErr =--> ", err);
        return { err: 1, message: "[ChekToken] Algo correu mal." };
      });
  }

  return result;
};

export default getChekToken;
