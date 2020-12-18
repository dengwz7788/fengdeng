<template>
  <div class="content">
      <el-form 
        :model="ruleForm" 
        size="mini" 
        :rules="rules" 
        ref="ruleForm" 
        label-width="100px" 
        class="demo-ruleForm">
      
        <el-form-item label="环境" prop="env">
          <el-checkbox-group v-model="ruleForm.env">
            <el-checkbox label="开发环境" name="env"></el-checkbox>
            <el-checkbox label="测试环境" name="env"></el-checkbox>
            <el-checkbox label="灰度环境" name="env"></el-checkbox>
            <el-checkbox label="正式环境" name="env"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="备注" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即发布</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
  name: 'Form',
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