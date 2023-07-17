<template>
  <view class="privacy">
        <view class="block">
					<view class="Panel-top">
					  <view class="Panel">
					    <view class="title"><h2>个人信息</h2><span>信息管理指引</span></view>
							<my-cell title="个人信息收集设置" label="管理个人收集权限和系统数据访问权限" isLink  />
					    <my-cell title="个人信息收集设置" label="管理个人收集权限和系统数据访问权限" is-link/>
					    <my-cell title="个人信息下载"  is-link/>
					  </view>
					</view>
					<view class="Panel-top">
					  <view class="Panel">
					    <view class="title"><h2>推荐内容</h2></view>
					    <my-cell title="个性化推荐设置"  is-link/>
					    <my-cell title="内容屏蔽管理"  is-link/>
					    <my-cell title="清除历史阅读兴趣" label="清除后，将无法根据历史兴趣记录推荐个性化资讯" is-link/>
					  </view>
					</view>
					<view class="Panel-top">
					  <view class="Panel">
					    <view class="title"><h2>互动</h2></view>
							<my-cell title="一键防护开关" label="开启后，将不接收未关注人的评论/转发/私信" :isLink="false" :clickable="false">
								<block v-slot:value> <my-switch v-model:value="checked" @change="checkedChange"/></block>
							</my-cell>
					  </view>
					</view>
					<view class="Panel-top">
					  <view class="Panel">
					    <view class="title"><h2>关系</h2></view>
							<my-cell title="把我推荐给可能认识的人" label="关闭后，不会因为你们认识，而把你推荐给对方" :isLink="false" :clickable="false">
								<block v-slot:value> <my-switch v-model:value="checked" @change="checkedChange"/></block>
							</my-cell>
							<my-cell title="向我推荐可能认识的人" label="关闭后，将减少向你推荐可认识的人，包括你的通讯录或其他可能认识的人" :isLink="false" :clickable="false">
								<block v-slot:value> <my-switch v-model:value="checked" @change="checkedChange"/></block>
							</my-cell>
					    <my-cell title="黑名单设置"  is-link/>
					  </view>
					</view>
					<view class="Panel-top">
					  <view class="Panel">
					    <view class="title"><h2>其他隐私设置</h2></view>
					    <my-cell title="广告设置"  is-link/>
							<my-cell title="草稿保存至云端" label="关闭后草稿箱将无法共享到其他设备" :isLink="false" :clickable="false">
								<block v-slot:value> <my-switch v-model:value="checked" @change="checkedChange"/></block>
							</my-cell>
							<my-cell title="提前上传作品，减少等待时间" :isLink="false" :clickable="false">
								<block v-slot:value> <my-switch v-model:value="checked" @change="checkedChange"/></block>
							</my-cell>
					  </view>
					</view>
					<view class="Panel-top">
					  <view class="Panel">
					    <view class="title"><h2>隐私说明</h2></view>
					    <my-cell title="隐私政策及简明版"  is-link/>
					    <my-cell title="应用权限说明"  is-link/>
					    <my-cell title="个人信息搜集清单"  is-link/>
					    <my-cell title="第三方信息共享清单"  is-link/>
					  </view>
					</view>
					<view class="Panel-top">
					  <view class="Panel">
					    <view class="title"><h2>常见问题</h2></view>
					    <my-cell title="头条是否有窃听我的谈话内容"  is-link/>
					    <my-cell title="为什么会给我推送在其他应用搜索过的商品广告"  is-link/>
					    <my-cell title="不喜欢推荐的内容怎么办"  is-link/>
					  </view>
					</view>				 
   </view>
	</view>
</template>

<script setup lang="ts">
// import { mapGetters } from 'vuex'
import {ref} from 'vue';
let showSecurity = ref<string>(false)
let checked = ref<string>(false)
const checkedChange = ()=>{}
</script>
<style lang="scss" scoped>
.privacy{
  text-align: left;
}
  .block {
    padding:0px 15px;
    background-color: rgb(246, 246, 246);
  }

.Panel-top{
  // margin-top:10px
	padding-top: 10px;
}
.Panel{
  // padding:10px;
  overflow: hidden;
  border-radius: 6px;
  background-color:#fff;
  .title{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 10px 15px 5px 15px;
    font-size: 14px;
    color: #8585e0;
    h2{
      margin:0;
      color: #323233;
      font-size:16px;
    }
  }
}

</style>
