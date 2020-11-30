<template>
	<el-form :inline="true" :model="formInline" label-position="right" label-width="80px"  size="small" class="demo-form-inline">
	<el-form-item label="名称">
		<el-input v-model="formInline.user" placeholder="名称" clearable></el-input>
	</el-form-item>
	<el-form-item label="代码">
		<el-input v-model="formInline.user" placeholder="名称" clearable></el-input>
	</el-form-item>
	<el-form-item label="数据类型">
		<el-input v-model="formInline.user" placeholder="名称" clearable></el-input>
	</el-form-item>
	<el-form-item label="有效期">
		<fd-date-range></fd-date-range>
	</el-form-item>
	</el-form>
</template>
<script>
    import { DateRange }  from '@/components/UI/'
	export default {
		name: 'Search',
		components: {
			FdDateRange: DateRange
		},
		data() {
			return {
				formInline: {
					user: '',
					region: ''
				}
			}
    	},
      	methods: {
			onSubmit() {
        		console.log('submit!');
      		}
      	}
	}
</script>

<style scoped>

</style>