"use strict";

const { URL } = require("url");
const { httpsSend, makeConfigs } = require("../utils/send");

const DEFAULT_CONFIG = {
  test: false,
  debug: false,
};

async function sendEvent(host, path, eventName, userId, eventAttributes) {
  const eventData = {
    eventName,
    userId,
    eventAttributes,
  };

  const response = await httpsSend(
    "event",
    eventData,
    makeConfigs(host, path, "POST", eventData),
  );

  return response;
}

async function makeUser(host, path, userId, userAttributes) {
  const userData = {
    userId: userId,
    userAttributes,
  };

  const response = await httpsSend(
    "user",
    userData,
    makeConfigs(host, path, "POST", userData),
  );
  return response;
}

async function updateUser(host, path, userId, userAttributes) {
  const userData = {
    userId,
    userAttributes,
  };

  const response = await httpsSend(
    "user",
    userData,
    makeConfigs(host, path, "PATCH"),
  );

  return response;
}

function init(gatewayUrl, developerConfig) {
  // TODO; error handling for if `gateway` is missing. `gateway` is required.

  const url = new URL(gatewayUrl);
  const host = url.hostname;
  const path = url.pathname;

  const loafInstance = {
    config: { ...(DEFAULT_CONFIG || developerConfig) },
  };

  loafInstance.sendEvent = sendEvent.bind(null, host, `${path}/events`);
  loafInstance.makeUser = makeUser.bind(null, host, `${path}/users`);
  loafInstance.updateUser = updateUser.bind(null, host, `${path}/users`);
  return loafInstance;
}

module.exports = { init };
