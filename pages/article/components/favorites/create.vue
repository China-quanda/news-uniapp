<template>
  <uni-popup ref="popupRef" type="bottom" :isMaskClick="false" border-radius="10px 10px 0 0">
    <view class="popup-box" v-if="isShow">
      <view class="top">
        <view class="title-bar">
          <view class="back" @click="close">
            <text class="iconfont icon-xiangzuojiantou text-blue-5 text-18px"></text>
          </view>
          <view class="title">
            <text class="text-15px text-#484a4b"> 新键收藏夹 </text>
          </view>
          <view class="back">
            <text :class="['text-14px', (!submitLoading && form.name) ? 'text-blue-5' : 'text-blue-3']"
              @click="formSubmit">
              完成
            </text>
          </view>
        </view>
      </view>
      <view class="centre">
        <form class="form" @submit="formSubmit">
          <view class="uni-form-item uni-column is-border">
            <input class="input" v-model="form.name" placeholder="收藏夹名称" maxlength="15" :adjust-position="false" focus>
          </view>
          <view class="uni-form-item uni-column is-border">
            <textarea class="textarea" v-model="form.desc" placeholder="收藏夹描述" :adjust-position="false" auto-height
              maxlength="100" />
          </view>
          <view class="uni-form-item uni-column">
            <radio-group class="radio-group" @change="changeRadio">
              <view>
                <label class="radio-item">
                  <radio class="radio" value="true" checked />
                  <text class="name">公开</text>
                  <text class="desc">将展示在你的主页</text>
                </label>
              </view>
              <view>
                <label class="radio-item">
                  <radio class="radio" value="false" />
                  <text class="name">私密</text>
                  <text class="desc">仅自己可见</text>
                </label>
              </view>
            </radio-group>
          </view>
        </form>
      </view>
    </view>
  </uni-popup>
</template>

<script setup lang="ts">
defineOptions({
  name: 'CreateFavoritesPopup'
})
const emit = defineEmits<{
  (e: 'addSuccess'): void
}>()
const isShow = ref(true)
const popupRef = ref()
// 点击完成发起网络请求时的 Loading
const submitLoading = ref(false)
// 收藏夹类型
interface Entity {
  name: string
  desc: string
  isPublic: boolean
}
const form = reactive<Entity>({
  name: '',
  desc: '',
  isPublic: true
})
const changeRadio = (e: any) => {
  form.isPublic = e.detail.value == 'true' ? true : false
}

// 点击完成 提交收藏事件
const formSubmit = async () => {
  if (submitLoading.value || !form.name) return
  console.log('formdata', form)

  submitLoading.value = true;
  await addFavorite() // 临时模拟请求
  submitLoading.value = false;
  close()
  emit('addSuccess') //告诉父组件 已经新增成功 ，父组件应该刷新收藏列表
}

/** 打开Popup */
function open() {
  popupRef.value?.open()
}
/** 关闭close */
function close() {
  popupRef.value?.close()
  form.name = ''
  form.desc = ''
  form.isPublic = true
  // 为了解决小程 radio-group 序渲染问题
  // #ifdef MP-WEIXIN
  setTimeout(() => {
    isShow.value = false
    setTimeout(() => {
      isShow.value = true
    }, 350)
  }, 350)
  // #endif
}

function addFavorite(time: number = 350): Promise<Entity[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([])
    }, time)
  })
}

defineExpose({
  open,
  close
})
</script>

<style scoped lang="scss">
.popup-box {
  background-color: #fff;
  border-radius: 10px 10px 0px 0px;
  // max-height: 80vh;

  .top {
    .title-bar {
      padding: 12px 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #f5f5f5;

      .title {
        color: #484a4b;
        font-size: 15px;
        font-weight: bold;
      }

      .create {
        @apply flex flex-items-center text-14px;
      }
    }
  }

  .centre {
    position: relative;
    padding: 0px 15px;
    overflow-y: auto;
    height: 75vh;

    .form {
      .uni-form-item {
        .radio-group {
          @apply flex flex-col gap-y-10px mt-18px;

          .radio-item {
            @apply flex flex-items-center;

            .radio {
              margin-top: -2px;
              transform: scale(0.7);
            }

            .name {
              @apply text-14px text-coolgray-7;
            }

            .desc {
              @apply text-11px ml-5px text-coolgray-4;
            }
          }
        }

        .input {
          @apply py-18px px-5px text-14px;
        }

        .textarea {
          @apply py-18px px-5px text-14px;
        }
      }

      .is-border {
        border-bottom: 1px solid #f0f0f1;
      }
    }

  }

}
</style>