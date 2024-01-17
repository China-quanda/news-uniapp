<template>
	<view class="my-upload-img flexCol" :class="{'border-bottom':borderBottom}">
		<view class="my-upload-img-name" v-if="label">
			<text :class="{'required':required}">{{label}}</text>
		</view>
		<view class="upload-more flexRow">
			<view class="item-pic flexCol" v-if="imgs.length > 0" v-for="(img, index) in imgs">
				<image class="car-img" mode="widthFix" @tap.prev="previewImage(img.url)" :src="img.url" />
				<view class="delete-img" v-if="!disabled" @tap.prev="deleteImg(index)">
					<uni-icons type="closeempty" size="12" color="#dfdfdf" />
				</view>
			</view>
			<view class="item-pic-add flexCol" v-if="imgs.length < count && !disabled" @tap.prev="toChooseImg">
				<uni-icons type="plusempty" size="19" color="#909DAA" />
				<text style="margin-top: 5px;">添加图片</text>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	export default { name: 'my-upload-img' }
</script>
<script setup lang="ts">
	import { ref } from 'vue';

	interface Crop {
		quality ?: number //取值范围为1-100，数值越小，质量越低（仅对jpg格式有效）。默认值为80。
		width : number//裁剪的宽度，单位为px，用于计算裁剪宽高比。
		height : number//裁剪的高度，单位为px，用于计算裁剪宽高比。
		resize ?: boolean//是否将width和height作为裁剪保存图片真实的像素值。默认值为true。注：设置为false时在裁剪编辑界面显示图片的像素值，设置为true时不显示
	}
	interface IPorps {
		label ?: string // 图片标题
		required ?: boolean // 必填
		imgs ?: any[]//已有图片数组
		count ?: string | number // 最多可以选择的图片张数，默认9
		extension ?: string[] // 根据文件拓展名过滤，每一项都不能是空字符串。默认不过滤。
		sizeType ?: string[] // original 原图，compressed 压缩图，默认二者都有
		crop ?: Crop //图像裁剪参数，设置后 sizeType 失效
		disabled ?: boolean // 是否禁用
		sourceType ?: string[] //album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
		uploadUrl ?: string // 上传地址
		borderBottom ?: boolean // 底部边框
	};
	interface IFile {
		path : string //本地文件路径
		size : number //本地文件大小，单位：B
		name : string //包含扩展名的文件名称，仅H5支持
		type : string //文件类型，仅H5支持
	}
	interface ISuccess {
		tempFilePaths : string[] //图片的本地文件路径列表
		tempFiles : IFile[] //图片的本地文件列表，每一项是一个 File 对象
	}
	interface IFiles {
		name ?: string//multipart 提交时，表单的项目名，默认为 file
		file ?: File	//	要上传的文件对象，仅H5（2.6.15+）支持
		uri : string//	文件的本地地址
	}
	interface IUploadFile {
		url : string//	开发者服务器 url
		files ?: IFiles[]	//（files和filePath选其一）	需要上传的文件列表。使用 files 时，filePath 和 name 不生效。	App、H5（ 2.6.15+）
		fileType ?: string	//见平台差异说明	文件类型，image/video/audio	仅支付宝小程序，且必填。
		file ?: File	//	要上传的文件对象。	仅H5（2.6.15+）支持
		filePath ?: string	//（files和filePath选其一）	要上传文件资源的路径。	
		name : string//文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容	
		header ?: object//	HTTP 请求 Header, header 中不能设置 Referer。	
		timeout ?: number //超时时间，单位 ms	H5(HBuilderX 2.9.9+)、APP(HBuilderX 2.9.9+)、微信小程序、支付宝小程序、抖音小程序、快手小程序
		formData ?: object	//HTTP 请求中其他额外的 form data	
	}

	const props = withDefaults(defineProps<IPorps>(), {
		sizeType: ['compressed'],
		uploadUrl: 'http://119.91.209.77:8086/common/upload',
		count: 30,
		required: false,
		disabled: false,
		imgs: () => [],
		borderBottom: false
	});
	const emit = defineEmits<{
		(e : 'getImgs', imgs : any[]) : void
	}>()
	const delIndex = ref() // 删除索引
	const sizeLimit = ref(5242880)// 限制5M

	// 选择图片
	const toChooseImg = () => {
		let countLimit = props.count as number - props.imgs.length // 还可上传的数量
		uni.chooseImage({
			count: countLimit,
			sizeType: props.sizeType,
			success: (res : ISuccess) => {
				console.log(JSON.stringify(res));
				// 判断上传图片数量
				if (res.tempFiles.length > countLimit) return uni.showToast({
					title: '最多上传' + props.count + '张图片',
					icon: 'none'
				})
				for (let i = 0; i < res.tempFiles.length; i++) {
					var imgData = res.tempFiles[i];
					// 限制上传格式
					// #ifdef H5
					var imgTypeList = imgData.name.split('.');
					// #endif
					// #ifdef APP-PLUS
					var imgTypeList = imgData.path.split('.');
					// #endif
					var imgType = (imgTypeList[imgTypeList.length - 1]).toLowerCase();
					if (imgType != 'png' && imgType != 'jpg' && imgType != 'jpeg') {
						uni.showToast({
							title: '请上传.png、.jpg、.jpeg 格式图片',
							icon: 'none'
						});
						break
					}
					//限制大小
					if (imgData.size > sizeLimit.value) {
						uni.showToast({
							title: '请上传小于' + sizeLimit.value / 1024 / 1024 + 'MB的图片',
							icon: 'none'
						});
						break
					}
					// 准备上传
					uni.showLoading({ title: '上传中' });
					uploadFile({
						filePath: res.tempFilePaths[i],
						name: 'file',
						url: props.uploadUrl,
						header: {
							'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjViZmM2YzQ3LWE1YTUtNGM3NC1hMjkyLWMyNjE1ZTA2Zjc4ZCJ9.w9f-_CBuH9-gkpmV_SnRkzEA8uu3aZPrQnQ1FrfbnGP4S7DYnY9HADxOBoKOymfnIeToRHIJDYtxv0Bnp2v-ZQ'
						}
					})
				}
			},
			fail: error => {
				uni.showToast({
					title: '选择图片失败',
					icon: 'error',
				});
			}
		});
	}
	// 上传文件
	const uploadFile = (option : IUploadFile) => {
		const { filePath, name, url, header } = option
		const uploadTask = uni.uploadFile({
			url, //接口地址
			filePath,
			name,
			header,
			success: uploadFileRes => {
				var uploadData = JSON.parse(uploadFileRes.data);
				if (!uploadData.url) return uni.showToast({
					icon: 'none',
					title: uploadData.msg
				})
				props.imgs.push({
					name: uploadData.fileName,
					url: uploadData.url,
					picture: uploadData.url
				});
				outputimgs();
			},
			fail: error => {
				uni.showToast({
					icon: 'none',
					title: error.errMsg
				});
			},
			complete: () => {
				uni.hideLoading();
				// 保存图片到本地
				// uni.saveImageToPhotosAlbum({
				// 	filePath: res.tempFilePaths[i],
				// 	success: function () {
				// 		console.log('save success');
				// 	}
				// });
			}
		});

		uploadTask.onProgressUpdate(res => {
			console.log('上传进度' + res.progress);
			console.log('已经上传的数据长度' + res.totalBytesSent);
			console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
			// 测试条件，取消上传任务。
			// if (res.progress > 50) {
			// 	uploadTask.abort();
			// }
		});

	}

	// 删除图片
	const deleteImg = (index : number) => {
		delIndex.value = index;
		uni.showModal({
			title: '删除提示',
			content: '确定要删除此图片吗',
			success: function (res) {
				if (res.confirm) {
					props.imgs.splice(delIndex.value, 1);
					outputimgs();
				}
			}
		});
	}
	// 预览图片
	const previewImage = (url) => {
		let previewList = [];
		for (var i = 0; i < props.imgs.length; i++) {
			previewList.push(props.imgs[i].url)
		}
		uni.previewImage({
			current: url,
			urls: previewList
		})
	}
	// 输出图片列表
	const outputimgs = () => {
		emit('getImgs', props.imgs)
	}
</script>
<style src="./style.scss" scoped lang="scss"></style>