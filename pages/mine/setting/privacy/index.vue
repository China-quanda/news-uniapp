<template>
	<view class="privacy">

		<view class="Panel">
			<view class="cell-group">
				<view class="cell">
					<view class="cell-left">
						<text class="title">隐私设置</text>
						<text class="subtitle">快速检查并选择适合你的隐私设置</text>
					</view>
					<view class="cell-right">
						<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
					</view>
				</view>
			</view>
		</view>
		<view class="gap"></view>
		<view class="Panel">
			<view class="section">
				<text>个人信息</text>
				<text class="text-#8585e0 text-13px font-400">信息管理指引</text>
			</view>
			<view class="cell-group">
				<view class="cell is-border">
					<view class="cell-left">
						<text class="title">个人信息收集设置</text>
						<text class="subtitle">管理个人收集权限和系统数据访问权限</text>
					</view>
					<view class="cell-right">
						<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
					</view>
				</view>
				<view class="cell">
					<view class="cell-left">
						<text class="title">个人信息下载</text>
					</view>
					<view class="cell-right">
						<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
					</view>
				</view>
			</view>
		</view>
		<view class="gap"></view>
		<view class="Panel">
			<view class="section">
				<text>推荐内容</text>
			</view>
			<view class="cell-group">
				<view class="cell is-border">
					<view class="cell-left">
						<text class="title">个性化推荐设置</text>
					</view>
					<view class="cell-right">
						<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
					</view>
				</view>
				<view class="cell is-border">
					<view class="cell-left">
						<text class="title">内容屏蔽管理</text>
					</view>
					<view class="cell-right">
						<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
					</view>
				</view>
				<view class="cell">
					<view class="cell-left">
						<text class="title">清除历史阅读兴趣</text>
						<text class="subtitle">清除后，将无法根据历史兴趣记录推荐个性化资讯</text>
					</view>
					<view class="cell-right">
						<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
					</view>
				</view>
			</view>
		</view>
		<view class="gap"></view>
		<view class="Panel">
			<view class="section">
				<text>互动</text>
			</view>
			<view class="cell-group">
				<view class="cell">
					<view class="cell-left">
						<text class="title">一键防护开关</text>
						<text class="subtitle">开启后，将不接收未关注人的评论/转发/私信</text>
					</view>
					<view class="cell-right is-switch">
						<!-- 微信小程序显示绿色 -->
						<switch :checked="false" />
					</view>
				</view>
			</view>
		</view>
		<view class="gap"></view>
		<view class="Panel">
			<view class="section">
				<text>关系</text>
			</view>
			<view class="cell-group">
				<view class="cell is-border">
					<view class="cell-left">
						<text class="title">把我推荐给可能认识的人</text>
						<text class="subtitle">关闭后，不会因为你们认识，而把你推荐给对方</text>
					</view>
					<view class="cell-right is-switch">
						<!-- 微信小程序显示绿色 -->
						<switch :checked="false" />
					</view>
				</view>
				<view class="cell is-border">
					<view class="cell-left">
						<text class="title">向我推荐可能认识的人</text>
						<text class="subtitle">关闭后，将减少向你推荐可认识的人，包括你的通讯录或其他可能认识的人</text>
					</view>
					<view class="cell-right is-switch">
						<!-- 微信小程序显示绿色 -->
						<switch :checked="false" />
					</view>
				</view>
				<view class="cell">
					<view class="cell-left">
						<text class="title">黑名单设置</text>
					</view>
					<view class="cell-right">
						<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
					</view>
				</view>
			</view>
		</view>
		<view class="gap"></view>
		<view class="Panel">
			<view class="section">
				<text>其他隐私设置</text>
			</view>
			<view class="cell-group">
				<view class="cell is-border">
					<view class="cell-left">
						<text class="title">广告设置</text>
					</view>
					<view class="cell-right">
						<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
					</view>
				</view>
				<view class="cell is-border">
					<view class="cell-left">
						<text class="title">草稿保存至云端</text>
						<text class="subtitle">关闭后草稿箱将无法共享到其他设备</text>
					</view>
					<view class="cell-right is-switch">
						<!-- 微信小程序显示绿色 -->
						<switch :checked="true" />
					</view>
				</view>
				<view class="cell">
					<view class="cell-left">
						<text class="title">提前上传作品，减少等待时间</text>
					</view>
					<view class="cell-right is-switch">
						<!-- 微信小程序显示绿色 -->
						<switch :checked="true" />
					</view>
				</view>
			</view>
		</view>
		<view class="gap"></view>
		<view class="Panel">
			<view class="section">
				<text>隐私说明</text>
			</view>
			<view class="cell-group">
				<view class="cell is-border">
					<view class="cell-left">
						<text class="title">隐私政策及简明版</text>
					</view>
					<view class="cell-right">
						<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
					</view>
				</view>
				<view class="cell is-border">
					<view class="cell-left">
						<text class="title">应用权限说明</text>
					</view>
					<view class="cell-right">
						<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
					</view>
				</view>
				<view class="cell is-border">
					<view class="cell-left">
						<text class="title">个人信息搜集清单</text>
					</view>
					<view class="cell-right">
						<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
					</view>
				</view>
				<view class="cell">
					<view class="cell-left">
						<text class="title">第三方信息共享清单</text>
					</view>
					<view class="cell-right">
						<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
					</view>
				</view>
			</view>
		</view>
		<view class="gap"></view>
		<view class="Panel">
			<view class="section">
				<text>常见问题</text>
			</view>
			<view class="cell-group">
				<view class="cell is-border">
					<view class="cell-left">
						<text class="title">头条是否有窃听我的谈话内容</text>
					</view>
					<view class="cell-right">
						<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
					</view>
				</view>
				<view class="cell is-border">
					<view class="cell-left">
						<text class="title">为什么会给我推送在其他应用搜索过的商品广告</text>
					</view>
					<view class="cell-right">
						<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
					</view>
				</view>
				<view class="cell is-border">
					<view class="cell-left">
						<text class="title">不喜欢推荐的内容怎么办</text>
					</view>
					<view class="cell-right">
						<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
					</view>
				</view>
			</view>
		</view>
		<view class="gap"></view>
	</view>
</template>

<script setup lang="ts">
// import { mapGetters } from 'vuex'
import { ref } from 'vue';
let showSecurity = ref<string>(false)
let checked = ref<string>(false)
const checkedChange = () => { }
</script>
<style lang="scss" scoped>
.privacy,
page {
	background-color: rgb(246, 246, 246);
}


.block {
	padding: 0px 15px;
	background-color: rgb(246, 246, 246);
}

.Panel-top {
	// margin-top:10px
	padding-top: 10px;
}

.Panel {
	margin: 0px 12px;
	overflow: hidden;
	border-radius: 6px;
	background-color: #fff;
}

.section {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 15px;
	margin: 0;
	color: #000000;
	font-size: 14px;
	font-weight: 500;
}


.gap {
	@apply h8px;
}

.cell-group {
	@apply bg-white px-12px;

	.cell {
		@apply flex flex-items-center py-10px;

		.cell-left {
			@apply flex flex-col flex-1 gap-y-3px;

			.title {
				@apply text-13.5px;
			}

			.subtitle {
				@apply text-12px text-blueGray;
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
