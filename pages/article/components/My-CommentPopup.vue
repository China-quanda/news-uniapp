<template>
  <view class='wrap'>
    <u-popup :show="show" :style="{ height: '100%' }" mode="bottom" closeable
      :title="commentList.children + '  条回复' ">
      <!-- 楼主评论 -->
      <view class="comment-item">
        <view class="image" v-if="commentList.comment_user">
					<a ><u-avatar :src="commentList.comment_user.avatar" size="36"></u-avatar></a>
        </view>
        <view class="comment-info">
          <view class="header">
            <view class="user-name" v-if="commentList.comment_user">
							<a>{{commentList.comment_user.nickname}}</a>
							<u-tag text="楼主" /> 
							<!-- <u-tag text="已关注" type="warning" /> -->
            </view>
            <view class="right-action">
              <!-- <a><i class="iconfont icon-dianzan"></i><span>13131</span></a> -->
							<u-button text="关注" size="mini" />
            </view>
          </view>
          <view class="body">
            <p class="comment">{{commentList.content}}</p>
          </view>
          <view class="footer">
            <view class="left-action">
              <span class="time">{{commentList.createdAt}}</span>
              <span class="dot">·</span>
              <span class="city">来自广州</span>
              <!-- <span class="dot">·</span> -->
              <!-- <button class="reply-btn">回复</button> -->
            </view>
            <view class="right-action">
              <a>
                <i class="iconfont icon-cha"></i>
              </a>
            </view>
          </view>
          <view class="check-more-like" v-if="commentList.like_count > 0">
            <view class="left">
							<u--image :showLoading="true" radius="8" src="https://img01.yzcdn.cn/vant/cat.jpeg" mode="widthFix" width="100%"></u--image>
							<u--image :showLoading="true" radius="8" src="https://img01.yzcdn.cn/vant/cat.jpeg" mode="widthFix" width="100%"></u--image>
							<u--image :showLoading="true" radius="8" src="https://img01.yzcdn.cn/vant/cat.jpeg" mode="widthFix" width="100%"></u--image>
              <span>{{commentList.like_count}}人赞过
                <van-icon name="arrow" />
              </span>
            </view>
            <view class="right">
              <a><i class="iconfont icon-dianzan"></i><span>{{commentList.like_count}}</span></a>
            </view>
          </view>
          <!-- <button class="check-more-reply">
          查看全部 1 条回复
          <i class="iconfont icon-xiala"></i>
        </button> -->
        </view>
      </view>
      <!-- 回复 -->
      <MyPanel title="全部回复" showTitle>

        <view class="comment-huifu" v-for="reply in commentList.children" :key="reply.id">
          <view class="image" v-if="commentList.comment_user">
						<a ><u-avatar :src="commentList.comment_user.avatar" size="36"></u-avatar></a>
          </view>
          <view class="comment-info">
            <view class="header">
              <view class="user-name" v-if="commentList.comment_user"><a>{{reply.comment_user.nickname}}</a></view>
              <view class="right-action">
                <a><i class="iconfont icon-dianzan"></i><span>{{reply.like_count}}</span></a>
              </view>
            </view>
            <!-- v-if="commentList.user_id !== reply.reply_user_id" -->
            <view class="huifu" v-if="commentList.user_id !== reply.reply_user_id">
              <p class="comment">@{{reply.reply_user.nickname}}：{{commentList.content}}</p>
            </view>
            <view class="body">
              <p class="comment">{{reply.content}}</p>
            </view>
            <view class="footer">
              <view class="left-action">
                <span class="time">{{reply.createdAt}}</span>
                <span class="dot">·</span>
                <span class="city">来自广州</span>
                <span class="dot">·</span>
                <button class="reply-btn">回复</button>
              </view>
              <view class="right-action">
                <a>
                  <i class="iconfont icon-cha"></i>
                </a>
              </view>
            </view>
          </view>
        </view>

      </MyPanel>

    </u-popup>
  </view>
</template>

<script>
  import MyPanel from '../components/My-panel.vue'
  import bus from '@/utils/bus'
  export default {
    name: '',
    props: {
      total: {
        type: Number,
        default: 0
      }
    },
    components: {
      MyPanel
    },
    data() {
      return {
        show: false,
        commentList: {}
      }
    },
    mounted() {
      bus.$on('onClickHuifu', (item) => {
        console.log('item', item);
        this.commentList = item
        this.show = true
      })
    },
    methods: {}
  }
</script>
<style lang="scss" scoped>
  .comment-item {
    display: flex;
    // background-color: rgb(201, 74, 74);
    margin-top: 25px;
    border-bottom: 1px solid rgb(244, 244, 244);
    padding: 15px 15px;

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

          a {
            margin-right: 10px;
          }

          span {
            // display: block;
            // margin-left: 5px;
            // padding: 2px;
            // font-size:12px;
            // background-color: rgb(183, 213, 246);
            // color: rgb(158, 175, 232)#000;
          }
        }

        // .right-action {
        //   .icon-dianzan {
        //     font-size: 20px;
        //   }
        //   span {
        //     font-size: 15px;
        //     margin-left: 5px;
        //   }
        // }
      }

      .body {
        margin: 8px 0 12px;
        font-size: 16px;
        line-height: 16px;

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

      // .check-more-reply {
      // display: inline-block;
      // position: relative;
      // border: none;
      // margin-top: 16px;
      // font-size: 14px;
      // font-weight: 500;;
      // color: #505050;
      // background: none;
      // padding: 0;
      // }
      .check-more-like {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        line-height: 35px;

        .icon-dianzan {
          font-size: 20px;
        }

        .left {
          display: flex;

          span {
            // line-height:35px;
            font-size: 12px;
            margin-left: 5px;
          }
        }

        .right {
          span {
            font-size: 15px;
            margin-left: 5px;
          }
        }

        ::v-deep .van-image__img {
          margin: 0 2px;
          width: 25px;
          height: 25px;
        }
      }
    }
  }

  .comment-huifu {
    display: flex;
    padding: 15px 15px;

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

      .huifu {
        margin: 8px 0 12px;
        padding: 2px;
        border-radius: 4px;
        background-color: rgb(244, 244, 244);
        font-size: 16px;

        // line-height:16px;
        p {
          margin: 3px;
          //  padding: 5px;
          color: rgb(173, 172, 172);
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          word-break: break-all;
          overflow: hidden;
        }
      }

      .body {
        margin: 8px 0 12px;
        font-size: 16px;
        line-height: 16px;

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
        font-weight: 500;
        ;
        color: #505050;
        background: none;
        padding: 0;
      }
    }
  }
</style>
