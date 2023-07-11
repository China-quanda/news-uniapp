<template>
	<view class="container">
		<my-nav-bar backgroundColor="transparent">
			<block v-slot:left><my-scan size="23" color="#000" /></block>
			<block v-slot:right>
				<view class="my-nav-bar-right">
					<my-icon icon="icon-jiahao" color="#000" :size="26" @tap="goToPublish" />
					<my-icon icon="icon-set" color="#000" :size="26" @tap="router.push('/pages/mine/setting/index')" />
				</view>
			</block>
		</my-nav-bar>

		<view class="one">
			<view>
				<view class="info" v-if="token">
					<view class="info-one">
						<view class="logo"><image :src="userInfo?.avatar ? userInfo?.avatar : '@/static/images/login.png'" mode="widthFix" /></view>
						<view class="info-name">
							<view class="name">{{ userInfo?.nickname || userInfo?.user_name || '你的maya' }}</view>
							<view>
								<text>{{ userInfo?.myFocus || 0 }}关注</text>
								<text>{{ userInfo?.myFans || 0 }}粉丝</text>
								<text>{{ userInfo?.praise || 0 }}获赞</text>
							</view>
						</view>
					</view>
					<view class="info-two">介绍：{{ userInfo?.introduce || '它很懒，什么都没介绍。' }}</view>
					<view class="info-three">IP 属地：{{ userInfo?.city || '未知' }}</view>
					<view class="info-four">
						<button type="primary" class="custom-style" size="mini" @tap="prompt.msg('暂时未开发此功能')">申请认证</button>
						<button type="primary" class="custom-style" size="mini" @tap="router.push('/pages/setting/profile/index')">编辑资料</button>
						<button type="primary" class="custom-style" size="mini" @tap="prompt.msg('暂时未开发此功能')"><my-icon icon="icon-fenxiang" color="#fff" :size="12" /></button>
					</view>
				</view>
				<view class="cover" v-else @tap="toLogin">登录</view>
			</view>
		</view>

		<my-grid class="my-grid" columns="4" backgroundColor="#fff">
			<my-grid-item v-for="(item, index) in twoGridList" :key="index" @tap="tapItem(item)">
				<my-icon :icon="item.icon" :size="26" />
				<text class="text">{{ item.title }}</text>
			</my-grid-item>
		</my-grid>

		<view class="bottom">
			<view class="three" v-if="token">
				<view>
					<text>“</text>
					分享今天值得记录的瞬间
					<text>”</text>
				</view>
				<button class="btn-publish" type="primary" size="mini" @tap="goToPublish">发布</button>
			</view>
			<view class="four" v-else>
				<!-- <u-sticky bgColor="#fff">
					<u-tabs :list="myList">
					</u-tabs>
				</u-sticky> -->
			</view>
		</view>

		<!-- <u-popup :show="isAllServiceShow" mode="right" @close="isAllServiceShow = false" @open="isAllServiceShow = true" >
				<AllService @close="isAllServiceShow=false"/>
		</u-popup> -->
	</view>
</template>

<script setup lang="ts">
import { mapGetters } from 'vuex';
// import { getUserHomePage } from '@/api/user'
// import { getUserArticle } from '@/api/article'
// import AllService from '@/pages/user/components/all-service.vue'
import router from '@/utils/router';
import storage from '@/utils/storage';
import prompt from '@/utils/prompt';
import { ref, reactive } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
// ...mapGetters([ 'token', 'userInfo','userId' ])

onLoad(() => {
	// getUserHomePage(this.userId)
	// getUserArticle(this.userId);
	token.value = storage.get('token');
});
let token = ref<string>('');
let total = ref<number>(0);
let myAllArticle = ref([]);
let query = reactive({
	pageNum: 1,
	pageSize: 10
});
let isAllServiceShow = ref<boolean>(false);
let myList = ref([{ name: '全部' }, { name: '文章' }, { name: '视频' }, { name: '问答' }, { name: '小视频' }, { name: '微头条' }]);
let twoGridList = ref([
	{
		icon: 'icon-pinglun',
		title: '评论'
	},
	{
		icon: 'icon-shoucang',
		title: '收藏'
	},
	{
		icon: 'icon-xiazai',
		title: '下载'
	},
	{
		icon: 'icon-lishi',
		title: '历史'
	},
	{
		icon: 'icon-xiaoxi',
		title: '消息'
	},
	{
		icon: 'icon-dianzan',
		title: '点赞'
	},
	{
		icon: 'icon-jubao',
		title: '举报'
	},
	{
		icon: 'icon-quanbu',
		title: '全部',
		url: './all-service'
	}
]);

let goMyContent = () => {
	router.push('/pages//user/mycontent');
};
// 点击发布
let goToPublish = () => {
	prompt.msg('请先登录');
};
// 获取用户发布的文章列表 根据用户id
let getUserArticle = async id => {
	const res = await getUserArticle(id, this.query);
	if (!res) return;
	myAllArticle.value = res.list;
	total.value = res.total;
};
// 获取用户主页信息
let getUserHomePage = async id => {
	const userInfo = await getUserHomePage(id);
	// this.$store.commit('user/SET_USERINFO',userInfo)
};
let toLogin = () => {
	router.push('/pages/login/login');
};
let tapItem = row => {
	console.log(row);
	if (!row.url) return prompt.msg(`${row.title} 功能未实现`);
	router.push(row.url);

	// console.log(`点击了第${name}个`);
	// if (name == 2) {
	// 	router.push('/pages/user/download/index');
	// } else if (name == 4) {
	// 	router.push('/pages/user/message/index');
	// } else if (name == 7) {
	// 	this.isAllServiceShow = true;
	// } else {
	// 	router.push('/pages/user/content/index');
	// }
};
</script>

<style lang="scss" scoped>
.container {
	font-size: 14px;
	color: #292929;
	background-color: #f8f8f8;
}
.my-nav-bar-right {
	width: 60px;
	display: flex;
	justify-content: space-between;
}
.one {
	height: 250px;
	padding: 15px;
	text-align: center;
	box-sizing: border-box;
	.cover {
		position: absolute;
		left: 50%;
		width: 100px;
		height: 100px;
		line-height: 100px;
		color: #fff;
		font-size: 16px;
		border-radius: 50px;
		transform: translate(-50%, 50%);
		background-color: rgb(210, 92, 92);
		box-shadow: 0 0 10px #ddd;
	}
	.info {
		text-align: left;
		.info-one {
			display: flex;
			align-items: center;
			margin: 20px 0px 15px 0px;
			.logo {
				width: 70px;
				height: 70px;
				margin-right: 10px;
				border: 3px solid #fff;
				border-radius: 50%;
				overflow: hidden;
			}
			.info-name {
				.name {
					margin-bottom: 5px;
					font-size: 18px;
					font-weight: 500;
				}
				text {
					margin: 0 5px;
					&:nth-child(1) {
						margin-left: 0px;
					}
				}
			}
		}
		.info-four {
			margin-top: 7px;
			.custom-style {
				margin-right: 6px;
			}
		}
	}
}
.my-grid {
	padding: 10px 0px;
	color: #292929;
	.text {
		margin-top: 3px;
	}
}
.three {
	background-color: #fff;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	padding: 20px 0px 90px 0px;
	.btn-publish {
		margin-top: 10px;
	}
	text {
		font-size: 36px;
		color: #eee5e5;
	}
}
.bottom {
	margin-top: 5px;
}
</style>
