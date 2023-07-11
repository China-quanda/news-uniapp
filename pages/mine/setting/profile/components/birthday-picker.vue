<template>
  <view class="birthday-picker">
		<view class="container">
			<u-datetime-picker
			                :show="show"
			                v-model="value"
			                mode="date"
											:minDate="minDate"
											:maxDate="maxDate"
											@cancel="close"
											@confirm="rightClick"
											
			        ></u-datetime-picker>
		</view>	
  </view>
</template>
<script>
export default {
  name: 'birthday-picker',
  components: {},
	props:{
		show:{
			type:Boolean,
			required:true,
			default: false
		}
	},
  data () {
    return {
			value:new Date().getTime(),
			minDate: new Date(1900, 0, 0).getTime(),
			maxDate: new Date().getTime(),
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
