<template lang="html">
  <div class="">
    <h2 style="color:#19bbc7">{{title}}</h2>
    <!-- <span>{{choice}}</span> -->
    <div id="image" >

      <div class="column"  v-for="n in data" >
        <!-- <span style="width:10%;font-size:14px">{{n.name}}</span> -->
        <div class="outside">
          <div :style="{width:n.num*w +'px'}" class="cal"></div>
          <span class="name">{{n.name}}</span>
          <span class="num">{{n.num}}票</span>
        </div>
        <!-- <div :style="{background:columnColor,width:n.num*50 +'px',height:30+'px',border: '1px solid black'}"> -->


        <!-- <span>{{n.num}}</span> -->
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
      w:0,
      // choice:[],
      num:[],
      // num:[6,2,0,10,12],
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
      console.log("stat:", stat);
      return stat.stat(this.$route.query.id)
      .then(res => {
          this.data = res.data.data.list;
          console.log(this.data );
          this.total = res.data.data.total;
          this.w = window.screen.width/this.total;
          for (var i = 0; i < res.data.data.list.length; i++) {
            this.choice.push(res.data.data.list[i].name)
          }
          for (var i = 0; i < res.data.data.list.length; i++) {
            this.num.push(res.data.data.list[i].num)
          }
          console.log(this.choice);
      })
      .catch(e =>{
        this.$toast('系统异常，请稍后重试')
        console.log(e)
      } )
    }
  }
}
</script>

<style lang="css">
div h2{
  color: blue;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  padding-bottom: 20px;
}
button{
  width: 200px;
  height: 40px;
  background: #6ce4ab;
  border-radius: 10px;
  margin: 15px;
  cursor:pointer;
}
.choice{
  margin:10px;
  font-size: 18px
}
.para{
  text-align:left;
  font-size: 14px;
  color: green;
}
.echart{
  width: 95%;
  height: 450px;

}
.column{
  display: flex;
  margin-bottom: 25px;
}
/*.column span{
  margin-right: 5px;
}*/
.outside{
  width:100%;
  border:0.1px solid green;
  position:relative;
  height:30px
}
.name{
  width: 50%;
  font-size: 14px;
  position: absolute;
  left: 5px;
  text-align: left;
  z-index: 111;
  line-height: 30px;
}
.cal{
  background:#6bc76b;
  height:30px;
  border: 0.1px solid #6bc76b;
  position:absolute;
  z-index:1;
}
.num{
  width: 10%;
  font-size: 14px;
  right: 5px;
  z-index: 200;
  position: absolute;
  line-height: 30px;
}


</style>
