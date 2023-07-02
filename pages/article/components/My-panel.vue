<template>
  <view class='wrap'>
    <view class='container w'>
      <view class='panel-title' v-show="showTitle"><h1 >{{title}}</h1></view>
      <slot></slot>
    </view>
   </view>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    title: {
      type: String,
      default: '标题'
    },
    showTitle: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  created () {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.wrap{
  padding-top: 10px;
  // background-color: rgb(240, 240, 240);
}
.container{
  background-color: rgb(255, 255, 255);
  // margin:5px 0;
  // padding:10px 10px;
  .panel-title{
    display:flex;
    margin-left: 15px;
    h1{font-size: 18px;}
  }
}
</style>
