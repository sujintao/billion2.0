import datetime from './datetime.vue'

datetime.install = function (Vue) {
    Vue.component(datetime.name, datetime)
}

export default datetime