<template lang="html">
  <div class="">
    <div class="cover">
      <div class="circle1" style="">
      </div>
      <div class="circle2">
      </div>
      <div class="share">
        点击右上角发送给微信好友或分享到朋友圈
      </div>
    </div>
  </div>


</template>

<script>
import constants from '@/constants/index'
import stat from '@/api/index'
export default {
  data(){
    return{
      title:'你最喜欢的动漫',
      choice:[],
      total:9,
      data:[{name:'死神',num:1},{name:'火影忍者',num:8}],
    }
  },
  mounted:function(){
    this.fetchData()
    // this.w = window.screen.width/this.total;
  },
  methods:{
    fetchData(){

    }
  }
}
</script>

<style lang="css">
.cover{
  width: 100%;
  height: 100%;
  background-color: grey;
  position: fixed;
  top:0px;
  left: 0px;
  opacity: 0.9
}
.share{
  font-weight: bold;
  width: 180px;
  height: 55px;
  border: 1px white dotted;
  border-radius: 50%;
  position: fixed;
  top:15%;
  left: 15%;
  margin: 20px;
  padding: 20px;
  z-index: 1000;
  color: white;
}
.circle1{
  border:1px white solid;
  width:35px;
  height:30px;
  position: fixed;
  top:7px;
  right: 7px;
  border-radius: 50%;
}
.circle2{
  border:1px white solid;
  width:60px;
  height:47px;
  position: fixed;
  top:50px;
  right:50px;
  border-radius: 50%;
}


</style>
