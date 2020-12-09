<template>
	<div class="tools">
		<div class="top">
			<el-row>
				<el-col :span="4">
						<el-select size="mini" v-model="options.theme" placeholder="选择风格">
							<el-option
							v-for="item in theme"
							:key="item.value"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select>
				</el-col>
				<el-col :offset="14" :span="3">
					<el-button plain size="mini" icon="el-icon-s-order">格式化</el-button>
			 	</el-col>
				<el-col :span="3">
					<el-button plain size="mini" icon="el-icon-full-screen">全屏</el-button>
				</el-col>
			</el-row>
		</div>
		<MonacoEditor
			height="300"
			width="100%"
			style="border:1px solid #ccc"
			:code="code2"
			:key="key"
			:options="options"
			:highlighted="highlightLines"
			:changeThrottle="500"
			:theme="options.theme"
			@mounted="onMounted"
			@codeChange="onCodeChange"
		>
        </MonacoEditor>
	</div>
</template>
<script>
	import MonacoEditor from 'vue-monaco-editor'	
	export default {
		name: 'Tools',
		data() {
            return {
				code2: '',
				editor:null,
                options: {
                    theme: "vs-dark",
                    selectOnLineNumbers: true,
                    roundedSelection: false,
                    readOnly: false,
                    automaticLayout: true,
                    glyphMargin: true,
                    showFoldingControls: "always",
                    formatOnPaste: true,
                    formatOnType: true,
                    folding: true,
				},
				highlightLines: [{
					number: 0,
					class: 'primary-highlighted-line'
				},{
					number: 0,
					class: 'secondary-highlighted-line'
				}],
				theme: [
					{
						label: 'vs经典主题',
						value: 'vs'
					},
					{
						label: 'vs白色主题',
						value: 'vs-dark'
					},
					{
						label: 'vs黑色主题',
						value: 'hc-dark'
					}
				],
            }
		},
		props:{
			code: {
				type: String,
				default: ""
			}
		},
		components: {
            MonacoEditor
        },
		mounted(){		
			this.code2 = this.code
			console.log("code2", this.code2)
		},
      	methods: {
			onMounted (editor) {
				this.editor = editor;

				// let code = localStorage.getItem("code")
				// console.log(this.code2)
				// this.editor.setValue(this.code2)

				// setInterval(() => {
				// 	console.log("自我保存了")
				// 	localStorage.setItem("code", this.code2)
				// }, 3000);
            },

            onCodeChange(editor) {
				this.code2 = editor.getValue()
				this.$emit("inputcode", this.code2)
			},
      	}
	}
</script>

<style scoped>
	.tools{
		width: calc(100% - 20px);
		background: #fff;
		margin: 0 auto;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
	}

	.tools .top{
		font-size: 12px;
		padding: 10px;
	}
</style>