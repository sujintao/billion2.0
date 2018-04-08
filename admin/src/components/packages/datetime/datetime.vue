<template>
    <el-date-picker
      v-model="value"
      :type="type"
      :placeholder="placeholder"
      @change="handleselect">
    </el-date-picker>
</template>
<script>
export default {
  name: 'NgDatetime',
  props: ['default','type','placeholder','func'],
  data() {
    return {
      value: this.default,
    }
  },
  mounted() {
    // this.getPageHttp('meta', 'metauidic', 0, 1000, { 'type': this.type }).then(obj => {
    //   this.options = obj.data
    //   console.log('this.options',this.options)
    // })
  },
  computed: {},
  methods: {
      handleselect(){
          this[this.func](this.value)
      }
  }
} 
</script>