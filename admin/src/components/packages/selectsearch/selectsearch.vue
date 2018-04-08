<template>
    <el-input placeholder="请输入内容" v-model="textSearchValue" @change="handleSearch" style="width:250px">
        <el-select v-model="textSearchKey" slot="prepend" placeholder="请选择" @change="handleSelect" style="width:100px">
            <el-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label"></el-option>
        </el-select>
    </el-input>
</template>
<script>
export default {
  name: 'NgSelectsearch',
  props: ['id', 'type', 'default', 'size', 'func'],
  data() {
    return {
      textSearchValue: this.default,
      textSearchKey: '',
      options: [{
        value: '1',
        label: '福州'
      }, {
        value: '2',
        label: '厦门'
      }]
    }
  },
  mounted() {
    this.options = this.$store.state.options.seloptions
    // this.getPageHttp('meta', 'metauidic', 0, 1000, { 'type': this.type }).then(obj => {
    //   this.options = obj.data
    //   console.log('this.options',this.options)
    // })
  },
  computed: {},
  methods: {
    handleSearch() {
      let selvalue = this.textSearchValue
      let selkey = this.textSearchKey
      let table = this.$store.state.system.tablename
      let sel = []
      let selobj = {
        'key': selkey,
        'value': selvalue,
        'type': 'like'
      }
      console.log('this.modelname', table, selobj)
      sel.push(selobj)
      this.getHttp("meta", table, null, 0, 1000, sel).then(obj => {
        console.log('search```````', obj)
      })
      //this[this.func](this.textSearchKey)
    },
    // handleSearch() {
    //   this[this.func](this.textSearchValue)
    // }
  }
} 
</script>