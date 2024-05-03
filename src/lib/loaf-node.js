"use strict";

const { URL } = require("url");
const { put, update, makeConfigs } = require("../utils/send");

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

  const response = await put(
    "event",
    eventData,
    makeConfigs(host, path, "POST", eventData),
  );

  return response;
}

async function makeUser(host, path, userId, userAttributes) {
  const userData = {
    userId,
    userAttributes,
  };

  const response = await put(
    "user",
    userData,
    makeConfigs(host, path, userData),
  );

  return response;
}

async function updateUser(host, path, userId, userAttributes) {
  const userData = {
    userId,
    userAttributes,
  };

  const response = await update(userData, makeConfigs(host, path));
  return response;
}

function init(gatewayUrl, developerConfig) {
  const url = new URL(gatewayUrl);
  const host = url.hostname;
  const path = url.pathname;

  const loafInstance = {
    config: { ...(DEFAULT_CONFIG || developerConfig) },
  };

  loafInstance.sendEvent = sendEvent.bind(null, host, `${path}/events`);
  loafInstance.makeUser = makeUser.bind(null, host, `${path}/users`);
  loafInstance.updateUser = updateUser.bind(null, host, `${path}/update_users`);
  return loafInstance;
}

module.exports = { init };
