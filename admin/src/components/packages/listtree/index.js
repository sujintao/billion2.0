import NgListTree from './listtree.vue'

NgListTree.install = function(Vue) {
    Vue.component(NgListTree.name, NgListTree)
}

export default NgListTree
