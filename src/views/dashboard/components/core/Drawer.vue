<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :mini-variant="mini"
    :mini-variant-width="80"
    :right="$vuetify.rtl"
    app
    width="240"
    v-bind="$attrs"
    class="sidebar"
  >
    <v-divider class="mb-1" />

    <!-- Menu button -->
    <v-list-item class="sidebar-item">
      <v-list-item-icon>
        <v-icon @click="toggleMini">mdi-menu</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title class="menu-title">Menu</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider class="mb-2" />

    <v-list
      expand
      nav
      class="sidebar-list"
    >
      <!-- Dashboard -->
      <v-list-item
        :to="{ name: 'Dashboard' }"
        link
        class="sidebar-item"
      >
        <v-list-item-icon>
          <v-icon>mdi-home-circle</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Receita com submenu -->
      <base-item-group
        :item="{
          icon: 'mdi-cash-plus',
          title: 'Receita',
          group: '/receita',
          children: [
            { title: 'Atualizar Faturamento', to: 'faturamento' },
            { title: 'Atualizar Projeção', to: 'projecao' },
            { title: 'Atualizar Reconhecimento', to: 'reconhecimento' },
            { title: 'Atualizar Penalidade', to: 'penalidade' }
          ]
        }"
      />

      <!-- Custo com submenu -->
      <base-item-group
        :item="{
          icon: 'mdi-cash-minus',
          title: 'Custo',
          group: '/custo',
          children: [
            { title: 'Adicionar Custo', to: 'adicionar' },
            { title: 'Remover Custo', to: 'remover' },
            { title: 'Atualizar Custo', to: 'atualizar' }
          ]
        }"
      />

      <!-- Pessoas com submenu -->
      <base-item-group
        :item="{
          icon: 'mdi-account-group',
          title: 'Pessoas',
          group: '/pessoas',
          children: [
            { title: 'Alterar Alocação', to: 'alocacao' }
          ]
        }"
      />

      <!-- Projetos -->
      <v-list-item
        :to="'/projetos'"
        link
        class="sidebar-item"
      >
        <v-list-item-icon>
          <v-icon>mdi-briefcase</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Projetos</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'DashboardCoreDrawer',

    props: {
      expandOnHover: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      mini: false,
      userMenuItems: [
        {
          icon: 'mdi-cog',
          title: 'Configurações',
          to: '/configuracoes',
          iconColor: '#2f2f2f'
        },
        {
          icon: 'mdi-logout',
          title: 'Sair',
          to: '/logout',
          iconColor: '#2f2f2f'
        }
      ]
    }),

    computed: {
      ...mapState(['barColor', 'barImage']),
      drawer: {
        get () {
          return this.$store.state.drawer
        },
        set (val) {
          this.$store.commit('SET_DRAWER', val)
        },
      },
      profile () {
        return {
          avatar: false,
          title: 'Nome teste',
        }
      },
    },

    methods: {
      toggleMini() {
        this.mini = !this.mini
      }
    },
  }
</script>

<style lang="sass">
  @import '~vuetify/src/styles/tools/_rtl.sass'

  .sidebar
    background-color: #C1C1C1 !important

    // Ajustes gerais do menu
    .v-list
      padding: 0
      
    // Ajuste do botão de menu
    .menu-title
      font-size: 1rem !important
      
    // Ajustes dos items principais
    .v-list-item
      min-height: 40px !important
      padding: 0 8px !important
      margin: 2px 0 !important
      align-items: center
      color: #FFFFFF !important

      &:hover
        background-color: rgba(255, 255, 255, 0.2) !important

    // Ajustes dos ícones
    .v-list-item__icon
      margin: 0 12px 0 4px !important
      min-width: 35px !important
      height: 35px !important
      display: flex !important
      align-items: center !important
      justify-content: center !important

      .v-icon
        font-size: 20px !important
        color: #FFFFFF !important

    // Ajustes dos títulos
    .v-list-item__title
      font-size: 0.95rem !important
      font-weight: 400 !important
      color: #FFFFFF !important
      line-height: 1.1 !important

    // Ajustes específicos para grupos
    .v-list-group
      margin: 0 !important
      
      &__header
        min-height: 40px !important
        padding: 0 8px !important
        margin: 2px 0 !important
      
      .v-list-group__items
        .v-list-item
          padding-left: 48px !important
          min-height: 32px !important
          margin: 1px 0 !important

          .v-list-item__title
            font-size: 0.85rem !important

    // Configuração do menu dropdown
    .v-menu__content
      background-color: #C1C1C1 !important
      
      .v-list
        background-color: #C1C1C1 !important
        padding: 4px 0

      .v-list-item
        min-height: 36px
        padding: 0 8px !important

    .menu-btn
      color: #FFFFFF !important
      padding: 0 8px !important

      .v-icon
        color: #FFFFFF !important

    .sidebar-item
      padding: 0 !important
      margin: 2px 0 !important

    // Modo mini
    &.v-navigation-drawer--mini-variant
      .v-list-item
        justify-content: center
        padding: 0 !important

        .v-list-item__icon
          margin: 0 !important

    // Removido menu do usuário pois foi movido para a TopBar

      .v-list-item__title
        font-size: 1rem !important

  // Override Vuetify's default styles
  .v-navigation-drawer
    background-color: #C1C1C1 !important

  .v-list
    background-color: transparent !important

  .v-list-item--active
    background-color: rgba(255, 255, 255, 0.15) !important

  // Override Vuetify's default styles
  .v-navigation-drawer
    background-color: #C1C1C1 !important

  .v-list
    background-color: transparent !important

  .v-list-item--active
    background-color: rgba(255, 255, 255, 0.1) !important
</style>
