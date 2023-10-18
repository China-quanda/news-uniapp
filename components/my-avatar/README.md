#Avatar 头像 

**介绍**
本组件一般用于展示头像的地方，如个人中心，或者评论列表页的用户头像展示等场所。


**使用**

```

基本使用
通过src指定头像的路径即可简单使用，如果传递了text参数，text将会优先起作用
<my-avatar src="/static/images/logo.png"></my-avatar>
<my-avatar text="李先生"></my-avatar>


可通过color属性设置文字字体颜色
<my-avatar text="李先生" color="red"></my-avatar>


头像形状
shape参数指定头像的形状，取值circle为圆形，取值square为圆角方形
也可通过radius属性设置角的弧度默认为4px
<my-avatar src="/static/images/logo.png"></my-avatar>
<my-avatar src="/static/images/logo.png" shape="square" radius="8px"></my-avatar>

文字头像（自动背景色）
通过randomBgColor属性是否开启随机背景颜色，在text文字头像下有效
<my-avatar text="郭女生" randomBgColor></my-avatar>
	
自定义背景色
通过badgeColor属性自定义
<my-avatar text="郭女生" badgeColor="pink"></my-avatar>
	
显示badge
通过showBadge属性是否开启badge
<my-avatar text="郭女生" shape="square" showBadge badgeColor="pink"></my-avatar>

设置大小
通过width、height属性设置大小
<my-avatar text="郭女生" shape="square" width="30px" height="30px"></my-avatar>
<my-avatar text="郭女生" shape="square" width="40px" height="40px"></my-avatar>
<my-avatar text="郭女生" shape="square" width="50px" height="50px"></my-avatar>

默认头像
如果头像加载失败，导致加载图片失败，将会显示一个默认的灰色头像
<my-avatar src="/img/user.png" ></my-avatar>

加载失败的图标
通过errorIcon属性设置加载失败的图标
<my-avatar src="/img/user.png" errorIcon="icon-touxiang"></my-avatar>

加载中的图标
通过loadingIcon属性设置加载中的图标 ,iconSize设置图标大小
<my-avatar src="/img/user.png" loadingIcon="icon-touxiang" :iconSize="24"></my-avatar>


图片裁剪、缩放的模式
通过mode属性设置图片裁剪、缩放的模式
<my-avatar src="/img/user.png" mode="aspectFill"></my-avatar>


```

**Props**
| 参数 | 说明 | 类型 | 默认值 | 是否必填 
| ----- | ----------------- | ------ | ------ |------ |
| text | 用文字替代图片，级别优先于src| string | '-' | 否 |
| color | 文字头像字体颜色| string | '#fff' | 否 |
| randomBgColor | 是否开启随机背景颜色，在text文字头像下有效| boolean | 'false' | 否 |
| showBadge | 是否开启badge| boolean | 'false' | 否 |
| badgeColor | badge颜色 | string | 'red' | 否 |
| src | 图片资源地址 | string | '-' | 否 |
| mode | 图片裁剪、缩放的模式 | string | 'aspectFill' | 否 |
| width | 宽度，单位任意，如果为数值，默认单位px | string | '40px' | 否 |
| height | 高度，单位任意，如果为数值，默认单位px | string | '40px' | 否 |
| bgColor | 头像背景颜色 | string | '#f7f8fa' | 否 |
| radius |  圆角，默认单位px| string | '4px' | 否 |
| shape |   图片形状，circle-圆形，square-方形| string | 'circle' | 否 |
| showLoading | 是否展示图片加载中提示| boolean | 'true' | 否 |
| showError |   是否展示图片加载失败提示| boolean | 'true' | 否 |
| loadingIcon | 加载中的图标| string | 'icon-touxiang' | 否 |
| errorIcon |  加载失败的图标，或者小图片| string | 'icon-touxiang' | 否 |
| iconSize |  加载图标和失败图标的大小| string | '26px' | 否 |
| textSize |  加载字体和失败字体的大小| string | '12px' | 否 |


**mode 有效值**
| 模式 | 值 | 说明 |
| --- | -- | --- |
| 缩放 | scaleToFill | 保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素|
| 缩放 | aspectFit | 保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。|
| 缩放 | aspectFill | 保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。|
| 缩放 | widthFix | 宽度不变，高度自动变化，保持原图宽高比不变 |
| 缩放 | heightFix | 高度不变，宽度自动变化，保持原图宽高比不变 |
| 裁剪 | top | 不缩放图片，只显示图片的顶部区域 |
| 裁剪 | bottom| 不缩放图片，只显示图片的底部区域 |
| 裁剪 | center| 不缩放图片，只显示图片的中间区域 |
| 裁剪 | left | 不缩放图片，只显示图片的左边区域 |
| 裁剪 | right| 不缩放图片，只显示图片的右边区域 |
| 裁剪 | top left| 不缩放图片，只显示图片的左上边区域 |
| 裁剪 | top right| 不缩放图片，只显示图片的右上边区域 |
| 裁剪 | bottom left	| 不缩放图片，只显示图片的左下边区域 |
| 裁剪 | bottom right| 不缩放图片，只显示图片的右下边区域 |

**mode 有效值**
| 模式 | 说明 |
| --- | --- |
| loading |  图片加载失败中要显示的内容|
| error |  图片加载失败要显示的内容|

**Events事件**

| 事件 | 说明 | 回调参数
| ----- | ----------------- | ----- |
| error | 当错误发生时 | 事件对象event.detail = {errMsg: 'something wrong'} |
| load | 当图片载入完毕时 | 事件对象event.detail = {height:'图片高度px', width:'图片宽度px'} |

