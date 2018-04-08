import comdata from './comdata.vue'

comdata.install = function (Vue) {
    Vue.component(comdata.name, comdata)
}

export default comdata