<template>
  <div id="app">
    <van-nav-bar title="标题">
      <template v-if="show" #right>
        <van-icon name="user-circle-o" size="22" color="red" />
      </template>
    </van-nav-bar>
    <router-view/>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'App',
  data () {
    return {
      show: true
    }
  },
  created () {
    this.show = this.$route.meta.requiresAuth === undefined ? true : this.$route.meta.requiresAuth
  },
  methods: {
    onClickLeft () {
      Toast('返回')
    },
    onClickRight () {
      Toast('按钮')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
