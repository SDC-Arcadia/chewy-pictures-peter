// const newrelic = require('newrelic');
const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const axios = require('axios');
const proxy = require('express-http-proxy');
require('dotenv').config();

const app = express();
const { LOADBALANCERPORT } = process.env;

app.use(cors());
app.use(compression());
app.use(express.json({ extended: true }));
app.use(express.urlencoded());
app.use(express.static(path.resolve(__dirname, '../public')));

const loadBalanceConfig = {
  activeServerAddresses: [
    'http://172.31.15.254:3004',
    'http://172.31.7.56:3004',
    'http://172.31.4.62:3004',
  ],
  nextServerUpIndex: 0,
};

// database ip address: 172.31.2.96

const roundRobinIncrement = function roundRobinIncrement() {
  const { activeServerAddresses, nextServerUpIndex } = loadBalanceConfig;
  // This line of code should cycle through the active server address
  loadBalanceConfig.nextServerUpIndex = (nextServerUpIndex + 1) % activeServerAddresses.length;
};

// round robin gets
app.get('/photos/:productId', async (req, res) => {
  const { productId } = req.params;
  const { activeServerAddresses, nextServerUpIndex } = loadBalanceConfig;
  const serverAddress = activeServerAddresses[nextServerUpIndex];
  console.log(serverAddress);

  roundRobinIncrement();

  try {
    const result = await axios.get(`${serverAddress}/photos/${productId}`);
    const { data } = result;
    res.status(200).send(data);
    res.end();
  } catch (error) {
    res.status(404);
    res.send(error);
    res.end();
  }
});

app.patch('/photos/:productId/:pictureId', async (req, res) => {
  const { productId, pictureId } = req.params;
  const { activeServerAddresses, nextServerUpIndex } = loadBalanceConfig;
  const serverAddress = activeServerAddresses[nextServerUpIndex];
  console.log(serverAddress);

  roundRobinIncrement();

  try {
    const result = await axios.patch(`${serverAddress}/photos/${productId}/${pictureId}`, req.body);
    const { data } = result;
    res.status(200).send(data);
    res.end();
  } catch (error) {
    res.status(404);
    res.send(error);
    res.end();
  }
});

// app.post('/photos/:productId', createProductPictures);
// app.delete('/photos/:productId/:pictureId', deleteProductPicture);

app.use('/photos', proxy(loadBalanceConfig.activeServerAddresses[loadBalanceConfig.nextServerUpIndex], {
  proxyReqPathResolver: function proxyReq(req) {
    const url = loadBalanceConfig.activeServerAddresses[loadBalanceConfig.nextServerUpIndex];
    roundRobinIncrement();
    const parts = req.url.split('/');
    const productId = parts[1];
    const pictureId = parts[2];

    // console.log(parts);

    if (productId === undefined || productId === 0) {
      return `${url}/photos/1`;
    }
    if (pictureId === undefined) {
      return `${url}/photos/${productId}`;
    }
    return `${url}/photos/${productId}/${pictureId}`;
  },
}));

// review image crud endpoints
// Picture Service Proxy Here (Port 3001)
app.use('/review-photos', proxy(loadBalanceConfig.activeServerAddresses[loadBalanceConfig.nextServerUpIndex], {
  proxyReqPathResolver: function proxyReq(req) {
    const url = loadBalanceConfig.activeServerAddresses[loadBalanceConfig.nextServerUpIndex];
    roundRobinIncrement();
    const parts = req.url.split('/');
    const productId = parts[1];
    const pictureId = parts[2];

    if (productId === undefined || productId === 0) {
      return `${url}/review-photos/1`;
    }

    if (pictureId === undefined) {
      return `${url}/review-photos/${productId}`;
    }
    return `${url}/review-photos/${productId}/${pictureId}`;
  },
}));

// eslint-disable-next-line no-console
app.listen(LOADBALANCERPORT, () => console.log(`Web Server Listenting on Port: ${LOADBALANCERPORT}`));
