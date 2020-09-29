
let Vue


class VueRouter {
  static install (_Vue) {
    Vue = _Vue
    // new Vue的时候会执行this._init传入Vue的options都会挂载到this.$options下
    Vue.mixin({
      beforeCreate () {
        if (this.$options.router) { 
          Vue.prototype.$router = this.$options.router
        }
      }
    })
    registerViewLink() // 注册router-link
    registerRouterView() // 注册router-view
  }
  constructor (options) {
    this.routes = options.routes
    this.routeMap = Object.create(null)
    Vue.util.defineReactive(this, 'current', window.location.hash.slice(1) || '/')

    window.addEventListener('hashchange', () => {
      this.current = window.location.hash.slice(1)
      if (this.current === '/') {
        this.current = '/home'
      }
    })
    this.routes.forEach(route => {
      const { path, component, redirect } = route
      this.routeMap[redirect || path] = component
    })
  }
}

function registerViewLink () {
  Vue.component('router-link', {
    props: {
      to: {
        type: [String, Object],
        required: true,
        default: '/'
      }
    },
    render (h) {  //<a href="xx"></a>
      return h('a', {
        attrs: {
          href: '#' + this.to
        }
      }, this.$slots.default)
    }
  })
}

function registerRouterView () {
  Vue.component('router-view', {
    render (h) {
      const { current, routeMap } = this.$router
      const component = routeMap[current] || null
      console.log(component, 'component')
      return h(component)
    }
  })
}

export default VueRouter
