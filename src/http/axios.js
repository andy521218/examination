import axios from "axios";
import {Message} from 'view-design';

axios.defaults.baseURL = '/api';
axios.defaults.timeout=8000;
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = [function (data) {
  let ret = ''
  for (let it in data) {
   ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  }
  return ret
 }]

axios.interceptors.response.use(function onFulfilled(response) {
  return response.data;
}, function onRejected(reason) {
  // Message.error('连接服务器超时')
  return Promise.reject(reason);
});

axios.defaults.validateStatus = function (status) {
 if(status=='401') return  Message.warning('长时间未操作,请重新登入!')
  return /^(2|3|4)\d{2}$/.test(status);
}

axios.defaults.withCredentials = true;

export default axios