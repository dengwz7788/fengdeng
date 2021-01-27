<template>
  <div>
    <div class="center">
      <van-image
        round
        width="15rem"
        height="15rem"
        src="http://www.xinkongjie.com/d/file/p/2019-02-03/b1ffbe89dd2041efe8e715d4682f4f6a.jpg"
      />
    </div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        readonly
        clickable
        name="picker"
        :value="value"
        label="角色"
        placeholder="点击角色城市"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登陆</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      value: '',
      columns: ['区拓', '销售', '主管', '老板', '内勤'],
      showPicker: false
    }
  },
  methods: {
    onSubmit (values) {
      console.log('submit', values)
    },
    onConfirm (value) {
      this.value = value
      this.showPicker = false
    }
  }
}
</script>
<style scoped>
  .center{
    text-align: center;
    padding-bottom: 20px;
  }
</style>
