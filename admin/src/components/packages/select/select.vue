<template>
    <el-select v-model="value" :multiple="ismultiple" placeholder="请选择" @change="handleselect">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>
<script>
export default {
  name: 'NgSelect',
  props: ['id', 'type', 'default', 'size','ismultiple','func'],
  data() {
    return {
      value: this.default,
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }]
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