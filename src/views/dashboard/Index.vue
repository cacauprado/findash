<template>
  <v-app>
    <dashboard-core-app-bar />
    
    <top-bar />

    <dashboard-core-drawer />

    <dashboard-core-view />
  </v-app>
</template>

<script>
  export default {
    name: 'DashboardIndex',

    components: {
      DashboardCoreAppBar: () => import('./components/core/AppBar'),
      DashboardCoreDrawer: () => import('./components/core/Drawer'),
      DashboardCoreView: () => import('./components/core/View'),
      TopBar: () => import('./components/core/TopBar'),
    },

    created () {
      this.$store.commit('SET_DRAWER', true)
    },

    data: () => ({
      expandOnHover: false,
    }),
  }
</script>
