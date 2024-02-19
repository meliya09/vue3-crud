//import vue router
import { createRouter, createWebHistory } from 'vue-router'

//define a routes
const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import( /* webpackChunkName: "home" */ '../views/home.vue')
    },
    {
        path: '/courses',
        name: 'courses.index',
        component: () => import( /* webpackChunkName: "index" */ '../views/courses/index.vue')
    },
    {
        path: '/create',
        name: 'courses.create',
        component: () => import( /* webpackChunkName: "create" */ '../views/courses/create.vue')
    },
    {
        path: '/edit/:id',
        name: 'courses.edit',
        component: () => import( /* webpackChunkName: "edit" */ '../views/courses/edit.vue')
    }
]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes // <-- routes,
})

export default router