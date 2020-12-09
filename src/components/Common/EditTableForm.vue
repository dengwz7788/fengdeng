<template>
  <div class="content">
        <div class="text item">
              <el-table 
                class="editTableForm"
                :data="rows" 
                size="small" 
                row-key="text"
                border 
                :cell-style="cellStyle"
                @expand-change="exChange"
                >
                  <el-table-column label="" width="50" header-align="center" align="center">
                    <template slot-scope="scope">
                        <i class="el-icon-rank"></i>
                    </template>
                  </el-table-column>
                  <el-table-column label="" width="50" type="expand" header-align="center">
                      <template slot-scope="scope">
                          <fd-expand :expand="rows[scope.$index].expand"></fd-expand>
                      </template>
                  </el-table-column>
                  <el-table-column v-for="(item,key) in field" :prop="item.prop"  :label="item.label" :width="item.width" :key="key">
                    <template slot-scope="scope">
                        <div v-if="!editstatus[scope.$index + item.prop] && item.type !== 'switch'" @dblclick="edit(scope)">
                            <i class="el-icon-edit"></i>{{formatter(rows[scope.$index][item.prop], scope)}}
                        </div>
                        <div v-else>
                          {{scope.rows}}
                          <el-input v-if="item.type === 'text'" :ref="'field' + scope.$index + item.prop" @blur="edit(scope)" v-model="rows[scope.$index][item.prop]" size="mini"></el-input>
                          <fd-switch v-else-if="item.type === 'switch'"  @change="changeBoolean(scope.row, $event, item.prop)" :status="rows[scope.$index][item.prop]"></fd-switch>
                          <el-select v-else-if="item.type === 'select'" v-model="rows[scope.$index][item.prop]" @change="edit(scope)" size="mini" placeholder="选择打开类型">
                            <el-option
                              v-for="item in item.options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                              :disabled="item.disabled">
                            </el-option>
                          </el-select>
                          <el-select v-else-if="item.type === 'multiple'"  multiple v-model="rows[scope.$index][item.prop]" @visible-change="editchange(scope,$event)" size="mini" placeholder="选择打开类型">
                            <el-option
                              v-for="item in item.options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                              :disabled="item.disabled">
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
import Sortable from 'sortablejs'
import util from '@/util/util'
import { Switch, Select }  from '@/components/UI/'
import Expand  from '@/components/Common/Expand.vue'
import bus from '@/util/bus'
export default {
  name: 'EditTableForm',
  components: {
    FdExpand:Expand,
    FdSwitch: Switch,
    FdSelect: Select,
  },
  provide () {
			return {
        checkrows: () => this.checkrows
			}
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
        editstatus:{},
        addTemp:{},
        checkrows: [],
        expanded: [] // 正在被expand的表格单元列表
    }
  },
  async created(){
     
     this.field.forEach( (item,key) => {
        this.$set(this.addTemp, item.prop, '')
     })

    bus.$on('code', (e) => {
      this.rows.find( (item, key) => {
          if(item.text === e.text){
              this.rows[key] = e // 浅赋值
          }
      })
    })
  },
  mounted() {
    this.rowDrop()
  },
  methods: {

      exChange(row, expanded) {
        this.checkrows = row
      },
      //行拖拽
      rowDrop() {
        const tbody = document.querySelector('.editTableForm .el-table__body-wrapper tbody')
        const vm = this
        Sortable.create(tbody, {
            draggable: '.el-table__row',
            onEnd({ newIndex, oldIndex }) {
              const currRow = vm.rows.splice(oldIndex, 1)[0]
              vm.rows.splice(newIndex, 0, currRow)
            }
          })
      },

      edit(scope, e){

        let { $index, column } = scope
        this.$set(this.editstatus, $index + column.property, !this.editstatus[$index + column.property])
        this.$nextTick( () => {
            if(this.$refs['field' + $index + column.property] && this.$refs['field' + $index + column.property].length > 0){
              this.$refs['field' + $index + column.property][0].$refs.input.focus()
            }
        })
      },

      changeBoolean(row,e, field){
          console.log("field", row,field, e)
          row[field] = e
      },


      editchange(scope, event){
        if(!event){
          let { $index, column } = scope
          this.$set(this.editstatus, $index + column.property, !this.editstatus[$index + column.property])
        }
        
      },

      addBotton(){
        let tmp = util.deepCopy(this.addTemp);
        this.rows.push(tmp)
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
                return (tmp && tmp.label) || "双击编辑"
            }else{
              return value || '双击编辑'
            }
        }else if(row && row.type === "multiple"){
          return value && value.join(",") || '双击编辑'
        }else{
           return value || '双击编辑'
        }
      },

      cellStyle({row, column, rowIndex, columnIndex}){
          if(columnIndex === 0){
              return "cursor: move"
          }
      }
  }
}
</script>

<style lang="less" scoped>

  .content{
    background: #fff;
    padding: 0 10px;

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