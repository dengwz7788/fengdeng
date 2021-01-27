<template>
  <div>
    <van-collapse v-model="activeNames" :border="false">
      <van-collapse-item title="用户信息" name="1">
        <van-cell-group>
          <van-cell title="用户ID" value="12345678" />
          <van-cell title="用户名" value="苏默人" />
          <van-cell title="职称"   value="商业" />
        </van-cell-group>
      </van-collapse-item>
    </van-collapse>
    <van-cell title="数据日期" :value="date" @click="show = true" />
    <van-cell-group title="业绩数据">
      <van-cell title="职称" v-if="empty"  value="商业" />
      <van-empty description="暂时没有找到当天的数据" v-else />
    </van-cell-group>

    <van-calendar v-model="show" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm" position="top"  />
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      activeNames: ['1'],
      date: '2020-01-25',
      show: false,
      empty: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2021, 0, 31)
    }
  },
  methods: {
    formatDate (date) {
      return `${date.getFullYear()} - ${date.getMonth() + 1} - ${date.getDate()}`
    },
    onConfirm (date) {
      this.show = false
      this.date = this.formatDate(date)
    }
  }
}
</script>
