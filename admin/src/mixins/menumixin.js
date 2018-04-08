export default {
    computed: {
        getcurrentmenu() {
            return this.$store.state.menu.menuaction
        },
        getmenuname(){
            console.log('menuname',this.$store.state.menu.menuname)
            return this.$store.state.menu.menuname
        }
    },
    methods: {
        setmenu(data) {
            this.$store.commit('setmenu', data)
        },
        setmenuname(data) {
            this.$store.commit('setmenuname', data)
        }
    }
}