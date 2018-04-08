<template>
    <span>
        <span>
            <el-input  v-model.trim="data.name" type="text" style="width:200px;" @blur="edititem" size="medium">
            </el-input>
        </span>
        <span style="float: right; margin-right: 20px">
             <el-select v-model="page_id" placeholder="请选择" @change="saveId(page_id)" size="medium">
                <el-option
                v-for="item in pageData"
                :key="item._id"
                :label="item.chname"
                :value="item._id">
                </el-option>
            </el-select>
            <el-button  @click="addItem" size="medium">添加</el-button>
            <el-button  @click="remove_cate" size="medium">删除</el-button>
        </span>
    </span>
</template>
<script>
export default {
    name: 'NgListtree',
    props: ['treeData', 'data', 'pageData','table'],
    data() {
        let localdata = {
            form: {}
        }
        return {
            localdata,
            name: this.data.name,
            model: this.table,
            tables: [this.table],
            page_id: this.data.page_id
        }
    },
    mounted() {
        console.log('pageData', this.pageData)
    },
    methods: {
        saveId(id) {
            this.putHttp('meta', this.table, this.data._id, { page_id: id }).then(() => {
                this.getCate()
            })
        },
        handleShowDialog(url, menuData) {
            this.$store.commit('pushdialog', { url, menuData })
        },
        getCate() {
            this.$emit('update')
        },
        edititem() {
            console.log('date----', this.data.name, this.name)
            if (this.data.name != this.name) {
                let vm = this
                vm.putHttp('meta',this.table, this.data._id, { name: this.data.name }).then(() => {
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
                save: false
            }
            vm.postHttp('meta', this.table, vm.localdata.form).then(() => {
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
                    this.deleteHttp('meta', this.table, vm.data._id).then(() => {
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
