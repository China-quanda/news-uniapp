<template>
  <uni-popup ref="popupRef" type="bottom" border-radius="10px 10px 0 0">
    <view class="popup-box">
      <view class="top">
        <view class="title-bar">
          <view class="title">
            <text class="iconfont icon-shoucang1 text-blue-5 text-16px"></text>
            <text> 选择收藏夹 </text>
          </view>
          <view class="create" @click="openCreateFavorites">
            <text class="iconfont icon-jiahao text-blue-5 text-11px"></text>
            <text class="m-l2px text-12px text-blue-5"> 新建收藏夹 </text>
          </view>
        </view>
      </view>
      <view class="centre">
        <template v-if="list.length">
          <view class="list" v-for="(item, index) in list" :key="index">
            <checkbox-group>
              <label class="item" @click="clickItem(item)">
                <view class="item-left">
                  <view class="item-title">
                    {{ item.name }}
                  </view>
                  <view class="item-content">
                    <text>{{ item.count }}个内容</text>
                    <text class="mx-5px">·</text>
                    <text class="text-11px">{{ item.isPublic ? '公开' : '私密' }}</text>
                  </view>
                </view>
                <view class="item-right">
                  <!-- #ifdef MP-WEIXIN -->
                  <checkbox class="checkbox" :value="item.id + ''" :checked="item.isChecked" />
                  <!-- #endif -->
                  <!-- #ifndef MP-WEIXIN -->
                  <checkbox class="checkbox" :value="item.id + ''" :checked="item.isChecked" @click="clickItem(item)" />
                  <!-- #endif -->
                </view>
              </label>
            </checkbox-group>
          </view>
        </template>
        <template v-else>
          <view class="empty">
            <!-- <image src="@/s" mode="aspectFit"></image> -->
            <view class="iconfont icon-liebiao"></view>
            <view class="text">{{ loading ? "数据加载中" : "暂无收藏" }}</view>
          </view>
        </template>
      </view>
      <view class="bottom">
        <button style="background-color: #2fa3f3" class="btn" size="mini" type="primary"
          :disabled="selectList.length === 0 || submitLoading" :loading="submitLoading" @click="submit">
          完成
        </button>
      </view>
    </view>
  </uni-popup>

  <CreateFavorites ref="createFavoritesRef" @addSuccess="loadList" />
</template>

<script setup lang="ts">
import CreateFavorites from './create'
defineOptions({
  name: 'FavoritesPopup'
})

const props = defineProps({
  articleId: {
    type: Number,
    default: true
  }
})

// popupRef
const popupRef = ref()

// createFavoritesRef
const createFavoritesRef = ref()

const openCreateFavorites = () => {
  createFavoritesRef.value?.open()
}

// 加载列表发起网络请求时的 Loading
const loading = ref(false)
// 点击完成发起网络请求时的 Loading
const submitLoading = ref(false)
// 收藏夹项类型
interface FavoritesItem {
  id: number
  name: string
  count: number
  isPublic: boolean
  isChecked: boolean
}
// 收藏夹列表
const list = ref<FavoritesItem[]>([])
// 选中的收藏夹列表
const selectList = ref<number[]>([]);
// 点击每一项收藏夹时触发
const clickItem = (item: FavoritesItem) => {
  item.isChecked = !item.isChecked
  // 判断是否在选中收藏列表中
  if (selectList.value.includes(item.id)) {
    // 如果在收藏列表中，并且已经取消选中当前收藏夹则删除
    if (!item.isChecked) {
      selectList.value = selectList.value.filter(fid => fid != item.id)
    }
  } else {
    // 如果不存在选中的收藏列表中则添加
    selectList.value.push(item.id)
  }
}

// 点击完成 提交收藏事件
const submit = async () => {
  if (selectList.value.length === 0 || submitLoading.value) return
  submitLoading.value = true;
  // await addFavorite({articleId:props.articleId,list:selectList.value})
  await getList() // 临时模拟请求
  submitLoading.value = false;
  close()
  uni.showToast({
    title: '收藏成功',
    icon: 'success'
  })
}
/** 打开Popup */
function open() {
  popupRef.value?.open()
  loadList()
}
/** 关闭close */
function close() {
  popupRef.value?.close()
}
// 加载收藏列表数据
const loadList = async () => {
  console.log('loadList')
  // 获取收藏列表
  loading.value = true
  list.value = []
  const reslut = await getList()
  list.value = reslut
  loading.value = false

  // 在获取收藏的列表里 筛选出已选中的列表
  list.value.forEach(item => {
    if (item.isChecked === true) {
      selectList.value.push(item.id)
    }
  })
}

function getList(time: number = 350): Promise<FavoritesItem[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: '娱乐',
          count: 398,
          isPublic: true,
          isChecked: true,
        },
        {
          id: 2,
          name: '股票',
          count: 323,
          isPublic: true,
          isChecked: true,
        },
        {
          id: 3,
          name: '后端',
          count: 398,
          isPublic: false,
          isChecked: false,
        },
        {
          id: 4,
          name: '饭菜',
          count: 398,
          isPublic: true,
          isChecked: false,
        },
        {
          id: 5,
          name: '提神',
          count: 398,
          isPublic: false,
          isChecked: false,
        },
        {
          id: 6,
          name: '提神',
          count: 398,
          isPublic: true,
          isChecked: false,
        },
        {
          id: 7,
          name: '提神',
          count: 398,
          isPublic: true,
          isChecked: false,
        },
        {
          id: 8,
          name: '提神',
          count: 398,
          isPublic: true,
          isChecked: false,
        },
        {
          id: 9,
          name: '提神',
          count: 398,
          isPublic: true,
          isChecked: false,
        },
        {
          id: 10,
          name: '提神',
          count: 398,
          isPublic: true,
          isChecked: false,
        }
      ])
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
  max-height: 80vh;

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
    height: 300px;

    .item {
      @apply flex flex-items-center flex-justify-between py13px;
      // display: block;
      font-family: Arial, Helvetica, sans-serif;
      color: #524b4b;
      // font-size: 14px;
      // padding: 10px;
      // margin-top: 15px;
      // background-color: #fff;
      // border-radius: 8px;
      // border: 1px solid rgba(122, 192, 241, 0.1);
      border-bottom: 1px solid #f9f5f5;


      .item-left {
        .item-title {
          font-size: 14px;
          @include ellipsis()
        }

        .item-content {
          margin-top: 8px;
          font-size: 12px;
        }
      }

      .item-right {
        .checkbox {
          transform: scale(0.8);
        }
      }
    }

    .empty {
      position: absolute;
      top: 50%;
      left: 50%;
      text-align: center;
      font-size: 14px;
      color: #4b4848;
      transform: translate(-50%, -50%);

      .iconfont {
        margin-bottom: 10px;
        font-size: 50px;
      }
    }
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    // margin: 15px 0px 25px 0px;
    padding: 15px 15px;

    .btn {
      width: 100%;
      padding: 5px;
    }
  }
}
</style>