import axios from "axios";
const userConfigJSON = require("../Constants/User.Config");
const configJSON = require("../Constants/Config");

export const addUserRegisterApi = async (addUserData: any) => {
  const response = await axios({
    method: configJSON.POST,
    url: `${
      configJSON.baseURL +
      userConfigJSON.userEndPoint +
      userConfigJSON.addUserEndPoint
    }`,
    data: JSON.stringify(addUserData),
    headers: configJSON.apiContentType,
  });
  return response.data;
};
