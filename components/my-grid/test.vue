<template>
	<view class="">
		基础用法
		通过 icon 属性设置格子内的图标，text 属性设置文字内容。
		<my-grid>
			<my-grid-item v-for="value in 4" :key="value" icon="icon-xiangyoujiantou" text="基础用法"/>
		</my-grid>
		
		自定义列数
		默认一行展示四个格子，可以通过 column-num 自定义列数。
		<my-grid columns="3">
			<my-grid-item v-for="value in 6" :key="value" icon="icon-xiangyoujiantou" text="自定义列"/>
		</my-grid>
		
		格子间距
		通过 gap 属性设置格子之间的距离。
		<my-grid gap="5px">
			<my-grid-item v-for="value in 8" :key="value" icon="icon-xiangyoujiantou" text="格子间距"/>
		</my-grid>
		
		开启格子点击反馈
		通过 clickable 属性开启格子点击反馈
		<my-grid gap="5px" clickable>
			<my-grid-item v-for="value in 8" :key="value" icon="icon-xiangyoujiantou" text="点击反馈"/>
		</my-grid>
		
		内容横排
		将 direction 属性设置为 row，可以让宫格的内容呈横向排列。
		<my-grid direction="row">
			<my-grid-item v-for="value in 8" :key="value" icon="icon-xiangyoujiantou" text="内容横排"/>
		</my-grid>
		
		调换图标和文本的位置
		将 reverse 属性设置为 true，可以让宫格的内容调换图标和文本的位置
		<my-grid reverse>
			<my-grid-item v-for="value in 8" :key="value" icon="icon-xiangyoujiantou" text="调换位置"/>
		</my-grid>
		
		显示边框
		将 border 属性设置为 true，可以显示宫格的边框
		<my-grid border>
			<my-grid-item v-for="value in 8" :key="value" icon="icon-xiangyoujiantou" text="文字"/>
		</my-grid>
		
		页面导航
		通过 路由跳转 属性设置 链接跳转的方式，通过 url 属性设置 URL 跳转链接。
		linkType: 'push' || 'tab' || 'redirect' || 'reLaunch'
		<my-grid border>
			<my-grid-item 
			v-for="value in 4" :key="value" 
			icon="icon-xiangyoujiantou" text="路由跳转"
			url="/pages/index/index"
			linkType="tab"
			/>
			<my-grid-item
			v-for="value in 4" :key="value" 
			icon="icon-xiangyoujiantou" text="链接跳转"
			url="https://www.baidu.com"
			/>
		</my-grid>
		
		
		徽标提示
		设置 badgeDot 属性后，会在图标右上角展示一个小红点。设置 badge 属性后，会在图标右上角展示相应的徽标。
		<my-grid :border="true" gap="5px" >
			<my-grid-item 
			v-for="item in 4" :key="item" 
			radius="8" icon="icon-xiangyoujiantou" text="234" badgeDot badgeValue="23" >
			</my-grid-item>
			
			<my-grid-item
			v-for="item in 4" :key="item" 
			radius="8" icon="icon-xiangyoujiantou" text="234"  badgeMax="999" badgeValue="2">
			</my-grid-item>
		</my-grid>
		
		
		自定义内容
		icon 	自定义图标 ，text自定义文字，default自定义宫格的所有内容
		<my-grid :border="true" gap="5px" clickable>
			<my-grid-item v-for="item in 4" :key="item" radius="8" icon="icon-xiangyoujiantou" text="234" badgeValue="23" >
				<block v-slot:icon>
					<view>icon</view>
				</block>
				<block v-slot:text><view>text</view></block>
			</my-grid-item>
			<my-grid-item v-for="item in 4" :key="item" radius="8" icon="icon-xiangyoujiantou" text="234" badgeValue="23" >
				<view>图标</view>
				<view>default</view>
			</my-grid-item>
		</my-grid>
	</view>
</template>

<script>
</script>

<style>
</style>