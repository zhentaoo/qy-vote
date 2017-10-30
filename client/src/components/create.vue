<template lang="html">
  <div class="">
    <name v-if="showCreateName"></name>
    <div class="username">
      {{userName}}
    </div>
    <h2>定制你需要的投票表单</h2>
    <div class="title">
      <span>标题：</span>
    </div>
    <input v-model="voteTitle" type="text" name="voteTitle" value="" placeholder="输入你投票的标题">
    <div class="title">
      <span>选项：</span>
    </div>
    <div class="" v-for="n in form">
      <input type="text" name="choice" value="">
    </div>
    <button @click="addFormItem" type="button" class="add">+</button>
    <br>
    <button @click="submit" type="button" name="button" class="submit">submit</button>
  </div>

</template>

<style media="screen" src="../css/common.css"></style>
<script>
import name from './name'
import constants from '@/constants/index'
export default {
  data() {
    return {
      form: [1],
      choiceList:[],
      voteTitle:'',
      showCreateName:true,
      userName:'',
      userKey:''
    }
  },
  components: {
    name: name
  },
  mounted(){

    console.log(constants.domain);
    this.userName = localStorage.getItem('userName');
    this.userKey = localStorage.getItem('userKey');
    if(this.userName){

      this.showCreateName=false;
    }

  },
  methods: {
    addFormItem() {
      this.form.push(this.form.length + 1)
    },
    submit(){
      this.choiceList = [];
      for (let i=0;i<this.form.length;i++){
        this.choiceList.push(document.getElementsByName('choice')[i].value)
      }

      // var str ='&choiceList=' this.choiceList.join('&choiceList=')

      fetch(constants.domain+'/home/vote', {
        method: 'POST',
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: "VoteInfo="+JSON.stringify({voteTitle: this.voteTitle, choiceList: this.choiceList})
      })
        .then(el => el.json())
        .then(res => {
          let id = res.data._id
          console.log(id)
          this.$toast('你的投票创建成功了！')

          this.$router.push({path:'/detail?id='+id})

        })
        .catch(err => {
        })
    }
  }
}
</script>

<style lang="css" scoped>
div h2{
  color: #06afc5;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  padding:10px 0 10px 0;
}
input{
  width: 250px;
  height: 25px;
  border: 1px grey solid;
  border-radius: 3px;
  margin: 5px;
}

button{

}

.add{
  margin: 20px;
  width: 250px;
  height: 30px;
  background: #17dc9a;
  border-radius: 5px;
  border:1px solid #17dc9a;
  color: white;
  font-size: 16px;
  font-weight: bold;
}

.submit{
  width: 250px;
  height: 40px;
  background: #6ce4ab;
  border-radius: 10px;
  border: 1px solid #6ce4ab;
  color: white;
  font-size: 16px;
  font-weight: bold;
}
.title{
  margin-top: 25px;
}
.title span{
  margin-right: 50%;
}
</style>
