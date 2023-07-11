<template>
  <view class="edit">
    <u-navbar placeholder :title="title" @leftClick="leftClick"  :border="true" border rightText="提交" @rightClick="rightClick" :class="isEditValue ? '' : 'right-text'"></u-navbar>
		
		<view class="container">
			
		 <u--input v-if="type == 'input'" :placeholder="placeholder"  border="bottom" v-model="value" focus clearable></u--input>
		 <u-textarea v-if="type == 'textarea'" v-model="value" :placeholder="placeholder" focus  :cursor="value"></u-textarea>
		 
		 <u-modal :show="showModal"  content='直接返回修改不会生效.是否提交修改？' confirmText="提交" cancelText="直接返回"  showCancelButton @confirm="rightClick" @cancel="close"></u-modal>
		</view>
    
			
  </view>
</template>
<script>
export default {
  name: 'edit',
  components: {},
	props:{
		title:{
			type:String,
			required:true,
			default: '导航栏'
		},
		valueData:{
			type:String
		},
		type:{
			type:String,
			default: 'input'
		}
	},
  data () {
    return {
      checked: false,
			value:null,
			showModal:false,
    }
  },
	created() {
		if(this.valueData){
			this.value = this.valueData
		}
	},
	computed:{
	            placeholder:{
	               get(){
	                   return '请输入' +  this.title
	               }
	            },
							isEditValue:{
								get(){
									if(this.value == this.valueData) return false
									if(!this.value) return false
								  return true
								}
							}

	},
  methods: {
		rightClick(){
			if(!this.value) return uni.$u.toast(this.placeholder)
			if(this.value == this.valueData) return uni.$u.toast('您未修改' + this.title)
			const value = uni.$u.trim(this.value) //去除所有空格
			this.$emit('edit',value)
			this.close()
		},
		close(){
			this.$emit('close')
		},
		leftClick(){
			if(this.value && this.value == this.valueData) return this.close()
			if(!this.value && this.value == this.valueData) return this.close()
			if(!this.value && this.value != this.valueData) return this.showModal = true
			if(this.value && this.value != this.valueData) return this.showModal = true
		}
  }
}
</script>
<style lang="scss" scoped>
.edit {
  width: 100vw;
}
.container{
	margin-top: 50px;
	padding: 10px;
}
.right-text{
	/deep/.u-navbar__content__right{
		color: #ccc;
	}
}
</style>
