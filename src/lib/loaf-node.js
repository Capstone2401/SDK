"use strict";

const httpsSend = require('../utils/send');
const { attributes } = require('../utils/handleAttributes');

const DEFAULT_CONFIG = {
  test: false,
  debug: false,
};

function sendEvent(endpoint, eventName, userId, eventAttributes) {
  // TODO; error handling for if `eventName` is missing. `eventName` is required.
  // TODO; error handling for if `userId` is missing. `userId` is required.

  const eventData = JSON.stringify({
    event_name: eventName,
    user_id: userId,
    // ...attributes.addDefaultEvents(), TODO; default event attributes TBD
    event_attributes: attributes.bundle(eventAttributes),
  });

  const requestConfigs = {
    host: endpoint,
    method: 'POST',
    protocol: 'https',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': eventData.length,
    },
  };

  httpsSend(eventData, requestConfigs);
}

function makeProfile() {}

function updateProfile() {}

function init(gateway, developerConfig) {
  // TODO; error handling for if `gateway` is missing. `gateway` is required.
  
  const loafInstance = {
    endpoint: gateway,
    config: { ...DEFAULT_CONFIG },
  };

  loafInstance.sendEvent = sendEvent.bind(null, loafInstance.endpoint);
  loafInstance.makeProfile = makeProfile;
  loafInstance.updateProfile = updateProfile;
  return loafInstance;
}

module.exports = { init };