<template>
  <el-menu default-active="2" class="el-menu-vertical-demo" @select="selectmenu" @open="handleOpen" @close="handleClose"  active-text-color="#ffd04b">
    <template v-for="item in menuData">
      <template v-if="item.isshow">
      <el-submenu :index="item._id">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.name}}</span>
        </template>
        <template v-for="sonitem in item.children">
          <template v-if="sonitem.isshow">
            <el-menu-item :index="sonitem._id" v-if="sonitem.children.length==0">
              <i :class="sonitem.icon" v-if="sonitem.icon"></i>
              {{sonitem.name}}
            </el-menu-item>
            <el-submenu :index="sonitem._id" v-else>
              <template slot="title">
                <i :class="sonitem.icon" v-if="sonitem.icon"></i>
                <span>{{sonitem.name}}</span>
              </template>
              <template v-for="(sunitem,sunkey) in sonitem.children">
                <template v-if="sunitem.isshow">
                  <el-menu-item :index="sunitem._id">
                    <i :class="sunitem.icon" v-if="sunitem.icon"></i>
                    {{sunitem.name}}
                  </el-menu-item>
                </template>
              </template>
            </el-submenu>
          </template>
        </template>
      </el-submenu>
    </template>
    </template>
  </el-menu>
</template>
<style>
.el-aside {
  color: #333;
}
</style>
<script>
export default {
  name: 'NgAside',
  data() {
    return {
      menuData: [],
      uimenu: null
    }
  },
  mounted() {
    this.loginHttp("18960828505", "123456")
      .then(login => {
        return this.getPageHttp("meta", "metauimenu", 0, 1000)
      })
      .then(obj => {
        //console.log('----', obj)
        this.uimenu = obj.data
        this.menuData = this.getreeData(obj.data)
      })
  },
  computed: {},
  methods: {
    selectmenu(index) {
      if (index.length > 0) {
        this.setmenu(index)
      }
    },
    getreeData(data) {
      let cateTree = []
      let cateTreeMap = {}
      for (let item of data) {
        let treeitem = item
        if (cateTreeMap[item._id]) {
          treeitem.children = cateTreeMap[item._id].children
        } else {
          treeitem.children = []
        }
        cateTreeMap[item._id] = treeitem
        if (item.pid == "") {
          cateTree.push(treeitem)
        } else {
          if (cateTreeMap[item.pid]) {
            cateTreeMap[item.pid].children.push(treeitem)
          } else {
            cateTreeMap[item.pid] = {}
            cateTreeMap[item.pid].children = []
            cateTreeMap[item.pid].children.push(treeitem)
          }
        }
      }
      this.menuData = cateTree[0].children
      return cateTree[0].children
    }
  }
} 
</script>