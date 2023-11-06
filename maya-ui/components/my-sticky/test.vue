<template>
	
	<my-gap height="600px" bgColor="#ccc"></my-gap>
		
	基础用法
	将内容包裹在 Sticky 组件内即可。
	<my-sticky>基础用法</my-sticky>
	
	<my-gap height="300px" bgColor="pink"></my-gap>
	
	吸顶距离
	通过 sticky-top 属性可以设置组件在吸顶时与顶部的距离。
	<my-sticky stickyTop="100px">吸顶距离</my-sticky>
	
	<my-gap height="300px" bgColor="#f7f7f7"></my-gap>
	
	吸底距离
	将 position 设置为 bottom 可以让组件吸附在底部。通过 sticky-bottom 属性可以设置组件在吸底时与底部的距离。
	<my-sticky position="bottom" sticky-bottom="44px">吸底距离</my-sticky>
	
	<my-gap height="300px" bgColor="#ccc"></my-gap>
	
	禁用吸顶
	设置disabled属性为true后将禁用吸顶效果
	<my-sticky disabled>禁用吸顶</my-sticky>
	<my-gap height="900px" bgColor="pink"></my-gap>
	
</template>

<script lang="ts" setup>

</script>
<style lang="scss" scoped>
	
</style>