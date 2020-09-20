import api from "./api";

const getProposal = async (pathURL) => {
  const URL = pathURL;

  const result = await api
    .get(URL)
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => {
      console.log("@GnErr =--> ", err);
      return { err: 1, message: "Algo correu mal." };
    });

  return result;
};

export default getProposal;
