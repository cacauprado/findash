<template>
  <v-app-bar
    id="top-bar"
    app
    flat
    height="75"
    color="#F8F9FA"
    class="px-4"
  >
    <div class="d-flex align-center justify-space-between top-bar-content">
      <!-- Título da página -->
      <div class="page-title">
        <h1 class="text-h5 font-weight-regular">{{ currentPageTitle }}</h1>
      </div>

      <!-- Filtros centrais -->
      <div class="d-flex align-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              text
              v-bind="attrs"
              v-on="on"
              class="mx-2"
            >
              <span>Cliente</span>
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(cliente, index) in clientes"
              :key="index"
              @click="selectedCliente = cliente"
            >
              <v-list-item-title>{{ cliente }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              text
              v-bind="attrs"
              v-on="on"
              class="mx-2"
            >
              <span>Projeto</span>
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(projeto, index) in projetos"
              :key="index"
              @click="selectedProjeto = projeto"
            >
              <v-list-item-title>{{ projeto }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              text
              v-bind="attrs"
              v-on="on"
              class="mx-2"
            >
              <span>Período</span>
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(periodo, index) in periodos"
              :key="index"
              @click="selectedPeriodo = periodo"
            >
              <v-list-item-title>{{ periodo }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <!-- Menu do usuário -->
      <div>
        <v-menu
          offset-y
          left
          :close-on-content-click="false"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              text
              v-bind="attrs"
              v-on="on"
              class="user-menu-btn"
            >
              <v-avatar
                size="32"
                class="mr-2"
              >
                <v-icon color="grey darken-3">mdi-account</v-icon>
              </v-avatar>
              <span class="hidden-sm-and-down">{{ profile.title }}</span>
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, i) in userMenuItems"
              :key="i"
              :to="item.to"
              link
            >
              <v-list-item-icon>
                <v-icon :color="item.iconColor">{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex'
import * as XLSX from 'xlsx'

export default {
  name: 'TopBar',

  data: () => ({
    selectedCliente: null,
    selectedProjeto: null,
    selectedPeriodo: null,
    clientes: [],
    projetos: [],
    periodos: ['Quarter', 'Mês', 'Ano'],
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
    ...mapState(['drawer']),
    profile () {
      return {
        title: 'Nome teste'
      }
    },
    currentPageTitle() {
      const route = this.$route.name
      return route ? route.charAt(0).toUpperCase() + route.slice(1) : 'Dashboard'
    }
  },

  async created() {
    await this.loadExcelData()
  },

  methods: {
    async loadExcelData() {
      try {
        const response = await fetch('/public/base_projetos.xlsx')
        const arrayBuffer = await response.arrayBuffer()
        const data = new Uint8Array(arrayBuffer)
        const workbook = XLSX.read(data, { type: 'array' })
        
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        const jsonData = XLSX.utils.sheet_to_json(worksheet)
        
        // Extrair clientes e projetos únicos
        this.clientes = [...new Set(jsonData.map(row => row.Cliente))]
        this.projetos = [...new Set(jsonData.map(row => row.Projeto))]
      } catch (error) {
        console.error('Erro ao carregar dados do Excel:', error)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
#top-bar
  border-bottom: 1px solid #E9ECEF !important

  .top-bar-content
    width: 100%

  .page-title
    min-width: 200px

    h1
      color: #2C3E50
      margin-bottom: 0

  .v-btn
    text-transform: none
    letter-spacing: normal
    font-weight: 400
    height: 40px

  .user-menu-btn
    border: 1px solid #E9ECEF
    border-radius: 4px
    padding: 0 12px
</style>
