"use strict";

const https = require('https');

// `data` is a JSON-stringified object.
function send(data, requestConfigs) {
  const req = https.request(requestConfigs, (response) => {
    let responseData = '';
    response.on('data', () => responseData += chunk);
    response.on('end', () => console.log('Response body: ', responseData));
  });

  req.on('error', (err) => console.error('Error: ', err));
  req.write(data);
  req.end();
}

function makeConfigs(endpoint, dataLength) {
  const requestConfigs = {
    host: endpoint,
    method: 'POST',
    protocol: 'https',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': dataLength,
    },
  };

  return requestConfigs
}

module.exports = {
  send,
  makeConfigs,
};