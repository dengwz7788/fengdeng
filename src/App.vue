<template>
  <div>
    <el-container style="height:100%">
      <el-header height="40px">
          丰登可视化配置表单系统
          <div class="userinfo">10401892 <span class="loginout">退出</span></div>     
      </el-header>
      
      <router-view class="routerView" />
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
     }
  },
  components: {
	}

}
</script>

<style lang="less">

body{
  padding: 0;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #f5f5f5;
}

.el-header {
  background-color: #346fef;
  color: #fff;
  text-align: left;
  line-height: 40px;
  .userinfo{
     float: right;
     .loginout{
         padding-left: 20px;
     }
  }
}

.top{
  padding: 10px;
  height: 50px;
  background: #fff;
  color: #000;
  font-size: 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
</style>
