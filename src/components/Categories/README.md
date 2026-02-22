# 📁 Componentes de Categorias

Sistema completo e modular para gerenciar categorias customizáveis no FindDash.

## 📋 Índice

- [Componentes](#componentes)
- [Uso Básico](#uso-básico)
- [Componentes](#componentes-detalhados)
- [Props](#props)
- [Exemplos](#exemplos)
- [CSS Modules](#css-modules)
- [Integração](#integração)

---

## 📋 Componentes

### 1. **CategoryForm** 📇

Formulário completo para criar ou editar categorias.

```jsx
import { CategoryForm } from '@/components/Categories';

<CategoryForm 
  initialData={category}
  onSuccess={() => console.log('Criada!')}
  onCancel={() => console.log('Cancelada')}
/>
```

**Features:**
- ✅ Color picker integrado
- ✅ Icon picker com 25+ ícones
- ✅ Validação de dados
- ✅ Preview em tempo real
- ✅ Suporte criar e editar

---

### 2. **CategoryList** 📊

Lista com grid responsivo e suporte a drag-and-drop.

```jsx
import { CategoryList } from '@/components/Categories';

<CategoryList
  onEdit={(category) => console.log('Editando:', category)}
  onDelete={(category) => console.log('Deletando:', category)}
  editable={true}
/>
```

**Features:**
- ✅ Grid responsivo (auto-fill)
- ✅ Drag-and-drop para reordenar
- ✅ Estados loading/empty
- ✅ Ações por categoria

---

### 3. **CategoryCard** 📦

Card individual para exibir uma categoria.

```jsx
import { CategoryCard } from '@/components/Categories';

<CategoryCard
  category={category}
  onEdit={() => {}}
  onDelete={() => {}}
  editable={true}
/>
```

**Features:**
- ✅ Design visual atraente
- ✅ Ícone com cor personalizada
- ✅ Informações de metadata
- ✅ Botões de ação

---

### 4. **CategorySelector** 🖎

Dropdown para selecionar categorias (ideal para formulários de transação).

```jsx
import { CategorySelector } from '@/components/Categories';

<CategorySelector
  value={selectedCategoryId}
  onChange={(id) => setSelectedCategoryId(id)}
  searchable={true}
  clearable={true}
/>
```

**Features:**
- ✅ Dropdown com busca
- ✅ Filtro por nome/descrição
- ✅ Opeção de limpar
- ✅ Preview visual da categoria

---

### 5. **CategoryManager** 🗓️

Componente completo que integra tudo (Form + List + Modal).

```jsx
import CategoryManager from '@/components/Categories/CategoryManager';

// Em uma página
export default function Page() {
  return <CategoryManager />;
}
```

**Features:**
- ✅ Integra Form, List e Delete
- ✅ Modal de confirmação
- ✅ Estado de edição/criação
- ✅ Pronto para usar em páginas

---

## 🔍 Uso Básico

### Import Simples

```javascript
// Importar componente individual
import CategoryForm from '@/components/Categories/CategoryForm';
import CategoryList from '@/components/Categories/CategoryList';
import CategoryCard from '@/components/Categories/CategoryCard';
import CategorySelector from '@/components/Categories/CategorySelector';

// OU importar todos de uma vez
import { 
  CategoryForm, 
  CategoryList, 
  CategoryCard, 
  CategorySelector 
} from '@/components/Categories';
```

### Exemplo Completo

```jsx
'use client';

import { useState } from 'react';
import { CategoryForm, CategoryList } from '@/components/Categories';

export default function CategoriesPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  return (
    <div>
      <h1>📁 Minhas Categorias</h1>
      
      {showForm && (
        <CategoryForm
          initialData={editingCategory}
          onSuccess={() => {
            setShowForm(false);
            setEditingCategory(null);
          }}
          onCancel={() => {
            setShowForm(false);
            setEditingCategory(null);
          }}
        />
      )}

      <CategoryList
        onEdit={(category) => {
          setEditingCategory(category);
          setShowForm(true);
        }}
        onDelete={(category) => {
          // Implement delete
        }}
      />
    </div>
  );
}
```

---

## 📋 Props Detalhadas

### CategoryForm Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-------------|
| `initialData` | Object | null | Dados da categoria para editar |
| `onSuccess` | Function | null | Callback ao salvar com sucesso |
| `onCancel` | Function | null | Callback ao cancelar |

**initialData structure:**
```js
{
  id: 'uuid',
  name: 'Alimentação',
  description: 'Comida e restaurantes',
  color: '#FF6B6B',
  icon: 'utensils'
}
```

### CategoryList Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-------------|
| `onEdit` | Function | null | Callback ao clicar editar |
| `onDelete` | Function | null | Callback ao clicar deletar |
| `editable` | Boolean | true | Habilita editar/deletar |
| `onReorder` | Function | null | Callback ao reordenar |

### CategoryCard Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-------------|
| `category` | Object | required | Objeto da categoria |
| `onEdit` | Function | null | Callback ao editar |
| `onDelete` | Function | null | Callback ao deletar |
| `editable` | Boolean | true | Mostra botões de ação |

### CategorySelector Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-------------|
| `value` | String | null | ID da categoria selecionada |
| `onChange` | Function | null | Callback ao selecionar |
| `placeholder` | String | 'Selecione...' | Texto inicial |
| `searchable` | Boolean | true | Habilita busca |
| `clearable` | Boolean | true | Mostra botão limpar |

---

## 📢 Exemplos Práticos

### Exemplo 1: Formulário de Transação com Selector

```jsx
import { CategorySelector } from '@/components/Categories';
import { useState } from 'react';

export default function TransactionForm() {
  const [categoryId, setCategoryId] = useState(null);
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Criar transação com categoryId
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Categoria *</label>
      <CategorySelector 
        value={categoryId}
        onChange={setCategoryId}
      />

      <label>Valor *</label>
      <input 
        type="number" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)}
      />

      <button type="submit">Adicionar Transação</button>
    </form>
  );
}
```

### Exemplo 2: Página de Configuração de Categorias

```jsx
import CategoryManager from '@/components/Categories/CategoryManager';

export default function SettingsPage() {
  return (
    <div className="page-container">
      <CategoryManager />
    </div>
  );
}
```

### Exemplo 3: Modal de Categoria

```jsx
import { CategoryCard } from '@/components/Categories';
import { useState } from 'react';

export default function CategoryModal({ category, onClose }) {
  return (
    <dialog open>
      <CategoryCard 
        category={category}
        editable={false}
      />
      <button onClick={onClose}>Fechar</button>
    </dialog>
  );
}
```

---

## 📄 CSS Modules

Todos os componentes usam CSS Modules. O arquivo `CategoryManager.module.css` contém:

- **Form Styles**: Inputs, validations, color/icon pickers
- **List Styles**: Grid, cards, drag-and-drop
- **Selector Styles**: Dropdown, search, options
- **Responsive**: Mobile-first design
- **Accessibility**: Focus states, labels, ARIA

### Classes Disponíveis

```css
/* Form */
.formContainer, .form, .formGroup
.input, .textarea, .colorPickerWrapper
.iconPickerWrapper, .preview, .error

/* List & Cards */
.listContainer, .grid, .card, .cardHeader
.cardContent, .cardActions, .gridItem.dragging

/* Selector */
.selectorContainer, .selectorButton
.selectorDropdown, .option, .searchInput

/* States */
.loadingContainer, .emptyContainer, .errorContainer
```

---

## 🔗 Integração

### 1. Garantir CategoriesProvider no Layout

```jsx
// src/app/layout.jsx
import { CategoriesProvider } from '@/contexts/CategoriesContext';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <CategoriesProvider>
          {children}
        </CategoriesProvider>
      </body>
    </html>
  );
}
```

### 2. Usar em Páginas

```jsx
// src/app/categories/page.jsx
import CategoryManager from '@/components/Categories/CategoryManager';

export default function CategoriesPage() {
  return (
    <main>
      <CategoryManager />
    </main>
  );
}
```

### 3. Usar em Formulários

```jsx
// Em qualquer formulário de transação
import { CategorySelector } from '@/components/Categories';

// Dentro do form:
<CategorySelector 
  value={formData.categoryId}
  onChange={(id) => setFormData({...formData, categoryId: id})}
/>
```

---

## 🗑️ Estrutura de Ficheiros

```
src/components/Categories/
├─ CategoryForm.jsx          # Formulário de criar/editar
├─ CategoryList.jsx          # Lista com grid
├─ CategoryCard.jsx          # Card individual
├─ CategorySelector.jsx      # Dropdown para formulários
├─ CategoryManager.jsx       # Integração completa
├─ CategoryManager.module.css # Todos os estilos
├─ index.js                 # Exports centralizados
├─ README.md                # Este arquivo
```

---

## 💯 Dicas & Boas Práticas

1. **Use CategoryManager para páginas completas** de gerenciamento
2. **Use CategorySelector em formulários** de transação
3. **Combine Form + List** para fluxos customizados
4. **Lembre de wrappear com CategoriesProvider** no layout raíz
5. **Use `editable={false}`** no CardCategory para modo somente leitura

---

## 🌟 Status

- ✅ **Fase 2.1 Option B** - Componentes UI
- ✅ CSS Responsivo
- ✅ Acessível (WCAG 2.1)
- ✅ Pronto para Produção

---

**🚀 Versão**: 1.0.0  
**📅 Data**: Fevereiro 2026  
**👤 Autor**: FindDash Team
