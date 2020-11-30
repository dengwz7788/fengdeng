<template>
	<div class="block">
			<el-date-picker
				v-model="beginDate"
				type="datetime"
				:pickerOptions="pickerOptions"
				value-format="timestamp"
				@focus="changeDate('beginDate')"
				placeholder="开始时间">
			</el-date-picker>
			<el-date-picker
				v-model="endDate"
				type="datetime"
				:pickerOptions="pickerOptions"
				value-format="timestamp"
				@focus="changeDate('endDate')"
				placeholder="结束时间">
			</el-date-picker>
  	</div>
</template>
<script>
	export default {
      	name: 'FdDateRange',
      	props: {
        },
      	data(){
      		return{
				beginDate: '',
				endDate: '',
				currentChangeDate: 'begin',
				pickerOptions: {
					disabledDate: (time) => {
						return this.dealDisabledDate(time);
					}
				},
      		}
		},
      	methods: {
			dealDisabledDate(time) {	
				// beginDate, endDate 两个条件可能出现的情况
				// 	  beginDate  endDate 
				// 1	存在     不存在   time < begin
				// 2    存在     存在     end > time > begin 
				// 3    不存在   存在     end > time
				// 4    不存在   不存在   false
				let { beginDate, endDate, currentChangeDate } = this
				let times = time.getTime()

				if(beginDate && !endDate){
					return currentChangeDate === "endDate" ? times < beginDate : false
				}else if(beginDate && endDate){
					if(currentChangeDate === "beginDate"){
						return endDate < times 
					}else if(currentChangeDate === "endDate"){
						return time < beginDate
					}else{
						return endDate < times || time < beginDate
					}	
				}else if(!beginDate && endDate){
					return currentChangeDate === "beginDate" ? endDate < times : false
				}else{
					return false
				}
			},

			changeDate(dateName){
			   console.log("dateName", dateName)
			   this.currentChangeDate = dateName
			}	
      	}
	}
</script>