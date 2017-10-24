<template lang="html">
  <div class="">
    <h2>{{title}}</h2>
    <div class="" >
      <form >
        <div v-for="n in choice" class="choice">
          <input type="radio" v-model="checkedNames" :value="n" name="choice" >{{n}}
        </div>
      </form>
      --{{checkedNames}}--
      <button type="button" name="button" @click="vote">我要投给Ta！</button>
    </div>
  </div>


</template>

<script>
export default {
  data(){
    return{
      title:'投票名称',
      choice:['火影忍着','海贼王','死神'],
      // choice:[],
      result:[],
      checkedNames:''
    }
  },
  mounted:function(){
    console.log(this.$route.query.id)
    fetch('http://10.12.59.81:8360/home/vote/'+this.$route.query.id)
      .then(el => el.json())
      .then(res => {
        console.error(res.data);
        this.choice = JSON.parse(res.data.data).choiceList
        this.title = JSON.parse(res.data.data).voteTitle
        console.log(this.choice)
      })
      .catch(err => {
      })

  },
  methods:{
    vote(){
      // let
      // this.checked=

    },
  }
}
</script>

<style lang="css">
div h2{
  color: blue;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  padding:10px 0 45px 0;
}
button{
  width: 200px;
  height: 40px;
  background: #55e0cb;
  border-radius: 10px;
  margin: 15px;
  cursor: pointer;
  border: 1px solid #55e0cb;
  color: white;
  font-size: 16px;
  font-weight: bold;
}

.choice{
  margin:10px 20px 20px 0px;
  font-size: 18px;
  position: relative;
}

.choice input{
  position: absolute;
  left: 42%
}
/*.choice input{
  width: 100px
}*/
</style>
