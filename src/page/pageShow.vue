<template>
  <div class="content">
     
      <div class="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>字典管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="search">
        <fd-search></fd-search>
      </div>
      <div class="tools">
          <div class="right">
            <el-button size="small" type="primary">查询</el-button>
            <el-button size="small">重置</el-button>
          </div>

          <div class="left">
            <el-button type="primary" size="small">新增</el-button>
            <el-button size="small">导入</el-button>
            <el-button size="small">导出</el-button>
          </div>
      </div>
     <div>
        <el-table
          class="editTable"
          :data="tableData"
          size="small"
          @header-dragend="changeRowWidth"
          border>
            <el-table-column 
              v-for="(item, key) in field"
              :key="key"
              v-if="item.isshow"
              :label="item.name"
              :prop="item.fieldname"
              :width="item.width"
              header-align="center" 
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column 
              fixed="right"
              prop="op"  
              width="100"
              label="操作" 
              header-align="center" 
              align="center">
              <template slot-scope="scope">
                  <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index)">删除</el-button>
              </template>
          </el-table-column>
        </el-table>
        <div class="footer" v-if="total > 0">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 15, 20, 50]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
        </div>
     </div>
  </div>
</template>

<script>
import Search from '@/components/Common/Search.vue'
export default {
  name: 'PageShow',
  components: {
     FdSearch: Search
  },
  data () {
    return {
      tableData: [],
      field: [],
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  async created(){

    let data = await this.$httpExt.get('http://localhost:3000/dataDictType',{}, {
      	withCredentials:true
    });

    if(data.succ === "ok"){
      let fielStroageInfo = JSON.parse(localStorage.getItem("page")) || {}
      this.field =  data.result && data.result.map( item => {
           item.width = fielStroageInfo[item.fieldname]
           return item
      })

       console.log('fielStroageInfo', this.field);
    }

    this.fetchDataByUrl()
  },
  mounted() {
  
  },
  methods: {

    async fetchDataByUrl(){

      let vm = this
      let _obj = {
          pageNum: vm.currentPage,
          pageSize: vm.pageSize
      }

      let data2 = await this.$httpExt.post('http://10.206.106.60:8080/backweb/dataDictType/list',_obj);
      
      if(data2.succ === "ok"){
        this.tableData = data2.result
        this.total = data2.totalSize
      }
    },

    changeRowWidth(newWidth, oldWidth, column, event){

      // 获取缓存中的字段
      let localstroge = JSON.parse(localStorage.getItem("page")) || {}
      localstroge[column.property] = newWidth
      localStorage.setItem("page", JSON.stringify(localstroge))
      
    },

    handleSizeChange(val){
       this.pageSize = val
       this.fetchDataByUrl()
    },

    handleCurrentChange(val){
      this.currentPage = val
      this.fetchDataByUrl()
    },

    deleteRow(){

    }
  }
}
</script>

<style lang="less" scoped>

  .content{
    background: #fff;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }


  .editTable {
    margin-top: 10px;

    /deep/ .el-table__row td{
      padding: 4px 0;
    }

    /deep/ th.gutter {
      display: table-cell !important;
    }

    /deep/ thead th:last-child {
      text-align: center;
    }

    /deep/ colgroup.gutter {
      display: table-cell !important;
    }
  }

  .header{
    height: 20px;
    padding-bottom: 5px;
    padding-top: 5px;
    padding-left: 5px;
    text-align: left;
    color: #000;
    background: #fff;
    border-bottom: 1px solid #eee;
    margin-bottom: 10px;
  }

  .search{
     text-align: left;
     padding-top: 10px;
  }

  .tools{
     border-bottom: 2px dotted #ccc;
     height: 40px;
  }

  .tools .left{
      float: left;
      display: block;
      padding-bottom: 10px;
  }

  .tools .right{
    float: right;
    display: block;
    padding-bottom: 10px;
  }
  
  .header .title{
    padding-left: 5px;
  }

  .footer{
     padding-top:10px;
     text-align: right;
  }
</style>