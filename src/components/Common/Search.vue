<template>
	<el-form :inline="true" :model="formInline" label-position="right" label-width="80px"  size="small">
	<el-form-item v-for="(item, key) in search" :label="item.name" :key="key">
		<el-input 
			v-if="item.type === 'text'" 
			v-model="formInline[item.fieldname]" 
			:placeholder="item.placeholder" 
			clearable>
		</el-input>
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
		props:{
			search: {
				type: Array,
				default: function(){
					return []
				}
			}
		},
		data() {
			return {
				formInline: {
				}
			}
    	},
      	methods: {
			onSubmit() {

        		console.log('formInline', this.formInline);
      		}
      	}
	}
</script>

<style scoped>

</style>