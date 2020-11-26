<template>
    <el-switch
        v-model="childStatus"
		@change="updateStatue"
        active-color="#13ce66"
        inactive-color="#ccc">
    </el-switch>
</template>
<script>
	export default {
      	name: 'FdSwitch',
      	props: {
            status:{
                type: Boolean,
                default: false,
            }
        },
      	data(){
      		return{
				childStatus: true,
      		}
      	},
      	mounted () {
      		this.childStatus = this.status
      	},
      	methods: {
			updateStatue(){
                this.$emit("change", !this.childStatus);
            }
      	}
	}
</script>