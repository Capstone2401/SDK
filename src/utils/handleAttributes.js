"use strict";

function defaultEventAttrs() {} // TODO; determine default event attributes from loaf, if any.
function defaultUserAttrs() {} // TODO; determine default user attributes from loaf, if any.

function bundle(attributes) {
  return JSON.stringify(attributes);
}

module.exports.attributes = {
  defaultEventAttrs,
  defaultUserAttrs,
  bundle,
}