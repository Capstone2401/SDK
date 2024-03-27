"use strict";

const { URL } = require('url');
const { httpsSend, makeConfigs } = require('../utils/send');

const DEFAULT_CONFIG = {
  test: false,
  debug: false,
};

function sendEvent(host, path, eventName, userId, eventAttributes) {
  // TODO; error handling for if `eventName` is missing. `eventName` is required.
  // TODO; DISCUSS - should userId be required? We can lump unassociated events under a 'default user'

  const eventData = JSON.stringify({
    event_name: eventName,
    user_id: userId,
    event_attributes: { ...eventAttributes }
  });

  httpsSend(eventData, makeConfigs(host, path, "POST", eventData.length));
}

function makeUser(endpoint, userId, userAttributes) {
  // TODO; error handling for if `userId` is missing. `userId` is required.

  const userData = JSON.stringify({
    user_id: userId,
    user_attributes: { ...userAttributes },
  });

  httpsSend(userData, makeConfigs(endpoint, userData.length));
}

function updateUser(host, path, userId, userAttributes) {
  // TODO; error handling for if `userId` is missing. `userId` is required.

  const userData = JSON.stringify({
    user_id: userId,
    user_attributes: { ...userAttributes },
  });

  httpsSend(userData, makeConfigs(host, path, "PATCH", userData.length));
}

function init(gatewayUrl, developerConfig) {
  // TODO; error handling for if `gateway` is missing. `gateway` is required.

  const url = new URL(gatewayUrl);
  const host = url.hostname;
  const path = url.pathname;

  const loafInstance = {
    config: { ...DEFAULT_CONFIG },
  };

  loafInstance.sendEvent = sendEvent.bind(null, host, `${path}/events`);
  loafInstance.makeUser = makeUser.bind(null, host, `${path}/users`);
  loafInstance.updateUser = updateUser.bind(null, host, `${path}/update-user`);
  return loafInstance;
}

module.exports = { init };