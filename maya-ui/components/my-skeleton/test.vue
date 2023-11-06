<template>
	
	<my-gap height="30px"></my-gap>
	
	
	基本使用
	<my-skeleton></my-skeleton>
	
	<my-gap height="30px"></my-gap>
	
	加载结束
	<my-skeleton :loading="false">
		<my-gap height="100px" bgColor="pink"></my-gap>
	</my-skeleton>
	
	<my-gap height="30px"></my-gap>
	
	设置每一行高度和宽度
	<my-skeleton :lineWidth="['30%','40%','50%']" :lineHeight="['8px','10px','15px']"></my-skeleton>
	
	<my-gap height="30px"></my-gap>
	
	显示标题
	<my-skeleton title></my-skeleton>
	
	<my-gap height="30px"></my-gap>
	
	显示头像
	<my-skeleton avatar></my-skeleton>
	
	<my-gap height="30px"></my-gap>
	
	显示头像and显示标题
	<my-skeleton avatar title></my-skeleton>
	
	<my-gap height="30px"></my-gap>
	
	是否将标题和段落显示为圆角风格
	<my-skeleton round line="10"></my-skeleton>
	
	<my-gap height="30px"></my-gap>
	
	自定义展示内容
	通过 template 插槽完成自定义内容的展示。
	<my-skeleton>
		<template #template>
			<view class="custom">
				<view class="left">
					<view class="user">
						<my-skeleton-avatar style="margin-right: 10px;"/>
						<my-skeleton-title style="margin: 0;" height="12px"/>
					</view>
					<my-skeleton-line/>
					<my-skeleton-line/>
				</view>
				<view class="right">
					<my-skeleton-image width="100px" height="80px"/>
				</view>
			</view>
		</template>
	</my-skeleton>
	
	<my-gap height="30px"></my-gap>
	
	
</template>

<script lang="ts" setup>

</script>
<style lang="scss" scoped>
	.custom{
		display: flex;
		width: 100%;
		.left{
			flex: 1;
			.user{
				display: flex;
				align-items: center;
				margin-bottom: 5px;
			}
		}
		.right{
			margin-left: 15px;
			flex-shrink: 0;
		}
	}
</style>