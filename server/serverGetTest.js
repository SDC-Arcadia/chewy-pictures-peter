/* eslint-disable import/no-unresolved */
import http from 'k6/http';
import { check } from 'k6';
import { Rate } from 'k6/metrics';

const serverUrl = 'http://44.240.242.83:3010';

const errorRate = new Rate('errorRate');

export const options = {
  // rps: 1000,
  // rate: 1000,
  // timeUnit: '1s',
  // vus: 200,
  // duration: '100s',

  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 10000,
      timeUnit: '1s',
      duration: '10s',
      preAllocatedVUs: 300,
      maxVUs: 300,
    },
  },
};

export default function runGetRequestTest() {
  // tests the last 10% of the 10 million products in the database;
  const randomProductId = Math.floor(Math.random() * 1000000) + 9000000;
  const response = http.get(`${serverUrl}/photos/${randomProductId}`);

  errorRate.add(response.status !== 200);

  check(response, {
    'Response code was 200': (res) => {
      console.log('Response was successful', res.status);
      return res.status === 200;
    },
    'Product Id exists': (res) => {
      const { product_id: productId } = res.json();
      return productId;
    },
  });
}
