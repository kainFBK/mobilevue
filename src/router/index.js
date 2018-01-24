import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloFromVux'
import imgloader from '@/components/imgloader.vue'
import imgloader2 from '@/components/imgloader2.vue'
import albumlist from '@/components/albumlist.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/imgloader/:albumid',
      name: 'imgloader',
      component: imgloader
    },
    {
      path: '/imgloader2/:albumid',
      name: 'imgloader2',
      component: imgloader2
    },
    {
      path: '/albumlist',
      name: 'albumlist',
      component: albumlist
    }
  ]
})
