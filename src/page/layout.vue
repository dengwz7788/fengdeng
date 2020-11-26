<template>
<div class="layout">
    <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item name="1">
             <template slot="title">
                <i class="el-icon-setting"></i><label class="title">字段设置</label>
            </template>
            <fd-table-edite></fd-table-edite>
        </el-collapse-item>
        <el-collapse-item name="2">
            <template slot="title">
                <i class="el-icon-search"></i><label class="title">搜索配置</label>
            </template>
            <fd-search></fd-search>
        </el-collapse-item>
        <el-collapse-item name="3">
            <template slot="title">
                <i class="el-icon-set-up"></i><label class="title">行数据</label>
            </template>
            <fd-rows></fd-rows>
        </el-collapse-item>
    </el-collapse>
</div>
</template>
<script>
  import tableEdite from './tableEdite.vue'
  import search from './search.vue'
  import rows from './rows.vue'
  export default {
    name: 'layout',
    components: {
        FdTableEdite: tableEdite,
        FdSearch:search,
        FdRows:rows
    },
    data() {
      return {
        activeNames: ['3']
      };
    },
    methods: {
      handleChange(val) {
        console.log(val);
      }
    }
  }
</script>

<style lang="less" scoped>
    .layout{
        padding: 10px 10px;
        background: #fff;
        .title{
            padding-left: 5px;
        }
    }

    /deep/ .el-collapse-item__header{
        height: 40px;
        line-height: 40px;
        padding-left: 10px;
        font-size: 15px;
    }

    /deep/ .el-collapse{
        border: none;
    }
</style>