import http from 'k6/http';
import { check } from "k6";
import { Rate } from 'k6/metrics';

const serverUrl = 'http://127.0.0.1:3004';

// let errorRate = new Rate('errors');

export let options = {
  duration: '10s',
  vus: 1,
}

export default function runGetRequestTest() {
  // tests the last 10% of the 10 million products in the database;
  const randomProductId = Math.floor(Math.random() * 1000000) + 9000000;
  const response = http.get(`${serverUrl}/photos/${randomProductId}`);

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