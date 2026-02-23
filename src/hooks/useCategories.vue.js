import { mapState, mapActions, mapGetters } from 'vuex';

/**
 * 🪝 Composable para gerenciar categorias em Vue.js
 * Fornece acesso ao state, actions e getters do módulo 'categories'
 * 
 * Uso em componentes:
 * computed: {
 *   ...useCategoriesComputed(),
 * },
 * methods: {
 *   ...useCategoriesMethods(),
 * },
 */
export const useCategoriesComputed = () => ({
  ...mapState('categories', ['categories', 'isLoading', 'error']),
  ...mapGetters('categories', [
    'getCategories',
    'getCategoriesCount',
    'getCategoryById',
    'getCategoriesByName',
  ]),
});

export const useCategoriesMethods = () => ({
  ...mapActions('categories', [
    'loadCategories',
    'createCategory',
    'updateCategory',
    'deleteCategory',
    'reorderCategories',
    'initializeDefaults',
  ]),
});

/**
 * 🪝 Composable combinado (recomendado)
 */
export const useCategories = () => ({
  // Computed
  ...useCategoriesComputed(),
  // Methods
  ...useCategoriesMethods(),
});

/**
 * 📝 Exemplo de uso em um componente Vue:
 * 
 * <template>
 *   <div>
 *     <div v-if="isLoading">Carregando...</div>
 *     <div v-if="error" class="error">{{ error }}</div>
 *     <ul>
 *       <li v-for="cat in categories" :key="cat.id">
 *         {{ cat.name }}
 *       </li>
 *     </ul>
 *   </div>
 * </template>
 * 
 * <script>
 * import { useCategories } from '@/hooks/useCategories.vue.js';
 * 
 * export default {
 *   name: 'CategoriesList',
 *   computed: useCategories(),
 *   async mounted() {
 *     await this.loadCategories(this.$store.state.auth.user.uid);
 *   },
 *   methods: {
 *     async addCategory() {
 *       try {
 *         await this.createCategory({
 *           userId: this.$store.state.auth.user.uid,
 *           categoryData: {
 *             name: 'Nova Categoria',
 *             color: '#FF6B6B',
 *             icon: 'tag',
 *           },
 *         });
 *       } catch (err) {
 *         console.error('Erro:', err);
 *       }
 *     },
 *   },
 * };
 * </script>
 */
