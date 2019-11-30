const style = {
  marginRight: '5px'
}
const btns = {
  delete: (h, params, vm) => {
    return h('Button', {
      props: {
        type: 'error',
        icon: 'md-trash',
        size: 'small'
      },
      style,
      on: {
        'click': () => {
          vm.$emit('on-delete', params)
        }
      }
    })
  },
  edit: (h, params, vm) => {
    return h('Button', {
      style,
      props: {
        icon: 'ios-create-outline',
        size: 'small'
      },
      on: {
        'click': () => {
          vm.$emit('on-edit', params)
        }
      }
    })
  },
  check: (h, params, vm) => {
    return h('Button', {
      style,
      props: {
        icon: 'ios-search',
        size: 'small'
      },
      on: {
        'click': () => {
          vm.$emit('on-check', params)
        }
      }
    })
  }
}

export default btns
