<template>
	<view class="container">
		<view class="info">
			<view class="info-img">
				<my-avatar :src="userInfo.avatar ? userInfo.avatar : 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'" width="75px" height="75px" @tap="uploadAvatarImg" />
				<a class="info-click" @tap="uploadAvatarImg">点击更换头像</a>
			</view>
		</view>
		<my-cell title="用户名" :value="userInfo?.nickname ? userInfo.nickname : '待完善'" url="./edit?title=用户名&type=textarea&valueData=123"/>
		<my-cell title="简介" :value="userInfo?.introduce ? userInfo.introduce : '待完善'" url="./edit?title=简介&type=input&valueData=123" />
		<my-cell title="背景图" :value="userInfo?.background_image ? '去更换' : '去设置'" @tap="uploadBgImg" />
		<my-cell title="性别" :value="userInfo?.gender ? userInfo.gender : '待完善'" @tap="showGender = true" />
		<my-cell title="生日" :value="userInfo?.birthday ? userInfo.birthday : '待完善'" @tap="showBirthday = true" />
		<my-cell title="所在地" :value="userInfo?.city ? userInfo.city : '待完善'" @tap="showCity = true" />
		<my-cell title="学校" :value="userInfo?.school ? userInfo.school : '待完善'" url="./edit?title=学校&type=input&valueData=${userInfo.profession}" />
		<my-cell title="职业" :value="userInfo?.profession ? userInfo.profession : '待完善'" url="./edit?title=职业&type=input&valueData=${userInfo.profession}" />

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
import { ref, reactive } from 'vue';
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
		success: function(res) {
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
		success: function(res) {
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
	height: 270px;
	position: relative;
	background-color: #f8f8f8;
}
.info-img {
	display: flex;
	flex-direction: column;
	align-items: center;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	a {
		font-size: 16px;
		margin-top: 10px;
	}
}
</style>
