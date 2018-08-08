import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default function callApi(endpoint, method = 'get', body, headers) {
  return axios[method](`${API_URL}/${endpoint}`, body, headers);
}
