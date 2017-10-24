<template lang="html">
  <div class="">
    <h2>{{title}}</h2>
    <div class="" >
      <form >
        <div v-for="n in choice" class="choice">
          <input type="radio" name="choice">{{n}}
        </div>
      </form>
      <button type="button" name="button" @click="vote">我要投给Ta！</button>
    </div>
  </div>


</template>

<script>
export default {
  data(){
    return{
      title:'投票名称',
      choice:['火影','海贼','死神']
    }
  },
  mounted:function(){
    this.$nextTick(function() {

    });
  },
  methods:{
    vote(){

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
  background: #6ce4ab;
  border-radius: 10px;
  margin: 15px;
  cursor:pointer;
}
.choice{
  margin:10px;
  font-size: 18px
}
</style>
