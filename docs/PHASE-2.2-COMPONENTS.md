# Phase 2.2 - Componentes UI de Categorias

## 📋 Visão Geral

Phase 2.2 implementa todos os componentes visuais (UI) para gerenciamento de categorias.
Vem após Phase 2.1 (Camada de serviços/lógica) e antes da integração com transações.

## 📁 Estrutura de Arquivos

```
src/components/Categories/
├── CategoryForm.jsx          # Formulário CRUD de categorias
├── CategoryForm.css
├── CategoryList.jsx          # Lista com grid responsivo
├── CategoryList.css
├── CategoryCard.jsx          # Card de apresentação
├── CategoryCard.css
├── CategorySelector.jsx      # Dropdown para transações
├── CategorySelector.css
├── IconPicker.jsx            # Seletor de ícones
├── IconPicker.css
├── ColorPicker.jsx           # Seletor de cores
└── ColorPicker.css
```

## 🔧 Componentes

### CategoryForm
**Local:** `src/components/Categories/CategoryForm.jsx`

Formulário modal para criar/editar categorias.

**Props:**
```jsx
<CategoryForm
  category={categoryObject}      // undefined para novo, objeto para editar
  onClose={() => {}}             // Callback ao fechar
  onSuccess={() => {}}           // Callback ao sucesso
/>
```

**Features:**
- ✅ Validação em tempo real
- ✅ Icon picker integrado
- ✅ Color picker com paleta
- ✅ Preview em tempo real
- ✅ Estados de loading/sucesso/erro
- ✅ Responsivo mobile

---

### CategoryList
**Local:** `src/components/Categories/CategoryList.jsx`

Lista com grid responsivo de categorias.

**Props:**
```jsx
<CategoryList
  onSelectCategory={(cat) => {}} // Callback ao selecionar
  selectable={true}              // Modo seleção
/>
```

**Features:**
- ✅ Grid responsivo (mobile/tablet/desktop)
- ✅ Drag and drop para reordenar
- ✅ Busca e filtro
- ✅ Ações inline (editar/deletar)
- ✅ Estados vazio/carregando/erro
- ✅ Soft delete com confirmação

---

### CategoryCard
**Local:** `src/components/Categories/CategoryCard.jsx`

Card individual de categoria.

**Props:**
```jsx
<CategoryCard
  category={categoryObject}      // Dados da categoria
  onEdit={(cat) => {}}          // Callback editar
  onDelete={() => {}}           // Callback deletar
  isDeleting={false}            // Estado de deleção
  isSelectable={false}          // Modo seleção
/>
```

**Features:**
- ✅ Visualização completa de dados
- ✅ Indicadores visuais (cor, ícone)
- ✅ Metadados (transações, total)
- ✅ Ações com feedback
- ✅ Modo seleção com overlay

---

### CategorySelector
**Local:** `src/components/Categories/CategorySelector.jsx`

Dropdown customizado para selecionar categorias em transações.

**Props:**
```jsx
<CategorySelector
  value={categoryId}            // ID selecionado
  onChange={(cat) => {}}        // Callback ao mudar
  placeholder="Selecione..."     // Placeholder
  disabled={false}              // Desabilitar
  label="Categoria"             // Label do campo
/>
```

**Features:**
- ✅ Dropdown com busca
- ✅ Preview com cor
- ✅ Keyboard navigation
- ✅ Acessibilidade completa
- ✅ Tema claro/escuro
- ✅ Responsive

---

### IconPicker
**Local:** `src/components/Categories/IconPicker.jsx`

Seletor de ícones (25+ ícones Lucide React).

**Props:**
```jsx
<IconPicker
  value="heart"                 // Nome do ícone selecionado
  onChange={(icon) => {}}       // Callback ao mudar
  icons={AVAILABLE_ICONS}       // Array de nomes de ícones
/>
```

**Features:**
- ✅ Grid responsivo de ícones
- ✅ Busca de ícones
- ✅ Renderização Lucide React
- ✅ Tooltips ao passar mouse
- ✅ Keyboard accessible
- ✅ Preview seleção

---

### ColorPicker
**Local:** `src/components/Categories/ColorPicker.jsx`

Seletor de cores (40+ cores da paleta).

**Props:**
```jsx
<ColorPicker
  value="#FF6B6B"              // Cor hex selecionada
  onChange={(color) => {}}     // Callback ao mudar
  palette={COLOR_PALETTE}      // Array de cores hex
/>
```

**Features:**
- ✅ Grid de cores da paleta
- ✅ Entrada hex manual
- ✅ Validação de hex
- ✅ Preview em tempo real
- ✅ Botão copiar para clipboard
- ✅ Cor aleatória

---

## 🎨 CSS Classes Utilitárias

Todos os componentes usam classes CSS consistentes:

```css
/* Botões */
.btn                    /* Botão base */
.btn-primary           /* Botão primário */
.btn-secondary         /* Botão secundário */
.btn-small             /* Botão pequeno */
.btn-icon              /* Botão com ícone */

/* Formulário */
.form-group            /* Grupo de formulário */
.form-row              /* Linha de múltiplos campos */
.field-error           /* Mensagem de erro */
.field-counter         /* Contador de caracteres */

/* Grid */
.category-grid         /* Grid de categorias */
.category-grid-item    /* Item do grid */
.category-card         /* Card de categoria */
```

## 🔌 Integração com Hooks

Todos os componentes usam o hook `useCategories()` para interagir com dados:

```javascript
import { useCategories } from '@/hooks/useCategories';

const {
  categories,           // Array de categorias
  isLoading,            // Estado de carregamento
  error,                // Mensagem de erro
  createCategory,       // Função criar
  updateCategory,       // Função atualizar
  deleteCategory,       // Função deletar
  reorderCategories,    // Função reordenar
  loadCategories,       // Função recarregar
  initializeDefaults,   // Função inicializar padrões
} = useCategories();
```

## 📱 Responsividade

Todos os componentes são mobile-first:

```css
/* Mobile (até 480px) */
/* Tablet (481px - 768px) */
/* Desktop (769px+) */
```

## 🧪 Exemplo de Uso Completo

```jsx
'use client';

import { CategoriesProvider } from '@/contexts/CategoriesContext';
import CategoryList from '@/components/Categories/CategoryList';

export default function CategoriesPage() {
  return (
    <CategoriesProvider>
      <main>
        <CategoryList />
      </main>
    </CategoriesProvider>
  );
}
```

## 🎯 Próximos Passos (Phase 2.3)

1. **Integração com Transações**
   - Usar `CategorySelector` em formulário de transação
   - Atualizar metadata ao criar/deletar transações

2. **Analytics Dashboard**
   - Gráficos por categoria
   - Gastos totais por categoria
   - Tendências temporais

3. **Export/Import**
   - Exportar categorias em JSON
   - Importar categorias
   - Backup e restore

4. **Temas Avançados**
   - Tema customizável
   - Salvar preferências
   - Dark mode otimizado

## 📚 Referências

- **Lucide Icons:** https://lucide.dev
- **React Docs:** https://react.dev
- **Next.js:** https://nextjs.org
- **Firebase:** https://firebase.google.com

---

**Versão:** Phase 2.2  
**Data:** 2026-02-23  
**Status:** ✅ Completo
