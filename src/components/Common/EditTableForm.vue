<template>
  <div class="content">
        <div class="text item">
                <el-table :data="rows" size="mini" >
                  <el-table-column v-for="(item,key) in field" :prop="item.prop"  :label="item.label" :width="item.width" :key="key">
                    <template slot-scope="scope">
                        <div v-if="!editstatus[scope.$index + item.prop]" @dblclick="edit(scope)">
                            <i class="el-icon-edit"></i>{{formatter(scope.row[item.prop], scope)}}
                        </div>
                        <div v-else>
                          <el-input v-if="item.type === 'text'" :ref="'field' + scope.$index + item.prop" @blur="edit(scope)" v-model="scope.row[item.prop]" size="mini"></el-input>
                          <el-select v-else-if="item.type === 'select'" item.property v-model="scope.row[item.prop]" @change="edit(scope)" size="mini" placeholder="选择打开类型">
                            <el-option
                              v-for="item in item.options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="op"  label="操作" header-align="center" width="100" align="center">
                      <template slot-scope="scope">
                          <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index)">删除</el-button>
                      </template>
                  </el-table-column>
                </el-table>
        </div>
        <div class="text item" style="padding: 10px 0;">
            <el-button size="mini" icon="el-icon-plus" @click="addBotton">新增新按钮</el-button>
        </div>
  </div>
</template>

<script>
export default {
  name: 'EditTableForm',
  props:{
    rows:{
        type: Array,
        default: function(){
          return []
        }
    },
    field: {
       type: Array,
        default: function(){
          return []
        } 
    }
  },
  data () {
    return {
        editstatus:{},
        addTemp:{}
    }
  },
  async created(){
     this.field.forEach( item => {
          this.$set(this.addTemp, item.prop,"")
     })
  },
  mounted() {
    
  },
  methods: {
      edit(rows){
        let { $index, column } = rows
        this.$set(this.editstatus, $index + column.property, !this.editstatus[$index + column.property])
        this.$nextTick( () =>{
            if(this.$refs['field' + $index + column.property] && this.$refs['field' + $index + column.property].length > 0){
              this.$refs['field' + $index + column.property][0].$refs.input.focus()
            } 
        })
      },

      addBotton(){
         this.rows.push(this.addTemp)
      },
      
      deleteRow(index){
        this.rows.splice(index,1)
      },

      formatter(value, scope){
        let { column } = scope
        let row = this.field.find( it => {
           return it.prop === column.property ? it.type : false
        })

        if(row && row.type === "select"){
            if(row.options){
                let tmp = row.options.find( item => item.value === value );
                return tmp && tmp.label
            }else{
              return ''
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

    /deep/ .el-card__header{
      padding: 10px 20px;
    }

    /deep/ .el-card__body{
      padding: 10px 20px;
    }
  }




</style>