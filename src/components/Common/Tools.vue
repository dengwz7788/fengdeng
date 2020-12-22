<template>
	<div class="tools">
		<el-tabs type="border-card">
			<el-tab-pane>
				<span slot="label"><i class="el-icon-document"></i> 页面管理</span>
				<div>
					<el-tree
					:data="data"
					node-key="id"
					default-expand-all
					@node-drag-start="handleDragStart"
					@node-drag-enter="handleDragEnter"
					@node-drag-leave="handleDragLeave"
					@node-drag-over="handleDragOver"
					@node-drag-end="handleDragEnd"
					@node-drop="handleDrop"
					draggable
					:allow-drop="allowDrop"
					:allow-drag="allowDrag">
						<span class="custom-tree-node" slot-scope="{ node, data }">
							<span class="left" @click="openconfig(node)">
								<i :class="data.icon"></i><span class="text">{{ node.label }}</span>
							</span>
							<span class="right">
								<i class="el-icon-edit" @click="() => edit(data)"></i>
								<i class="el-icon-delete" @click="() => remove(node, data)"></i>
							</span>     
						</span>
					</el-tree>
				</div>
				<div class="footer">
					<el-button icon="el-icon-plus" size="mini" @click="addMenu">添加菜单</el-button>
				</div>
			</el-tab-pane>
		</el-tabs>	
        <el-dialog title="新建菜单" :visible.sync="show" width="40%" append-to-body>
            <fd-form :formlayout="formlayout" :ruleForm="ruleForm"  @onSubmit="onSubmit"></fd-form>
        </el-dialog>
	</div>
</template>
<script>
	import Form  from './Form'
	import bus from '@/util/bus'
	export default {
		name: 'Tools',
		data() {
            return {
				data: [{
					id: 1,
					label: '仓储价格',
					icon: 'el-icon-s-shop',
					children: [{
						id: 2,
						label: '操作费价格',
					},{
						id: 3,
						label: '仓租费价格',
					},{
						id: 4,
						label: '增值服务管理',
					}]
				}],
				show:false,
				formlayout:[{
					type: 'select',
					name: 'pid',
					label: '父菜单',
					placeholder: '请选择',
					option:[{
						label: '顶级菜单',
						value: 0
					},{
						label: '仓储价格',
						value: 1
					}]
				},{
					type: 'input',
					name: 'label',
					label: '菜单名称',
					placeholder: '输入菜单名称',
				},{
					type: 'input',
					name: 'icon',
					label: 'icon',
					placeholder: 'el-icon-*',
				},{
					type: 'switch',
					name: '状态',
					label: '显示',
				}],
				ruleForm: []
			};
        },
	  	components: {
			FdForm: Form
		},
		mounted(){		
		},
        methods: {
			onSubmit(data){
				let { pid, icon, label }  = data
				if(pid > 0){
					this.data.find( (item,key) => {
						if(item.id === pid){
							this.data[key].children.push({
								id: this.data[key].children.length + 1,
								label: label,
								icon: icon,
								pid: pid
							})
						}
					})
				}else{
					this.data.push({
						pid: 0,
						id: this.data.length + 1,
						label: label,
						icon: icon
					})
				}
				
				this.show = false
			},
			addMenu(){
				this.ruleForm = {}
				this.show = true
			},
			remove(node, data){
				const parent = node.parent;
				const children = parent.data.children || parent.data;
				const index = children.findIndex(d => d.id === data.id);
				children.splice(index, 1);
			},
			edit(data){
				this.ruleForm = data
				this.show = true
			},
			openconfig(node){
				bus.$emit('openpage', node.data)
				console.log("node", node)
			},
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			handleDragStart(node, ev) {
				console.log('drag start', node);
			},
			handleDragEnter(draggingNode, dropNode, ev) {
				console.log('tree drag enter: ', dropNode.label);
			},
			handleDragLeave(draggingNode, dropNode, ev) {
				console.log('tree drag leave: ', dropNode.label);
			},
			handleDragOver(draggingNode, dropNode, ev) {
				console.log('tree drag over: ', dropNode.label);
			},
			handleDragEnd(draggingNode, dropNode, dropType, ev) {
				console.log('tree drag end: ', dropNode && dropNode.label, dropType);
			},
			handleDrop(draggingNode, dropNode, dropType, ev) {
				console.log('tree drop: ', dropNode.label, dropType);
			},
			allowDrop(draggingNode, dropNode, type) {
				if (dropNode.data.label === '二级 3-1') {
				return type !== 'inner';
				} else {
				return true;
				}
			},
			allowDrag(draggingNode) {
				return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
			}
		}
	}
</script>

<style lang="less" scoped>
	.tools{
		font-size: 12px!important;
		margin: 0 auto;
		background: #fff;
		height: calc(100% - 58px);
		.custom-tree-node{
			width: 100%;
			font-size: 13px;
			.left{
				float: left;
				.text{
				   padding-left: 5px;
				}
			}
			.right{
				float: right;
			}
		};
		.footer{
			margin: 10px auto;
			text-align: center;
		}
	}
	.el-tabs--border-card{
		box-shadow: none;
		border-right: none;
		height: 100%;
	}

</style>