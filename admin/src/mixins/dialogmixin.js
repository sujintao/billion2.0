export default {
    computed: {
        isShowDialog() {
            console.log(this.$store.state.dialog.dailogshow)
            return this.$store.state.dialog.dailogshow
        },
        isShowSubDialog() {
            console.log(this.$store.state.dialog.subdailogshow)
            return this.$store.state.dialog.subdailogshow
        },
        isButtonShowDialog() {
            console.log(this.$store.state.dialog.buttondailogshow)
            return this.$store.state.dialog.buttondailogshow
        }
    },
    methods: {
        showDialog(data) {
            this.$store.commit('pushdialog', data)
        },
        subshowDialog(data) {
            this.$store.commit('subpushdialog', data)
            this.loaddialogtabledata()
        },
        buttonshowDialog(data) {
            this.$store.commit('buttonpushdialog', data)
            this.loaddialogtabledata()
        },
        getDataset(obj, name) {
            let dataobj = null
            console.log('---',obj)
            if (obj.dataset && obj.dataset[name]) {
                dataobj = obj.dataset[name]
            } else {
                dataobj = this.getDataset(obj.parentElement, name)
            }
            return dataobj
        },
        pushDialog(url, data) {
            console.log(url)
            this.$store.commit('pushdialog', { url, data })
        },
        subpushDialog(url, data) {
            console.log(url)
            this.$store.commit('subpushdialog', { url, data })
        },
        buttonpushDialog(url, data) {
            console.log(url)
            this.$store.commit('buttonpushDialog', { url, data })
        },
        popDialog() {
            this.$store.commit('popdialog')
        },
        popSubDialog() {
            this.$store.commit('popsubdialog')
        },
        popButtonDialog() {
            this.$store.commit('popbuttondialog')
        }
    }
}