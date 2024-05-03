"use strict";

const axios = require("axios");
const processEvent = require("./process-event");
const processUser = require("./process-user");
const getTimeStamp = require("./get-timestamp");

async function put(category, data, requestConfigs) {
  try {
    let formatted;
    if (category === "event") {
      formatted = processEvent(data);
    } else if (category === "user") {
      formatted = processUser(data);
    } else {
      throw new Error("Invalid category specified");
    }

    const response = await axios.post(
      `https://${requestConfigs.host}${requestConfigs.path}`,
      formatted,
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function update(data, requestConfigs) {
  try {
    const formattedData = {
      user_id: data.userId,
      user_attributes: data.userAtttributes,
      user_created: getTimeStamp(),
    };

    const response = await axios.post(
      `https://${requestConfigs.host}${requestConfigs.path}`,
      formattedData,
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

function makeConfigs(host, path) {
  const requestConfigs = {
    host,
    path,
  };

  return requestConfigs;
}

module.exports = {
  put,
  update,
  makeConfigs,
};
