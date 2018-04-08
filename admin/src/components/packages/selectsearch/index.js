import selectsearch from './selectsearch.vue'

selectsearch.install = function (Vue) {
    Vue.component(selectsearch.name, selectsearch)
}

export default selectsearch