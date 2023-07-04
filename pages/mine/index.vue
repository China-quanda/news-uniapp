<template>
	<view class="wrap">
		<!-- rightWidth="70rpx" -->
		<my-nav-bar :clickRight="clickRight" leftWidth="60rpx" backgroundColor="transparent">
			<block v-slot:left><my-scan size="18" color="#000" /></block>
			<block v-slot:right>
				<view v-if="token">
					<i class="iconfont icon-jiahao" @tap="setting">发布</i>
				</view>
				<!-- <view><i class="iconfont icon-set" @tap="setting"></i></view> -->
				<uni-icons type="setting" size="18" color="#999"/>
			</block>
		</my-nav-bar>

		<!-- <view class="one">
			<view>
				<view class="info" v-if="token">
					<view class="info-one">
						<view class="logo"><image :src="userInfo.avatar:'@/static/images/login.png'" mode="widthFix"></image></view>
						<view class="info-name">
							<view class="name">
								<b>{{ userInfo.nickname || userInfo.user_name || '网友820820' }}</b>
							</view>
							<view>
								<text>
									<b>{{ userInfo.myFocus || 0 }}</b>
									关注
								</text>
								<text>
									<b>{{ userInfo.myFans || 0 }}</b>
									粉丝
								</text>
								<text>
									<b>{{ userInfo.praise }}</b>
									获赞
								</text>
								暂时未开发
							</view>
						</view>
					</view>
					<view class="info-two" v-if="userInfo.introduce">
						<p>{{ userInfo.introduce }}</p>
					</view>
					<view class="info-three">
						<p>IP 属地：{{ userInfo.city || '未知' }}</p>
					</view>
					<view class="info-four">
						<u-button type="primary" class="custom-style" size="small" @tap="prompt.msg('暂时未开发此功能')">申请认证</u-button>
						<u-button type="primary" class="custom-style" size="small" @tap="router.push('/pages/setting/profile/index')">编辑资料</u-button>
						<u-button type="primary" class="custom-style" size="small" @tap="prompt.msg('暂时未开发此功能')"><i class="iconfont icon-fenxiang"></i></u-button>
					</view>
				</view>
				<view class="cover" v-else @tap="toLogin">登录</view>
			</view>
		</view> -->

		<my-grid columns="4" backgroundColor="#fff">
			<my-grid-item v-for="(item, index) in twoGridList" :key="index">
				<i :class="'iconfont ' + item.icon">1</i>
				<text>{{ item.title }}</text>
			</my-grid-item>
		</my-grid>

		<view class="bottom">
			<view class="three" v-if="!token">
				<view>
					<text>“</text>分享今天值得记录的瞬间<text>”</text>
				</view>
				<!-- <view @tap="goToPublish" class="btn-publish">
					<u-button type="primary">
						<i class='iconfont icon-jiahao'></i>发布
					</u-button>
				</view> -->
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
		icon: 'icon-pinglun',
		title: '评论'
	},
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
		title: '全部'
	}
]);

const clickLeft = () => {};
const clickRight = () => {
	console.log('扫一扫');
};
let goMyContent = () => {
	router.push('/pages//user/mycontent');
};
let setting = () => {
	router.push('/pages/setting/index');
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
	router.push('/pages/login/index');
};
let clickTwoGrid = name => {
	console.log(`点击了第${name}个`);
	if (name == 2) {
		router.push('/pages/user/download/index');
	} else if (name == 4) {
		router.push('/pages/user/message/index');
	} else if (name == 7) {
		this.isAllServiceShow = true;
	} else {
		router.push('/pages/user/content/index');
	}
};
</script>

<style lang="scss" scoped>
.wrap {
	background-color: #f8f8f8;
}
// .right {
// 	.setting-r {
// 		display: flex;
// 		align-items: center;
// 		.icon-jiahao {
// 			font-size: 16px;
// 			margin-right: 10px;
// 		}
// 	}
// 	.icon-set {
// 		font-size: 28px;
// 	}
// }

.one {
	height: 270px;
	padding: 15px;
	text-align: center;
	box-sizing: border-box;
	.setting {
		display: flex;
		justify-content: space-between;
		.icon-saoyisao {
			font-size: 27px;
		}
		.icon-set {
			font-size: 31px;
		}
		.setting-r {
			display: flex;
			align-items: center;
			.icon-jiahao {
				font-size: 16px;
				margin-right: 10px;
			}
		}
	}
	.cover {
		width: 100px;
		height: 100px;
		background-color: rgb(210, 92, 92);
		border-radius: 50px;
		line-height: 100px;
		color: #fff;
		position: absolute;
		left: 50%;
		transform: translate(-50%, 35%);
		box-shadow: 0 0 10px #ddd;
	}
	.info {
		.info-one {
			display: flex;
			align-items: center;
			margin: 20px 0px 15px 0px;
			.logo {
				width: 70px;
				height: 70px;
				border-radius: 50%;
			}
			.info-name {
				text-align: left;
				margin-left: 10px;
				.name {
					margin-bottom: 5px;
				}
				b {
					text-align: center;
					font-size: 18px;
					font-weight: 500;
					margin-right: 2px;
				}
				text {
					font-size: 12px;
					margin: 0 5px;
				}
			}
		}
		.info-two,
		.info-three {
			p {
				margin: 2px 0px 0px 0px;
			}
			text-align: left;
			font-size: 14px;
		}
		.info-four {
			display: flex;
			float: left;
			margin-top: 7px;
			.custom-style {
				width: 66px;
				margin-right: 6px;
			}
		}
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
		margin: 0 5px;
		font-size: 36px;
		color: #eee5e5;
	}
}
.bottom {
	margin-top: 5px;
}
</style>
