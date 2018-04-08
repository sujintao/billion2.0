<template>
    <el-checkbox-group v-model="checkedvalue" @change="handleselect">
       <el-checkbox v-for="item in checkboxdata" :label="item.text" :key="item._id">{{city}}</el-checkbox>
    </el-checkbox-group>
</template>
<script>
export default {
  name: 'NgCheckboxgroup',
  props: ['id', 'type', 'default', 'size','func'],
  data() {
    return {
      checkedvalue: this.default,
      checkboxdata: []
    }
  },
  mounted() {
    this.getPageHttp('meta', 'metauidic', 0, 1000, { 'type': this.type }).then(obj => {
      this.checkboxdata = obj.data
      console.log('2222', this.checkboxdata)
    })
  },
  computed: {},
  methods: {
      handleselect(){
          this[this.func](this.checkedvalue)
      }
  }
} 
</script>