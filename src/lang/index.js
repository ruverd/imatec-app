import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import elementPtLocale from 'element-ui/lib/locale/lang/pt-br'// element-ui lang
import enLocale from './en'
import zhLocale from './zh'
import ptLocale from './pt'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  },
  pt: {
    ...ptLocale,
    ...elementPtLocale
  }
}

const i18n = new VueI18n({
  locale: Cookies.get('language') || 'pt', // set locale
  messages // set locale messages
})

export default i18n
