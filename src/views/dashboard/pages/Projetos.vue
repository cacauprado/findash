<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="d-flex flex-wrap">
        <v-btn color="primary" class="ma-2" dark>Adicionar Projeto</v-btn>
        <v-btn color="primary" class="ma-2" dark>Atualizar Projeto</v-btn>
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
  name: 'ProjetosPage',
  data() {
    return {
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Projeto', value: 'projeto' },
        { text: 'Gerente', value: 'gerente' },
        { text: 'Coordenador', value: 'coordenador' },
        { text: 'Receita', value: 'receita' },
        { text: 'Margem', value: 'margem' },
        { text: 'Volume', value: 'volume' },
        { text: 'Associados', value: 'associados' },
      ],
      items: [],
    }
  },
}
</script>
