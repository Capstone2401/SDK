"use strict";

const https = require('https');

function send(data, requestConfigs) {
  const data = JSON.stringify(data);

  const req = https.request(requestConfigs, (response) => {
    let responseData = '';
    response.on('data', () => responseData += chunk);
    response.on('end', () => console.log('Response body: ', responseData));
  });

  req.on('error', (err) => console.error('Error: ', err));
  req.write(data);
  req.end();
}

module.exports = send;