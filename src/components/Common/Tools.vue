<template>
	<div class="tools">
		<el-tabs type="border-card">
			<el-tab-pane>
				<span slot="label"><i class="el-icon-document"></i> 页面管理</span>
			</el-tab-pane>
			<el-tab-pane>
				<span slot="label"><i class="el-icon-setting"></i> 项目设置</span>
			</el-tab-pane>
		</el-tabs>	
	</div>
</template>
<script>
	export default {
		name: 'Tools',
		data() {
            return {
            }
        },
		components: {    
        },
		mounted(){		
		},
        methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>

<style lang="less" scoped>
	.tools{
		font-size: 12px!important;
		margin: 0 auto;
		height: 503px;
		background: #fff;
	}
	.el-tabs--border-card{
		box-shadow: none;
		border-right: none;
	}

	.toolslist{
		background: #fff;
		height: 100%;
	}
</style>