<template>
	<el-dialog
		title="管理员登陆"
		:visible.sync="centerDialogVisible"
		:show-close="false"
		:close-on-press-escape="false"
		:close-on-click-modal="false"
		width="60%">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="账号" prop="name">
				<el-input v-model="ruleForm.name"></el-input>
			</el-form-item>

			<el-form-item label="密码" prop="name">
				<el-input type="password" v-model="ruleForm.password"></el-input>
			</el-form-item>
			
			<el-form-item>
    			<el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
  			</el-form-item>
</el-form>
		</el-dialog>
</template>
<script>
	export default {
		name: 'Login',
		components: {
			
		},
		props:{
		},
		data() {
			return {
			rules: {
				name: [
					{ required: true, message: '请输入账号', trigger: 'blur' },
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
				]
			  },
			ruleForm: {
				name: '',
				region: ''
			},
			centerDialogVisible: true
			}
    	},
      	methods: {
		   submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
      	}
	}
</script>