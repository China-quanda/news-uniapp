<template>
  <view class="article-comment" ref="comment">
    <view class="comment-item" v-for="item in commentList" :key="item.id">
      <view class="image">
        <a ><u-avatar :src="item.comment_user.avatar " size="36"></u-avatar></a>
      </view>
      <view class="comment-info">
        <view class="header">
          <view class="user-name" ><a>{{item.comment_user.nickname}}</a></view>
          <view class="right-action">
            <a @tap="ontapLike(item.id)"><i class="iconfont icon-dianzan"></i><span>{{item.like_count}}</span></a>
          </view>
        </view>
        <view class="body" @tap="ontapHuifu(item)">
          <p class="comment">{{item.content}}</p>
        </view>
        <view class="footer">
          <view class="left-action">
            <span class="time">{{item.createdAt | relativeTime}}</span>
            <span class="dot">·</span>
            <span class="city">来自广州</span>
            <span class="dot">·</span>
						<span class="reply-btn"  @tap="$emit('onShowPost')">回复</span>
          </view>
          <view class="right-action">
            <a>
              <i class="iconfont icon-cha"></i>
            </a>
          </view>
        </view>
        <button class="check-more-reply" v-if="item.children" @tap="ontapHuifu(item)" >
          查看全部 {{item.children.length}} 条回复
          <i class="iconfont icon-xiala"></i>
        </button>
      </view>
    </view>
    
    <CommentPopup />
  </view>
</template>

<script>
import bus from '@/utils/bus'
import {mapGetters} from 'vuex'
import { toTree ,transListToTreeData} from '@/utils'
import CommentPopup from './My-CommentPopup.vue'
import { getArticleCommentList ,addCommentLikings,deleteCommentLikings} from '@/api/comment'

export default {
  name: '',
  components: {
    CommentPopup
  },
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      queryInfo: {
        pageNum: 1, // 分页页码
        pageSize: 50 // 页面数据条数
      },
      commentList: [],
      total: 0
    }
  },
  created () {
    this.getArticleCommentList(this.articleId, this.queryInfo)
  },
  mounted () {
    bus.$on('ontapComment', () => {
      this.toMiaodian()
    })
    bus.$on('postOk', () => {
      this.getArticleCommentList(this.articleId, this.queryInfo)
    })
    if (this.$route.hash) {
      this.toMiaodian()
    }
  },
  computed:{
    ...mapGetters(['token'])
  },
  methods: {
    // 滚到评论区
    toMiaodian () {
      //  document.getElementById("comment").scrollIntoView({behavior: "smooth"});
      this.$refs.comment.scrollIntoView({ behavior: 'smooth' })
      // console.log(this.$refs.comment.scrollIntoView({ behavior: 'smooth' }))
    },
    ontapHuifu (item) {
      bus.$emit('ontapHuifu',item)
    },
    // 获取文章下的评论列表数据
    async getArticleCommentList (id, params) {
      const res = await getArticleCommentList(id, params)
      this.total = res.total
      this.commentList = res.list
      this.commentList = toTree(res.list)
      // this.queryInfo.pageNum = this.queryInfo.pageNum + 1
    },
    // 给评论点赞 或取消点赞
    async ontapLike(id){
      if(this.token){
        const res = await addCommentLikings({comment_id:id})
        if(res){
        console.log('点赞成功');
        } else{
          console.log('点过赞了 ， 发请求取消点赞');
        const re = await deleteCommentLikings(id)
        if(!re) return console.log("取消点赞失败");
        console.log('取消点赞成功');
        }
      }
    }
  }

}
</script>
<style lang="scss" scoped>
.article-comment{
  padding: 0 15px;
}
.comment-item {
  display: flex;
  // background-color: rgb(201, 74, 74);
  padding:15px 0;
  .image {
    margin-right: 12px;
  }
  .comment-info {
    flex: 1;
    text-align: left;
    color: #222;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      .user-name {
        font-size: 18px;
        font-weight: 500;
        color: #222;
      }
      .right-action {
        .icon-dianzan {
          font-size: 20px;
        }
        span {
          font-size: 15px;
          margin-left: 5px;
        }
      }
    }
    .body {
      margin: 8px 0 12px;
      font-size: 16px;
      line-height:16px;
      p {
        margin: 5px 0;
      }
    }
    .footer {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      line-height: 14px;
      .left-action {
        font-size: 12px;
        line-height: 16px;
        .reply-btn {
          border: none;
					padding: 0;
					font-weight: 500;
					color: #222;
					background: none;
					margin-right: 5px;
					cursor: pointer;
        }
        span {
          margin-right: 5px;
          color: #999;
        }
        //  .dot{}
        //  .time{color: #999;}
      }
      .right-action {
        .icon-cha {
          font-size: 12px;
          color: #999;
        }
      }
    }
    .check-more-reply {
    display: inline-block;
    position: relative;
    border: none;
    margin-top: 16px;
    font-size: 14px;
    font-weight: 500;;
    color: #505050;
    background: none;
    padding: 0;
    }
  }
}
</style>
