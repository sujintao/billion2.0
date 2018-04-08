import progress from './progress.vue'

progress.install = function (Vue) {
    Vue.component(progress.name, progress)
}

export default progress