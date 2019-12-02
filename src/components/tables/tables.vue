<template>
  <div class='tables'>
    <Card>
      <div class='marginBot'>
        <Button class='marginR' @click='onAdd'><Icon type="md-add" /> 新增</Button>
        <Button type='error' class='marginR' @click='onDelete'><Icon type="md-trash" /> 删除</Button>
      </div>
      <Table
        ref="tablesMain"
        :height='tableHeight'
        :data="insideTableData"
        :columns="insideColumns"
        :stripe="stripe"
        :border="border"
        :show-header="showHeader"
        :width="width"
        :loading="loading"
        :disabled-hover="disabledHover"
        :highlight-row="highlightRow"
        :row-class-name="rowClassName"
        :size="size"
        :no-data-text="noDataText"
        :no-filtered-data-text="noFilteredDataText"
        :show-summary='summary'
        @on-current-change="onCurrentChange"
        @on-select="onSelect"
        @on-select-cancel="onSelectCancel"
        @on-select-all="onSelectAll"
        @on-selection-change="onSelectionChange"
        @on-sort-change="onSortChange"
        @on-filter-change="onFilterChange"
        @on-row-click="onRowClick"
        @on-row-dblclick="onRowDblclick"
        @on-expand="onExpand"
      >
        <slot name="header" slot="header"></slot>
        <slot name="footer" slot="footer"></slot>
        <slot name="loading" slot="loading"></slot>
      </Table>
      <Page
        :total="search.total"
        :current.sync='search.current'
        :page-size='search.pageSize'
        @on-change='onPageChange'
        @on-page-size-change='onPageSizeChange'
        show-total
        show-elevator
        show-sizer
        class='tables-page'/>
    </Card>
  </div>
</template>

