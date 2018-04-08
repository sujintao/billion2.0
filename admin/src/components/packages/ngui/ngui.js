let ngui = {
    name: 'ngUi',
    props: ["config", "configdata"],
    render: function (h) {
        this.createElement = h
        //console.log('render')
        if (this.init == true) {
            return this.createProject()
        } else if (this.config == 'metamenu') {
            return this.createMenu()
        } else {
            return h('div', '加载中')
        }
    },
    data() {
        return {
            appdata: [],
            createElement: null,
            init: false,
            tableData: null,
            dialogtableData:null,
            formdata: {},//表单数据
            searchdata:{},//搜索数据
            templatedata: {},//模板数据,
            total: 0,
            dialogtotal:0,
            currentpage: 1,
            dialogcurrentpage:1,
            pagesize: 10,
            dialogpagesize:10,
            modelname: ''
        }
    },
    mounted() {
        this.loginHttp("18960828505", "123456")
            .then(login => {
                this.initConfig()
            })
    },
    methods: {
        onInput() {
            if (event) {
                let field = this.getDataset(event.target, 'field')
                this.formdata[field] = event.target.value
            }
        },
        getsystem() {
            let vm = this
            let tableName = ['metauiproject', 'metauimenu', 'metauimodel', 'metauipage', 'metauitpl', 'metauitplpage']
            let tableArray = []
            tableName.forEach((item) => {
                tableArray.push(this.getPageHttp('meta', item, 0, 1000))
            })
            return new Promise(resolve => {
                Promise.all(tableArray)
                    .then(response => {
                        response.forEach(item => {
                            console.log(item)
                            vm.$store.commit('setsystemobj', item)
                        })
                        resolve()
                    })
                    .catch(function (response) {
                        if (response.status == 401) {
                            //commit(types.LOGIN_API, { login: false, data: '' })
                        }
                    })
            })
        },
        initConfig() {
            if (this.config == 'metamenu') {
            } else {
                this.getsystem().then(() => {
                    this.init = true
                })
            }
        },
        sortByCom(obj) {
            return _.sortBy(obj, [function (o) { return Number.parseInt(o.name) }])
        },
        createMenu() {
            let menuobj = _.find(this.$store.state.system.metauimenu, { _id: this.configdata })
            let tplobj = _.find(this.$store.state.system.metauitplpage, { _id: menuobj.tpl_id })
            this.setmenuname(menuobj.name)
            let tpldata = {}
            if (this.templatedata[menuobj.tpl_id] && this.modelname != this.templatedata[menuobj.tpl_id].modelname) {
                tpldata = this.templatedata[menuobj.tpl_id].data
                this.modelname = this.templatedata[menuobj.tpl_id].modelname
                this.loadtabledata()
                return this.createItem(this.banktemplate())
            } else if (this.templatedata[menuobj.tpl_id]){
                tpldata = this.templatedata[menuobj.tpl_id].data
                this.modelname = this.templatedata[menuobj.tpl_id].modelname
            } else if(tplobj){
                tpldata.attrs = []
                tpldata.tagname = 'div'
                tplobj.tpldata.forEach(item => {
                    let tplitemobj = _.find(this.$store.state.system.metauitpl, { _id: item.tpl_id })
                    let modelobj = _.find(this.$store.state.system.metauimodel, { _id: tplitemobj.model_id })
                    this.modelname = modelobj.modelname
                    let subtpl=null
                    let submodel=null
                    let tplitemdata = null
                    if(tplitemobj.tpltype=='form'){
                        tplitemobj.tpltotalfield.forEach(val=>{
                            if(val.comattrs.length>0){
                                let subdata = _.find(val.comattrs, { value: "$subshowDialog" })
                                if(subdata&&subdata.tpl_id&&subdata.tpl_id.length>0){
                                    subtpl=_.find(this.$store.state.system.metauitpl, { _id: subdata.tpl_id })
                                    submodel=_.find(this.$store.state.system.metauimodel, { _id: subtpl.model_id })
                                }
                            }
                        })
                        tplitemdata=this[tplitemobj.tpltype + 'template'](tplitemobj, modelobj,subtpl,submodel)
                    }else if(tplitemobj.tpltype=='search'){
                        tplitemobj.tpltotalfield.forEach(val=>{
                            if(val.comattrs.length>0){
                                let subdata = _.find(val.comattrs, { value: "$buttonshowDialog" })
                                if(subdata&&subdata.tpl_id&&subdata.tpl_id.length>0){
                                    subtpl=_.find(this.$store.state.system.metauitpl, { _id: subdata.tpl_id })
                                    submodel=_.find(this.$store.state.system.metauimodel, { _id: subtpl.model_id })
                                }
                            }
                        })
                        tplitemdata=this[tplitemobj.tpltype + 'template'](tplitemobj, modelobj,subtpl,submodel)
                    } else{
                        tplitemdata=this[tplitemobj.tpltype + 'template'](tplitemobj, modelobj)
                    }
                    tpldata.attrs.push(tplitemdata)
                })
                this.$store.commit('settablename', this.modelname)
                this.loadtabledata()
                this.templatedata[menuobj.tpl_id] = { data: tpldata, modelname: this.modelname }
            }

            return this.createItem(tpldata)
    },
    createProject() {
        let cateData = this.$store.state.system.metauiproject
        let cateTreeMap = {}
        let cateTree = []
        for (let item of cateData) {
            let treeitem = item
            if (cateTreeMap[item._id]) {
                treeitem.children = cateTreeMap[item._id].children
            } else {
                treeitem.children = []
            }
            cateTreeMap[item._id] = treeitem
            if (item.pid == '') {
                cateTree.push(treeitem)
            } else {
                if (cateTreeMap[item.pid]) {
                    cateTreeMap[item.pid].children.push(treeitem)
                } else {
                    cateTreeMap[item.pid] = {}
                    cateTreeMap[item.pid].children = []
                    cateTreeMap[item.pid].children.push(treeitem)
                }
            }
        }
        let elementArray = []
        this.sortByCom(cateTree[0].children).forEach((item) => {
            let page = _.find(this.$store.state.system.metauipage, { _id: item.page_id })
            elementArray.push(this.createItem(page, this.sortByCom(item.children)))
        })
        return this.createElement('div', elementArray)
    },
    scopedSlots(e) {
        return this.createItem(this.tableedittemplate(e))
    },
    createItem(data, children) {
        let comObj = {}
        if (data) {
            let tagname = data.tagname
            let elementArray = []
            if (data.attrs) {
                data.attrs.forEach((item) => {
                    //if (item.isshow) {
                    elementArray.push(this.createItem(item))
                    //}
                })
            }
            if (children) {
                children.forEach((item) => {
                    if (item.name.indexOf('tpl_') == 0) {
                        let menu = this.$store.state.menu.menuaction
                        if (menu) {
                            elementArray.push(this.createElement('ngUi', {
                                props: {
                                    config: 'metamenu',
                                    configdata: menu
                                }
                            }))
                        }
                    } else {
                        let page = _.find(this.$store.state.system.metauipage, { _id: item.page_id })
                        elementArray.push(this.createItem(page, this.sortByCom(item.children)))
                    }
                })
            }
            if (data.comattrs) {
                data.comattrs.forEach((item) => {
                    if (item.disable) {
                    } else {
                        if (item.attrtype == 'scopedSlots') {
                            elementArray = []
                            this.setObjValue(this, 'scopedSlots', comObj, 'propdata', item.attrtype, item.attrname)
                        } else if (item.attrtype == 'text') {
                            if (item.value.indexOf('$') == 0) {
                                //console.log('sfsdfsdfsdfsdf',item.value.substring(1),this[item.value.substring(1)])
                                elementArray.push(this[item.value.substring(1)])
                            } else {
                                elementArray.push(item.value)
                            }
                        } else if (item.attrname.length > 0) {
                            if (typeof item.value == 'string' && item.value.indexOf('$') == 0) {
                                this.setObjValue(this, item.value.substring(1), comObj, 'propdata', item.attrtype, item.attrname)
                            } else {
                                this.setObjValue(item, 'value', comObj, 'propdata', item.attrtype, item.attrname)
                            }
                        } else {
                            this.setObjValue(item, 'value', comObj, 'propdata', item.attrtype)
                        }
                    }
                })
            }
            console.log('elementArray',elementArray)
            return this.createElement(tagname, comObj.propdata, elementArray)
        }
    }
}
}
export default ngui
