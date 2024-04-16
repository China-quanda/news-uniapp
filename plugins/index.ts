import type { App } from 'vue'
import {pinia} from './pinia'

export const initPlugins = (app: App<Element>) => {
  app.use(pinia)
}
