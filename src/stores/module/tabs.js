

const state = {
    show: '',
    rollstop: false,
    search: false
}
const getters = {
    rollstopme(state) {
        return state.rollstop
    }
}
const actions = {}

const mutations = {
    getshowme(state, data) {
        state.show = data
    },
    getrollstopme(state, data) {
        state.rollstop = data
    },
    getsearch(state, data) {
        state.search = data
    },
}
export default {
    state,
    getters,
    actions,
    mutations
}