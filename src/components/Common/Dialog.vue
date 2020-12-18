<template>
    <el-dialog :title="title" :visible.sync="show" width="80%">
        <fd-edit-table-form :key="keyNum" v-if="tableType === 'editTable'" :field="field" :rows="gridData" :expand="false" :move="false"></fd-edit-table-form>
        <fd-table :key="keyNum" v-else :field="field" :rows="gridData"></fd-table>
        <div class="footer" v-if="addBotton">
            <el-button type="primary" size="mini" @click="onSubmit">提交</el-button>
        </div>
    </el-dialog>
</template>
<script>
    import EditTableForm  from './EditTableForm'
    import Table  from './Table'
	export default {
        name: 'Dialog',
        components: {
            FdEditTableForm: EditTableForm,
            FdTable: Table
		},
		props:{
            tableType: {
                type: String,
				default: 'editTable'
            },
			title: {
				type: Array,
				default: function(){
					return []
				}
            },
            keyNum:{
                type: Number,
				default: 0
            },
            show:{
                type: Boolean,
				default: false
            },
            addBotton:{
                type: Boolean,
				default: true
            },
            gridData:{
                type: Array,
				default: function(){
					return []
				}
            },
            field:{
                type: Array,
				default: function(){
					return []
				}
            }
		},
		data() {
			return {
       
			}
    	},
      	methods: {
			onSubmit() {
                this.$emit("onSubmit", this.gridData)
      		}
      	}
	}
</script>

<style lang="less" scoped>

    .el-dialog__wrapper {
        /deep/ .el-dialog__body{
            padding: 10px 0;
        }

        /deep/ .el-dialog__header{
            padding: 10px 20px 10px;
            border-bottom: 1px solid #eee;
        }

        /deep/ .el-dialog__title{
            font-size:14px;
            line-height:0
        }

        /deep/ .el-dialog__headerbtn{
            top: 15px;
        }

        .footer{
            float: right;
            position: relative;
            top: -40px;
            right: 10px;
        }
    }
    

</style>