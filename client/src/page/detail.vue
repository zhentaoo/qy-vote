<template lang="html">
  <div >
    <!-- <div class="name"> -->
      <name v-if="showCreateName"></name>
      <div class="username">
        {{userName}}
      </div>
    <!-- </div> -->
    <h2>{{title}}</h2>
    <div class="" >
      <form >
        <div v-for="n in choice" class="choice">
          <input type="radio" v-model="checkedName" :value="n" name="choice" ><span>{{n}}</span>
        </div>
      </form>
      <!-- --{{checkedNames}}-- -->
      <button type="button" name="button" @click="vote">我要投给Ta！</button>
    </div>
  </div>

</template>

<script>
import name from '@/components/name'
import constants from '@/constants/index'
import Api from '@/api/index'

export default {
  data(){
    return{
      title:'投票名称',
      choice:['火影忍着','海贼王','死神'],
      // choice:[],
      result:[],
      checkedName:'',
      showCreateName:true,
      userName:'',
      userKey:'',
    }
  },
  components: {
    name: name
  },
  mounted:function(){
    debugger
    this.userName = localStorage.getItem('userName');
    this.userKey = localStorage.getItem('userKey');
    if(this.userName){

      this.showCreateName=false;
    }
    console.log(this.$route.query.id)
    // fetch(constants.domain+'/home/vote/'+this.$route.query.id)
    return Api.voteDetail(this.$route.query.id)
      // .then(el => el.json())
      .then(res => {
        console.error(res.data);
        // this.choice = JSON.parse(res.data.VoteInfo).choiceList
        this.choice = res.data.data.VoteInfo.choiceList
        // this.title = JSON.parse(res.data.VoteInfo).voteTitle
        this.title = res.data.data.VoteInfo.voteTitle
        let resKey = res.data.data.Vote

        console.log(this.choice)
      })
      .catch(err => {

        this.$toast('系统异常')
      })

  },
  methods:{
    vote(){
      // fetch(`${constants.domain}/home/vote/${this.$route.query.id}`, {
      //   method: 'PUT',
      //   headers: {"Content-Type": "application/x-www-form-urlencoded"},
      //   body: "VoteResult="+JSON.stringify({
      //     userKey: this.userKey,
      //     userName: this.userName,
      //     vote:this.checkedName})
      // })
      return Api.vote(
        this.$route.query.id,
        'VoteResult='+JSON.stringify({
          userKey: this.userKey,
          userName: this.userName,
          vote:this.checkedName
        }))
        // .then(el => el.json())
        .then(res => {
          this.list = res.data;
          this.$router.push({path:`/statistics?id=${this.$route.query.id}`})
        })
        .catch(err => {
          this.$toast('系统异常')
        })


    },
  }
}
</script>
<style media="screen" src="../css/common.css"></style>

<style lang="css">
div h2{
  margin-top: 70px;
  color: #06afc5;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  padding:10px 0 25px 0;
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
  font-size: 14px;
  text-align: left;
}
.choice span{
  padding-left: 20%;
}

.choice input{
  position: absolute;
  left: 10%
}

/*.choice input{
  width: 100px
}*/
</style>
