<template>
  <div class='search'>
    <Card class="marginBot">
      <Input
        v-if='showInput'
        :placeholder="place"
        v-model.trim="newValue"
        clearable
        class='searchW marginR'
        @on-change="changeName"
        @on-clear='onSearch'
        @on-enter='onSearch'/>
      <Select v-model="option" class='searchW marginR' clearable v-if='showSelect' @on-clear='onSelectClear' @on-change='onSelectChange'>
        <Option v-for="item in selectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <slot name='body'></slot>
      <Button type='primary' @click='onSearch'>查找</Button>
    </Card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      newValue: this.keyword
    }
  },
  computed: {
    option: {
      get () {
        return this.value
      },
      set (newValue) {
        console.log(newValue)
        this.$emit('input', newValue)
      }
    }
  },
  props: {
    place: String,
    value: null,
    selectList: Array,
    showInput: {
      type: Boolean,
      default: true
    },
    showSelect: {
      type: Boolean,
      default: true
    },
    keyword: String,
    clearS: {
      type: Boolean,
      default: true
    },
    changeS: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onSearch () {
      this.$emit('on-search')
    },
    changeName () {
      this.$emit('update:keyword', this.newValue)
    },
    onSelectClear () {
      console.log('清空')
      // 清空和改变同时开启的时候，只触发改变，两个事件不同时触发
      this.clearS && !this.changeS && this.$emit('on-search')
    },
    onSelectChange () {
      console.log('改变')
      this.changeS && this.$emit('on-search')
    }
  }
}
</script>
