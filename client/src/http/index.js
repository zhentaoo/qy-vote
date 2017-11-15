import Vue from 'vue';
import axios from 'axios';

Vue.prototype.$http=axios;
axios.default.baseURL = '/dihui/';
// axios.default.baseURL = 'http://10.12.59.81:8360/';
console.log(axios.default.baseURL);

axios.interceptors.request.use((config) => {
  // const token = Cookie.get(KEY);
  // if (token) {
  //   config.headers[KEY] = token;
  // }
  config.url = 'http://10.12.53.45:8360'+config.url
  config.timeout = 5000;
  return config;
}, (error) => {
  return Promise.reject(error);
});
