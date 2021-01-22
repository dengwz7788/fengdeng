<template>
	<el-upload
		class="upload-demo"
		drag
		action="http://localhost:3000/uploadFieldByStep"
		:on-success="success"
		:on-error="error">
		<i class="el-icon-upload"></i>
		<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
		<div class="el-upload__tip" slot="tip">
			<el-tooltip 
				effect="dark" 
				content="上传文件成功之后，再点击该按钮完成数据入库" 
				placement="top">
					<el-button 
						@click="analyzing" 
						type="primary" 
						plain 
						size="small" 
						:disabled="disabled" 
						:loading="loading"
					>解析EXECL内容
					</el-button>
    		</el-tooltip>
		</div>
</el-upload>
</template>
<script>
    import { Loading } from 'element-ui';
	export default {
		name: 'Upload',
		components: {
			
		},
		props:{
		},
		data() {
			return {
				disabled: false,
				loading: false,
				textArr: [
					'已经发送解析内容请求',
					'正在努力解析Execl内容',
					'由于execl内容比较多，解析有点耗时',
					'请等待'
				]
			}
    	},
      	methods: {
			
			/*
			* 把文件上传和文件读取分成2部
			* 上传成功之后对按钮进行解禁，进行开放解析功能
			*/
			success(){
				this.disabled = false
			},
			
			/*
			* 文件处理失败
			*/
			error(){

			},

			/*
			* 分析文件
			*/
			analyzing(){
				let vm = this
				let options = {
					lock: true,
					text: vm.textArr[0],
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				};
				vm.loadingInstance = Loading.service(options);
				
				let i = 1
				let len = vm.textArr.length
				setInterval(
					function(){
						if( i >= len){
							i = 0
						}
						vm.loadingInstance.setText(vm.textArr[i])
						i++
					}, 3000);
				// setTimeout(() => {
				// 	vm.loadingInstance.setText('解析数据成功，正在存储');
				//    //	loading.close();
				// }, 2000);
			}
      	}
	}
</script>