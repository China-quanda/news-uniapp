import { createI18n } from 'vue-i18n'// v9.x
import en from './en.json'
import zhHans from './zh-Hans.json'
// import zhHant from './zh-Hant.json'

// 国际化配置地址https://uniapp.dcloud.net.cn/tutorial/i18n.html#helloi18n
const i18nConfig = {
	locale: uni.getLocale(),// 获取已设置的语言
	messages:{
		en, //英文
		'zh-Hans': zhHans,//简体中文
		// 'zh-Hant': zhHant //繁体中文
	}
}

const i18n = createI18n(i18nConfig)
export const t = i18n.global.t
export const locale = i18n.global.locale
export const setLocale = (lang : "en" | "zh-Hans") => {
  uni.setLocale(lang)
  i18n.global.locale = lang
}
export const getLocale = ():string => {
  return i18n.global.locale
}

export default i18n