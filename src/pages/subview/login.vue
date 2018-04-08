<template>
    <div class="login">
        <div class="header">
          <yd-navbar title="登录" bgcolor="#ed293f" fontsize="20px" color="#fff" height="2.5rem"></yd-navbar>
        </div>
      <div class="logindata">
          <yd-cell-group>
            <yd-cell-item>
                <span slot="left">用户名：</span>
                <yd-input slot="right" required v-model="input1" max="20" placeholder="请输入用户名"></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">密码：</span>
                <yd-input slot="right" type="password" v-model="input2" placeholder="请输入密码"></yd-input>
            </yd-cell-item>
        </yd-cell-group>
      </div>
    </div>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
    };
  },
  mounted() {
    
  },
  computed: {

  },

  methods: {}
}
</script>

<style>
.logindata .yd-input{
    height: 4rem;
}
</style>