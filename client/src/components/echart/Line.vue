<template>
  <div>
    <div class="title">{{title}}</div>
    <div class="main" ref="main"></div>
  </div>
</template>
<script>
import * as echarts from 'echarts'
export default {
  name: 'echartLine',
  data () {
    return {
      option: {
        color: '#DC143C',
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: []
      },
      title: 'echart'
    }
  },
  props: {
    chart: {
      type: Object
    }
  },
  mounted () {
    let { data, series, title } = this.chart
    this.option.xAxis.data = data
    this.option.series = series
    this.title = title
    // 基于准备好的dom，初始化echarts实例
    let chartDom = this.$refs.main
    this.initEcharts(chartDom)
  },
  methods: {
    // 方法
    initEcharts (DOm) {
      // 新建一个promise对象
      let newPromise = new Promise((resolve) => {
        resolve()
      })
      // 然后异步执行echarts的初始化函数
      newPromise.then(() => {
        // 此dom为echarts图标展示dom
        let myChart = echarts.init(DOm)
        myChart.setOption(this.option)
      })
    }
  }
}
</script>

<style scoped>
  .main{
      width: calc( 100% - 20px);
      height: 405px;
      margin: 0 auto;
  }
  .title{
    padding: 10px 0 0  20px;
    font-size: 14px;
    color: #999;
  }
</style>
