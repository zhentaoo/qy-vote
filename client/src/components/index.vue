<template lang="html">
  <div class="">
    <h2>投票啦！！！</h2>
    <!-- <div class="voteTitle" v-for="n in voteTitle" >
      {{n}}
    </div> -->

    <div class="">
      <p v-for="n in list">
        <a :href="'#/detail?id='+n._id" v-if="n.VoteInfo">
          {{n.VoteInfo.voteTitle}}
        </a>
      </p>
    </div>

    <button type="button" class="button">
        <router-link :to="{ path: 'create' }">
          创建票票
        </router-link>
    </button>
  </div>

</template>

<script>
import constants from '@/constants/index'
export default {
  data(){
    return{
      // voteTitle:['你最喜欢的动漫','你最喜欢的动漫人物'],
      list: []
    }
  },
  mounted(){

    // fetch('https://www.baidu.com')
    fetch(`${constants.domain}/home/vote`)
      .then(el => el.json())
      .then(res => {
        // this.list = res.data
        // this.list = res.data.map(el => {
        //   try {
        //
        //     el.data = JSON.parse(el.data);
        //   } catch (e) {
        //
        //   }
        //   // el.data = JSON.parse(el.data);
        //   return el
        // });
        this.list=res.data
        console.log(this.list);
      })
      .catch(err => {
        this.$toast('系统异常')
      })
  },
  methods:{
    showVote(){

    }
  }

}
</script>

<style lang="css">
  div h2{
    color: blue;
    text-align: center;
    font-weight: bold;
    font-size: 20px
  }
  .button{
    position: fixed;
    left: 50%;
    bottom: 10px;
    text-align: center;
    background: #6ce4ab;
    border:1px solid #6ce4ab;
    border-radius: 10px;
    width: 250px;
    height: 40px;
    margin: 0 auto;
    left: calc(50% - 125px);
    text-decoration: none;
  }
  button a{
    text-decoration: none;
    color: white;
    font-size: 16px;
    font-weight:bold;
  }
  .voteTitele{

  }


</style>
