<template>
	<!-- app不显示 h5正常显示 -->
	<view style="display: inline-block;">
		<view class="my-progress-circle">
			<svg :width="width" :height="width" style="transform: rotate(270deg);" ref="svgRef">
				<circle
				 :r="(width - radius)/2"
				 :cy="width/2"
				 :cx="width/2"
				 :stroke="backgroundColor"
				  :stroke-width="radius"
				  :stroke-dasharray="(width-radius)*3.14"
				  :stroke-linecap="round ? 'round' : 'square'"
				  fill="none"
				/>
				<circle
					class="circle_progress_bar"
				  :r="(width - radius)/2"
				  :cy="width/2"
				  :cx="width/2"
				  :stroke="barColor"
				  :stroke-width="radius"
				  :stroke-linecap="round ? 'round' : 'square'"
				  :stroke-dasharray="(width-radius)*3.14"
				  :stroke-dashoffset="isAnimation ? (width-radius) * 3.14 : (width - radius) * 3.14 * (100 - progress) / 100"
				  fill="none"
				/>
			</svg>
			<view class="centre" :style="centreStyle">
				{{progress}}%
			</view>
		</view>
		<!-- <my-image :src="img"></my-image> -->
	</view>
</template>

<script>
	export default {
		name:"my-progress",
		props:{
			width:{
				type:Number
			},
			radius:{
				type:Number
			},
			round:{
				type:Boolean
			},
			progress:{
				type:Number
			},
			delay:{
				type:Number
			},
			duration:{
				type:Number
			},
			centreStyle:{
				type:Object,
				default:()=>{}
			},
			barColor:{
				type:String,
				default:'#5683f4'
			},
			backgroundColor:{
				type:String,
				default:'#eeebf0'
			},
			isAnimation:{
				type:Boolean,
				default:false
			},
			timeFunction:{
				type:String
			}
		},
		data() {
			return {
				num:0,
				img:''
			};
		},
		created() {
		},
		mounted() {
			console.log(this.$refs.svgRef);
		},
		computed: {

		},
		methods:{
		}
	}
</script>

<style lang="scss" scoped>
	.my-progress-circle{
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		.centre{
			position: absolute;
			font-weight: 500;
		}
	}
  @keyframes circle_progress_keyframes_name_1 {
    from {
      // stroke-dashoffset: 115.2px;
      stroke-dashoffset: 565.2px;
    }
    to {
      stroke-dashoffset: 169.56px;
      // stroke-dashoffset: 333.56px;
    }
  }
  // .circle_progress_bar {
  //   animation: circle_progress_keyframes_name_1 1000ms 20ms cubic-bezier(0.99, 0.01, 0.22, 0.94) forwards;
  // }
	.circle_progress_bar {
		// transform: rotate(270deg);
		// display: inline-block;
	  // animation: circle_progress_keyframes_name_1 1000ms 20ms cubic-bezier(0.99, 0.01, 0.22, 0.94) forwards;
	}
</style>