<template lang="html">
  <div class="modal" v-if="showCreate">
    <div class="name-modal">

    </div>
    <div class="createName">
      <p style="color:green;font-weight:bold;font-size:14px">决定你的用户名：</p>

      <input type="text" name="" value="" v-model="username">
      <br>
      <!-- {{username}} -->
      <button type="button" name="button" class="submitname" @click="subName">决定就是你了!</button>
    </div>
    <!-- <div class="showName" v-if="showName">
      用户名：{{username}}
    </div> -->
  </div>

</template>

<script>
export default {
  data() {
    return {
      username: '',
      userKey:'',
      showCreate:true,
      // showName:true,

    }
  },
  mounted(){
    // this.username=localStorage.getItem('username')
    // if(this.username){
    //   this.showCreate=false;
    //   this.showName=true;
    // }else {
    //   
    //   this.showCreate=true;
    //   this.showName=false;
    // }

  },
  methods: {
    subName(){
      this.userKey =this.username + new Date().getTime()+parseInt(Math.random()*100);
      localStorage.setItem('userName',this.username);
      localStorage.setItem('userKey',this.userKey);
      this.showCreate=false;
    }

  }
}
</script>

<style lang="css" scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
}
.name-modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: 0.8;
  background: gray;
  z-index: 1;
}
.submitname{
  width: 150px;
  height: 35px;
  background: #0dca70;
  border-radius: 10px;
  border: 1px solid #6ce4ab;
  color: white;
  font-size: 14px;
  font-weight: bold;
  margin: 20px 0 20px 0;
}
.showName{
  color: #0dca70;
  font-size: 14px
}
.createName{
  /*border:1px black solid;*/
  border-radius: 10px;
  width: 200px;
  background: white;
  z-index: 2;
  top: 50%;
  transform: translateX(-50%);
  transform: translateY(-50%);
  position: fixed;
}
input{
  border: 1px grey solid;
  border-radius: 5px;
  height: 22px;
  width: 150px

}

</style>
