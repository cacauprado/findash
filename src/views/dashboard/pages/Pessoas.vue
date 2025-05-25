<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-alert
          v-if="currentAction === 'alocacao'"
          type="info"
          border="left"
          text
        >
          Alterar alocação de pessoas
        </v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="items"
          class="elevation-1"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PessoasPage',
  props: {
    defaultAction: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentAction: '',
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Nome', value: 'name' },
        { text: 'Projeto', value: 'projeto' },
        { text: 'Gestor', value: 'gestor' },
      ],
      items: [],
    }
  },
  watch: {
    defaultAction: {
      immediate: true,
      handler(val) {
        this.currentAction = val
      }
    }
  }
}
</script>
