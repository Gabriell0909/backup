# 📊 Funcionalidade de Gráficos - Economiza

## Visão Geral

A funcionalidade de gráficos foi implementada usando a biblioteca **react-native-gifted-charts** para fornecer visualizações interativas dos dados financeiros do usuário.

## 📦 Dependências Instaladas

- `react-native-gifted-charts` - Biblioteca principal para criação de gráficos
- Dependências automáticas instaladas:
  - `react-native-svg` - Para suporte a SVG (já estava instalado)

## 🎯 Funcionalidades Implementadas

### 1. Gráfico de Pizza (Donut) - Gastos por Categoria
- **Visualização**: Gráfico circular com centro vazio mostrando a distribuição de gastos por categoria
- **Dados**: Valores totais gastos em cada categoria
- **Interatividade**: Labels com nomes das categorias e valores
- **Cores**: Paleta de cores automática para diferenciação
- **Centro**: Mostra o total geral dos gastos

### 2. Gráfico de Barras - Gastos por Mês
- **Visualização**: Gráfico de barras mostrando gastos mensais
- **Dados**: Valores totais gastos em cada mês do ano
- **Eixos**: Eixo X com meses abreviados, Eixo Y com valores em reais
- **Labels**: Valores exibidos no topo de cada barra
- **Responsivo**: Adapta-se automaticamente ao tamanho da tela

### 3. Filtros de Período
- **Hoje**: Mostra apenas gastos do dia atual
- **Esta semana**: Mostra gastos da semana atual (domingo a sábado)
- **Este mês**: Mostra gastos do mês atual
- **Este ano**: Mostra gastos do ano atual

### 4. Resumo Financeiro
- **Total de Gastos**: Soma total dos gastos no período filtrado
- **Atualização em tempo real**: Valores atualizados conforme filtros

## 🗂️ Estrutura de Arquivos

```
src/screens/Graficos/
├── Graficos.jsx          # Componente principal da tela
└── Graficos.style.js     # Estilos da tela
```

## 🔧 Como Usar

### Navegação
1. Acesse a tela **Home**
2. Toque no botão **Gráfico** (ícone de pizza)
3. A tela de gráficos será aberta

### Filtros
1. Use os botões de filtro no topo da tela
2. Os gráficos se atualizam automaticamente
3. O total de gastos é recalculado conforme o filtro

### Visualização
- **Gráfico de Pizza**: Mostra a proporção de gastos por categoria com total no centro
- **Gráfico de Barras**: Mostra a evolução dos gastos ao longo dos meses
- **Estados vazios**: Quando não há dados, ícones informativos são exibidos

## 🎨 Personalização

### Cores das Categorias
As cores são definidas no array `getCorCategoria()`:
```javascript
const cores = [
   '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
   '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
];
```

### Tamanhos dos Gráficos
- **Pizza**: Raio 120px, raio interno 60px
- **Barras**: Largura adaptativa, altura 220px
- **Barras individuais**: Largura 22px, espaçamento 24px

## 🔄 Integração com Dados

### Hook useDespesas
A tela utiliza o hook `useDespesas` para:
- Carregar dados das despesas
- Aplicar filtros de período
- Atualizar dados em tempo real

### Processamento de Dados
- **Categorias**: Agrupa gastos por categoria e soma valores
- **Mensais**: Distribui gastos pelos meses do ano
- **Filtros**: Aplica filtros de data antes do processamento

## 🚀 Próximas Melhorias

1. **Gráfico de Linha**: Para mostrar tendências ao longo do tempo
2. **Gráfico de Área**: Para visualizar volumes de gastos
3. **Exportação**: Salvar gráficos como imagens
4. **Comparação**: Comparar períodos diferentes
5. **Animações**: Mais animações interativas
6. **Tooltips**: Informações detalhadas ao tocar nos gráficos
7. **Gráfico de Progresso**: Para metas financeiras

## 🐛 Solução de Problemas

### Gráficos não aparecem
1. Verifique se há dados de despesas cadastradas
2. Confirme se os filtros estão aplicados corretamente
3. Verifique se a biblioteca react-native-gifted-charts foi instalada corretamente

### Performance
- Os gráficos são renderizados apenas quando há dados
- Estados vazios são exibidos quando não há informações
- Biblioteca otimizada para performance em React Native

## 📱 Compatibilidade

- ✅ React Native 0.76.9
- ✅ Expo SDK 52
- ✅ iOS e Android
- ✅ react-native-gifted-charts (última versão)

## 🔄 Migração de Victory Native

A funcionalidade foi migrada de Victory Native para react-native-gifted-charts devido a:
- ✅ Melhor compatibilidade com Expo
- ✅ Não requer configuração nativa
- ✅ Instalação mais simples
- ✅ Performance otimizada
- ✅ Menos dependências 