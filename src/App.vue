<template>
  <div id="app">
    <el-container>
      <el-header height="40px">丰登可视化配置表单系统</el-header>
      <el-main>
        <el-row>
          <el-col :span="19">
            <router-view class="routerView" />
          </el-col>
          <el-col :span="5">
              <tools></tools>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>

import tools from '@/components/Common/tools'

export default {
  name: 'App',
  components: {
			tools
		}

}
</script>

<style>
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
}
  
  .el-main {
    background-color: #f5f5f5;
    color: #fff;
    padding: 10px 0 10px 10px;
  }
</style>
