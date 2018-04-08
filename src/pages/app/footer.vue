<template>
    <div class='footer'>
        <yd-tabbar active-color="#ed293f">
            <yd-tabbar-item title="大厅" link="/" :active="istrend">
                <lb-icons :icon="footIconList.iconHome" slot="icon"></lb-icons>   
            </yd-tabbar-item>
            <yd-tabbar-item title="热门资讯" link="/detailview" :active="isdetailview">
                <lb-icons :icon="footIconList.iconDetailview" slot="icon"></lb-icons>
            </yd-tabbar-item>
            <yd-tabbar-item title="玩法说明" link="/explain" :active="isexplain"> 
                <lb-icons :icon="footIconList.iconExplain" slot="icon"></lb-icons>
            </yd-tabbar-item>
            <yd-tabbar-item title="我的" link="/person" :active="isperson">
                <lb-icons :icon="footIconList.iconPerson" slot="icon"></lb-icons>
            </yd-tabbar-item>
        </yd-tabbar>
    </div>
</template>
<script type="text/babel">

export default {
    name: 'footer',
    data() {
        return {
              footIconList:{
                  iconHome:'iconHomeActive',
                  iconDetailview:'iconDetailview',
                  iconExplain:'iconExplain',
                  iconPerson:'iconPerson'
              },
            istrend:true,
            isdetailview:false,
            isexplain:false,
            isperson:false
        }
    },
    computed: {

    },
    mounted(){
        console.log(this.footIconList.iconHome)
    },
    watch: {
            "$route":"routelinkchange"
    },
    methods: {
        routelinkchange(){
                let path = this.$route.path
                if(path=='/'||path=="/home"){
                    this.footIconList.iconHome='iconHomeActive'
                    this.footIconList.iconDetailview='iconDetailview'
                    this.footIconList.iconExplain='iconExplain'
                    this.footIconList.iconPerson='iconPerson'
                    this.istrend=true
                    this.isdetailview=false
                    this.isexplain=false
                    this.isperson=false
                }else if(path=='/detailview'){
                    this.footIconList.iconHome='iconHome'
                    this.footIconList.iconDetailview='iconDetailviewActive'
                    this.footIconList.iconExplain='iconExplain'
                    this.footIconList.iconPerson='iconPerson'
                    this.isdetailview=true
                    this.istrend=false
                    this.isexplain=false
                    this.isperson=false
                }else if(path=='/explain'){
                    this.footIconList.iconHome='iconHome'
                    this.footIconList.iconDetailview='iconDetailview'
                    this.footIconList.iconExplain='iconExplainActive'
                    this.footIconList.iconPerson='iconPerson'
                    this.isdetailview=false
                    this.istrend=false
                    this.isexplain=true
                    this.isperson=false
                }else if(path=='/person'){
                    this.footIconList.iconHome='iconHome'
                    this.footIconList.iconDetailview='iconDetailview'
                    this.footIconList.iconExplain='iconExplain'
                    this.footIconList.iconPerson='iconPersonActive'
                    this.isdetailview=false
                    this.istrend=false
                    this.isexplain=false
                    this.isperson=true
                }
            }
    }
}
</script>

<style>
.footer{
    position:fixed;
    bottom:0;
    width: 100%;
    z-index: 1000;
}
@media screen and (max-width: 361px) {
    .mu-bottom-item-active .mu-bottom-item-text{
    font-size: 12px;
}
}
.yd-tabbar-item{
    height: 3.5rem;
}
.yd-tabbar-icon{
    margin-bottom: 1rem;
    margin-top: 1rem;
}
</style>

