<template>
  <!-- Header -->
  <div class="clearfix">
    <span style="height: 40px;">{{ title ? title : ( $route.meta.header ?  $route.meta.header : $route.meta.title ) }}</span>
    <slot name="nav" >
      <el-button-group style="float: right;">
        <el-tooltip class="item" effect="dark" content="Adicionar" placement="top-end">
          <el-button v-waves plain icon="el-icon-plus" size="medium" @click="dialogFormVisible = true"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="Opções" placement="top-end">
          <el-dropdown>
            <el-button plain icon="el-icon-more" size="medium"></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><i class="el-icon-document el-icon--left"></i>Manual</el-dropdown-item>
              <el-dropdown-item><i class="el-icon-service el-icon--left"></i>Chamado</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-tooltip>
      </el-button-group>
    </slot>
  </div>
</template>

<script>
import waves from '@/directive/waves/index.js'

export default {
  props: {
    title: {
      type: String,
      required: false
    }
  },
  created() {
    console.log(this.$route.meta.header)
  },
  directives: {
    waves
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
