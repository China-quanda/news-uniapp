// 获取 从本地缓存中同步获取指定 key 对应的内容。
export const getStorage = (name: string): any => {
	let data = null
	try {
		data = uni.getStorageSync(name);
		return data;
	} catch (e) {
		return data;
	}
};
// 设置 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
export const setStorage = (name: string, value: any): void => {
	try {
		// 如果 value 是对象，就把 value 转为 JSON 格式的字符串再存储
		if (typeof value === 'object') {
			value = JSON.stringify(value);
		}
		uni.setStorageSync(name, value);
	} catch (e) {
		uni.setStorageSync(name, value);
	}
};
// 删除 从本地缓存中同步移除指定 key。
export const removeStorage = (name: string): void => {
	uni.removeStorageSync(name);
};
// 获取所有 同步获取当前 storage 的相关信息。
export const getStorageAll = (): any => {
	try {
		return uni.getStorageInfoSync();
	} catch (e) { }
};
// 清除所有 同步清理本地数据缓存。
export const clearStorage = (): void => {
	try {
		uni.clearStorageSync();
	} catch (e) { }
};

/**
 * @description 数据缓存 storage
 * @method get() 获取 从本地缓存中同步获取指定 key 对应的内容。
 * @method set() 设置 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
 * @method remove() 删除 从本地缓存中同步移除指定 key。
 * @method getAll() 获取所有 同步获取当前 storage 的相关信息。
 * @method clear() 清除所有 同步清理本地数据缓存。
 */
export default {
	/**
	 * @description 获取 从本地缓存中同步获取指定 key 对应的内容。
	 * @param {string} name name
	 * @example get('name')
	 * @return any
	 */
	get: (name: string): any => {
		try {
			const data = uni.getStorageSync(name);
			return data ? JSON.parse(data) : false;
		} catch (e) {
			const data = uni.getStorageSync(name);
			return data ? data : false;
		}
	},
	/**
	 * @description 设置 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
	 * @param {string} name name
	 * @param {any} value value
	 * @example set('name','value')
	 */
	set: (name: string, value: any): void => {
		try {
			// 如果 value 是对象，就把 value 转为 JSON 格式的字符串再存储
			if (typeof value === 'object') {
				value = JSON.stringify(value);
			}
			uni.setStorageSync(name, value);
		} catch (e) {
			uni.setStorageSync(name, value);
		}
	},
	/**
	 * @description 删除 从本地缓存中同步移除指定 key。
	 * @param {string} name name
	 * @example remove('name')
	 */
	remove: (name: string): void => {
		uni.removeStorageSync(name);
	},
	/**
	 * @description 获取所有 同步获取当前 storage 的相关信息。
	 * @example getAll()
	 * @return any
	 */
	getAll: (): any => {
		try {
			return uni.getStorageInfoSync();
		} catch (e) { }
	},
	/**
	 * @description 清除所有 同步清理本地数据缓存。
	 * @example clear()
	 */
	clear: (): void => {
		try {
			uni.clearStorageSync();
		} catch (e) { }
	}
};
