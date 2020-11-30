<template>
  <div class="content">
      <fd-edit-table-form :field="field" :rows="rows" ></fd-edit-table-form>  
  </div>
</template>

<script>
import EditTableForm  from '@/components/Common/EditTableForm.vue'
export default {
  name: 'Search',
  components: {
    FdEditTableForm:EditTableForm
  },
  data () {
    return {
      field:[{
          prop: 'text',
          label: '名称',
          width: '180',
          type: 'select',
          options: [{
            label: '新增',
            value: 'add'
          },{
            label: '下载',
            value: 'down'
          },{
            label: '上传',
            value: 'upload'
          }],
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
      rows:[],
      condition: []
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
}
</script>

<style lang="less" scoped>

  .content{
    background: #fff;
    padding: 0 10px;
    .text{
      float: right;
      padding-top: 3px;
    }
    .rows{
      padding-bottom: 10px;
      border-bottom: 1px dotted #ccc;
      margin: 10px;
    }
  }


</style>