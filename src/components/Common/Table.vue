<template>
  <div class="content">
        <div class="text item">
              <div class="text item" style="padding: 10px 0;">
                <el-button size="mini" type="primary" icon="el-icon-plus" @click="addBotton">发布</el-button>
              </div>
              <el-table 
                class="TableList"
                :data="data" 
                size="small" 
                border 
                >
                  <el-table-column 
                    v-for="(item,key) in field" 
                    :prop="item.prop"  
                    :label="item.label" 
                    :width="item.width" 
                    :key="key"
                  >
                    <template slot-scope="scope">
                        <div v-if="Array.isArray(scope.row[item.prop])">
                          <el-tag size="small" v-for="(item,key) in scope.row[item.prop]" :key="key" style="margin-right: 2px;">
                            {{item}}
                          </el-tag>
                        </div>
                        <div v-else-if="item.prop === 'action'">
                            <el-button v-for="(item, key) in item.children" 
                              :key="key"
                              type="text" 
                              size="small" 
                              @click.native.prevent="hanldFunc(item.callback, scope)">{{item.functionName}}</el-button>
                        </div>
                        <div v-else>{{scope.row[item.prop]}}</div>
                    </template>
                  </el-table-column>
                </el-table>
        </div>
        <el-dialog title="新增发布" :visible.sync="show" width="40%" append-to-body>
            <fd-form :key="key" :ruleForm="ruleForm" @onSubmit="onSubmit"></fd-form>
        </el-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import Form  from './Form'
export default {
  name: 'TableList',
  components: {
    FdForm: Form
	},
  props:{
    field: {
        type: Array,
          default: function(){
            return []
        },
    },
    rows: {
        type: Array,
          default: function(){
            return []
        },
    }
  },
  data () {
    return {
      show: false,
      data: [],
      ruleForm: { 
          env: [],
          desc: ''
      },
      key: 0,
      currentEnv:[]
    }
  },
  async created(){
      this.data = this.rows
      // this.data = this.rows.map(item => {
      //     item.env = item.env.filter(it => {
      //         if(!this.currentEnv.includes(it)){
      //             this.currentEnv.push(it)
      //             return it;
      //         }
      //     })
      //     return item
      // });
  },
  methods: {   
      publicRow(row){
        this.ruleForm = row
        this.key++ 
        this.show = true
      },
      addBotton(){
        this.ruleForm = { 
          env: [],
          desc: ''
        }
        this.key++ 
        this.show = true
      },
      onSubmit(data){
          let num = (this.data.length + 1).toString().padStart("3","0")
          this.data.unshift({
             datetime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
             env: data.env,
             publisher:"邓蔚之",
             desc: data.desc,
             vision:dayjs().format('YYYY.MD.') + num
          })

          this.show = false
      },
      hanldFunc( func, row ){
        if(typeof func === "function"){
           try {
              func.call(this, row)()
           } catch (error) {
             //console.log("error", error)
           }
            
        }
      }
      
  }
}
</script>

<style lang="less" scoped>

  .content{
    background: #fff;
    padding: 0 10px;

    .move{
       cursor: move;
    }

    .editTable  /deep/ .el-table__row td{
        padding: 4px 0;
    }

    /deep/ .el-card__header{
      padding: 10px 20px;
    }

    /deep/ .el-card__body{
      padding: 10px 20px;
    }
  }




</style>