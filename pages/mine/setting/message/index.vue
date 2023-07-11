<template>
  <view class="message">
		 <u-navbar placeholder title="消息设置" :autoBack="true" />

    <view class="Panel-top">
        <view class="Panel">
          <view class="title"><h2>互动消息</h2></view>
          <u-cell title="评论和" value="所有人" is-link />
          <u-cell title="新增粉丝" value="所有人" is-link />
          <u-cell title="点赞" value="所有人" is-link />
          <u-cell title="@我" value="所有人" is-link />
        </view>
      </view>
      <view class="Panel-top">
        <view class="Panel">
          <view class="title"><h2>私信消息</h2></view>
          <u-cell title="谁可以私信我" value="默认" is-link />
          <u-cell title="陌生人消息" value="聚合消息" is-link />
        </view>
      </view>
      <view class="Panel-top">
        <view class="Panel">
          <view class="title"><h2>其他消息</h2></view>
          <u-cell title="问答" value="新回答与所有回答邀请" is-link />
          <u-cell title="专栏" >
            <view slot="value" >
            	<u-switch v-model="checked" @change="checkedChange"></u-switch>
            </view>
          </u-cell>
          <u-cell title="圈子" >
            <view slot="value" >
            	<u-switch v-model="checked" @change="checkedChange"></u-switch>
            </view>
          </u-cell>
          <u-cell title="话题邀请" >
            <view slot="value" >
            	<u-switch v-model="checked" @change="checkedChange"></u-switch>
            </view>
          </u-cell>
        </view>
      </view>
  </view>
</template>

<script>
export default {
  name: 'message',
  components: {},
  data () {
    return {
      checked: true
    }
  },
  created () {},
  methods: {checkedChange(){}}
}
</script>
<style lang="scss" scoped>
.message {
  box-sizing: border-box;
  // height: 100vh;
	width: 100vw;

}

.Panel {
  // padding:10px;
  overflow: hidden;
  border-radius: 6px;
  background-color:#fff;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 10px 15px;
    h2 {
      margin: 0;
      color: #bebec4;
      font-size: 14px;
      font-weight: 400;
    }
  }
}
</style>
