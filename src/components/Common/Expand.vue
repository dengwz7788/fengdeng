<template>
  <!--
	<el-tabs type="border-card">
		<el-tab-pane label="控件设置">
			<el-form :model="ruleForm" ref="ruleForm" label-width="150px" size="small" label-position="left">
				<el-form-item label="类型" prop="resource">
					 <el-radio-group v-model="ruleForm.resource">
						<el-radio label="singleline">单行</el-radio>
						<el-radio label="multiline">多行</el-radio>
						<el-radio label="password">密码</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="是否可清空" prop="isclear">
					<el-switch v-model="ruleForm.isclear"></el-switch>
				</el-form-item>
				<el-form-item label="占位文本" prop="placeholder">
					<el-input v-model="ruleForm.placeholder" placeholder="请输入内容"></el-input>
				</el-form-item>
				<el-form-item label="最大输入长度" prop="num">
					<el-input-number v-model="ruleForm.num" :min="1" :max="9999" label="描述文字"></el-input-number>
				</el-form-item>
			</el-form>
		</el-tab-pane>
		<el-tab-pane label="默认值">默认值</el-tab-pane>
		<el-tab-pane label="校验规则">校验规则</el-tab-pane>
		<el-tab-pane label="依赖设置">依赖设置</el-tab-pane>
		<el-tab-pane label="样式设置">样式设置</el-tab-pane>
	</el-tabs>
   -->

   <fd-MonacoEditor v-if="type == 'code'" :code="value" @inputcode="inputcode"></fd-MonacoEditor>
	
</template>
<script>
	import MonacoEditor from './MonacoEditor'
	import bus from '@/util/bus'
	export default {
		name: 'Expand',
		components: {
			FdMonacoEditor: MonacoEditor
		},
		inject: ['checkrows'],
		data(){
			return {
				rows: {},
				type: '',
				value: '',
			}
		},
		watch:{
			rows(value, oldevlaue) {
				console.log("value", value, oldevlaue);
			}
		},
		mounted(){
			this.rows = this.checkrows()
			let { expand } = this.rows
			this.type = expand.type
			this.value = expand.value
			
		},
      	methods: {
			inputcode(code){
				this.value = code
				this.rows.expand.value = code
				bus.$emit('code', this.rows);
				console.log("rows", this.rows)
			}
      	}
	}
</script>

<style scoped>
</style>