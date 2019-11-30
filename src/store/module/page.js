const search = {
  total: 100,
  pageSize: 10,
  current: 1,
  page: 1,
  limit: 10
}
export default {
  state: {
    search: { ...search }
  },
  mutations: {
    setSearch (state, search) {
      let sea = state.search
      const {
        total = sea.total,
        pageSize = sea.pageSize,
        current = sea.current,
        page = sea.page,
        limit = sea.limit
      } = search
      state.search = { total, pageSize, current, page, limit }
    },
    defaultSearch (state) {
      state.search = { ...search }
    }
  }
}
