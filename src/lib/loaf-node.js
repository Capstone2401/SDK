"use strict";

const { send: httpsSend, makeConfigs } = require('../utils/send');
const { attributes } = require('../utils/handleAttributes');

const DEFAULT_CONFIG = {
  test: false,
  debug: false,
};

function sendEvent(endpoint, eventName, userId, eventAttributes) {
  // TODO; error handling for if `eventName` is missing. `eventName` is required.
  // TODO; DISCUSS - should userId be required? We can lump unassociated events under a 'default user'

  const eventData = JSON.stringify({
    event_name: eventName,
    user_id: userId,
    event_attributes: attributes.bundle(eventAttributes),
    // ...attributes.defaultEventAttrs(), TODO; default event attributes TBD
  });

  httpsSend(eventData, makeConfigs(endpoint, eventData.length));
}

function makeProfile(endpoint, userId, userAttributes) {
  // TODO; error handling for if `userId` is missing. `userId` is required.

  const userData = JSON.stringify({
    user_id: userId,
    user_attributes: attributes.bundle(userAttributes),
    // ...attributes.defaultUserAttrs(), TODO; default user attributes TBD
  });

  httpsSend(userData, makeConfigs(endpoint, userData.length));
}

function updateProfile() {}

function init(gateway, developerConfig) {
  // TODO; error handling for if `gateway` is missing. `gateway` is required.

  const loafInstance = {
    endpoint: gateway,
    config: { ...DEFAULT_CONFIG },
  };

  loafInstance.sendEvent = sendEvent.bind(null, `${loafInstance.endpoint}/events`);
  loafInstance.makeProfile = makeProfile.bind(null, `${loafInstance.endpoint}/users`);
  loafInstance.updateProfile = updateProfile;
  return loafInstance;
}

module.exports = { init };