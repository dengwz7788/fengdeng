<template>
<div class="layout">
    <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item name="1">
             <template slot="title">
                <i class="el-icon-setting"></i><label class="title">字段设置</label>
            </template>
            <fd-table-edite :field="field"></fd-table-edite>
        </el-collapse-item>
        <el-collapse-item name="2">
            <template slot="title">
                <i class="el-icon-search"></i><label class="title">顶部按钮配置</label>
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
    <div class="footer">
        <el-button type="primary" size="small" @click="sumbit">提交配置</el-button>
     </div>
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
    provide () {
        return {
            fieldArr: this.fieldArr
        }
    },
    data() {
      return {
        activeNames: ['1'],
        field: []
      };
    },
    async created(){

        let { result } = await this.$httpExt.get('http://localhost:3000/dataDictType',{}, {
            withCredentials:true
        });

        this.field = result

    },
    methods: {
        handleChange(){
        },

        fieldArr(){
            return this.field
        },
        sumbit(){
            let vm = this
            let data = {}
            let vmlist = vm.$children[0].$children
            vmlist.forEach( (ele, key) => {
              let tmpvm = ele.$children[0]
              let { _componentTag = "" } =  tmpvm.$options
              if(_componentTag === "fd-table-edite"){
                data.field = tmpvm.field
              }else if(_componentTag === "fd-search"){
                    data.search = tmpvm.rows
              }else if(_componentTag === "fd-rows"){
                    data.rows = tmpvm.rows
              }
            });

            console.log("data", data)
            // vm.$httpExt.post('http://localhost:3000/',{
            //     field: vm.field
            // },{
            //     withCredentials:true
            // });
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

    .footer{
        padding-top:10px;
        padding-right:10px;
        text-align: right;
    }
</style>