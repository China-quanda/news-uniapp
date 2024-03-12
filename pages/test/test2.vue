<template>
  <div>
    {{ msg }}
  </div>
  <div>{{ msg1 }}</div>
  <view class="" hover-class="none" hover-stop-propagation="false">
    
  </view>
</template>

<script setup lang="ts">
const msg = ref('msg')
const msg1 = ref('msg1')
onLoad(()=>{
	console.log(11);
})
</script>

<style scoped lang="scss">

</style>