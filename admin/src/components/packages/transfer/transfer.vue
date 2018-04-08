<template>
    <el-transfer
    :filterable="issearch"
    :filter-method="method"
    :props="props"
    :filter-placeholder="placeholder"
    v-model="value"
    :titles='[lefttitle,righttitle]'
    :data="transferdata">
  </el-transfer>
</template>
<script>
export default {
  name: 'NgTransfer',
  props: ['id', 'type', 'default', 'placeholder','issearch','method','props','lefttitle','righttitle'],
  data() {
    return {
      value: this.default,
      transferdata: []
    }
  },
  mounted() {
    this.getPageHttp('meta', 'metauiphone', 0, 1000, { 'type': this.type }).then(obj => {
      this.transferdata = obj.data
      console.log('this.transferdata', this.transferdata)
    })
  },
  computed: {},
  methods: {

  }
} 
</script>