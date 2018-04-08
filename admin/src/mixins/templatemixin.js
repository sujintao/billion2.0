export default {
    methods: {
        loadtabledata() {
            this.gettabledata()
        },
        loaddialogtabledata() {
            this.gettabledata('dialog')
        },
        gettabledata(type) {
            let table = null
            let currentpage = 1
            let pagesize = 10
            if (type == 'dialog') {
                table = this.$store.state.dialog.buttontablename
                currentpage = this.dialogcurrentpage
                pagesize = this.dialogpagesize
            } else {
                table = this.modelname
                currentpage = this.currentpage
                pagesize = this.pagesize
            }
            this.getPageHttp('nanguo', table, currentpage - 1, pagesize).then((obj) => {
                console.log(obj)
                if (type == 'dialog') {
                    this.dialogtableData = obj.data
                    this.dialogtotal = obj.count
                } else {
                    this.tableData = obj.data
                    this.total = obj.count
                }
            })
        },
        handleDialogSizeChange(size) {
            if (this.dialogpagesize != size) {
                this.dialogpagesize = size
                this.loaddialogtabledata()
            }
        },
        handleSizeChange(size) {
            if (this.pagesize != size) {
                this.pagesize = size
                this.loadtabledata()
            }
        },
        handleCurrentChange(currentPage) {
            if (this.currentpage != currentPage) {
                this.currentpage = currentPage
                this.loadtabledata()
            }
        },
        handleDialogCurrentChange(currentPage) {
            if (this.dialogcurrentpage != currentPage) {
                this.dialogcurrentpage = currentPage
                this.loaddialogtabledata()
            }
        },
        banktemplate() {
            let bankchildren = {}
            bankchildren.attrs = []
            bankchildren.tagname = 'div'
            bankchildren.comattrs = []
            return bankchildren
        },
        tableedittemplate(e) {
            let itemoptchildren = {}
            itemoptchildren.attrs = []
            itemoptchildren.tagname = 'div'
            itemoptchildren.comattrs = []
            let tplbuttondata = {}
            tplbuttondata.tagname = 'el-button'
            tplbuttondata.isshow = true
            tplbuttondata.comattrs = [{
                attrname: "",
                attrtype: "text",
                disable: false,
                value: '编辑'
            },
            {
                attrname: "click",
                attrtype: "on",
                disable: false,
                value: '$editdialog'
            }, {
                attrname: "data-id",
                attrtype: "attrs",
                disable: false,
                value: e.row._id
            }]
            itemoptchildren.attrs.push(tplbuttondata)
            let tplbutton1data = {}
            tplbutton1data.tagname = 'el-button'
            tplbutton1data.isshow = true
            tplbutton1data.comattrs = [{
                attrname: "",
                attrtype: "text",
                disable: false,
                value: '删除'
            },
            {
                attrname: "click",
                attrtype: "on",
                disable: false,
                value: '$deletedialog'
            }, {
                attrname: "data-id",
                attrtype: "attrs",
                disable: false,
                value: e.row._id
            }]
            itemoptchildren.attrs.push(tplbutton1data)
            return itemoptchildren
        },
        tabletemplate(tplitemobj, modelobj) {
            let tpldata = {}
            tpldata.tagname = 'div'
            tpldata.attrs = []

            let tpltabledata = {}
            tpltabledata.tagname = 'el-table'
            tpltabledata.comattrs = [{
                attrname: "stripe",
                attrtype: "props",
                disable: false,
                value: true
            }, {
                attrname: "border",
                attrtype: "props",
                disable: false,
                value: true
            }, {
                attrname: "data",
                attrtype: "props",
                disable: false,
                value: '$tableData'
            }]
            tpltabledata.attrs = []
            tpltabledata.isshow = true
            tplitemobj.tplFiled.forEach((fileditem) => {
                let tplfiledobj = _.find(modelobj.attrs, { key: fileditem })
                let tplfilecomdobj = _.find(tplitemobj.tpltotalfield, { attrname: tplfiledobj.attrname })
                let itemchildren = {}
                itemchildren.tagname = 'el-table-column'
                itemchildren.comattrs = [{
                    attrname: "prop",
                    attrtype: "props",
                    disable: false,
                    value: tplfiledobj.attrfield
                }, {
                    attrname: "label",
                    attrtype: "props",
                    disable: false,
                    value: tplfiledobj.attrname
                }]
                if (tplfilecomdobj) {
                    itemchildren.attrs = []
                    itemchildren.attrs.push(tplfilecomdobj)
                }
                itemchildren.isshow = true
                tpltabledata.attrs.push(itemchildren)
            })
            let itemoptchildren = {}
            itemoptchildren.attrs = []
            itemoptchildren.tagname = 'el-table-column'
            itemoptchildren.comattrs = [{
                attrname: "label",
                attrtype: "props",
                disable: false,
                value: '操作'
            },
            {
                attrname: "default",
                attrtype: "scopedSlots",
                disable: false,
                value: '操作'
            }]
            tpltabledata.attrs.push(itemoptchildren)
            tpldata.attrs.push(tpltabledata)

            let tplpaginationdata = {}
            tplpaginationdata.tagname = 'el-pagination'
            tplpaginationdata.isshow = true
            tplpaginationdata.comattrs = [{
                attrname: "",
                attrtype: "text",
                disable: false,
                value: '新建'
            },
            {
                attrname: "size-change",
                attrtype: "on",
                disable: false,
                value: '$handleSizeChange'
            }, {
                attrname: "current-change",
                attrtype: "on",
                disable: false,
                value: '$handleCurrentChange'
            }, {
                attrname: "page-sizes",
                attrtype: "props",
                disable: false,
                value: [10, 30, 50, 100]
            }, {
                attrname: "page-size",
                attrtype: "props",
                disable: false,
                value: '$pagesize'
            }, {
                attrname: "layout",
                attrtype: "props",
                disable: false,
                value: 'total, sizes, prev, pager, next, jumper'
            }, {
                attrname: "total",
                attrtype: "props",
                disable: false,
                value: '$total'
            }, {
                attrname: "current-page",
                attrtype: "props",
                disable: false,
                value: '$currentpage'
            }]
            tpldata.attrs.push(tplpaginationdata)
            return tpldata
        },
        searchtemplate(tplitemobj, modelobj, subtpl, submodel) {
            let tpldata = {}
            tpldata.tagname = 'div'
            tpldata.attrs = []
            let totalsame = []
            tplitemobj.tpltotalfield.forEach(item => {
                let samearr = _.filter(tplitemobj.tpltotalfield, { com_id: item.com_id })
                if (samearr.length > 1) {
                    let options = []
                    let comname = null
                    samearr.forEach(obj => {
                        comname = obj.tagname
                        let fileddata = {}
                        fileddata.value = obj.attrfield
                        fileddata.label = obj.attrname
                        options.push(fileddata)
                    })
                    if (comname == 'ng-selectsearch') {
                        this.$store.commit('setseloptions', options)
                    }
                    totalsame.push(samearr)
                } else {
                    tpldata.attrs.push(item)
                }
            })
            console.log('===totalsame==', totalsame)

            let selarr=this.chatamedata(JSON.parse(JSON.stringify(totalsame)))
            selarr.forEach(item => {
                tpldata.attrs.push(item[0])
            })

            if (subtpl != null && submodel != null) {
                tpldata.attrs.push(this.buttondialog(subtpl, submodel))
            }
            let dialogbutton = {}
            dialogbutton.tagname = 'el-button'
            dialogbutton.isshow = true
            dialogbutton.comattrs = [{
                attrname: "",
                attrtype: "text",
                disable: false,
                value: '新建'
            },
            {
                attrname: "click",
                attrtype: "on",
                disable: false,
                value: '$appenddialog'
            }, {
                attrname: "data-dialog",
                attrtype: "attrs",
                disable: false,
                value: modelobj.modelname
            }]
            tpldata.attrs.push(dialogbutton)
            return tpldata
        },
        appenddialog(event) {
            this.formdata = JSON.parse(JSON.stringify(this.formbackdata))
            this.showDialog({ dialog: this.modelname, data: null })
        },
        editdialog(event) {
            if (event) {
                let id = this.getDataset(event.target, 'id')
                this.getHttp('nanguo', this.modelname, id, this.currentpage - 1, this.pagesize).then((obj) => {
                    if (obj.length > 0) {
                        this.formdata = JSON.parse(JSON.stringify(obj[0]))
                        this.showDialog({ dialog: this.modelname, data: null })
                    }
                })
            }
        },
        deletedialog(event) {
            this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let id = this.getDataset(event.target, 'id')
                this.formdata._id = id
                this.formdata._delete = true
                this.dboptform()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        },
        dboptform() {
            let dbdata = this.formdata
            let table = this.modelname
            let message = '数据编辑成功'
            if (this.formdata._delete) {
                message = '数据删除成功'
            }
            if (dbdata._id) {
                this.putHttp('nanguo', table, dbdata._id, dbdata).then((obj) => {
                    this.loadtabledata()
                    this.$message({
                        title: '成功',
                        message: message,
                        type: 'success'
                    })
                    this.popDialog()
                })
            } else {
                message = '数据添加成功'
                let createtime = new Date()
                dbdata.createtime = createtime.getTime()
                this.postHttp('nanguo', table, dbdata).then((obj) => {
                    this.loadtabledata()
                    this.$message({
                        title: '成功',
                        message: 'message',
                        type: 'success'
                    })
                    this.popDialog()
                })
            }
        },
        formtpl(tplitemobj, modelobj) {
            this.formbackdata = {}
            let formtpl = {}
            formtpl.tagname = 'el-form'
            formtpl.comattrs = [{
                attrname: "label-width",
                attrtype: "props",
                disable: false,
                value: '70px'
            }, {
                attrname: "model",
                attrtype: "props",
                disable: false,
                value: '$formdata'
            }]
            formtpl.attrs = []
            formtpl.isshow = true
            tplitemobj.tplFiled.forEach((fileditem) => {
                let tplfiledobj = _.find(modelobj.attrs, { key: fileditem })
                let tplfilecomdobj = _.find(tplitemobj.tpltotalfield, { attrname: tplfiledobj.attrname })
                this.formbackdata[tplfiledobj.attrfield] = ''
                let itemchildren = {}
                itemchildren.tagname = 'el-form-item'
                itemchildren.comattrs = [{
                    attrname: "prop",
                    attrtype: "props",
                    disable: false,
                    value: tplfiledobj.attrfield
                }, {
                    attrname: "label",
                    attrtype: "props",
                    disable: false,
                    value: tplfiledobj.attrname
                }]
                let tplfilecomdobjtagname = 'el-input'
                let tplfilecomdobjtemp = {}
                tplfilecomdobjtemp.comattrs = []
                if (tplfilecomdobj) {
                    tplfilecomdobj.comattrs.forEach(obj => {
                        tplfilecomdobjtemp.comattrs.push(obj)
                    })
                    tplfilecomdobjtagname = tplfilecomdobj.tagname
                }
                tplfilecomdobjtemp.tagname = tplfilecomdobjtagname
                itemchildren.attrs = []
                tplfilecomdobjtemp.comattrs.push({
                    attrname: "value",
                    attrtype: "model",
                    disable: false,
                    value: '$formdata.' + tplfiledobj.attrfield
                })
                tplfilecomdobjtemp.comattrs.push({
                    attrname: 'callback',
                    attrtype: "model",
                    disable: false,
                    value: (t) => {
                        this.formdata[tplfiledobj.attrfield] = t
                    }
                })
                tplfilecomdobjtemp.comattrs.push({
                    attrname: "expression",
                    attrtype: "model",
                    disable: false,
                    value: tplfiledobj.attrfield
                })
                itemchildren.attrs.push(tplfilecomdobjtemp)
                itemchildren.isshow = true
                formtpl.attrs.push(itemchildren)
            })
            return formtpl
        },
        dialogfoot(tpldata, hasChildren) {
            let foottpl = {}
            let popname = '$popDialog'
            if (hasChildren) {
                popname = '$popSubDialog'
            }
            foottpl.attrs = []
            foottpl.tagname = 'span'
            foottpl.comattrs = [{
                attrname: "",
                attrtype: "slot",
                disable: false,
                value: "footer",
            }]
            tpldata.attrs.push(foottpl)
            let tplbuttondata = {}
            tplbuttondata.tagname = 'el-button'
            tplbuttondata.isshow = true
            tplbuttondata.comattrs = [{
                attrname: "",
                attrtype: "text",
                disable: false,
                value: '保存'
            },
            {
                attrname: "click",
                attrtype: "on",
                disable: false,
                value: '$dboptform'
            }]
            foottpl.attrs.push(tplbuttondata)
            let tplbutton1data = {}
            tplbutton1data.tagname = 'el-button'
            tplbutton1data.isshow = true
            tplbutton1data.comattrs = [{
                attrname: "",
                attrtype: "text",
                disable: false,
                value: '取消'
            },
            {
                attrname: "click",
                attrtype: "on",
                disable: false,
                value: popname
            }]
            foottpl.attrs.push(tplbutton1data)
            return tpldata
        },
        buttondialog(tplitemobj, modelobj) {
            let tpldata = {}
            tpldata.tagname = 'el-dialog'
            tpldata.isshow = true
            let title = '选择'
            if (tplitemobj != null) {
                title = tplitemobj.name
            }
            tpldata.comattrs = [{
                attrname: "title",
                attrtype: "props",
                disable: false,
                value: title
            },
            {
                attrname: "visible",
                attrtype: "props",
                disable: false,
                value: '$isButtonShowDialog'
            }, {
                attrname: "before-close",
                attrtype: "props",
                disable: false,
                value: '$popButtonDialog'
            }]

            tpldata.attrs = []
            if (tplitemobj != null) {
                if (tplitemobj.tpltype && tplitemobj.tpltype == 'table') {
                    this.$store.state.dialog.buttontablename = modelobj.modelname
                    tpldata.attrs.push(this.dialogtabletemplate(tplitemobj, modelobj))
                } else {
                    tpldata.attrs.push(this.formtpl(tplitemobj, modelobj))
                }
            }

            let foottpl = {}
            foottpl.attrs = []
            foottpl.tagname = 'span'
            foottpl.comattrs = [{
                attrname: "",
                attrtype: "slot",
                disable: false,
                value: "footer",
            }]
            tpldata.attrs.push(foottpl)
            let tplbuttondata = {}
            tplbuttondata.tagname = 'el-button'
            tplbuttondata.isshow = true
            tplbuttondata.comattrs = [{
                attrname: "",
                attrtype: "text",
                disable: false,
                value: '确定'
            },
            {
                attrname: "type",
                attrtype: "props",
                disable: false,
                value: 'success'
            },
            {
                attrname: "click",
                attrtype: "on",
                disable: false,
                value: '$popButtonDialog'
            }]
            foottpl.attrs.push(tplbuttondata)
            let tplbutton1data = {}
            tplbutton1data.tagname = 'el-button'
            tplbutton1data.isshow = true
            tplbutton1data.comattrs = [{
                attrname: "",
                attrtype: "text",
                disable: false,
                value: '取消'
            },
            {
                attrname: "click",
                attrtype: "on",
                disable: false,
                value: '$popButtonDialog'
            }]
            foottpl.attrs.push(tplbutton1data)
            return tpldata
        },
        dialogtabletemplate(tplitemobj, modelobj) {
            let tpldata = {}
            tpldata.tagname = 'div'
            tpldata.attrs = []

            let tpltabledata = {}
            tpltabledata.tagname = 'el-table'
            tpltabledata.comattrs = [{
                attrname: "stripe",
                attrtype: "props",
                disable: false,
                value: true
            }, {
                attrname: "border",
                attrtype: "props",
                disable: false,
                value: true
            }, {
                attrname: "data",
                attrtype: "props",
                disable: false,
                value: '$dialogtableData'
            }, {
                attrname: "row-click",
                attrtype: "on",
                disable: false,
                value: '$rowclick'
            }]
            tpltabledata.attrs = []
            tpltabledata.isshow = true
            tplitemobj.tplFiled.forEach((fileditem) => {
                let tplfiledobj = _.find(modelobj.attrs, { key: fileditem })
                let tplfilecomdobj = _.find(tplitemobj.tpltotalfield, { attrname: tplfiledobj.attrname })
                let itemchildren = {}
                itemchildren.tagname = 'el-table-column'
                itemchildren.comattrs = [{
                    attrname: "prop",
                    attrtype: "props",
                    disable: false,
                    value: tplfiledobj.attrfield
                }, {
                    attrname: "label",
                    attrtype: "props",
                    disable: false,
                    value: tplfiledobj.attrname
                }]
                if (tplfilecomdobj) {
                    itemchildren.attrs = []
                    itemchildren.attrs.push(tplfilecomdobj)
                }
                itemchildren.isshow = true
                tpltabledata.attrs.push(itemchildren)
            })

            tpldata.attrs.push(tpltabledata)

            let tplpaginationdata = {}
            tplpaginationdata.tagname = 'el-pagination'
            tplpaginationdata.isshow = true
            tplpaginationdata.comattrs = [{
                attrname: "",
                attrtype: "text",
                disable: false,
                value: '新建'
            },
            {
                attrname: "size-change",
                attrtype: "on",
                disable: false,
                value: '$handleDialogSizeChange'
            }, {
                attrname: "current-change",
                attrtype: "on",
                disable: false,
                value: '$handleDialogCurrentChange'
            }, {
                attrname: "page-sizes",
                attrtype: "props",
                disable: false,
                value: [10, 30, 50, 100]
            }, {
                attrname: "page-size",
                attrtype: "props",
                disable: false,
                value: '$dialogpagesize'
            }, {
                attrname: "layout",
                attrtype: "props",
                disable: false,
                value: 'total, sizes, prev, pager, next, jumper'
            }, {
                attrname: "total",
                attrtype: "props",
                disable: false,
                value: '$dialogtotal'
            }, {
                attrname: "current-page",
                attrtype: "props",
                disable: false,
                value: '$dialogcurrentpage'
            }]
            tpldata.attrs.push(tplpaginationdata)
            return tpldata
        },
        subdialog(tplitemobj, modelobj) {
            let tpldata = {}
            tpldata.tagname = 'el-dialog'
            tpldata.isshow = true
            let title = '选择'
            if (tplitemobj != null) {
                title = tplitemobj.name
            }
            tpldata.comattrs = [{
                attrname: "title",
                attrtype: "props",
                disable: false,
                value: title
            },
            {
                attrname: "visible",
                attrtype: "props",
                disable: false,
                value: '$isShowSubDialog'
            }, {
                attrname: "before-close",
                attrtype: "props",
                disable: false,
                value: '$popSubDialog'
            }, {
                attrname: "modal",
                attrtype: "props",
                disable: false,
                value: false
            }]

            tpldata.attrs = []
            if (tplitemobj != null) {
                if (tplitemobj.tpltype && tplitemobj.tpltype == 'table') {
                    this.$store.state.dialog.buttontablename = modelobj.modelname
                    tpldata.attrs.push(this.dialogtabletemplate(tplitemobj, modelobj))
                } else {
                    tpldata.attrs.push(this.formtpl(tplitemobj, modelobj))
                }
            }
            this.dialogfoot(tpldata, true)
            return tpldata
        },
        formtemplate(tplitemobj, modelobj, subtpl, submodel) {
            let tpldata = {}
            tpldata.tagname = 'el-dialog'
            tpldata.isshow = true
            tpldata.comattrs = [{
                attrname: "title",
                attrtype: "props",
                disable: false,
                value: '新建'
            },
            {
                attrname: "visible",
                attrtype: "props",
                disable: false,
                value: '$isShowDialog'
            }, {
                attrname: "before-close",
                attrtype: "props",
                disable: false,
                value: '$popDialog'
            }]

            tpldata.attrs = []
            if (tplitemobj != null) {
                if (tplitemobj.tpltype == 'table') {
                    tpldata.attrs.push(this.tabletemplate(tplitemobj, modelobj))
                }
                else if (tplitemobj.tpltype == 'form') {
                    tpldata.attrs.push(this.formtpl(tplitemobj, modelobj))
                }
            }
            //tpldata.attrs.push(this.formtpl(tplitemobj, modelobj))
            if (subtpl && submodel) {
                tpldata.attrs.push(this.buttondialog(subtpl, submodel))
            }
            this.dialogfoot(tpldata, false)
            return tpldata
        }
    }
}