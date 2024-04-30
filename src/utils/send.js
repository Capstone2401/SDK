"use strict";

const axios = require("axios");
const processEvent = require("./process-event");
const processUser = require("./process-user");

async function httpsSend(category, data, requestConfigs) {
  try {
    let formatted;
    if (category === "event") {
      formatted = processEvent(data);
    } else if (category === "user") {
      formatted = processUser(data);
    } else {
      throw new Error("Invalid category specified");
    }

    // TODO
    // Currently, we are sending data that only kinesis can parse
    // Lambda requires different format
    const response = await post(
      `https://${requestConfigs.host}${requestConfigs.path}`,
      formatted,
    );

    return response.data;
  } catch (error) {
    return error;
  }
}

function makeConfigs(host, path, method) {
  const requestConfigs = {
    host,
    path,
    method,
  };

  return requestConfigs;
}

module.exports = {
  httpsSend,
  makeConfigs,
};
