#IndexBar 索引栏

**介绍**
用于列表的索引分类显示和快速定位。


**基础用法**
点击索引栏时，会自动跳转到对应的 IndexAnchor 锚点位置。
```
		<my-index-bar :index-list="indexList">
			<my-index-anchor index="A"/>
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

```
**自定义索引列表**
可以通过 index-list 属性自定义展示的索引字符列表。
```
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
		</my-index-bar>
		
		
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

```

**IndexBar Props**
| 参数 | 说明 | 类型 | 默认值 | 是否必填
| ----- | ----------------- | ------ | ------ |------ |
| index-list |索引字符列表| array | '[]' | 否 |
| z-index |z-index 层级| string、number | '1' | 否 |
| sticky | 是否开启锚点自动吸顶| boolean | 'true' | 否 |
| sticky-offset-top |  锚点自动吸顶时与顶部的距离| string | '0px' | 否 |
| inactiveColor | 右边锚点状态非激活时的颜色 | string | '#606266' | 否 |
| activeColor | 右边锚点状态激活时的颜色 | string | '#1989fa' | 否 |

**indexAnchor Props**
| 参数 | 说明 | 类型 | 默认值 | 是否必填
| ----- | ----------------- | ------ | ------ |------ |
| index |索引字符| string、number | '' | 是 |
| bgColor | 列表锚点背景颜色 | string | '#f7f7f7' | 否 |
| height | 列表锚点高度，单位默认px | string | '30px' | 否 |

**IndexBar Events**
| 事件 | 说明 | 回调参数
| ----- | ----------------- | ----- |
| select |  点击索引栏的字符时触发 | object |
| change |  当前高亮的索引字符变化时触发 | object |

**indexAnchor Slots**
| 名称 | 说明 |
| --- | --- |
| default |自定义列表内容|
