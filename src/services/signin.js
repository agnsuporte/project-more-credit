import api from "./api";

const getSignin = async (username, password, pathURL) => {
  const URL = pathURL;
  const USERNAME = username;
  const PASSWORD = password;

  const result = await api
    .get(URL, {
      auth: {
        username: USERNAME,
        password: PASSWORD,
      },
    })
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => {
      console.log("@GnErr =--> ", err);
      return { err: 1, message: "Algo correu mal." };
    });

  return result;
};

export default getSignin;
