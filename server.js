const https = require('https')
const axios = require('axios')
const cors = require ('cors')
const bodyParser = require('body-parser')
const express = require('express')
const port = 8080;
const hostname = '127.0.0.1';

const SUBSCRIPTION_KEY = 'd63424db11b04940ba83755bdcbec0f4'

if (!SUBSCRIPTION_KEY) {
  throw new Error('Missing the AZURE_SUBSCRIPTION_KEY environment variable')
}
function bingWebSearch() {

    const customConfigId = '19f0eef1-48b1-4512-b791-1cbb318e2b38'
    const searchTerm = 'car'

  https.get({
    
    hostname: 'api.bing.microsoft.com',
    path:     '/v7.0/custom/search?' + 'q=' + searchTerm + '&' + 'customconfig=' +customConfigId,
    headers:  { 'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY },
  }, res => {
    let body = ''
    res.on('data', part => body += part)
    res.on('end', () => {
      for (var header in res.headers) {
        if (header.startsWith("bingapis-") || header.startsWith("x-msedge-")) {
          console.log(header + ": " + res.headers[header])
        }
      }
      console.log('\nJSON Response:\n')
      console.dir(JSON.parse(body), { colors: false, depth: null })
    })
    res.on('error', e => {
      console.log('Error: ' + e.message)
      throw e
    })
  })
}
const query = process.argv[2] || 'Microsoft Cognitive Services'
bingWebSearch(query)

var app = https.createServer(function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.end(
       JSON.stringify({
          answerType: "John",
          resultIndex: "Doe",
          value: "id",

       }) );
 });

 const data = {
    answerType: "John",
    resultIndex: "Doe",
    value: "id",
};

axios.post('/search', data)
    .then((res) => {
        console.log(`Status: ${res.status}`);
        console.log('Body: ', res.data);
    }).catch((err) => {
        console.error(err);
    });

app.listen(port, hostname)