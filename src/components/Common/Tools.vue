<template>
	<div class="tools">
		<el-menu
			size="mini"
			default-active="2"
			class="el-menu-vertical-demo"
			@open="handleOpen"
			@close="handleClose">
			<el-menu-item index="1">
				<i class="el-icon-tickets"></i>
				<span slot="title">文章_列表页</span>
			</el-menu-item>
			<el-menu-item index="2">
				<i class="el-icon-document-add"></i>
				<span slot="title">文章_编辑页</span>
			</el-menu-item>
			</el-menu>
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

<style scoped>
	.tools{
		font-size: 12px!important;
		width: calc(100% - 20px);
		background: #fff;
		margin: 0 auto;
		height: 503px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
	}
</style>