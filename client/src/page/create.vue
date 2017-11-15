<template lang="html">
  <div class="">
    <name v-if="showCreateName"></name>
    <div class="username">
      {{userName}}
    </div>
    <h2>定制一个属于你的投票</h2>
    <div class="title">
      <!-- <span>标题：</span> -->
    </div>
    <input class="titleInput" v-model="voteTitle" type="text" name="voteTitle" value="" maxlength="20" placeholder="决定你的标题">
    <div class="title">
      <!-- <span>选项：</span> -->
    </div>
    <div class="" style="height:400px;overflow:auto">
      <div class="choiceDiv" v-for="(item,index) in form" >
        <div class="" style="position:relative;width:100%">
          <img src="../image/minus.png" alt="" class="minus" @click="delFormItem(index)">
          <input type="text" name="choice" value=" " maxlength="40" class="choiceInput" placeholder="选项"  v-model="choiceList[index]" @blur="checkNull(index)">
          <span class="upload">
            <img src="../image/upload.png" alt="" class="uploadImage">
            <span class="uploadWord">上传图片
            </span>
          </span>
        </div>
      </div>
      <button @click="addFormItem" type="button" class="add" :disabled="addShow" >+增加选项</button>
      <button @click="submit" type="button" name="button" class="submit">创建你的投票</button>
    </div>
  </div>


</template>

<style media="screen" src="../css/common.css"></style>
<script>
import name from '@/components/name'
import constants from '@/constants/index'
import Api from '@/api/index'
export default {
  data() {
    return {
      form: [1],
      choiceList:[""],
      voteTitle:'',
      showCreateName:true,
      userName:'',
      userKey:'',
      addShow:false
    }
  },
  components: {
    name: name
  },
  watch:{
    choiceList:function(val){
      if(!val.includes("")){
        this.addShow=false
      }
    }
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

      this.addShow=false
      if(!this.choiceList.includes("")){

        this.addShow=false
        this.form.push(this.form.length + 1)
        this.choiceList.push("")
      }else {
        this.addShow=true
      }
    },
    delFormItem(index){
      this.form.splice(index, 1);
      this.choiceList.splice(index,1);
      console.log(this.form);
    },
    submit(){
      console.log(this.choiceList);
      if (this.voteTitle && this.choiceList.length>=2 && !this.choiceList.includes(undefined)) {

        // fetch(constants.domain+'/home/vote', {
        //   method: 'POST',
        //   headers: {"Content-Type": "application/x-www-form-urlencoded"},
        //   body: "VoteInfo="+JSON.stringify({voteTitle: this.voteTitle, choiceList: this.choiceList})
        // })

        Api.create(
          'VoteInfo='+JSON.stringify({voteTitle: this.voteTitle, choiceList: this.choiceList}),
          )
          .then(res => {
            let id = res.data.data._id
            console.log(id)
            this.$toast('你的投票创建成功了！')
            debugger
            this.$router.push({path:'/detail?id='+id})

          })
          .catch(err => {
            this.$toast('系统异常，请稍后重试')
          })

      }else {
        this.$toast('表单要填写完整哦')
      }
    },
    checkNull(index){
      this.addShow=false
      if (!this.choiceList[index]){

        this.addShow=true;
        console.log(this.addShow);

      }else {
        console.log('ggg');
        this.addShow=false;
      }
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
  border: 1px white solid;
  border-bottom: 1px #e2e2e2 solid;
  border-radius: 3px;
  margin: 5px;
}
button:disabled{
  background-color: #cac0c0;
  border: 1px #cac0c0 solid
}

.titleInput{
  width: 280px;
  height: 28px;
}
.choiceInput{
  width: 250px;
  height: 28px;
  left: 10px;
}

.add{
  margin: 40px 0 20px 0;
  width: 250px;
  height: 35px;
  background: #6ce4ab;
  border-radius: 5px;
  border:1px solid #6ce4ab;
  color: white;
  font-size: 16px;
  font-weight: bold;
}

.submit{
  width: 250px;
  height: 35px;
  background: #17dc9a;
  border-radius: 5px;
  border: 1px solid #17dc9a;
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
.minus {
  width: 20px;
  height: 20px;
}
.choiceDiv{
  display: flex;
  align-items: center;
  justify-content: center;
}
.uploadImage{
  width: 20px;
  height: 15px

}
.uploadWord{
  font-size: 0.5px;
  height: 8px;
  color: grey;
  font-family: "LiSu";
}
.upload{
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 30px;
  position: absolute;
  right:  10%;
  top:5px
}
/*.upload{
  position: relative;
  width: 100px
}*/

</style>
