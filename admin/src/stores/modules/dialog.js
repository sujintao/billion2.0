const state = {
    dailoglist: [],
    subdailoglist:[],
    buttondailoglist: [],
    dailogdata: {},
    subdailogdata:{},
    buttondailogdata: {},
    dailogshow: false,
    subdailogshow:false,
    buttondailogshow: false,
    buttontablename:null
}

const getters = {}
const actions = {}

const mutations = {
    popdialog: (state) => {
        state.dailoglist = _.dropRight(state.dailoglist)
        if (state.dailoglist.length == 0) {
            state.dailogdata = {}
            state.dailogshow = false
        } else {
            state.dailogdata = _.last(state.dailoglist)
        }
    },
    popsubdialog:()=>{
        state.subdailoglist = _.dropRight(state.subdailoglist)
        if (state.subdailoglist.length == 0) {
            state.subdailogdata = {}
            state.subdailogshow = false
        } else {
            state.subdailogdata = _.last(state.subdailoglist)
        }
    },
    popbuttondialog:()=>{
        state.buttondailoglist = _.dropRight(state.buttondailoglist)
        if (state.buttondailoglist.length == 0) {
            state.buttondailogdata = {}
            state.buttondailogshow = false
        } else {
            state.buttondailogdata = _.last(state.buttondailoglist)
        }
    },
    pushdialog: (state, obj) => {
        console.log(obj)
        state.dailogdata.data = obj.data
        state.dailogdata.url = obj.url
        state.dailoglist.push(obj.dailogdata)
        state.dailogshow = true
    },
    subpushdialog: (state, obj) => {
        console.log(obj)
        state.subdailogdata.data = obj.data
        state.subdailogdata.url = obj.url
        state.subdailoglist.push(obj.dailogdata)
        state.subdailogshow = true
    },
    buttonpushdialog: (state, obj) => {
        console.log(obj)
        state.buttondailogdata.data = obj.data
        state.buttondailogdata.url = obj.url
        state.buttondailoglist.push(obj.dailogdata)
        state.buttondailogshow = true
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}