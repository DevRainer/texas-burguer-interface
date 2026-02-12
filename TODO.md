# Plano de Correção do ESLint

## Tarefas

- [x] 1. Analisar arquivos do projeto (package.json, eslint.config.js, código fonte)
- [x] 2. Instalar dependência `eslint-plugin-react` e plugins associados
- [x] 3. Atualizar `eslint.config.js` com configuração moderna e correta
- [x] 4. Testar configuração rodando `yarn lint`

## Resumo das Correções

### Problemas Identificados:

1. Falta `eslint-plugin-react` (plugin principal)
2. `languageOptions` incompleto - falta `parserOptions` para JSX
3. Plugin `import-helpers` pode precisar ajustes para ESLint 9 flat config

### Soluções:

1. Instalar `eslint-plugin-react`
2. Adicionar plugin e configurar `parserOptions` com `jsx: true`
3. Usar configuração recomendada do React
4. Manter integração com Prettier
