<template>
	<el-select @change="change" @blur="blur" v-model="childValue" size="small" placeholder="请选择">
		<el-option
			v-for="item in options"
			:key="item.value"
			:label="item.label"
			:value="item.value">
		</el-option>
	</el-select>
</template>
<script>
	export default {
      	name: 'FdSelect',
      	props: {
            options:{
                type: Array,
                default: function(){
					return []
				},
			},
			value: {
				type: String,
                default: ''
			}
        },
      	data(){
      		return{
				childValue: '',
      		}
      	},
      	mounted () {
			this.childValue = this.value
      	},
      	methods: {
			change(value){
				let optionname = this.options.find( i => i.value == value ).label
				this.$emit('change', {value, optionname});
			},

			blur(){
			  this.$emit("blur");
			}
      	}
	}
</script>