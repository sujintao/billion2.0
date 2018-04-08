import banner from './banner/'
import icons from './icons'


const components = [
    banner,
    icons,
    
]
const install = function (Vue) {
    if (install.installed) return

    components.map(component => {
        Vue.component(component.name, component)
    })
}
export default {
    version: '1.0.1',
    install,
    banner,
    icons
}