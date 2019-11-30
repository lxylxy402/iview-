<template>
  <div>
    <Tooltip content="查看消息" placement="bottom">
      <Badge dot :count="countComputed">
        <Icon type="md-notifications" :size="25" class='marginR cursorP' @click='onClick'/>
      </Badge>
    </Tooltip>
    <drag-drawer v-model="showWindowBDrawer"
      :width.sync="width1"
      :min-width="300"
      :placement="placement"
      :draggable="draggable"
      :scrollable="true">
      <div slot="header">
        <Icon type="md-aperture" :size="18"></Icon>
        <b>这是标题</b>
      </div>
      <Button @click="showBDrawer3 = true">显示多层</Button>
      <p v-for="n in 200" :key="n">{{ n }}</p>
    </drag-drawer>
  </div>
</template>

<script>
import DragDrawer from '_c/drag-drawer'
export default {
  data () {
    return {
      showWindowBDrawer: false,
      showContainerBDrawer: false,
      showBDrawer3: false,
      width1: 300,
      width2: 200,
      placement: 'right',
      draggable: true
    }
  },
  components: {
    DragDrawer
  },
  name: 'message',
  props: {
    count: {
      type: Number,
      default: 0
    },
    hasRead: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    countComputed () {
      return this.hasRead ? 0 : this.count
    }
  },
  methods: {
    onClick () {
      this.showWindowBDrawer = true
    },
    openErrorLoggerPage () {
      this.$router.push({
        name: 'error_logger_page'
      })
    }
  }
}
</script>
