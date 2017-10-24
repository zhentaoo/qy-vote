<template lang="html">
  <div class="">
    <h2>投票啦！！！</h2>
    <!-- <div class="voteTitle" v-for="n in voteTitle" >
      {{n}}
    </div> -->

    <div class="">
      <p v-for="n in list"><a :href="'#/detail?id='+n._id">{{n.data.voteTitle}}</a></p>
    </div>

    <button type="button" class="button">
        <router-link :to="{ path: 'create' }">
          创建票票
        </router-link>
    </button>
  </div>

</template>

<script>
export default {
  data(){
    return{
      // voteTitle:['你最喜欢的动漫','你最喜欢的动漫人物'],
      list: []
    }
  },
  mounted(){
    debugger
    fetch('http://10.12.59.81:8360/home/vote')
      .then(el => el.json())
      .then(res => {
        debugger
        this.list = res.data.map(el => {
          el.data = JSON.parse(el.data);
          return el
        });
        console.log(this.list);
      })
      .catch(err => {
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
