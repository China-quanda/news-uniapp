<template>
  <view class="gender-picker">
		<view class="container">
			<u-picker :show="show" :columns="columns" @confirm="rightClick" @cancel="close"></u-picker>	
		</view>	
  </view>
</template>
<script>
export default {
  name: 'gender-picker',
  components: {},
	props:{
		columns:{
			type:Array,
			required:true,
			default: ()=> []
		},
		show:{
			type:Boolean,
			required:true,
			default: false
		}
	},
  data () {
    return {
    }
  },
  methods: {
		rightClick(value){
			this.$emit('edit',value)
			this.close()
		},
		close(){
			this.$emit('close')
		}
  }
}
</script>
<style lang="scss" scoped>



</style>
