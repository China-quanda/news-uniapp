import type { App } from 'vue'
import {createPinia} from 'pinia'
import { createUnistorage } from 'pinia-plugin-unistorage'
const pinia = createPinia()
pinia.use(createUnistorage())
export const setupStore = (app: App<Element>) => {
  app.use(pinia)
}

export { pinia }
	
	