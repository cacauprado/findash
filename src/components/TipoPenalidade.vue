<template>
  <v-dialog
    v-model="dialog"
    max-width="600px"
    persistent
  >
    <v-card class="pa-6">
      <v-card-title class="text-h4 font-weight-medium justify-center mb-6">
        Atualizar Penalidade
      </v-card-title>

      <v-card-text>
        <!-- Renderiza o select só após carregar os projetos -->
        <v-select
          v-if="projetos.length"
          v-model="projetosSelecionados"
          :items="projetos"
          label="Selecione os projetos"
          multiple
          chips
          outlined
          class="mb-6"
          height="80"
        />

        <!-- Seleção de Mês e Ano -->
        <v-row dense>
          <v-col cols="12" sm="6">
            <v-select
              v-model="mesesSelecionados"
              :items="listaMeses"
              label="Mês"
              multiple
              chips
              outlined
              height="80"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="anoSelecionado"
              :items="listaAnos"
              label="Ano"
              outlined
              height="80"
            />
          </v-col>
        </v-row>

        <!-- Botão de Atualizar -->
        <v-row class="mt-6" justify="center">
          <v-col cols="12" sm="6" class="text-center">
            <v-btn
              color="primary"
              large
              block
              :disabled="!projetosSelecionados.length || !mesesSelecionados.length || !anoSelecionado"
              @click="atualizarPenalidade"
            >
              Atualizar
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="error"
          text
          @click="dialog = false"
        >
          Fechar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import * as XLSX from 'xlsx';

export default {
  name: 'TipoPenalidade',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog: false,
      projetos: [],
      projetosSelecionados: [],
      listaMeses: [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
      ],
      mesesSelecionados: [],
      listaAnos: [2025, 2026],
      anoSelecionado: null
    };
  },
  watch: {
    value(val) {
      this.dialog = val;
    },
    dialog(val) {
      this.$emit('input', val);
      if (val) {
        this.carregarProjetosDoExcel();
      }
    }
  },
  mounted() {
    this.dialog = this.value;
  },
  methods: {
    async carregarProjetosDoExcel() {
      try {
        const response = await fetch(`${process.env.BASE_URL}base_projetos.xlsx`);
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        const projetosSet = new Set();
        jsonData.forEach(row => {
          if (row['Projeto']) {
            projetosSet.add(row['Projeto']);
          }
        });
        this.projetos = Array.from(projetosSet);
      } catch (error) {
        this.$store.dispatch('snackbar/show', {
          text: 'Erro ao carregar a base de projetos. Verifique se o arquivo base_projetos.xlsx está na pasta public.',
          color: 'error'
        });
      }
    },
    atualizarPenalidade() {
      // TODO: Implementar a lógica de atualização da penalidade
      this.$store.dispatch('snackbar/show', {
        text: 'Penalidade atualizada com sucesso!',
        color: 'success'
      });
      this.dialog = false;
    }
  }
};
</script> 