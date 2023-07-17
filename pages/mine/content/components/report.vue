<template>
  <view class='my-report' >
    <view v-if="list.length" class="my-report-item" v-for="item in list" :key="item.id">
			<view class="title" <h1>{{item.article.title}}</h1>
			<view><span>处理进度：</span><span class="active">举报处理中</span></view>
			<view><span>举报理由：</span><span>封面引人不适</span></view>
			<view><span>举报时间：</span><span>{{item.createdAt}}</span></view>
			<!-- '举报类型： 0-其他问题，1-标题夸张，2-低俗色情，3-错别字多，4-旧闻重复，5-广告软文，6-内容不实，7-涉嫌违法犯罪，8-侵权' -->
		</view>
		<view v-if="!list.length" class="empty">
			<u-empty mode="list"  text="暂无举报内容"/>
		</view>
		
  </view>
</template>

<script>
  import {getUserReport} from '@/api/article'
  export default {
    name: 'my-report',
    props: {
      userId: {
        type: Number,
        required: false
      }
    },
    data() {
      return {
        query: {
          pageNum: 1,
          pageSize: 10
        },
        list: [],
        total: 0
      }
    },
    created() {
      this.getUserReport(this.userId, this.query)
    },
    methods: {
      async getUserReport(id) {
        const res = await getUserReport(id)
				if(!res) return 
        this.query.pageNum = res.pageNum
        this.query.pageSize = res.pageSize
        this.list = res.list
        this.total = res.total
      }
    }
  }
</script>
<style lang="scss" scoped>
  .my-report {
    background-color: rgb(243, 243, 243);
  }
  .my-report-item {
    display: flex;
    flex-direction: column;
    text-align: left;
    padding: 8px 15px;
    margin-top: 10px;
    background-color: #fff;

    .title {
      h1 {
        font-size: 16px;
      }
    }

    span {
      font-size: 16px;
      color: #ccc;
    }

    .active {
      color: rgb(31, 30, 30);
    }
  }
</style>
