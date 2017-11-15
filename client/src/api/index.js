import axios from 'axios';

export default {
  stat(id){
    console.log('xxx:', axios.default.baseURL);
    return axios.get(`/home/stat?id=${id}`)
  },
  create(data){
    return axios.post(`/home/vote`,data)
  },
  voteList(){
    return axios.get(`/home/vote`)
  },
  statVoted(id,userKey){
    return axios.get(`/home/stat/voted?id=${id}&userKey=${userKey}`)
  },
  voteDetail(id){
    return axios.get(`/home/vote/${id}`)
  },
  vote(id,data){
    return axios.put(`/home/vote/${id}`,data)
  }
}
