<template>
  <v-container>
    <tipo-insercao v-model="showTipoInsercao" />
    <tipo-faturamento v-model="showTipoFaturamento" />
    <tipo-reconhecimento v-model="showTipoReconhecimento" />
    <tipo-penalidade v-model="showTipoPenalidade" />
  </v-container>
</template>

<script>
import TipoInsercao from '@/components/TipoInsercao.vue'
import TipoFaturamento from '@/components/TipoFaturamento.vue'
import TipoReconhecimento from '@/components/TipoReconhecimento.vue'
import TipoPenalidade from '@/components/TipoPenalidade.vue'

export default {
  name: 'ReceitaPage',
  components: {
    TipoInsercao,
    TipoFaturamento,
    TipoReconhecimento,
    TipoPenalidade
  },
  props: {
    defaultDialog: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showTipoInsercao: false,
      showTipoFaturamento: false,
      showTipoReconhecimento: false,
      showTipoPenalidade: false
    }
  },
  watch: {
    defaultDialog: {
      immediate: true,
      handler(val) {
        // Reset all dialogs
        this.showTipoInsercao = false
        this.showTipoFaturamento = false
        this.showTipoReconhecimento = false
        this.showTipoPenalidade = false

        // Show the selected dialog
        switch(val) {
          case 'faturamento':
            this.showTipoFaturamento = true
            break
          case 'projecao':
            this.showTipoInsercao = true
            break
          case 'reconhecimento':
            this.showTipoReconhecimento = true
            break
          case 'penalidade':
            this.showTipoPenalidade = true
            break
        }
      }
    }
  }
}
</script>
