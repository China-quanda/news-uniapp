import { ref,reactive } from "vue";

export const usePageList = ({ requestApi,queryParams })=>{
  // 数据列表
  const list = ref([]);
	let pageInfo = reactive({
		pageNum: 1,
		pageSize: 10,
		total: 0,
	})
  // 加载状态
  const loading = ref(false)
	
  // 获取数据
  const getDataList = (pageNum = pageInfo.pageNum) =>{
    if(loading.value) return console.log('数据加载中。。。请稍等');
    loading.value = true
		return new Promise((resolve, reject) => {
			requestApi({
			  pageNum,
			  pageSize:pageInfo.pageSize,
				...queryParams,
				// ...options
			  // 将值、refs 或 getters 规范化为值
			  // ...toValue(selectData),
			  // ...toValue(queryParams),
			  // ...toValue(options)
			}).then((result:any)=>{
			  // list.value = []
			  list.value = pageNum > 1 ? list.value.concat(result.data.list) : result.data.list
			  pageInfo.total = Number(result.data.pagination.total)
			  pageInfo.pageNum = pageNum
			  // pageInfo.pageNum = Number(result.data.pagination.pageNum)
			  pageInfo.pageSize = Number(result.data.pagination.pageSize)
				resolve(result)
			}).catch((err:any)=>{
			  console.log('Error loadData error', err);
				reject(err)
			}).finally(()=>{
			  loading.value = false
			})
		})

  }

  return {
    list,
		pageInfo,
    loading,
    getDataList,
  }
}
