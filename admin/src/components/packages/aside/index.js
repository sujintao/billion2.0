import aside from './aside.vue'

aside.install = function (Vue) {
    Vue.component(aside.name, aside)
}

export default aside