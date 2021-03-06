import VueRouter from 'vue-router'
/* 一级页面 */
import home from '../pages/views/home.vue'
import detailview from '../pages/views/detailview.vue'
import explain from '../pages/views/explain.vue'
import person from '../pages/views/person.vue'
/* 二级页面 */
import login from '../pages/subview/login.vue'


export default new VueRouter({
    routes: [
        {
            path: '/',
            component: home
        }, {
            path: '/home',
            name:'home',
            component: home
        }, {
            path: '/detailview',
            name:'detailview',
            component: detailview
        }, {
            path: '/explain',
            name:'explain',
            component: explain
        },  {
            path: '/person',
            name:'person',
            component: person,

        }, 
        {
            path: '/login',
            name:'login',
            component: login,

        }, 
        //登录空白页
        // {
        //     path:'/blank',
        //     name:'blank',
        //     component:blank,
        // }
    ]
})