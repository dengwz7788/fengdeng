<template>
  <div id="app">
    <van-nav-bar title="标题" left-arrow left-text="返回" safe-area-inset-top></van-nav-bar>
    <router-view/>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'App',
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
