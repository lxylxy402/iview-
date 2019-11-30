<template>
  <div>
    文章推送
    <Table ref='table' :height='height'></Table>
  </div>
</template>
<script>
import { getTableHeight } from '@/libs/util'
export default {
  data () {
    return {
      height: 500
    }
  },
  methods: {
    getTableHeight () {
      let height = getTableHeight(this.$refs.table.$el)
      this.height = height
      console.log(height)
    }
  },
  created () {
    console.log('进入页面')
  },
  mounted () {
    this.getTableHeight()
  }
}
</script>
