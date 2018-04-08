<template>
    <div>
        <swiper :options="swiperOption" ref="mySwiper" :not-next-tick="notNextTick">
            <!-- 这部分放你要渲染的那些内容 -->
            <template v-for="item in swiperest">
                <swiper-slide>
                    <img :src="'http://'+item.images" alt="" class='imgswiper'>
                </swiper-slide>
            </template>
            <!-- 这是轮播的小圆点 -->
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>
<style>
.imgswiper {
    width: 100%;
}
</style>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
    name: 'LbBanner',
    props: ['imgMessage'],
    components: {
        swiper,
        swiperSlide

    },
    data() {
        return {
            swiperest: this.imgMessage,
            notNextTick: true,
            swiperOption: {
                //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true  
                autoplay: 2000,
                grabCursor: true,
                slidesPerView: 'auto',
                autoplayDisableOnInteraction: false,
                autoHeight: true,
                pagination: '.swiper-pagination',
                paginationClickable: true,
                mousewheelControl: true,
                observeParents: true,
                simulateTouch: true,
                slidesPerView: 1,
                loop: true,
                centeredSlides: true,
                effect: 'coverflow',
                coverflow: {
                    rotate: 30,
                    stretch: 10,
                    depth: 60,
                    modifier: 2,
                    slideShadows: true
                }

            }
        }
    },
    mounted() {
        /* this.swiper.slideTo(3, 1000, false) */

        console.log(this.swiperest)
        console.log(this.imgMessages)
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper
        }
    },
    methods: {

    },

}
</script>