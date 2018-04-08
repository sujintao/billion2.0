<template>
    <div class="home">
        <div class="header">
          <yd-navbar title="主页" bgcolor="#ed293f" fontsize="20px" color="#fff" height="2.5rem"></yd-navbar>
        </div>
        <div class="slider"> 
            <yd-slider autoplay="3000">
                <template v-for="item in Sliderdata">
                    <yd-slider-item>
                        <a :href="item.to">
                            <img :src="item.src">
                        </a>
                    </yd-slider-item>
                </template>
            </yd-slider>
        </div>
        <div class="rollnotice">
          <yd-rollnotice autoplay="2000" align="center">
              <template v-for="item in rollnoticedata">
                <yd-rollnotice-item><span style="color:#F00;"> {{item.icon}} </span>{{item.content}}</yd-rollnotice-item>
              </template>
          </yd-rollnotice>
      </div>
      <div class="group">
          <yd-grids-group :rows="2" title="热门种类" item-height="100px">
                <yd-grids-item v-for="item in groupdata">
                    <img slot="icon" :src="item.src">
                    <span slot="text">{{item.text}}</span>
                </yd-grids-item>
            </yd-grids-group>
      </div>
    </div>
</template>

<script>
export default {
    name: "home",
    data() {
        return {
            Sliderdata:[
                {to:'#/detailview',src:'./assets/images/banner01.jpg'},
                {to:'#/explain',src:'./assets/images/banner02.jpg'},
                {to:'#/person',src:'./assets/images/banner03.jpg'}
            ],
            rollnoticedata:[
                {icon:'荐',content:'荣耀V9 3月超级钜惠！'},
                {icon:'推荐',content:'3.23京东超级品牌日格力盛典'},
                {icon:'超推荐',content:'京东服饰 早春新品低至7折'}
            ],
            groupdata:[
                {src:'./assets/images/WechatIMG3.jpeg',text:'网格1'},
                {src:'./assets/images/WechatIMG3.jpeg',text:'网格2'},
                {src:'./assets/images/WechatIMG3.jpeg',text:'网格3'},
                {src:'./assets/images/WechatIMG3.jpeg',text:'网格4'},
                {src:'./assets/images/WechatIMG3.jpeg',text:'网格5'},
                {src:'./assets/images/WechatIMG3.jpeg',text:'网格6'},
                {src:'./assets/images/WechatIMG23.jpeg',text:'网格7'},
                {src:'./assets/images/WechatIMG23.jpeg',text:'网格8'},
                {src:'./assets/images/WechatIMG23.jpeg',text:'网格9'},
                {src:'./assets/images/WechatIMG23.jpeg',text:'网格10'},
            ]
        };
    },
    created() {

    },
    mounted() {
        
    },
    computed: {

    },

    methods: {}
}
</script>
<style>
.slider{
    height: 167px;
}
.yd-grids-icon img{
    /* width: 50px !important; */
    height: 50px !important;
}
.yd-rollnotice-item{
    font-size: 0.8rem !important;
}
</style>