import { defineStore } from 'pinia'
import { getArticleCtegoryList } from '@/api/articleCategory';
export const useArticleCtegoryStore = defineStore('articleCtegoryStore', {
	unistorage: {
		key: 'articleCtegoryStore',
		// paths: ['appName', 'version'], 
		serializer: {
			serialize(v) {
				return JSON.stringify(v)
			},
			deserialize(v) {
				return JSON.parse(v)
			}
		}
	},
	state: () => ({
		ctegorId: 1,
		ctegoryList: [],
		myCtegoryList:[],
		tjCtegoryList:[],
	}),
	getters: {
		list() {
			return this.ctegoryList.length ? this.ctegoryList : []
		},
		// myCtegoryList(){
			
		// },
		// tjCtegoryList(){
			
		// }
	},
	actions: {
		loadArticleCtegoryList(){
			return new Promise((resolve, reject) => {
				if(this.ctegoryList.length) return resolve(this.ctegoryList)
				getArticleCtegoryList({ pageSize: 100 }).then(res => {
					this.ctegoryList = res.data.list
					this.tjCtegoryList = res.data.list
					resolve(res)
				}).catch(() => {
					reject()
				})
			})
		},
		addMyCtegory(obj,index) {
			if(!this.tjCtegoryList.length) return
			this.tjCtegoryList.splice(index,1)
			if(!this.myCtegoryList.length) return this.myCtegoryList.push(obj)
			const exist = this.myCtegoryList.find(item=>item.id === obj.id)
			if(exist) return console.log('exist');
			this.myCtegoryList.push(obj)
		},
		delMyCtegory(obj,index) {
			if(!this.myCtegoryList.length) return
			this.myCtegoryList.splice(index,1)
			if(!this.tjCtegoryList.length) return this.tjCtegoryList.push(obj)
			const exist = this.tjCtegoryList.find(item=>item.id === obj.id)
			if(exist) return console.log('exist');
			this.tjCtegoryList.push(obj)
		},
	}
})