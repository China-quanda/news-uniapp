<template>
  <div class="user-content">
		<u-navbar rightText="搜索" placeholder fixed  >
			<view class="center" slot="center">
				<u-search shape="round" @click="clickInput" :showAction="false" disabled></u-search>
			</view>
			
		</u-navbar>
		
		<u-sticky bgColor="#fff"><u-tabs :list="tabsList" @tap="clickTabs"> </u-tabs> </u-sticky>
		<view class="Panel">
			<collect v-if="status==0" :userId='userId'/>
			<comment v-else-if="status==1" :userId='userId'/>
			<history v-else-if="status==2" :userId='userId'/>
			<like v-else-if="status==3" :userId='userId'/>
			<report v-else-if="status==4" :userId='userId'/>
			<view v-else class="">
				暂未开发
			</view>
		</view>
  </div>
</template>

<script>
import collect from '@/pages/user/content/components/collect.vue'
import comment from '@/pages/user/content/components/comment.vue'
import like from '@/pages/user/content/components/like.vue'
import history from '@/pages/user/content/components/history.vue'
import report from '@/pages/user/content/components/report.vue'
import {mapGetters} from 'vuex'
export default {
  name: 'user-content',
  components: {
    collect,
    comment,
    like,
    history,
    report
  },
  data () {
    return {
			status:0,
      tabsList: [
        {name: "收藏",},
        {name: "评论",},
        {name: "历史",},
        {name: "点赞",},
        {name: "举报",},
        {name: "推送",},
        {name: "预约",},
      ],
    }
  },
  computed:{
    ...mapGetters(['userId'])
  },
  methods: {
		clickTabs(item) {
			if(item.name == '收藏'){
				
				this.status = 0
			}else if(item.name == '评论'){
			
				this.status = 1
			}else if(item.name == '历史'){
				
				this.status = 2
			}else if(item.name == '点赞'){
			
				this.status = 3
			}else if(item.name == '举报'){
			
				this.status = 4
			}else if(item.name == '推送'){
				this.$u.toast("推送");
				this.status = 5
			}else if(item.name == '预约'){
				this.$u.toast("预约");
				this.status = 6
			}
		},
		tapLeft() {
			uni.navigateBack()
		},
		tapRight() {
		  this.$u.toast("点击搜索");
		},
		clickInput() {
		  uni.navigateTo({
		    url: "/pages/search/index",
		  });
		},
	}
}
</script>
<style lang="scss" scoped>
/deep/.u-navbar__content__left ,{
	padding: 0px 0px 0px 10px;
	// padding-left: 10px;
}
/deep/.u-navbar__content__right{
	padding: 0px 10px 0px 0px;
	// padding-right: 10px;
}
/deep/.center{
	width: 75%;
	// flex: 2;
}
</style>
