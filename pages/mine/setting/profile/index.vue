<template>
	<view class="container">
		<view class="info">
			<view class="info-img" @click="uploadAvatarImg">
				<image class="avatar"
					:src="userInfo.avatar ? userInfo.avatar : 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'"
					mode="scaleToFill" />
				<text class="info-click">点击更换头像</text>
			</view>
		</view>
		<view class="gap"></view>
		<view class="cell-group">
			<view class="cell is-border" @click="router.push('./edit?title=用户名&type=textarea&valueData=123')">
				<view class="cell-left">
					<text class="title">用户名</text>
				</view>
				<view class="cell-right">
					<text class="desc">{{ userInfo?.nickname ? userInfo.nickname : '待完善' }}</text>
					<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
				</view>
			</view>
			<view class="cell is-border" @click="router.push('./edit?title=简介&type=input&valueData=123')">
				<view class="cell-left">
					<text class="title">简介</text>
				</view>
				<view class="cell-right">
					<text class="desc">{{ userInfo?.introduce ? userInfo.introduce : '待完善' }}</text>
					<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
				</view>
			</view>
			<view class="cell is-border" @click="uploadBgImg">
				<view class="cell-left">
					<text class="title">背景图</text>
				</view>
				<view class="cell-right">
					<text class="desc">{{ userInfo?.background_image ? '去更换' : '去设置' }}</text>
					<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
				</view>
			</view>
			<view class="cell is-border" @click="showGender = true">
				<view class="cell-left">
					<text class="title">性别</text>
				</view>
				<view class="cell-right">
					<text class="desc">{{ userInfo?.gender ? userInfo.gender : '待完善' }}</text>
					<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
				</view>
			</view>
			<view class="cell is-border" @click="showBirthday = true">
				<view class="cell-left">
					<text class="title">生日</text>
				</view>
				<view class="cell-right">
					<text class="desc">{{ userInfo?.birthday ? userInfo.birthday : '待完善' }}</text>
					<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
				</view>
			</view>
			<view class="cell is-border" @click="showCity = true">
				<view class="cell-left">
					<text class="title">所在地</text>
				</view>
				<view class="cell-right">
					<text class="desc">{{ userInfo?.city ? userInfo.city : '待完善' }}</text>
					<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
				</view>
			</view>
			<view class="cell is-border" @click="router.push(`./edit?title=学校&type=input&valueData=${userInfo.school}`)">
				<view class="cell-left">
					<text class="title">学校</text>
				</view>
				<view class="cell-right">
					<text class="desc">{{ userInfo?.school ? userInfo.school : '待完善' }}</text>
					<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
				</view>
			</view>
			<view class="cell is-border" @click="router.push(`./edit?title=职业&type=input&valueData=${userInfo.profession}`)">
				<view class="cell-left">
					<text class="title">职业</text>
				</view>
				<view class="cell-right">
					<text class="desc">{{ userInfo?.profession ? userInfo.profession : '待完善' }}</text>
					<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
				</view>
			</view>
		</view>

		<!-- 编辑性别 -->

		<!-- 编辑生日 -->

		<!-- 编辑城市 -->

		<!-- 修改头像 -->
		<!-- <van-popup v-model="showAvatar" position="bottom"  class="update-photo-popup">
          <UpdatePhoto :file="file" @close="showAvatar=false" v-if="showAvatar" :type="'avatar'"/>
        </van-popup> -->
		<!-- 修改背景图 -->
		<!-- <van-popup v-model="showBackgroundImage" position="bottom"  class="update-photo-popup">
          <UpdatePhoto :file="file" @close="showBackgroundImage=false" v-if="showBackgroundImage" :type="'background_image'"/>
        </van-popup> -->
	</view>
</template>

<script setup lang="ts">
import router from '@/utils/router';
// import { mapGetters } from 'vuex'
// import { editUser } from '@/api/user'
// import UpdatePhoto from '@/views/Setting/components/update-photo.vue'
// import { setItem } from "@/utils/storage";

let showGender = ref(false);
let showBirthday = ref(false);
let showCity = ref(false);
let showAvatar = ref(false);
let showBackgroundImage = ref(false);
let file = ref('');
let columnsGender = reactive([['男', '女']]);
let columnsCity = reactive([['中国', '美国'], ['深圳', '厦门', '上海', '拉萨']]);
let userInfo = reactive({});

// 上传背景图
const uploadBgImg = () => {
	uni.chooseImage({
		count: 1, //默认9
		success: function (res) {
			// 获取到的图片地址
			this.file = res.tempFilePaths[0];
			console.log(res.tempFilePaths[0]);
			this.showBackgroundImage = true;
		}
	});
};
// 上传头像
const uploadAvatarImg = () => {
	uni.chooseImage({
		count: 1, //默认9
		success: function (res) {
			// 获取到的图片地址
			this.file = res.tempFilePaths[0];
			console.log(res.tempFilePaths[0]);
			this.showAvatar = true;
		}
	});
};


// 修改性别
const editGender = v => {
	console.log(v);
};
//  修改生日
const editBirthday = v => {
	console.log(v);
};
// 修改城市
const editCity = v => {
	console.log(v);
};


</script>
<style lang="scss" scoped>
.info {
	height: 200px;
	position: relative;
	background-color: #f8f8f8;

	.info-img {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		.avatar {
			@apply w75px h75px rd-full;
		}

		.info-click {
			font-size: 14px;
			color: #494646;
			margin-top: 10px;
		}
	}
}



.gap {
	@apply h8px;
}

.cell-group {
	@apply bg-white px-12px;

	.cell {
		@apply flex flex-items-center py-10px;

		.cell-left {
			@apply flex flex-col flex-1;

			.title {
				@apply text-13.5px;
			}

			.subtitle {
				@apply text-13px text-blueGray;
			}
		}

		.cell-right {
			@apply flex flex-items-center gap-x-3px;

			.desc {
				@apply text-13px text-blueGray;
			}
		}
	}

	.is-border {
		@apply border-b-1px border-b-solid border-b-coolGray-100;
	}

	::v-deep .uni-switch-wrapper {
		display: inline;

		.uni-switch-input {
			width: 30px;
			height: 16px;

			&::before {
				width: 28px;
				height: 14px;
			}

			&::after {
				width: 14px;
				height: 14px;
			}
		}

		.uni-switch-input-checked:after {
			transform: translateX(14px);
		}
	}

	/* #ifdef MP-WEIXIN */
	.is-switch {
		@apply h23px;

		switch {
			transform: scale(0.7)
		}
	}

	/* #endif */
}
</style>
