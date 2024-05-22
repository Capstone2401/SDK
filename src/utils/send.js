"use strict";

import axios from "axios";
import processEvent from "./process-event.js";
import processUser from "./process-user.js";
import getTimeStamp from "./get-timestamp.js";
import stringifyObject from "./process-attributes.js";

async function post(category, data, requestConfigs) {
  try {
    let formatted;
    if (category === "event") {
      formatted = processEvent(data);
    } else if (category === "user") {
      formatted = processUser(data);
    } else {
      return new Error("Invalid category specified");
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

async function patch(data, requestConfigs) {
  try {
    const formattedData = {
      user_id: data.userId,
      user_attributes: stringifyObject(data.userAttributes),
      user_created: getTimeStamp(),
    };

    const response = await axios.post(
      `https://${requestConfigs.host}${requestConfigs.path}`,
      JSON.stringify(formattedData),
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

export { post, patch, makeConfigs };
