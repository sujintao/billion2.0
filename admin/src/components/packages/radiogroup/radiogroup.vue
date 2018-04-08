<template>
    <el-radio-group v-model="value" :size="size" @change="handleselect">
      <template v-for="item in radiodata">
          <el-radio-button :label="item._id">{{item.text}}</el-radio-button>
      </template>  
    </el-radio-group>
</template>
<script>
export default {
  name: 'NgRadiogroup',
  props: ['id', 'type', 'default', 'size','func'],
  data() {
    return {
      value: this.default,
      radiodata: [
        {text:'未完成',_id:'1'},
        {text:'已完成',_id:'2'},
        {text:'所有',_id:'0'}
      ]
    }
  },
  mounted() {
    // this.getPageHttp('meta', 'metauidic', 0, 1000, { 'type': this.type }).then(obj => {
    //   this.radiodata = obj.data
    //   console.log('2222',this.radiodata)
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