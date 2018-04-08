<template>
    <div class="person">
        <div class="header">
          <yd-navbar title="我 的" bgcolor="#ed293f" fontsize="20px" color="#fff" height="2.5rem"></yd-navbar>
      </div>
      <yd-cell-group>
        <yd-cell-item arrow type="a" href="#/login" class="userinfo">
            <img class="uerimages" slot="left" :src="userinfo.img">
            <span slot="left">{{userinfo.username}}</span>
            <span slot="right">个人信息</span>
        </yd-cell-item>
      </yd-cell-group>
      <yd-cell-group class="personlist">
        <yd-cell-item arrow type="a" href="tel:400-888-8888">
            <span slot="left">这里是一个A链接</span>
        </yd-cell-item>
        <yd-cell-item arrow type="label">
            <span slot="left">这里是一个Router-Link链接</span>
        </yd-cell-item>
        <yd-cell-item arrow type="label">
            <span slot="left">这里是一个Label</span>
        </yd-cell-item>
        <yd-cell-item arrow>
            <span slot="left">这里是一个普通DIV</span>
        </yd-cell-item>
      </yd-cell-group>
      <yd-button-group>
            <yd-button size="large" bgcolor="#ed293f" color="#fff" class="bowout">退出登录</yd-button>
      </yd-button-group>
    </div>
</template>

<script>
export default {
  name: "person",
  data() {
    return {
      userinfo:{
        img:'./assets/images/banner01.jpg',
        username:'我的'
      }
    };
  },
  mounted() {
    
  },
  computed: {},
  methods: {
      
  }
};
</script>
<style>
.uerimages{
  width: 4rem !important;
  height: 4rem !important;
  margin-right: 0.3rem !important;
}
.yd-cell-item{
  height: 2.5rem !important;
  /* font-size: 2rem !important; */
  padding-left:0.3rem !important;
}
.yd-cell-left{
  font-size: 1rem !important;
}
.userinfo{
  height: 5rem !important;
}
.yd-btn-block {
  height: 2.5rem !important;
  font-size: 1rem;
}
.bowout{
  margin-top: 1rem;
}
.personlist{
  margin-top: 1rem;
}
</style>