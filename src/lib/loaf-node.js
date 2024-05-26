"use strict";

import { URL } from "url";
import { post, patch, makeConfigs } from "../utils/send.js";

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

  const response = await post("event", eventData, makeConfigs(host, path));

  return response;
}

async function makeUser(host, path, userId, userAttributes) {
  const userData = {
    userId,
    userAttributes,
  };

  const response = await post("user", userData, makeConfigs(host, path));
  return response;
}

async function updateUser(host, path, userId, userAttributes) {
  const userData = {
    userId,
    userAttributes,
  };

  const response = await patch(userData, makeConfigs(host, path));
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

export default { init };
