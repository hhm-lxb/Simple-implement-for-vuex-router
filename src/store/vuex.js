let Vue 

class Store {
  constructor (options) {
    const { mutations, actions, getters, state } = options
    this._mutations = mutations || {}
    this._actions = actions || {}
    this._wrappedGetters = getters || {}
    this._state = state
    let store = this
    // console.log(this, 'vuex vm')
    const computed = {}
    this.getters = getters
    Object.keys(this._wrappedGetters).forEach(key => {
      const getterFn = this._wrappedGetters[key]
      console.log(this._wrappedGetters, getterFn, key)
      computed[key] = function () {
        return getterFn(store._state)
      }
      Object.defineProperty(this.getters, key, {
        get: () => this._vm[key],
        enumerable: true
      })
    })
    console.log(computed,'computedf')
    this._vm = new Vue({
      data: {
        $$state: state
      },
      computed
    })
    console.log(this, 'vuex vm1')
    const { commit, dispatch } = this
    // 为commit和dispatch都绑定当前store实例的上下文
    this.commit = function boundCommit (type, payload) {
      return commit.call(store, type, payload)
    }
    this.dispatch = function boundDispatch (type, payload) {
      return dispatch.call(store, type, payload)
    }
    
  }
  get state () { // 存取器
    return this._vm._data.$$state
  }
  commit (type, payload) {
    const mutation = this._mutations[type]
    if (mutation) {
      mutation(this.state, payload)
    }
  }
  dispatch (type, payload) {
    const action = this._actions[type]
    if (action) {
      action(this, payload)
    }
  }
}

function install (_Vue) {
  Vue = _Vue
  Vue.mixin({
    beforeCreate () {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}
export default {
  Store,
  install
}