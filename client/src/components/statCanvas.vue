<template lang="html">
  <div class="">
    <h2 style="color:#19bbc7">{{title}}</h2>
    <div class="" >
      <form >
        <!-- <div v-for="n in choiceList" class="choice">
          <p class="para">{{n.name}}</p>
          <span>{{n.num}}</span> -->
          <div class="echart" id="echart" >

          </div>
        <!-- </div> -->
      </form>
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
      // choice:[],
      num:[],
      // num:[6,2,0,10,12],
      total:0
    }
  },
  mounted:function(){
    this.fetchData()
    var myChart = echarts.init(document.getElementById('echart'));
    var option = {
      title:{
        // text:this.title
      },
      tooltip:{
        trigger:'axis',
        axisPointer:{
          type:'shadow'
        },
        lineStyle:{
          // color:'green',

        },
        textStyle:{
          color:'green'
        }
      },
      color:['#1ccc6f'],
      legend:{
        data:['票数'],
        itemWidth:40,
        itemHeight:20,
        textStyle:{
          fontSize:15,
          color:'black',
        }
      },
      xAxis:{
        type:'value',
        data:this.num,
        axisLabel:{
          textStyle:{
            // color:'green',
            width:8
          }
        }

      },
      yAxis:{
        type:'category',
        data:this.choice,
        axisLine:{
          lineStyle:{
            type:'solid',
            // color:'green'
          }
        },
        axisLabel:{
          textStyle:{
            // color:'green'
          }
        }
      },
      series:[{
        name:'票数',
        type:'bar',
        data: this.num
      }]
    };

    setTimeout(function () {
      myChart.setOption(option);
    }, 1000);
  },
  methods:{
    fetchData(){
      console.log("stat:", stat);
      

      return stat.stat(this.$route.query.id)
      .then(res => {
        
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
  padding:10px 0 10px 0;
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
</style>
