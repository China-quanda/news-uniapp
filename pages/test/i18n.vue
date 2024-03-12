<template>
  <view>
    {{$t('locale.auto')}}
		当前语言为：{{lang}}
		<button @click="setLocale('en')">设置英文语言</button>
		<button @click="setLocale('zh-Hans')">设置中文语言</button>
  </view>
	<view>
		<p>{{ $t('message.hello', { msg: 'hello' }) }}</p>
	</view>
</template>

<script setup lang="ts">
import {t,locale,setLocale,getLocale} from "@/locale"
const name = ref(t('locale.auto'))
	let lang = ref<string>('')
	onMounted(() => {
		console.log('当前语言为：', getLocale());
		lang.value = getLocale()
    console.log('name',name.value)
		console.log('tt',t('message.hello', { msg: 'hello' }))
		console.log('locale',locale)
	})


</script>

<style scoped lang="scss">

</style>