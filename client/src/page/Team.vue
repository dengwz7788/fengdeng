<template>
  <div class="team">
    <div v-if="show">
      <index />
    </div>
    <div v-else>

      <div class="row">
        <van-tag plain type="primary">标签</van-tag>
      </div>

      <div class="row">
          <echart-line :chart="chart"/>
      </div>
      <div class="row">
          <echart-line :chart="chart2"/>
      </div>
    </div>

    <van-tabbar v-model="active">
      <van-tabbar-item icon="manager-o">我的</van-tabbar-item>
      <van-tabbar-item icon="friends-o">队员</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import Index from './Index'
import EchartLine from '../components/echart/Line'
export default {
  name: 'Team',
  components: {
    Index: Index,
    EchartLine: EchartLine
  },
  data () {
    return {
      active: 0,
      chart: {
        title: '走势图',
        data: ['01-20', '01-21', '01-22', '01-23', '01-24', '01-25', '01-26'],
        series: [{
          data: [120, 222, 123, 222, 102, 234, 111],
          type: 'line',
          smooth: true
        }]
      },
      chart2: {
        title: '柱状图',
        data: ['是', '否'],
        series: [{
          data: [33, 2],
          type: 'bar'
        }]
      }
    }
  },
  computed: {
    show () {
      return this.active === 0
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
