<template>
	<div class="mixin-components-container">
		<app-main></app-main>
		<el-tooltip placement="top" content="Topo da Página">
			<back-to-top transitionName="fade" :customStyle="myBackToTopStyle" :visibilityHeight="300" :backPosition="50"></back-to-top>
		</el-tooltip>
	</div>
</template>

<script>
import PanThumb from '@/components/PanThumb'
import MdInput from '@/components/MDinput'
import Mallki from '@/components/TextHoverEffect/Mallki'
import DropdownMenu from '@/components/Share/dropdownMenu'
import waves from '@/directive/waves/index.js'
import { AppMain } from './components'
import BackToTop from '@/components/BackToTop'

export default {
  name: 'componentMixin-demo',
  components: {
    PanThumb,
    MdInput,
    Mallki,
    DropdownMenu,
    BackToTop,
    AppMain
  },
  directives: {
    waves
  },
  data() {
    const validate = (rule, value, callback) => {
      if (value.length !== 6) {
        callback(new Error('请输入六个字符'))
      } else {
        callback()
      }
    }
    return {
      myBackToTopStyle: {
        right: '50px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px', // Please keep consistent with height to center vertically
        background: '#ebeef5'// The background color of the button emm7eaf1
      },
      demo: {
        title: ''
      },
      demoRules: {
        title: [{ required: true, trigger: 'change', validator: validate }]
      },
      articleList: [
        { title: '基础篇', href: 'https://segmentfault.com/a/1190000009275424' },
        { title: '登录权限篇', href: 'https://segmentfault.com/a/1190000009506097' },
        { title: '实战篇', href: 'https://segmentfault.com/a/1190000009762198' },
        { title: 'vueAdmin-template 篇', href: 'https://segmentfault.com/a/1190000010043013' },
        { title: '自行封装 component', href: 'https://segmentfault.com/a/1190000009090836' },
        { title: '优雅的使用 icon', href: 'https://segmentfault.com/a/https://segmentfault.com/a/1190000012213278' }
      ]
    }
  }
}
</script>

<style scoped>
.mixin-components-container {
  background-color: #f0f2f5;
  padding: 30px;
  min-height: calc(100vh - 84px);
}
.component-item{
  min-height: 100px;
}
.placeholder-container div {
  margin: 10px;
}
</style>
