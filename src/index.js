import './styles/index.css'
import './styles/muse.less'
import App from './pages/app/app.vue'
import lbCom from './components'
import stores from './stores/module.js'
import mixin from './mixins/mixin'
import router from './router'
import VueRouter from 'vue-router'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import { Rate,DatePicker } from 'element-ui'
Vue.component(Rate.name, Rate)
Vue.component(DatePicker.name, DatePicker)
// ydui框架  底部导航栏
import 'vue-ydui/dist/ydui.base.css'
// 底部导航栏
import { TabBar, TabBarItem } from 'vue-ydui/dist/lib.rem/tabbar'
Vue.component(TabBar.name, TabBar)
Vue.component(TabBarItem.name, TabBarItem)
// 日期控件
import { DateTime } from 'vue-ydui/dist/lib.rem/datetime'
Vue.component(DateTime.name, DateTime)
import { ActionSheet } from 'vue-ydui/dist/lib.rem/actionsheet'
//图片轮播
import {Slider, SliderItem} from 'vue-ydui/dist/lib.rem/slider'
Vue.component(Slider.name, Slider)
Vue.component(SliderItem.name, SliderItem)
//滚动公告
import {RollNotice, RollNoticeItem} from 'vue-ydui/dist/lib.rem/rollnotice'
Vue.component(RollNotice.name, RollNotice)
Vue.component(RollNoticeItem.name, RollNoticeItem)
//网格布局
import {GridsGroup, GridsItem} from 'vue-ydui/dist/lib.rem/grids'
Vue.component(GridsGroup.name, GridsGroup)
Vue.component(GridsItem.name, GridsItem)
//头部导航
import {NavBar, NavBarBackIcon, NavBarNextIcon} from 'vue-ydui/dist/lib.rem/navbar'
Vue.component(NavBar.name, NavBar)
Vue.component(NavBarBackIcon.name, NavBarBackIcon)
Vue.component(NavBarNextIcon.name, NavBarNextIcon)
//表单
import {CellGroup, CellItem} from 'vue-ydui/dist/lib.rem/cell'
Vue.component(CellGroup.name, CellGroup)
Vue.component(CellItem.name, CellItem)
//按钮
import {Button, ButtonGroup} from 'vue-ydui/dist/lib.rem/button'
Vue.component(Button.name, Button)
Vue.component(ButtonGroup.name, ButtonGroup)
/****************************测试**********/
// import urlUtil from '~/api/urlprofile'
// let params = {
//     'db': 'luban',
//     'api': true,
//     'tableName': 'lb_user',
//     'sid': '12341414',
// }
// console.log(urlUtil(params))
/********************************************/


Vue.use(VueAwesomeSwiper)
Vue.use(lbCom)
mixin.map(item => {
    Vue.mixin(item)
})
Vue.use(MuseUI)
Vue.use(VueRouter)
let store = new Vuex.Store(stores)


new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
})