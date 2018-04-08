const state = {
    menuaction: null,
    menuname: ''
}

const getters = {}
const actions = {}

const mutations = {
    setmenu: (state, obj) => {
        state.menuaction = obj
    },
    setmenuname: (state, obj) => {
        console.log(obj)
        state.menuname = obj
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}