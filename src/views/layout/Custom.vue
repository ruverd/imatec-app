<template>
	<div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
		<sidebar class="sidebar-container"></sidebar>
		<div class="main-container">
			<navbar></navbar>
			<tags-view></tags-view>
			<div class="mixin-components-container">
				<app-main></app-main>
				<el-tooltip placement="top" content="Topo da Página">
					<back-to-top transitionName="fade" :customStyle="myBackToTopStyle" :visibilityHeight="300" :backPosition="50"></back-to-top>
				</el-tooltip>
			</div>
			<el-footer>Copyright © 2018 - <a href="http://www.imatec.com.br">Imatec - Gerenciamento Seguro da Informação</a></el-footer>
		</div>
	</div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView } from './components'
import PanThumb from '@/components/PanThumb'
import MdInput from '@/components/MDinput'
import Mallki from '@/components/TextHoverEffect/Mallki'
import DropdownMenu from '@/components/Share/dropdownMenu'
import waves from '@/directive/waves/index.js'
import BackToTop from '@/components/BackToTop'

export default {
  name: 'custom',
  components: {
    Navbar,
    Sidebar,
    PanThumb,
    MdInput,
    Mallki,
    DropdownMenu,
    BackToTop,
    AppMain,
    TagsView
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
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "src/styles/mixin.scss";
	.app-wrapper {
	  @include clearfix;
	  position: relative;
	  height: 100%;
	  width: 100%;
	}
	.el-footer {
	  background-color: #fff;
	  color: #333;
	  text-align: center;
	  line-height: 60px;
	}
</style>
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
