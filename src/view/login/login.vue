<style lang='less'>
@import './login.less';
</style>

<template>
  <div class='login'>
    <div class='login-con'>
      <Card icon='log-in' title='欢迎登录' :bordered='false'>
        <div class='form-con'>
          <login-form @on-success-valid='handleSubmit'></login-form>
          <p class='login-tip'>输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions(['handleLogin', 'getUserInfo', 'initRouter']),
    handleSubmit ({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        let data = [
          {
            meta: {
              icon: 'md-arrow-round-up',
              url: '',
              title: '文章管理'
            },
            component: 'Main',
            name: '文章管理',
            children: [
              {
                children: '',
                id: '4EC813FC61C6404780FDF3B573D8D9E3',
                meta: {
                  icon: 'ios-cloud-upload',
                  title: '文章推送',
                  url: ''
                },
                name: '文章推送',
                component: 'sq/article/articlePush/articlePush',
                path: 'pc1017'
              },
              {
                path: 'pc1018',
                component: 'sq/article/articlesCategory/articlesCategory',
                meta: {
                  icon: 'md-arrow-round-up',
                  title: '文章分类',
                  url: ''
                },
                id: '45C316DC1DEB43508290B73A63985A11',
                children: '',
                name: '文章分类'
              },
              {
                component: 'sq/article/articleLabel/articleLabel',
                name: '文章标签',
                children: '',
                id: '9658DD01B5A248DDA15311FEADDDD20A',
                meta: {
                  title: '文章标签',
                  url: '',
                  icon: 'md-bonfire'
                },
                path: 'pc1019'
              }
            ],
            path: '/pc1016',
            id: 'E6722CFAB70C4067BF077BFF9982610A'
          }
        ]
        this.initRouter(data)
        this.getUserInfo().then(res => {
          this.$router.push({
            name: this.$config.homeName
          })
        })
      })
    }
  },
  mounted () {
    localStorage.clear()
  }
}
</script>

<style></style>
