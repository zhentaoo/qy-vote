import axios from 'axios';

export default {
  stat(id){
    console.log('xxx:', axios.default.baseURL);
    return axios.get(`/home/stat?id=${id}`)
  }
}
