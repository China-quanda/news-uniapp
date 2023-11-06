<template>
	<view class="">
		<!-- IndexBar 索引栏
		
		介绍
		用于列表的索引分类显示和快速定位。
		
		基础用法
		点击索引栏时，会自动跳转到对应的 IndexAnchor 锚点位置。 -->
		<my-index-bar :index-list="indexList">
			<my-index-anchor index="A">aa</my-index-anchor>
			<text class="text">文本</text>
			<text class="text">文本</text>
			<text class="text">文本</text>
			<my-index-anchor index="B"/>
			<text class="text">文本</text>
			<text class="text">文本</text>
			<text class="text">文本</text>
			<my-index-anchor index="C"/>
			<text class="text">文本</text>
			<text class="text">文本</text>
			<text class="text">文本</text>
			<my-index-anchor index="D"/>
			<text class="text">文本</text>
			<text class="text">文本</text>
			<text class="text">文本</text>
			<my-index-anchor index="E"/>
			<text class="text">文本</text>
			<text class="text">文本</text>
			<text class="text">文本</text>
			<my-index-anchor index="F"/>
			<text class="text">文本</text>
			<text class="text">文本</text>
			<text class="text">文本</text>
			<my-index-anchor index="G"/>
			<text class="text">文本</text>
			<text class="text">文本</text>
			<text class="text">文本</text>
			<my-index-anchor index="H"/>
			<text class="text">文本</text>
			<text class="text">文本</text>
			<text class="text">文本</text>
			<my-index-anchor index="I"/>
			<text class="text">文本</text>
			<text class="text">文本</text>
			<text class="text">文本</text>
			<my-index-anchor index="J"/>
			<text class="text">文本</text>
			<text class="text">文本</text>
			<text class="text">文本</text>
		</my-index-bar>
		
		<!-- 自定义索引列表
		可以通过 index-list 属性自定义展示的索引字符列表。
		<my-index-bar :index-list="customList">
			<my-index-anchor index="1">1</my-index-anchor>
			<text class="text">111</text>
			<text class="text">112</text>
			<text class="text">113</text>
			<my-index-anchor index="2">2</my-index-anchor>
			<text class="text">222</text>
			<text class="text">223</text>
			<text class="text">224</text>
			<my-index-anchor index="3">3</my-index-anchor>
			<text class="text">333</text>
			<text class="text">334</text>
			<text class="text">335</text>
			<my-index-anchor index="4">4</my-index-anchor>
			<text class="text">444</text>
			<text class="text">445</text>
			<text class="text">446</text>
			<my-index-anchor index="5">5</my-index-anchor>
			<text class="text">555</text>
			<text class="text">556</text>
			<text class="text">557</text>
			<my-index-anchor index="6">6</my-index-anchor>
			<text class="text">666</text>
			<text class="text">667</text>
			<text class="text">668</text>
			<my-index-anchor index="7">7</my-index-anchor>
			<text class="text">777</text>
			<text class="text">778</text>
			<text class="text">779</text>
			<my-index-anchor index="8">8</my-index-anchor>
			<text class="text">888</text>
			<text class="text">889</text>
			<text class="text">880</text>
			<my-index-anchor index="9">9</my-index-anchor>
			<text class="text">999</text>
			<text class="text">990</text>
			<text class="text">991</text>
		</my-index-bar> -->
		
	</view>
</template>

<script setup lang="ts">
	const indexList = ['A','B','C','D','E','F','G','H','I','J']
	const customList = ['1','2','3','4','5','6','7','8','9']
</script>

<style lang="scss" scoped>
	.text{
		display: block;
		padding: 8px 10px;
	}
</style>