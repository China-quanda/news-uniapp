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

export default i18nConfig