import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    meta: { title: 'Wool Pickup Tracker' },
  },
  {
    path: '/clients',
    name: 'ClientList',
    component: () => import('../views/ClientListView.vue'),
    meta: { title: 'Clients' },
  },
  {
    path: '/clients/new',
    name: 'ClientNew',
    component: () => import('../views/ClientFormView.vue'),
    meta: { title: 'Add Client' },
  },
  {
    path: '/clients/:id',
    name: 'ClientDetail',
    component: () => import('../views/ClientDetailView.vue'),
    props: true,
  },
  {
    path: '/clients/:id/edit',
    name: 'ClientEdit',
    component: () => import('../views/ClientFormView.vue'),
    props: true,
    meta: { title: 'Edit Client' },
  },
  {
    path: '/pickups',
    name: 'PickupList',
    component: () => import('../views/PickupListView.vue'),
    meta: { title: 'Pickups' },
  },
  {
    path: '/pickups/new',
    name: 'PickupNew',
    component: () => import('../views/PickupFormView.vue'),
    props: { mode: 'create' },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/SettingsView.vue'),
    meta: { title: 'Settings' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  },
})

router.beforeEach(to => {
  document.title = (to.meta.title as string) || 'Wool Pickup Tracker'
})

export default router
