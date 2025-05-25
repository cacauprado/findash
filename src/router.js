import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      component: () => import('@/views/dashboard/Index'),
      children: [
        {
          name: 'Dashboard',
          path: 'dashboard',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        {
          name: 'Receita',
          path: 'receita',
          component: () => import('@/views/dashboard/pages/Receita'),
          children: [
            {
              path: 'faturamento',
              name: 'Atualizar Faturamento',
              component: () => import('@/views/dashboard/pages/Receita'),
              props: { defaultDialog: 'faturamento' }
            },
            {
              path: 'projecao',
              name: 'Atualizar Projeção',
              component: () => import('@/views/dashboard/pages/Receita'),
              props: { defaultDialog: 'projecao' }
            },
            {
              path: 'reconhecimento',
              name: 'Atualizar Reconhecimento',
              component: () => import('@/views/dashboard/pages/Receita'),
              props: { defaultDialog: 'reconhecimento' }
            },
            {
              path: 'penalidade',
              name: 'Atualizar Penalidade',
              component: () => import('@/views/dashboard/pages/Receita'),
              props: { defaultDialog: 'penalidade' }
            }
          ]
        },
        {
          name: 'Custo',
          path: 'custo',
          component: () => import('@/views/dashboard/pages/Custo'),
          children: [
            {
              path: 'adicionar',
              name: 'Adicionar Custo',
              component: () => import('@/views/dashboard/pages/Custo'),
              props: { defaultAction: 'adicionar' }
            },
            {
              path: 'remover',
              name: 'Remover Custo',
              component: () => import('@/views/dashboard/pages/Custo'),
              props: { defaultAction: 'remover' }
            },
            {
              path: 'atualizar',
              name: 'Atualizar Custo',
              component: () => import('@/views/dashboard/pages/Custo'),
              props: { defaultAction: 'atualizar' }
            }
          ]
        },
        {
          name: 'Pessoas',
          path: 'pessoas',
          component: () => import('@/views/dashboard/pages/Pessoas'),
          children: [
            {
              path: 'alocacao',
              name: 'Alterar Alocação',
              component: () => import('@/views/dashboard/pages/Pessoas'),
              props: { defaultAction: 'alocacao' }
            }
          ]
        },
        {
          name: 'Projetos',
          path: 'projetos',
          component: () => import('@/views/dashboard/pages/Projetos'),
        },
      ],
    },
  ],
})
