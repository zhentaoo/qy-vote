// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Mint from 'mint-ui';
import constants from '@/constants/index';
import './http/index.js';
import Api from '@/api/index';

Vue.use(Mint);

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {

if (to.path == '/detail') {
  var userKey= localStorage.getItem('userKey');
  if(userKey){
    let url = window.location.href;
    let id = url.substring(url.lastIndexOf("=")+1,url.length)
    console.log(id);
    console.log(router);

    // fetch(`${constants.domain}/home/stat/voted?id=${id}&userKey=${userKey}`)
    return Api.statVoted(id,userKey)
      .then(res => {
        console.log(res);
        if (res.data.data.voted==false) {
          next()
        }else {
          next(`/statistics?id=${id}`)
        }

      })
    }else {
      next()
    }
  } else {
    next()
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
