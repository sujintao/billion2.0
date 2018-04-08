import ngui from './ngui.js'
ngui.install = function (Vue) {
    Vue.component(ngui.name, ngui)
}

export default ngui