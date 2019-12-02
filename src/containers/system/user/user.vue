<template>
  <div>
    <search
      place='请输入账号'
      :keyword.sync="search.keyword"
      :selectList='selectList'
      v-model='search.value'
      @on-search='onSearch'
    ></search>
    <tables :columns='columns' :data='tableData' :loading='loading' v-model="tableData"></tables>
  </div>
</template>
<script>
import tables from '_c/tables'
import search from '_c/search'
export default {
  data () {
    return {
      columns: [
        { type: 'selection', width: 40 },
        { title: '序号', key: 'num', width: 60 },
        { title: '用户名称', key: 'userName' },
        { title: '用户ID', key: 'userId' },
        { title: '姓名', key: 'userId' },
        { title: '手机号', key: 'mobilePhone' },
        { title: '操作', key: 'handle', options: ['edit', 'delete'] }
      ],
      tableData: [
        { num: 10000, userName: '测试' },
        { num: 10000, userName: '测试2' }
      ],
      search: {
        keyword: '',
        value: '100'
      },
      selectList: [
        { value: '100', label: '全部' },
        { value: '1', label: '内容1' },
        { value: '2', label: '内容2' },
        { value: '3', label: '内容3' }
      ],
      loading: false
    }
  },
  components: {
    tables,
    search
  },
  methods: {
    onSearch () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 2000)
      console.log(this.search)
    }
  },
  mounted () {
    this.onSearch()
  }
}
</script>
