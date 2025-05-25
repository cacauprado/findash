<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-alert
          v-if="currentAction"
          type="info"
          border="left"
          text
        >
          {{ getActionMessage }}
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'CustoPage',
  props: {
    defaultAction: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentAction: ''
    }
  },
  computed: {
    getActionMessage() {
      switch(this.currentAction) {
        case 'adicionar':
          return 'Adicionar novo custo'
        case 'remover':
          return 'Remover custo existente'
        case 'atualizar':
          return 'Atualizar custo existente'
        default:
          return ''
      }
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
