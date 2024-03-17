"use strict";

function addDefaultEvents() {} // TODO; determine default event attributes from loaf, if any.

function bundle(attributes) {
  return JSON.stringify(attributes);
}

module.exports.attributes = {
  addDefaultEvents,
  bundle,
}