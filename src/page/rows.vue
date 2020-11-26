<template>
  <div class="content">
      <el-card class="box-card" style="margin-bottom:10px;">
        <div slot="header" class="clearfix">
          <span>设置行操作设置</span>
        </div>
        <fd-edit-table-form :field="field" :rows="rows" ></fd-edit-table-form>
      </el-card>
  </div>
</template>

<script>
import EditTableForm  from '@/components/Common/EditTableForm.vue'
export default {
  name: 'Rows',
  components: {
    FdEditTableForm: EditTableForm
  },
  data () {
    return {
        field:[{
              prop: 'text',
              label: '名称',
              width: '180',
              type: 'text'
            },{
              prop: 'type',
              label: '类型',
              width: '180',
              type: 'select',
              options: [{
                  label: '配置系统页面',
                  value: 'sys_page'
                },{
                  label: '打开指定URL',
                  value: 'url'
              }],
            },{
              prop: 'url',
              label: 'URL',
              width: '180',
              type: 'text'
            },{
              prop: 'condition',
              label: '条件',
              type: 'select',
              property: 'multiple',
              option: []
            }],
        rows:[]
    }
  },
  async created(){
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
         this.rows.push({
            text: '双击编辑',
            type: 'url',
            url: '',
            condition: ''
         })
      },
      
      deleteRow(index){
        this.rows.splice(index,1)
      },
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