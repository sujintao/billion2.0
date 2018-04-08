import ngui from './ngui'
import comdata from './comdata'
import aside from './aside'
import listtree from './listtree'
import menutree from './menutree'
import radiogroup from './radiogroup'
import select from './select'
import checkboxgroup from './checkboxgroup'
import transfer from './transfer'
import upload from './upload'
import progress from './progress'
import datetime from './datetime'
import selectsearch from './selectsearch'


const components = [
    ngui,
    comdata,
    aside,
    listtree,
    menutree,
    radiogroup,
    select,
    checkboxgroup,
    transfer,
    upload,
    progress,
    datetime,
    selectsearch
]
const install = function (Vue) {
    if (install.installed) return

    components.map(component => {
        Vue.component(component.name, component)
    })
}
export default {
    version: '1.0.1',
    install
}