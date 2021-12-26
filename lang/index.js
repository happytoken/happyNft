import langEn from './en.js'
import langZh from './zh.js'
import langZhTw from './tw.js'
import Vue from 'vue'
import VueI18n from './vue-i18n'
Vue.use(VueI18n)
if (!uni.getStorageSync("lang")) {
	uni.setStorageSync("lang", "en");
}
const i18n = new VueI18n({
	locale: uni.getStorageSync("lang"),
	messages: {  
			'en': langEn,
			'zh': langZh,
			'tw': langZhTw,
		}
})
export default i18n