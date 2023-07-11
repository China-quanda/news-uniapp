<template>
  <view class='edit-profile'>
		<u-navbar placeholder title="编辑资料"  :autoBack="true" />
        <view class="info" >
          <view class="info-img">
						<u--image :showLoading="true" :src="userInfo.avatar" width="75px" height="75px" shape="circle" @tap="uploadAvatarImg" />
            <a class="info-click" @tap="uploadAvatarImg">点击更换头像</a>
          </view>
        </view>
        <view>
					<u-cell title="用户名" isLink  :value="userInfo.nickname" @tap="showEditNickname = true"/>
					<u-cell title="简介" isLink  :value="userInfo.introduce ? userInfo.introduce : '待完善'" @tap="showEditIntroduce = true"/>
					<u-cell title="背景图" isLink  :value="userInfo.background_image ? '去更换' : '去设置'" @tap="uploadBgImg"/>
					<u-cell title="性别" isLink  :value="userInfo.gender ? userInfo.gender : '待完善'" @tap="showGender = true" />
					<u-cell title="生日" isLink  :value="userInfo.birthday ? userInfo.birthday : '待完善'" @tap="showBirthday = true"/>
					<u-cell title="所在地" isLink  :value="userInfo.city ? userInfo.city :'待完善'" @tap="showCity=true" />
					<u-cell title="学校" isLink  :value="userInfo.school ? userInfo.school : '待完善'" @tap="showSchool=true" />
					<u-cell title="职业" isLink  :value="userInfo.profession ? userInfo.profession : '待完善'" @tap="showProfession = true" />
        </view>
				<!-- 编辑姓名 -->
				<u-popup :show="showEditNickname" mode="right" @close="showEditNickname = false" @open="showEditNickname = true" >
						<edit @close="showEditNickname=false" title="用户名" @edit="editNickname" :valueData="userInfo.nickname"/>
				</u-popup>
				<!-- 编辑简介 -->
				<u-popup :show="showEditIntroduce" mode="right" @close="showEditIntroduce = false" @open="showEditIntroduce = true" >
						<edit @close="showEditIntroduce=false" title="简介" type="textarea" @edit="editIntroduce" :valueData="userInfo.introduce"/>
				</u-popup>
				<!-- 编辑性别 -->
				<gender-picker :show="showGender" :columns="columnsGender"  @edit="editGender" @close="showGender = false" />
				<!-- 编辑生日 -->
				<birthday-picker :show="showBirthday" @edit="editBirthday" @close="showBirthday=false"/>
				<!-- 编辑城市 -->
				<city-picker :show="showCity" :columns="columnsCity"  @edit="editCity" @close="showCity = false" />
				<!-- 编辑学校 -->
				<u-popup :show="showSchool" mode="right" @close="showSchool = false" @open="showSchool = true" >
						<edit @close="showSchool=false" title="学校" @edit="editSchool" :valueData="userInfo.school"/>
				</u-popup>
				<!-- 编辑职业 -->
				<u-popup :show="showProfession" mode="right" @close="showProfession = false" @open="showProfession = true" >
						<edit @close="showProfession=false" title="职业" @edit="editProfession" :valueData="userInfo.profession"/>
				</u-popup>

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

<script>
import { mapGetters } from 'vuex'
import { editUser } from '@/api/user'
import edit from './components/edit.vue'
import genderPicker from './components/gender-picker.vue'
import birthdayPicker from './components/birthday-picker.vue'
import cityPicker from './components/city-picker.vue'
// import UpdatePhoto from '@/views/Setting/components/update-photo.vue'
// import { setItem } from "@/utils/storage";

export default {
  name: 'edit-profile',
  // components: { UpdatePhoto },
	components: {
	  edit,
		'gender-picker':genderPicker,
		'birthday-picker':birthdayPicker,
		'city-picker':cityPicker,
	},
  data () {
    return {
			showEditNickname:false, 
			showEditIntroduce:false, 
			showGender:false, 
			showBirthday:false, 
			showCity: false,
			showSchool: false,
			showProfession: false,
			columnsGender: [['男', '女']],
			columnsCity: [
				['中国', '美国'],
				['深圳', '厦门', '上海', '拉萨']
			],
      showPicker: false,
      showAvatar: false,
      showBackgroundImage: false,
      file: '',

    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created () {},
  methods: {
		// 上传背景图
		uploadBgImg(){
			uni.chooseImage({
				count: 1, //默认9
				success: function (res) {
					// 获取到的图片地址
					this.file = res.tempFilePaths[0]
					console.log(res.tempFilePaths[0]);
					this.showBackgroundImage = true
				}
			});
		},
		// 上传头像
		uploadAvatarImg(){
			uni.chooseImage({
				count: 1, //默认9
				success: function (res) {
					// 获取到的图片地址
					this.file = res.tempFilePaths[0]
					console.log(res.tempFilePaths[0]);
					this.showAvatar = true
				}
			});
		},
		// 修改用户名
		editNickname(name){
			console.log(name);
		},
		// 修改简介
		editIntroduce(name){
			console.log(name);
		},
		// 修改性别
		editGender(value){
			console.log(value);
		},
		// 修改生日
		editBirthday(value){
			console.log(value);
		},
		// 修改城市
		editCity(value){
			console.log(value);
		},
		// 修改学校
		editSchool(value){
			console.log(value);
		},
		// 修改职业
		editProfession(value){
			console.log(value);
		},
		
		
		
  }
}
</script>
<style lang="scss" scoped>


.edit-profile {
  text-align: left;
}
.info{
  height: 270px;
	position: relative;
  background-color: #f8f8f8;
}
.info-img{
  display:flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
	top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
 a{
  font-size: 16px;
	margin-top: 10px;
 }
}

</style>
