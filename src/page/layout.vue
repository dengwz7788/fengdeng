<template>
    <div>
      <el-row type="flex" class="top" justify="space-between">
        <el-col :span="6"><div style="padding-right:10px;">
          <el-button icon="el-icon-s-home" circle size="mini"></el-button>
            <span style="padding-left:2px">项目实例</span>
          </div></el-col>
        <el-col :span="14"  :offset="1"> 
            <el-button-group>
                <el-button  size="mini">全局变量</el-button>
                <el-button  size="mini">全局脚本</el-button>
                <el-button  size="mini">数据字典</el-button>
                <el-button  size="mini" @click="showOption('api')" >接口管理</el-button>
                <el-button  size="mini">版本管理</el-button>
            </el-button-group>
          </el-col>
        <el-col :span="4">  
            <el-button-group>
                <el-button  size="mini">全部保存</el-button>
                <el-button  size="mini">项目预览</el-button>
            </el-button-group>
        </el-col>
      </el-row>
 
      <el-main>
        <el-row>
          <el-col :span="24">
              <div class="layout">
                <div>
                    <span>文章_编辑页（data_dic）</span>
                    <span class="mask">组件配置</span>
                </div>
                <el-card class="box-card" shadow="never">
                    
                    <div slot="header" class="clearfix">
                        <el-button :icon="activeNames.field" @click="packUp('field')" circle size="mini"></el-button>
                        <span>字段设置</span>
                    </div>
                    <el-collapse-transition>
                        <fd-table-edite v-show="activeNames.field == 'el-icon-arrow-down'" :field="field"></fd-table-edite>
                    </el-collapse-transition>
                </el-card>
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix">
                        <el-button :icon="activeNames.row"  @click="packUp('row')" circle size="mini"></el-button>
                        <span>行数据</span>
                    </div>
                    <el-collapse-transition>
                        <fd-rows :rows="rows" v-show="activeNames.row == 'el-icon-arrow-down'"></fd-rows>
                    </el-collapse-transition>
                </el-card>
                <div class="footer">
                    <el-button type="primary" size="small" @click="sumbit">提交配置</el-button>
                </div>
            </div>
          </el-col>
          <!-- <el-col :span="1">
             <div class="toollist">
                <el-button plain icon="el-icon-s-operation" size="medium"></el-button>
                <el-button plain icon="el-icon-refresh" size="medium"></el-button>
                <el-button plain icon="el-icon-view" size="medium"></el-button>
                <el-button plain icon="el-icon-time" size="medium"></el-button>
             </div>
          </el-col> -->
          <!-- <el-col :span="5">
              <tools></tools>
          </el-col> -->
        </el-row>
      </el-main>
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
        activeNames: {
             field: "el-icon-arrow-down",
             row: "el-icon-arrow-down"
        },
        field: [],
        rows: [{
           text: '编辑',
           type: 'primary',
           expand: {
              type: 'code',
              value:  ''
           },
           show: true,
        },{
           text: '审核',
           type: 'warning',
           expand: {
              type: 'code',
              value: ""
           },
           show: true,
        },{
           text: '删除',
           type: 'danger',
            expand: {
              type: 'code',
              value: 'function(){this.$message("这是一条消息提示");}'
            },
           show: true,
        }]
      };
    },
    async created(){

        let vm = this

        let { result: { field = [], rows = [], search = [] } } = await vm.$httpExt.get('http://localhost:3000/dataDictType',{}, {
            withCredentials:true
        });

        vm.field = field
        vm.rows = rows

        document.oncontextmenu = new Function("return false");
        document.oncontextmenu = function () { return false; };
        document.onkeydown = function (e) {
            var keyCode = e.keyCode || e.which || e.charCode;
            var ctrlKey = e.ctrlKey || e.metaKey;
            if(ctrlKey && keyCode == 83) {
                vm.sumbit();
                e.preventDefault();
                return false;
            }
        };
            
    

    },
    methods: {
        showOption(type){
            console.log("type", type)
        },
        handleChange(){
        },

        fieldArr(){
            return this.field
        },
        packUp(name){
            this.activeNames[name]  = this.activeNames[name] == "el-icon-arrow-down" ? "el-icon-arrow-right" : "el-icon-arrow-down"
        },
        sumbit(){
            let vm = this
            let data = {}
            data.field = vm.field
            data.rows = vm.rows
            vm.$httpExt.post('http://localhost:3000/',data).then( res => {
               if(res.succ === "ok"){
                   vm.$message({
                        message: res.msg,
                        type: 'success'
                    });
               }
            }).catch( res => {
                console.log("res2", res)
            })
        }
    }
  }
</script>

<style lang="less" scoped>
    .layout{
        color: #000;
        font-size:14px;
        padding: 15px 0 15px 10px;
        .title{
            padding-left: 5px;
        }
        .mask{
            float: right;
            color:#999;
            padding-right: 20px;
        }
        .box-card{
            margin-top: 10px;
            /deep/ .el-card__header{
                padding: 10px 20px;
            }
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

    .el-main {
        background-color: #f5f5f5;
        color: #fff;
        padding: 0 0 10px 5px;
    }

    .toollist{
        background-color: #fff;
        text-align: center;
        height: 100%;
        
        .el-button{
            border:none;
            margin: 0 auto; 
            font-size: 20px;
            padding: 10px 0;
            display: block;
        }
    }

    .footer{
        padding-top:10px;
        padding-right:10px;
        text-align: right;
    }
</style>