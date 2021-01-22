<template>
  <div class="content">
     <div>
        <el-table
          class="editTable"
          :data="field"
          size="small"
          row-key="index"
          :cell-style="cellStyle"
          @expand-change="exChange"
          border>
          <el-table-column label="" width="50" header-align="center" align="center">
            <template slot-scope="scope">
                  <i class="el-icon-rank"></i>
            </template>
          </el-table-column>
          <el-table-column label="" width="50" type="expand" header-align="center">
              <template slot-scope="props">
                  <fd-expand :expand="props.row.expand"></fd-expand>
              </template>
          </el-table-column>
          <el-table-column label="字段名" width="180" header-align="center">
              <template slot-scope="scope">
                  <div v-if="scope.row.awaitfield" @dblclick="edit(scope.row,'awaitfield')"><i class="el-icon-edit"></i>{{scope.row.fieldname}}</div>
                  <el-input ref="field" @blur="edit(scope.row, 'awaitfield')" v-else v-model="scope.row.fieldname" size="small" placeholder="请输入字段"></el-input>
              </template>
          </el-table-column>
          <el-table-column label="中文名" header-align="center">
              <template slot-scope="scope">
                  <div v-if="scope.row.awaitedit" @dblclick="edit(scope.row,'awaitedit')"><i class="el-icon-edit"></i>{{scope.row.name}}</div>
                  <el-input ref="field" @blur="edit(scope.row, 'awaitedit')" v-else v-model="scope.row.name" size="small" placeholder="请输入中文名"></el-input>
              </template>
          </el-table-column>
          <el-table-column  prop="type" label="控件类型" header-align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.awaitselect" @dblclick="edit(scope.row, 'awaitselect')"><i class="el-icon-edit"></i>{{scope.row.optionname}}</div>
              <fd-select @change="change(scope.row, $event, 'type')" v-else :value="scope.row.type" :options="options"></fd-select>
            </template>
          </el-table-column>
          <el-table-column prop="isshow" label="是否显示" header-align="center" align="center" width="80">
            <template slot-scope="scope">
                <fd-switch @change="changeBoolean(scope.row, $event, 'isshow')" :status="scope.row.isshow"></fd-switch>
              </template>
          </el-table-column>
          <el-table-column prop="issearch" label="是否搜索" header-align="center" align="center" width="80">
            <template slot-scope="scope">
                <fd-switch @change="changeBoolean(scope.row, $event, 'issearch')" :status="scope.row.issearch"></fd-switch>
              </template>
          </el-table-column>
          <el-table-column prop="isrequire" label="是否必填" header-align="center" align="center" width="80">
            <template slot-scope="scope">
              <fd-switch  @change="changeBoolean(scope.row, $event, 'isrequire')" :status="scope.row.isrequire"></fd-switch>
              </template>
          </el-table-column>
          <el-table-column prop="isedit" label="允许修改" header-align="center" align="center" width="80">
            <template slot-scope="scope">
                <fd-switch  @change="changeBoolean(scope.row, $event, 'isedit')" :status="scope.row.isedit"></fd-switch>
              </template>
          </el-table-column>
          <el-table-column prop="op"  label="操作" header-align="center" width="100" align="center">
              <template slot-scope="scope">
                  <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index)">删除</el-button>
              </template>
          </el-table-column>
        </el-table>
     </div>
     <div class="footer">
        <el-button  size="small" @click="add">新增字段</el-button>
     </div>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
import { Switch, Select }  from '@/components/UI/'
import Expand  from '@/components/Common/Expand.vue'
import util from '@/util/util'
export default {
  name: 'TableEdite',
  props:{
    field: {
       type: Array,
        default: function(){
          return []
        } 
    }
  },
  provide () {
			return {
        checkrows: () => this.checkrows
			}
	},
  components: {
    FdSwitch: Switch,
    FdSelect: Select,
    FdExpand:Expand
  },
  data () {
    return {
      key: 0,
      options: [{
        value: 'text',
        label: '文本输入框'
      },{
        value: 'select',
        label: '下拉选择框'
      },{
        value: 'texteare',
        label: '富文本输入框'
      },{
        value: 'checkbox',
        label: '多选框'
      },{
        value: 'radio',
        label: '单选框'
      }],
      checkrows: [],
      fieldTpl: {
        index: 0,
        fieldname: '',
        name: '双击修改',
        optionname: '文本输入框',
        type: 'text',
        awaitfield:true,
        awaitedit: true,
        awaitselect: true,
        isshow: true,
        isrequire: false,
        isedit: true,
        op: '',
        expand: {
          type: "code",
          value: ''
        }
      }
    }
  },
  async created(){

   // this.getFieldByUrl()
  },
  mounted() {
    this.rowDrop()
  },
  methods: {
    add(){
        this.field.push(this.fieldTpl)
    },

    exChange(row, rowList) {
        this.checkrows = row
    },

    deleteRow(index){
      this.field.splice(index,1)
    },

    async getFieldByUrl(){

      let { succ , result  } = await this.$httpExt.post(
        'http://10.206.106.60:8080/backweb/dataDictType/list',{}, 
        {
        	withCredentials:true
        });
      
      if(succ === 'ok' && result.length > 0){
        let tmp = result[0]
          for (const key in tmp) {
            if (tmp.hasOwnProperty(key)) {  
              this.field.push(  util.merge(this.fieldTpl, { fieldname: key }) )
            }
          }
      }
    },

    //行拖拽
    rowDrop() {
      const tbody = document.querySelector('.el-table__body-wrapper tbody')
      const vm = this
      Sortable.create(tbody, {
          draggable: '.el-table__row',
          onEnd({ newIndex, oldIndex }) {
            const currRow = vm.field.splice(oldIndex, 1)[0]
            vm.field.splice(newIndex, 0, currRow)
          }
        })
    },

    edit(rows, type = "awaitedit"){
      rows[type] = !rows[type]
      this.$nextTick( () =>{
        this.$refs['field'] && this.$refs['field'].$refs.input.focus()
      })
    },

    change(row,e){
        row.type = e.value
        row.optionname = e.optionname
        row.awaitselect = !row.awaitselect
    },

    changeBoolean(row,e, field){
          row[field] = e
    },

    cellStyle({row, column, rowIndex, columnIndex}){
          if(columnIndex === 0){
              return "cursor: move"
          }
    }
  }
}
</script>

<style scoped>

  .content{
    background: #fff;
    padding: 0 10px;
  }

  .editTable  /deep/ .el-table__row td{
      padding: 4px 0;
  }

  .header{
    height: 20px;
    padding-bottom: 10px;
    padding-left: 5px;
    text-align: left;
    color: #000;
    background: #fff;
    margin-bottom: 10px;
  }
  
  .header .title{
    padding-left: 5px;
  }

  .footer{
     padding-top:10px;
     text-align: right;
  }
</style>