<script>
import TablesEdit from './edit.vue'
import handleBtns from './handle-btns'
import { getTableHeight } from '@/libs/util'
import { mapMutations, mapState } from 'vuex'
import './index.less'
export default {
  name: 'Tables',
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    },
    size: String,
    width: {
      type: [Number, String]
    },
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    stripe: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    highlightRow: {
      type: Boolean,
      default: false
    },
    rowClassName: {
      type: Function,
      default () {
        return ''
      }
    },
    context: {
      type: Object
    },
    noDataText: {
      type: String
    },
    noFilteredDataText: {
      type: String
    },
    disabledHover: {
      type: Boolean
    },
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * @description 全局设置是否可编辑
     */
    editable: {
      type: Boolean,
      default: false
    },
    /**
     * @description 搜索控件所在位置，'top' / 'bottom'
     */
    searchPlace: {
      type: String,
      default: 'top'
    },
    deleteText: {
      type: Object,
      default () {
        return {
          title: '确认删除',
          body: ''
        }
      }
    },
    summary: { // 是否合计
      type: Boolean,
      default: false
    }
  },
  /**
   * Events
   * @on-start-edit 返回值 {Object} ：同iview中render函数中的params对象 { row, index, column }
   * @on-cancel-edit 返回值 {Object} 同上
   * @on-save-edit 返回值 {Object} ：除上面三个参数外，还有一个value: 修改后的数据
   */
  data () {
    return {
      insideColumns: [],
      insideTableData: [],
      edittingCellId: '',
      edittingText: '',
      tableHeight: 500,
      searchKey: ''
    }
  },
  watch: {
    value (newVale) {
      this.handleTableData()
    }
  },
  computed: {
    ...mapState({
      search: state => state.tables.search
    })
  },
  methods: {
    ...mapMutations([
      'setSearch'
    ]),
    // 删除
    onDelete (row) {
      this.$Modal.confirm({
        title: this.deleteText.title ? '确认删除' : this.deleteText.title,
        content: `<p>确认删除${this.deleteText.body}？</p>`,
        onOk: () => {
          this.$emit('on-delete', row)
        }
      })
    },
    onAdd () {
      this.$emit('on-add')
    },
    // 改变页码
    onPageChange (page) {
      console.log(page)
      this.setSearch({ page })
    },
    onPageSizeChange (limit) {
      this.setSearch({ limit, page: 1 })
      console.log(this.search)
    },
    // 获取表格高度
    getTableHeight () {
      this.timer && clearInterval(this.timer)
      this.timer = setTimeout(() => {
        let height = getTableHeight(this.$refs.tablesMain.$el) - 55
        this.tableHeight = height
      }, 100)
    },
    // 监听页面大小变化，重新获取高度
    addResizeEvent () {
      window.onresize = () => {
        this.getTableHeight()
      }
    },
    // 编辑表格
    suportEdit (item, index) {
      item.render = (h, params) => {
        return h(TablesEdit, {
          props: {
            params: params,
            value: this.insideTableData[params.index][params.column.key],
            edittingCellId: this.edittingCellId,
            editable: this.editable
          },
          on: {
            'input': val => {
              this.edittingText = val
            },
            'on-start-edit': (params) => {
              this.edittingCellId = `editting-${params.index}-${params.column.key}`
              this.$emit('on-start-edit', params)
            },
            'on-cancel-edit': (params) => {
              this.edittingCellId = ''
              this.$emit('on-cancel-edit', params)
            },
            'on-save-edit': (params) => {
              this.value[params.row.initRowIndex][params.column.key] = this.edittingText
              this.$emit('input', this.value)
              this.$emit('on-save-edit', Object.assign(params, { value: this.edittingText }))
              this.edittingCellId = ''
            }
          }
        })
      }
      return item
    },
    surportHandle (item) {
      let options = item.options || []
      let insideBtns = []
      options.forEach(item => {
        if (handleBtns[item]) insideBtns.push(handleBtns[item])
      })
      let btns = item.button ? insideBtns.concat(item.button) : insideBtns
      item.width = item.width || 120
      item.render = (h, params) => {
        params.tableData = this.value
        return h('div', btns.map(item => item(h, params, this)))
      }
      return item
    },
    handleColumns (columns) {
      this.insideColumns = this.columns.map((item, index) => {
        // 全部默认居中
        item.align = item.align || 'center'
        let res = item
        if (res.editable) res = this.suportEdit(res, index)
        if (res.key === 'handle') res = this.surportHandle(res)
        return res
      })
    },
    handleTableData () {
      this.insideTableData = this.value.map((item, index) => {
        let res = item
        res.initRowIndex = index
        return res
      })
    },
    // 将数据导出为 .csv 文件
    exportCsv (params) {
      this.$refs.tablesMain.exportCsv(params)
    },
    // 清除高亮项，仅在开启 highlight-row 时可用
    clearCurrentRow () {
      this.$refs.talbesMain.clearCurrentRow()
    },
    // 开启 highlight-row 后有效，当表格的当前行发生变化的时候会触发
    onCurrentChange (currentRow, oldCurrentRow) {
      this.$emit('on-current-change', currentRow, oldCurrentRow)
    },
    // 在多选模式下有效，选中某一项时触发
    onSelect (selection, row) {
      this.$emit('on-select', selection, row)
    },
    // 在多选模式下有效，取消选中某一项时触发
    onSelectCancel (selection, row) {
      this.$emit('on-select-cancel', selection, row)
    },
    // 在多选模式下有效，点击全选时触发
    onSelectAll (selection) {
      this.$emit('on-select-all', selection)
    },
    // 在多选模式下有效，只要选中项发生变化时就会触发
    onSelectionChange (selection, row) {
      console.log(selection)
      console.log(row)
      this.$emit('on-selection-change', selection)
    },
    // 排序时有效，当点击排序时触发
    onSortChange (column, key, order) {
      this.$emit('on-sort-change', column, key, order)
    },
    // 筛选时有效，筛选条件发生变化时触发
    onFilterChange (row) {
      this.$emit('on-filter-change', row)
    },
    // 单击当前行
    onRowClick (row, index) {
      this.$emit('on-row-click', row, index)
    },
    // 双击当前行
    onRowDblclick (row, index) {
      this.$emit('on-row-dblclick', row, index)
    },
    // 展开或者收起某一列
    onExpand (row, status) {
      this.$emit('on-expand', row, status)
    }
  },
  mounted () {
    setTimeout(() => {
      this.handleTableData()
    }, 1000)
    this.handleColumns()
    this.getTableHeight()
    this.addResizeEvent()
  }
}
</script>
