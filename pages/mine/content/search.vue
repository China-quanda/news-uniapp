<template>
  <view class='search'>
		<my-search
		  :tapLeft="tapLeft"
		  :tapRight="search"
		  :change="change"
			:search="search"
			:showLeft="true"
			focus
		>
		</my-search>

   </view>
</template>

<script>
export default {
  name: 'search',
  components: {},
  data () {
    return {
      keyword: '',
    }
  },
  created () {},
  methods: {
    tapLeft() {
    		uni.navigateBack()
    },
		search(){
			console.log(this.keyword);
		},
		change(e){
			console.log('change',e);
			this.keyword = e
		},
  }
}
</script>
<style lang="scss" scoped>

</style>
