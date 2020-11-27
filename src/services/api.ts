import axios from 'axios';

const env =
  process.env.NODE_ENV === 'production'
    ? 'lapi.transitchicago.com'
    : 'localhost:3000';

const api = axios.create({
  baseURL: `http://${env}/api/1.0/ttarrivals.aspx`,
});

export default api;
