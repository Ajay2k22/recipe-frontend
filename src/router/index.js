import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Search from '../views/Search.vue'
import CardPage from '../views/CardPage.vue'
import Post from '../views/Post.vue'
import PostFeed from '../views/PostFeed.vue'
import MyPost from '../views/MyPost.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'signup',
      component: Signup
    },
    {
      path: '/mypost',
      name: 'mypost',
      component: MyPost
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      props: true
    },
    {
      path: '/search/:id',
      name: 'cardpage',
      component: CardPage
    },
    {
      path: '/post',
      name: 'post',
      component: Post
    },
    {
      path: '/postfeed',
      name: 'postfeed',
      component: PostFeed
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Login.vue')
    }
  ]
})

export default router
