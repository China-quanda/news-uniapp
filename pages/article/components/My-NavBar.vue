<template>
  <view class='nav-bar'>
		<view class="my-nav">
			<u-navbar border placeholder fixed>
				<view class="left" slot="left">
					<u-icon name="arrow-left" color="#03080b" size="20" @click="back"></u-icon>
					<!-- v-show="showAuthor" -->
					<view class="left-top" >
						<u-avatar src="https://img01.yzcdn.cn/vant/cat.jpeg" size="32" @tap="onClickUser"></u-avatar>
					  <h4 @tap="onClickUser">你的Maya</h4>
					  <b @tap="OnClickFollowing">关注</b>
					</view>
				</view>
				<view class="right" slot="right">
					<i class='iconfont icon-sousuo' @tap="onClickSearch"></i>
					<i class='iconfont icon-gengduo1' @tap="onClickShare"></i>
				</view>
			</u-navbar>
		</view>
   </view>
</template>

<script>
import bus from '@/utils/bus'
export default {
  name: 'NavBar',
  components: {},
  data () {
    return {
      showAuthor: false
    }
  },
  created () {
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, true)
  },
  methods: {
		back(){
			uni.navigateBack();
		},
    handleScroll (e) {
      const scrollTop = e.target.scrollTop
      const offsetTop = this.$parent.$refs.author.offsetTop + this.$parent.$refs.author.offsetHeight
      if (scrollTop > offsetTop) {
        this.showAuthor = true
      } else {
        this.showAuthor = false
      }
    },
    onClickBack () {
      this.$router.back()
    },
    onClickUser () {
      this.$router.push('/user')
    },
    OnClickFollowing () {
      console.log('点击了关注作者')
    },
    onClickShare () {
      bus.$emit('onClickShare')
    },
    onClickSearch () {
      uni.navigateTo({
        url: "/pages/search/index",
      });
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll, true)
  }
}
</script>
<style lang="scss" scoped>
	.my-nav{
		.left{
			display: flex;
			.left-top{
				margin-left: 20px;
			   display:flex;
			   align-items: center;
			   color: #000;
			   h4{margin:0px 10px;}
			   b{color:rgb(240, 62, 38)}
			}
		}
		.right{
			.icon-gengduo1{margin-left: 15px;}
		}
	}
	


</style>
