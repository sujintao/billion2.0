const state = {
    metauimenu: null,
    metauiproject: null,
    metauimodel: null,
    metauipage: null,
    metauitpl: null,
    tablename:null
}

const getters = {}
const actions = {}

const mutations = {
    settablename(state, obj){
        state.tablename=obj
    },
    setsystemobj(state, obj) {
        state[obj.name] = obj.data
    },
    setsystem(state, obj) {
        state.metauimenu = obj.metauimenu
        state.metauiproject = obj.metauiproject
        state.metauimodel = obj.metauimodel
        state.metauipage = obj.metauipage
        state.metauitpl = obj.metauitpl
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}