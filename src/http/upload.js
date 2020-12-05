import axios from "axios";
import {Message} from 'view-design';

  const upload =axios.create({
    baseURL :'/api',
    timeout:8000,
    headers: { "Content-Type": " application/json" }
  })
  upload.defaults.withCredentials = true;
  upload.defaults.validateStatus = function (status) {
    if(status=='401') return  Message.warning('长时间未操作,请重新登入!')
    if(/^4\d{2}$/.test(status)) return  Message.error('遇到未知错误,请查看后再试!');
     return /^(2|3|)\d{2}$/.test(status);
   }
   upload.interceptors.response.use(function onFulfilled(response) {
    return response.data;
  }, function onRejected(reason) {
    // Message.error('连接服务器超时')
    return Promise.reject(reason);
  });
export default upload