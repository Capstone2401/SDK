"use strict";

const https = require('https');

// `data` is a JSON-stringified object.
function httpsSend(data, requestConfigs) {
  const req = https.request(requestConfigs, (response) => {
    let responseData = '';
    response.on('data', (chunk) => responseData += chunk);
    response.on('end', () => console.log('Response body: ', responseData));
  });

  req.on('error', (err) => console.error('Error: ', err));
  req.write(data);
  req.end();
}

function makeConfigs(host, path, method, dataLength) {
  const requestConfigs = {
    host, 
    path,
    method,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': dataLength,
    },
  };

  return requestConfigs
}

module.exports = {
  httpsSend,
  makeConfigs,
};