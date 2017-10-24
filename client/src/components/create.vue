<template lang="html">
  <div class="">
    <h2>定制你需要的投票表单</h2>
    <div style="margin-right:25%">
      <span>标题：</span>
    </div>
    <input v-model="voteTitle" type="text" name="voteTitle" value="" placeholder="输入你投票的标题">
    <div class="choiceTitle">
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

<script>
export default {
  data() {
    return {
      form: [1],
      choiceList:[],
      voteTitle:''
    }
  },
  mounted(){


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

      fetch('http://10.12.59.81:8360/home/vote', {
        method: 'POST',
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: "data="+JSON.stringify({voteTitle: this.voteTitle, choiceList: this.choiceList})
      })
        .then(el => el.json())
        .then(res => {
          debugger
          this.list = res.data;
        })
        .catch(err => {
        })
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
  padding:10px 0 45px 0;
}
input{
  width: 300px;
  height: 25px;
  border: 1px grey solid;
  border-radius: 3px;
  margin: 5px;
}

button{

}

.add{
  margin: 30px;
  width: 100px;
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
.choiceTitle{
  margin-top: 45px;
}
.choiceTitle span{
  margin-right: 25%;
}
</style>
