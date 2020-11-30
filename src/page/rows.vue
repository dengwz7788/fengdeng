<template>
  <div class="content">
        <fd-edit-table-form :field="field" :rows="rows" ></fd-edit-table-form>
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
              type: 'multiple',
              option: []
            }],
        rows:[]
    }
  },
  inject: ['fieldArr'],
  async mounted(){
    
    setTimeout(() => {
      let field = this.fieldArr() || []
      this.condition = field.map( item => {
          return {
              label: item.name,
              value: item.fieldname
          }
      })

      this.field = this.field.map( item => {
          if(item.prop === "condition"){
              item.options = this.condition
          }
          return item
      })

    },0)
   
  },
  methods: {
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
    /deep/ .el-table__empty-block{
       min-height: 45px
    }
  }




</style>