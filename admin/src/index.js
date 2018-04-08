import './style/index.css'
import NgCom from './components/packages'
import stores from './stores'
import mixins from './mixins/'

Vue.use(Vuex)
Vue.use(VueResource)
mixins.map(item => {
    Vue.mixin(item)
})
Vue.use(NgCom)
let store = new Vuex.Store(stores)

let App = NgCom.ngui
if (window.location.href.indexOf('/#/edit') != -1) {
    App = NgCom.comdata
}
new Vue({
    el: '#app',
    store,
    render: h => h(App, {
        props: {
            config: 'metauiproject'
        }
    })
})