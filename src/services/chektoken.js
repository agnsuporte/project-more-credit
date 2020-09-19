import api from "./api";

const getChekToken = async (token) => {
  const URL = "/api/v1/user/token";
  const result = await api
    .get(URL)
    .then((resp) => {
      if (resp.data.err) {
        return false;
      }
      return true;
    })
    .catch((err) => {
      console.log("@GnErr =--> ", err);
      return { err: 1, message: "[ChekToken] Algo correu mal." };
    });

  return result;
};

export default getChekToken;
