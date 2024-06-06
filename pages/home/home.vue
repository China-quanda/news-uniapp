<template>
	<!-- <uni-nav-bar shadow statusBar fixed title="导航栏组件"></uni-nav-bar> -->
	<nav-search-bar></nav-search-bar>
	<navigator url="/pages/article/info">/pages/article/info</navigator>
	<view class="channel relative h-35px">
		<view
			class="channel-wrapper fixed left-0 right-40px flex items-center flex-nowrap overflow-x-scroll h-35px z-1 text-15px bg-white">
			<view class="channel-item flex items-center px-10px h-full text-#0e0e0e"
				:class="{'activeCtegory':item.id === articleCtegoryStore.ctegorId}"
				v-for="(item,index) in articleCtegoryStore.myCtegoryList" :key="item.id"
				@click="handleClickArticleCtegory(item,index)">
				{{item.name}}
			</view>
			<view class="hamburger fixed right-0 flex items-center justify-center h-35px w-40px bg-white"
				@click="handleClickHamburger">
				<uni-icons type="bars" size="18" color="#999" />
			</view>
		</view>
	</view>

	<view>
		<view class="text-#000">bbbbb</view>
		<image class="w-30px h-30px overflow-hidden rounded-full" lazy-load :src="'https://img01.yzcdn.cn/vant/cat.jpeg'"
			mode="aspectFill" />

		<!-- home  -->
	</view>

	<uni-badge text="1"></uni-badge>
	<uni-badge text="2" type="success" @click="bindClick"></uni-badge>
	<uni-badge text="3" type="primary" :inverted="true"></uni-badge>


	<view>
		{{$t('locale.auto')}}
		<button @click="setLocale('en')">设置英文语言</button>
		<button @click="setLocale('zh-Hans')">设置中文语言</button>
	</view>
	<view>
		<p>{{ $t('message.hello', { msg: 'hello' }) }}</p>
	</view>
</template>

<script setup lang="ts">
	import navSearchBar from '@/pages/home/components/nav-search-bar.vue'
	import { useArticleCtegoryStore } from '@/store/articleCtegory'
	const articleCtegoryStore = useArticleCtegoryStore()
	let query = reactive({
		articleCategoryId: null,
	})
	onLoad(() => {
		articleCtegoryStore.loadArticleCtegoryList()
	})
	onShow(async () => {
		// 监听文章频道页面传来的值
		if (query.articleCategoryId !== articleCtegoryStore.ctegorId) {
			query.articleCategoryId = articleCtegoryStore.ctegorId
			// getDataList(pageInfo.pageNum)
		}
	})
	const handleClickArticleCtegory = (item, index) => {
		if (query.articleCategoryId === item.id) return
		query.articleCategoryId = articleCtegoryStore.ctegorId = item.id
		// getDataList(pageInfo.pageNum)
	}
	const handleClickHamburger = () => {
		uni.navigateTo({
			url: '/channel'
		})
	}

	import { t, locale, setLocale, getLocale } from "@/locale"
	const name = ref(t('locale.auto'))
	let lang = ref<string>('')
	onLoad(() => {
		const systemInfo = uni.getSystemInfoSync();
		const systemLocale = systemInfo.osLanguage;
		console.log('systemLocale', systemLocale);
		let applicationLocale = uni.getLocale();
		console.log('applicationLocale', applicationLocale);
		uni.onLocaleChange((e) => {
			applicationLocale = e.locale;
			console.log('onLocaleChange-applicationLocale', applicationLocale);
		})
	})
	onMounted(() => {
		console.log('当前语言为：', getLocale());
		lang.value = getLocale()
		console.log('name', name.value)
		console.log('tt', t('message.hello', { msg: 'hello' }))
		console.log('locale', locale)
	})
</script>

<style scoped lang="scss">
	.channel {
		.channel-wrapper {
			&::-webkit-scrollbar {
				height: 0px;
			}

			.channel-item {
				&:not(:first-child) {
					margin-left: 10px;
				}
			}

			.activeCtegory {
				color: #3c73cc;
			}

			.hamburger {

				// background-color: rgba(255,255,255,0.8);
				&::before {
					position: absolute;
					content: '';
					left: 0px;
					height: 15px;
					width: 1px;
					// box-shadow: -3px 0px 7px 1px rgba(0, 0, 0, 0.7);
					// background-color: #000;
					background-image: radial-gradient(circle at center, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1));
				}
			}

		}
	}
</style>