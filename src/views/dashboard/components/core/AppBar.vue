<template>
  <v-app-bar
    id="app-bar"
    absolute
    app
    color="transparent"
    flat
    height="75"
  >
    <v-app-bar-nav-icon
      @click.stop="$store.commit('SET_DRAWER', !drawer)"
    />
    
    <v-toolbar-title
      class="hidden-sm-and-down font-weight-light"
    >Dashboard</v-toolbar-title>

    <v-spacer />
  </v-app-bar>
</template>

<script>
  // Utilities
  import {
    mapState,
  } from 'vuex'

  export default {
    name: 'DashboardCoreAppBar',

    computed: {
      ...mapState(['drawer']),
    },
  }
</script>

<style lang="sass">
  #app-bar
    .v-badge__badge
      font-size: 10px
      padding: 4px 6px

    .v-toolbar__content
      padding-right: 12px
      padding-left: 12px
</style>
