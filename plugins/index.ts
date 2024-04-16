import type { App } from 'vue'
import {pinia} from './pinia'
import i18n from '@/locale'

export const initPlugins = (app: App<Element>) => {
  app.use(pinia)
  app.use(i18n)
}
