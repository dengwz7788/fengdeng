<template>
  <div class="team">
    <div v-show="show">

    </div>
    <div v-show="!show">
      <div class="title">数据走势</div>
      <div id="main"></div>
    </div>

    <van-tabbar v-model="active">
      <van-tabbar-item icon="manager-o">我的</van-tabbar-item>
      <van-tabbar-item icon="friends-o">队员</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import * as echarts from 'echarts'
export default {
  name: 'Team',
  data () {
    return {
      active: 0
    }
  },
  computed: {
    show () {
      return this.active === 0
    }
  },
  mounted () {
    // 基于准备好的dom，初始化echarts实例
    let chartDom = document.getElementById('main')
    let myChart = echarts.init(chartDom)

    let option = {
      xAxis: {
        type: 'category',
        data: ['01-20', '01-21', '01-22', '01-23', '01-24', '01-25', '01-26']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [120, 222, 123, 222, 102, 234, 111],
        type: 'line',
        smooth: true
      }]
    }
    myChart.setOption(option)
  },
  methods: {
  }
}
</script>

<style scoped>
  #main{
      width: calc( 100% - 20px);
      height: 400px;
      margin: 0 auto;
  }
  .team .title{
    padding: 10px 0 0  20px;
    font-size: 14px;
    color: #999;
  }

</style>
