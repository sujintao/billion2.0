<template>
    <span>
        <span>
            <el-input  v-model.trim="data.name" type="text" style="width:200px;" @blur="edititem" size="medium">
            </el-input>
        </span>
        <span style="float: right; margin-right: 20px">
            <el-button  @click="setModel" size="medium">设置模块</el-button>
            <el-button  @click="addItem" size="medium">添加</el-button>
            <el-button  @click="remove_cate" size="medium">删除</el-button>
        </span>
    </span>
</template>
<script>
export default {
    name: 'NgMenutree',
    props: ['treeData', 'data', 'pageData'],
    data() {
        let localdata = {
            form: {}
        }
        return {
            localdata,
            name: this.data.name,
            model: 'metauimenu',
            tables: ['metauimenu'],
        }
    },
    mounted() {
        console.log('pageData', this.pageData)
    },
    methods: {
        setModel(){
            this.$emit('getmodel',this.data._id)
        },
        handleShowDialog(url, menuData) {
            this.$store.commit('pushdialog', { url, menuData })
        },
        getCate() {
            this.$emit('update')
        },
        edititem() {
            if (this.data.name != this.name) {
                let vm = this
                vm.putHttp('meta', 'metauimenu', this.data._id, { name: this.data.name }).then(() => {
                    vm.getCate()
                }, (e) => {
                    console.log(e)
                })
            }
        },
        addItem() {
            let vm = this
            vm.localdata.form = {
                name: '请收入组件名',
                pid: vm.data._id,
                save: false,
                icon:'',
                to:'',
                sort:'',
                model_id:'',
                tpl_id:'',
                isshow:true
            }
            vm.postHttp('meta', 'metauimenu', vm.localdata.form).then(() => {
                vm.getCate()
            }, (e) => {
                console.log(e)
            })
        },
        remove_cate() {
            let vm = this
            if (vm.data.children && vm.data.children.length > 0) {
                this.$message({
                    type: 'info',
                    message: '请先删除子分类，再删除此类'
                })
            } else {
                this.$confirm('删除分类, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteHttp('meta', 'metauimenu', vm.data._id).then(() => {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                        vm.getCate()
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            }
        }
    },
    computed: {

    },
}
</script>
