<template>
  <view class='post-comment'>
	<u--textarea v-model="message" placeholder="你想说点什么..." count ></u--textarea>
	<u-button text="发布" size="mini" @click="onPost" style="width: 66px; padding: 5px 0px;"></u-button>
   </view>
</template>

<script>
  import bus from '@/utils/bus'
  import {addComment} from '@/api/comment'
export default {
  name: 'post-comment',
  components: {},
  props: {
    articleId: {
      type: [Number, String],
      // required: true
    }
  },
  data () {
    return {
      message: ''
    }
  },
  created () {},
  methods: {
    async onPost () {
      const body = {
        article_id:this.articleId,
        content:this.message
      }
      const res = await addComment(body)
      if(!res) return console.log('发布评论失败');
      console.log('发布评论成功');
      this.message = ''
      bus.$emit('postOk')
    }
  }
}
</script>
<style lang="scss" scoped>
.post-comment{
  padding:14px;
  display:flex;
  align-items: center;
}
.van-cell::after {
    border-bottom: none;
}
</style>
