<template>
  <div class="logout-btn-con">
    <Tooltip content="退出登录" placement="bottom">
      <Icon @click.native="handleClick"  type="md-log-out" :size="25"></Icon>
    </Tooltip>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Logout',
  methods: {
    ...mapActions([
      'handleLogOut'
    ]),
    handleClick () {
      this.handleLogOut().then(() => {
        this.$router.push({
          name: 'login'
        })
        this.$store.commit('resetMenulist')
      })
    }
  }
}
</script>
