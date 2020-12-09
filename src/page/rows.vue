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
              label: '按钮类型',
              type: 'select',
              options: [{
                  label: '主要',
                  value: 'primary'
                },{
                  label: '成功',
                  value: 'success'
                },{
                  label: '警告',
                  value: 'warning'
                },{
                  label: '危险',
                  value: 'danger'
                },{
                  label: '文本',
                  value: 'text'
              }],
            },{
              prop: 'show',
              label: '是否显示',
              type: 'switch'
      }]
    }
  },
  props:{
    rows:{
				type: Array,
        default: function(){
          return []
        }
    }
  },
  inject: ['fieldArr'],
  async mounted(){
    // 自行字符串函数，暂时是可用性的
    // let code = localStorage.getItem("code")
    // eval("("+code+")();");
    // console.log("this2", this)

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