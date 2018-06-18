<template>
  <article-detail :is-edit='false'></article-detail>
</template>

<script>
import ArticleDetail from './components/ArticleDetail'

export default {
  name: 'stockCategoriesList',
  components: { ArticleDetail }
}
</script>

