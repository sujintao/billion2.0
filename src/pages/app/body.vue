<template>
<div class="bodys " :class="{'bodysClass':bodysest}">
  <!-- <div :class="changeheight"></div> -->
  <router-view></router-view>
</div>
    
</template>
<style>
.bodysClass {
  margin-bottom:0 !important;
}
.bodys {
  margin-bottom:20%;
}
</style>

<script>
export default {
  name: 'body',
  data() {
    return {
      bodysest: false,


    }
  },
  mounted() {

  },
  computed: {
    // changeheight() {
    //   this.bodysest = this.$store.state.tabs.rollstop
    //   console.log(this.bodysest)
    // }
  },
  methods: {

  },

}
</script>