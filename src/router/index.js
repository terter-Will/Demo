import { createRouter, createWebHistory } from 'vue-router';
import TodoList from '../views/TodoList.vue';
import Selector from '../views/Selector.vue';
import Codereview1 from '../views/Codereview1.vue';
import Codereview2 from '../views/Codereview2.vue';

const routes = [
  {
    path: '/todoList',
    name: 'TodoList',
    component: TodoList,
  },
  {
    path: '/selector',
    name: 'Selector',
    component: Selector,
  },
  {
    path: '/codereview1',
    name: 'Codereview1',
    component: Codereview1,
  },
  {
    path: '//codereview2',
    name: 'Codereview2',
    component: Codereview2,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;