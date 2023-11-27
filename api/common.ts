import request from '@/utils/request'


/**
 * 根据字典类型查询字典数据信息
 * @param { String } dict 字典名称
 */
export const getSystemDict = (dict) => {
	return request({
		url:`/system/dict/data/type/${dict}`,
		method: 'GET',
	})
}
