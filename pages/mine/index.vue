<template>
	<view class="container">
		<my-nav-bar bg-color="transparent" @clickLeft="tapScan">
			<template v-slot:left>
				<text class="iconfont icon-saoyisao"></text>
			</template>
			<template v-slot:right>
				<view class="my-nav-bar-right" :style="{ width: userStore.token ? '60px' : '' }">
					<text v-if="userStore.token" class="iconfont icon-jiahao text-black" @click="goToPublish"></text>
					<text class="iconfont icon-set text-black text-18px" @click="router.push('/pages/mine/setting/index')"></text>
				</view>
			</template>
		</my-nav-bar>

		<view class="one">
			<view>
				<view class="info" v-if="userStore.token">
					<view class="info-one">
						<view class="logo">
							<image class="w-70px h-70px" :src="userStore.avatar" mode="scaleToFill" />
						</view>
						<view class="info-name">
							<view class="name">{{ userStore.username || '你的maya' }}</view>
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
						<view class="button " @click="prompt.msg('暂时未开发此功能')">
							<text class="iconfont icon-fenxiang"></text>
							<text class="text">申请认证</text>
						</view>
						<view class="button" @click="router.push('/pages/mine/setting/profile/index')">
							<text class="iconfont icon-fenxiang"></text>
							<text class="text">编辑资料</text>
						</view>
						<view class="button button-mini" @click="prompt.msg('暂时未开发此功能')">
							<text class="iconfont icon-fenxiang"></text>
						</view>
					</view>
				</view>
				<view class="cover" v-else @click="toLogin">登录</view>
			</view>
		</view>

		<view class="channel-list">
			<view class="channel-item rd-4px " v-for="(item, index) in twoGridList" :key="index" @click="tapItem(item)">
				<text :class="['iconfont', item.icon]"></text>
				<text class="item-text">{{ item.text }}</text>
			</view>
		</view>

		<view class="bottom">
			<view class="three" v-if="!userStore.token">
				<view>
					<text>“</text>
					分享今天值得记录的瞬间
					<text>”</text>
				</view>
				<view v-if="userStore.token" class="btn-publish" @click="goToPublish">发布</view>
				<view v-else class="btn-publish" @click="toLogin">去登录</view>
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
// import { getUserHomePage } from '@/api/user'
// import { getUserArticle } from '@/api/article'
// import AllService from '@/pages/user/components/all-service.vue'
import { useUserStore } from '@/store/user'
const userStore = useUserStore();
import storage from '@/utils/storage';
import router from '@/utils/router';
import prompt from '@/utils/prompt';
import { qrScannedLogin } from '@/api/user'

onLoad(() => {
	// userStore.getUserInfo()
	// getUserHomePage(this.userId)
	// getUserArticle(this.userId);
});
let userInfo = reactive({})
let total = ref<number>(0);
let myAllArticle = ref([]);
let query = reactive({
	pageNum: 1,
	pageSize: 10
});
let myList = ref([{ name: '全部' }, { name: '文章' }, { name: '视频' }, { name: '问答' }, { name: '小视频' }, { name: '微头条' }]);
let twoGridList = ref([
	{
		icon: 'icon-pinglun',
		text: '评论',
		url: '/pages/mine/content/index',
		type: 'comment'
	},
	{
		icon: 'icon-shoucang',
		text: '收藏',
		url: '/pages/mine/content/index',
		type: 'collect'
	},
	{
		icon: 'icon-xiazai',
		text: '下载',
		url: './download/index'
	},
	{
		icon: 'icon-lishi',
		text: '历史',
		url: '/pages/mine/content/index',
		type: 'history'
	},
	{
		icon: 'icon-xiaoxi',
		text: '消息',
		url: './message/index'
	},
	{
		icon: 'icon-dianzan',
		text: '点赞',
		url: '/pages/mine/content/index',
		type: 'like'
	},
	{
		icon: 'icon-jubao',
		text: '举报',
		url: '/pages/mine/content/index',
		type: 'report'
	},
	{
		icon: 'icon-quanbu',
		text: '全部',
		url: './allService'
	}
]);
const tapScan = () => {
	console.log('tapScan');
	// #ifdef H5
	return prompt.msg('H5 暂不支持扫码！')
	// #endif
	if (!storage.get('token')) return prompt.msg('请登录后再扫码！')
	uni.scanCode({
		success: (res) => {
			console.log('条码类型：' + res.scanType);
			console.log('条码内容：' + res.result);
			let result = JSON.parse(res.result)
			if (result.type == 'login') {
				qrScannedLogin({ qrcodeId: result.qrcodeId }).then(res => {
					console.log(res);
					storage.set('qrCode', { ...result, ...res })
					router.push({ url: '/pages/login/confirmLogin' })
				}).catch((err) => {
					console.log(err);
				})
			}
		}
	});
}
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
};
let toLogin = () => {
	router.push('/pages/login/login');
};
const tapItem = row => {
	console.log(row)
	if (row.url) {
		if (row.type) {
			router.push(`${row.url}?type=${row.type}`);
		} else {
			router.push(`${row.url}`);
		}
	} else {
		return prompt.msg(`${row.text} 功能未实现`);
	}
};
</script>

<style lang="scss" scoped>
.container {
	@apply text-14px text-#292929 bg-#f8f8f8;
}

.my-nav-bar-right {
	@apply flex justify-between;
}

.one {
	@apply h250px p15px text-center box-border;

	.cover {
		@apply absolute left-50% w100px h100px lh-100px text-white text-16px rd-50px;
		transform: translate(-50%, 50%);
		background-color: rgb(210, 92, 92);
		box-shadow: 0 0 10px #ddd;
		background: #5488CE;
		background: -moz-radial-gradient(center, #5488CE 0%, #C55CA2 100%);
		background: -webkit-radial-gradient(center, #5488CE 0%, #C55CA2 100%);
		background: radial-gradient(ellipse at center, #5488CE 0%, #C55CA2 100%);
	}

	.info {
		@apply text-left;

		.info-one {
			@apply flex flex-items-center mt20px mb15px;

			.logo {
				@apply w70px h70px mr10px overflow-hidden;
				border: 3px solid #fff;
				border-radius: 50%
			}

			.info-name {
				.name {
					@apply mb5px text-18px font-500;
				}

				text {
					@apply mx-5px;

					&:nth-child(1) {
						@apply ml0px;
					}
				}
			}
		}

		.info-four {
			@apply flex mt7px gap-x-5px;

			.button {
				@apply flex flex-items-center gap-x-2px text-white bg-#007aff rd-3px py-5px px-15px;
			}

			.text {
				@apply text-12.5px;
			}

			.button-mini {
				@apply px-10px;
			}

			.custom-style {
				@apply mr6px;
			}
		}
	}
}

.channel-list {
	@apply grid grid-cols-4 grid-rows-2 gap-8px mt-10px bg-white p-12px;

	// background-color: rgb(196, 196, 232);
	.channel-item {
		@apply relative p-4px box-border flex-1 flex flex-col flex-justify-center flex-items-center gap-y-5px;

		// bg-#f8f8f8
		.item-text {
			@include ellipsis(1);
		}

		.iconfont {
			@apply text-black text-20px;
		}
	}
}

.bottom {
	@apply mt-5px;

	.three {
		@apply flex justify-center flex-col flex-items-center bg-white pt20px;

		.btn-publish {
			@apply mt-10px bg-#007aff py-6px px-17px text-white rd-4px;
		}

		text {
			@apply text-28px;
		}
	}
}
</style>
