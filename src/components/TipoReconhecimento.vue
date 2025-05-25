<template>
  <v-dialog
    v-model="dialog"
    max-width="600px"
    persistent
  >
    <v-card class="pa-6">
      <v-card-title class="text-h4 font-weight-medium justify-center mb-6">
        Atualizar Reconhecimento
      </v-card-title>

      <v-card-text>
        <!-- Renderiza o select só após carregar os projetos -->
        <v-select
          v-if="projetos.length"
          v-model="projetoSelecionado"
          :items="projetos"
          label="Selecione o projeto"
          outlined
          class="mb-6"
          height="80"
        />

        <!-- Mês atual -->
        <v-alert
          type="info"
          class="mb-6"
        >
          O reconhecimento será atualizado para o mês atual: {{ mesAtual }}
        </v-alert>

        <!-- Botão de Atualizar -->
        <v-row class="mt-6" justify="center">
          <v-col cols="12" sm="6" class="text-center">
            <v-btn
              color="primary"
              large
              block
              :disabled="!projetoSelecionado"
              @click="atualizarReconhecimento"
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
  name: 'TipoReconhecimento',
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
      projetoSelecionado: null,
      meses: [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ]
    };
  },
  computed: {
    mesAtual() {
      return this.meses[new Date().getMonth()];
    }
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
    atualizarReconhecimento() {
      // TODO: Implementar a lógica de atualização do reconhecimento
      this.$store.dispatch('snackbar/show', {
        text: 'Reconhecimento atualizado com sucesso!',
        color: 'success'
      });
      this.dialog = false;
    }
  }
};
</script> 