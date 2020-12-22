<template>
  <div class="content">
      <el-form
        :model="ruleForm" 
        size="mini" 
        :rules="rules" 
        ref="ruleForm" 
        label-width="100px" 
        class="demo-ruleForm">

        <el-form-item v-for="(item,key) in formlayout" :key="key" :label="item.label" :prop="item.name">
            <el-input v-if="item.type=== 'input'" v-model="ruleForm[item.name]" :placeholder="item.placeholder"></el-input>
            <el-select v-else-if="item.type=== 'select'" v-model="ruleForm[item.name]" :placeholder="item.placeholder">
            <el-option
                v-for="item in item.option"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <fd-switch :status="ruleForm[item.name]" v-else-if="item.type=== 'switch'"></fd-switch>
            <el-checkbox-group v-else-if="item.type=== 'checkbox'" v-model="ruleForm[item.name]">
              <el-checkbox 
                v-for="(item,key) in item.option" 
                :key="key" 
                :label="item.label" 
                :name="item.value"></el-checkbox>
            </el-checkbox-group>
            <el-input v-else-if="item.type === 'textarea' " type="textarea" v-model="ruleForm[item.name]"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即发布</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
import { Switch, Select }  from '@/components/UI/'
export default {
  name: 'Form',
    components: {
      FdSwitch: Switch,
      FdSelect: Select,
    },
  props:{
    field: {
        type: Array,
          default: function(){
            return []
        },
    },
    ruleForm: {
        type: Array,
          default: function(){
            return []
        },
    },
    formlayout: {
      type: Array,
          default: function(){
            return []
          },
    }
  },
  data () {
    return {
        rules: {
          env: [
            { type: 'array', required: true, message: '请至少选择一个环境', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写发布备注', trigger: 'blur' }
          ]
        }
      }
  },
  methods: {   
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit("onSubmit", this.ruleForm)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  }
}
</script>

<style lang="less" scoped>

  .content{
    background: #fff;
    padding: 0 10px;

    /deep/ .el-dialog__header{
      padding: 10px 20px;
    }

    /deep/ .el-dialog__body{
      padding: 10px 20px;
    }
  }

</style>