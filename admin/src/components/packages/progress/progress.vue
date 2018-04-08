<template>
    <el-progress :text-inside="true" :stroke-width="height" :percentage="percentage"></el-progress>
</template>
<script>
export default {
  name: 'NgProgress',
  props: ['height', 'table', 'countfield', 'totalfield','id'],
  data() {
    return {
      percentage:0
    }
  },
  mounted() {
    this.getPageHttp('meta', 'testprogress', 0, 1000).then(obj => {
      let prodata=_.find(obj.data, { _id: this.id })
      console.log('prodata', prodata)
      let count=prodata.count
      let total=prodata.total
      this.percentage=Number(count/total*100)
      console.log(count/total)
    })
  },
  computed: {},
  methods: {

  }
} 
</script>