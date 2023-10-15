import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SaveTeacherSources from '@/components/SaveTeacherSources'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/save-teacher-sources',
      name: 'SaveTeacherSources',
      component: SaveTeacherSources
    }
  ]
})
