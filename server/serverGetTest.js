import http from 'k6/http';
import { check } from "k6";
import { Rate } from 'k6/metrics';

const serverUrl = '127.0.0.1:3004';

// let errorRate = new Rate('errors');

export default function runGetRequestTest() {
  // tests the last 10% of the 10 million products in the database;
  const randomProductId = Math.floor(Math.random() * 1000000) + 9000000;
  let response = http.get(`${serverUrl}/photos/${randomProductId}`);
  // check(response, {
  //   'Response code was 200': (res) => res.status === 200,
  //   'Response has a product id': (res) => res.product_id === randomProductId,
  // });
}
