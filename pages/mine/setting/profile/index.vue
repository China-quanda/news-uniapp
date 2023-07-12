<template>
	<view class="container">
		<!-- <u-navbar placeholder title="编辑资料"  :autoBack="true" /> -->
		<!-- <my-nav-bar title="编辑资料" :clickLeft="router.back" /> -->
		<view class="info">
			<view class="info-img">
				<my-image
					width="75px" 
					height="75px"
					src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
					shape="circle"
					@tap="uploadAvatarImg"
				/>
				<!-- <u--image :showLoading="true" :src="userInfo.avatar"  shape="circle" @tap="uploadAvatarImg" /> -->
				<!-- <a class="info-click" @tap="uploadAvatarImg">点击更换头像</a> -->
			</view>
		</view>
		<my-cell title="用户名" :value="userInfo?.nickname ? userInfo.nickname : '待完善'" @tap="showEditNickname = true" />
		<my-cell title="简介" :value="userInfo?.introduce ? userInfo.introduce : '待完善'" @tap="showEditIntroduce = true" />
		<my-cell title="背景图" :value="userInfo?.background_image ? '去更换' : '去设置'" @tap="uploadBgImg" />
		<my-cell title="性别" :value="userInfo?.gender ? userInfo.gender : '待完善'" @tap="showGender = true" />
		<my-cell title="生日" :value="userInfo?.birthday ? userInfo.birthday : '待完善'" @tap="showBirthday = true" />
		<my-cell title="所在地" :value="userInfo?.city ? userInfo.city : '待完善'" @tap="showCity = true" />
		<my-cell title="学校" :value="userInfo?.school ? userInfo.school : '待完善'" @tap="showSchool = true" />
		<my-cell title="职业" :value="userInfo?.profession ? userInfo.profession : '待完善'" @tap="showProfession = true" />
		<!-- 编辑姓名 -->
		<!-- <u-popup :show="showEditNickname" mode="right" @close="showEditNickname = false" @open="showEditNickname = true" >
						<edit @close="showEditNickname=false" title="用户名" @edit="editNickname" :valueData="userInfo.nickname"/>
				</u-popup> -->
		<!-- 编辑简介 -->
		<!-- <u-popup :show="showEditIntroduce" mode="right" @close="showEditIntroduce = false" @open="showEditIntroduce = true" >
						<edit @close="showEditIntroduce=false" title="简介" type="textarea" @edit="editIntroduce" :valueData="userInfo.introduce"/>
				</u-popup> -->
		<!-- 编辑性别 -->
		<!-- <gender-picker :show="showGender" :columns="columnsGender"  @edit="editGender" @close="showGender = false" /> -->
		<!-- 编辑生日 -->
		<!-- <birthday-picker :show="showBirthday" @edit="editBirthday" @close="showBirthday=false"/> -->
		<!-- 编辑城市 -->
		<!-- <city-picker :show="showCity" :columns="columnsCity"  @edit="editCity" @close="showCity = false" /> -->
		<!-- 编辑学校 -->
		<!-- <u-popup :show="showSchool" mode="right" @close="showSchool = false" @open="showSchool = true" >
						<edit @close="showSchool=false" title="学校" @edit="editSchool" :valueData="userInfo.school"/>
				</u-popup> -->
		<!-- 编辑职业 -->
		<!-- <u-popup :show="showProfession" mode="right" @close="showProfession = false" @open="showProfession = true" >
						<edit @close="showProfession=false" title="职业" @edit="editProfession" :valueData="userInfo.profession"/>
				</u-popup> -->

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
// import { mapGetters } from 'vuex'
// import { editUser } from '@/api/user'
// import edit from './components/edit.vue'
// import genderPicker from './components/gender-picker.vue'
// import birthdayPicker from './components/birthday-picker.vue'
// import cityPicker from './components/city-picker.vue'
// import UpdatePhoto from '@/views/Setting/components/update-photo.vue'
// import { setItem } from "@/utils/storage";

let showEditNickname = ref(false);
let showEditIntroduce = ref(false);
let showGender = ref(false);
let showBirthday = ref(false);
let showCity = ref(false);
let showSchool = ref(false);
let showProfession = ref(false);
let showPicker = ref(false);
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
// 修改用户名
const editNickname = v => {
	console.log(v);
};
// 修改简介
const editIntroduce = v => {
	console.log(v);
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
// 修改学校
const editSchool = v => {
	console.log(v);
};
// 修改职业
const editProfession = v => {
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
