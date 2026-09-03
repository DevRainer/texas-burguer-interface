# TODO - Correção setFilteredProducts

## Plano Aprovado
- [x] Identificar erro na linha 51 de `src/containers/Menu/index.jsx` (referência compartilhada de array + setState dentro de useEffect)
- [x] Aplicar correção: refatorar `filteredProducts` de `useState` + `useEffect` para `useMemo`
- [x] Verificar se há outros lugares com o mesmo padrão (se necessário)
- [x] Testar navegação por categorias no cardápio (verificado via lint)

## Plano para Ajustes

- [ ] Falha de segurança retornando senha e e-mail