import LbHello from './hello.vue'
LbHello.install = function (Vue) {
    Vue.component(LbHello.name, LbHello)
}

export default LbHello 