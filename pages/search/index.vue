<template>
	<view class="search-page">

		<my-nav-bar v-if="true" rightText="搜索" :clickLeft="handleBack" @clickRight="loadArticleList" leftWidth="23px"
			rightWidth="35px" fixed>
			<view class="input-view">
				<!-- <uni-icons type="search" size="18" color="#999" /> -->
				<text class="iconfont icon-sousuo"></text>
				<input class="nav-bar-input" v-model.trim="searchArticleQuery.keywords" focus placeholder="输入关键词搜索"
					@confirm="loadArticleList" confirm-type="search" />
				<text class="iconfont icon-cha" v-show="searchArticleQuery.keywords" @click="clearIcon"></text>
			</view>
		</my-nav-bar>
		<view class="content">
			<!-- 联想建议 -->
			<search-advice v-show="showAdvice" :keyword="searchArticleQuery.keywords" :list="searchAdviceList"
				@onClick="tapAdvice" />
			<!-- history -->
			<search-history v-show="showHistory" :list="searchHistoryList" @onClick="clickHotSearch"
				@onRefresh="loadUserSearchHistoryList" />
			<!-- 热门搜索 -->
			<search-hot v-show="showHot" :list="searchHotList" @onClick="clickHotSearch" />
			<!-- 搜索结果 -->
			<!-- <view v-show="showResult" class="search-result">
				<view class="item" v-for="(item,index) in searchArticleList" :key="index">
					{{item.title}}
				</view>
			</view> -->
			<!-- <view v-show="showEmpty" class="">
				showEmpty 搜索无结果
			</view> -->
		</view>
	</view>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted, watch, computed } from 'vue';
import router from '@/utils/router';
import { getHotSearchlist, getUserSearchHistoryList, getAdvicelist } from '@/api/search'
import { getArticleList } from '@/api/article'
import searchHot from './components/search-hot.vue';
import searchAdvice from './components/search-advice.vue';
import searchHistory from './components/search-history.vue';
// 搜索关键词
const searchKeyword = ref('');
// 热门搜索数据
const searchHotList = ref<{ id: number, keywords: string }[]>([])
// 搜索历史的数据
const searchHistoryList = ref<{ id: number, keywords: string }[]>([])
// 联想建议数据
const searchAdviceList = ref<string[]>([])
// 返回上一页
const handleBack = () => { router.back() };
// 点击热门搜索 历史记录
const clickHotSearch = (row) => {
	searchArticleQuery.keywords = row.keywords
	loadArticleList()
};
// 点击联想建议项
const tapAdvice = (keyword) => {
	searchAdviceList.value = []
	searchArticleQuery.keywords = keyword
	loadArticleList()
}
const searchArticleQuery = reactive({
	keywords: '',
	pageNum: 1,
	pageSize: 10,
	total: 0,
	Loading: true
})
const searchArticleList = ref([])
const loadArticleList = async (pageNum = 1) => {
	const result = await getArticleList(searchArticleQuery)
	searchArticleList.value = pageNum > 1 ? searchArticleList.value.concat(result.data.list) : result.data.list
	searchArticleQuery.pageNum = result.data.pagination
	searchArticleQuery.pageSize = result.data.pageSize
	searchArticleQuery.total = result.data.total
	loadUserSearchHistoryList()
}

//获取用户搜索历史记录列表
const loadUserSearchHistoryList = () => {
	getUserSearchHistoryList({ pageSize: 12 }).then((res: any) => {
		searchHistoryList.value = res.data.list
	})
}

// 获取联想建议列表
const loadsearchAdviceList = async () => {
	searchAdviceList.value = []
	const result = await getAdvicelist(searchArticleQuery.keywords)
	searchAdviceList.value = result.data
}

onMounted(() => {
	// 获取热门文章列表
	// getHotSearchlist({ pageSize: 12 }).then((res: any) => {
	// 	searchHotList.value = res.data.list
	// })
	// loadUserSearchHistoryList()
})

// 搜索框定时器
// const searchTimer = ref()
watch(() => searchArticleQuery.keywords, (n, o) => {
	searchArticleList.value = []
	searchAdviceList.value = []
	loadsearchAdviceList()
	// clearTimeout(searchTimer.value);
	// searchTimer.value = setTimeout(() => {
	// 	loadsearchAdviceList()
	// }, 1000)
})

const showHistory = computed(() => {
	if (!searchArticleQuery.keywords && searchHistoryList.value.length) {
		return true
	} else {
		return false
	}
})
const showHot = computed(() => {
	if (!searchArticleQuery.keywords && searchHotList.value.length) {
		return true
	} else {
		return false
	}
})
const showAdvice = computed(() => {
	if (searchArticleQuery.keywords && searchAdviceList.value.length && !searchArticleList.value.length) {
		return true
	} else {
		return false
	}

})
const showResult = computed(() => {
	if (searchArticleQuery.keywords && searchArticleList.value.length) {
		return true
	} else {
		return false
	}
})
// const showEmpty = computed(()=>{
// 	if(!showResult.value || !showAdvice.value || !showAdvice.value || !showHot.value){
// 		return false
// 	}else{
// 		return true
// 	}
// })

// 清除搜索关键词
const clearIcon = () => {
	searchArticleQuery.keywords = ''
}
</script>

<style lang="scss" scoped>
page {
	background-color: $uni-bg-color;
}

.content {
	margin: 12px;
}

.input-view {
	@apply w-full flex flex-items-center rd-full px-15px bg-#f8f8f8 gap-x-6px py-5px;

	.nav-bar-input {
		@apply w-full text-14px text-left;
	}

	.icon-sousuo {
		@apply text-14px;
	}

	.icon-cha {
		@apply text-11px;
	}
}

// .nav-bar-input {
// 	::v-deep.uni-easyinput__content {
// 		background-color: transparent !important;
// 	}

// 	::v-deep.uni-easyinput__content-input {
// 		line-height: 1;
// 		height: 30px;
// 		font-size: 12px;
// 	}
// }</style>