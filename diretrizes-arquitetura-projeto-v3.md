# Diretrizes de arquitetura e desenvolvimento — Cypress

## 1. Objetivo e escopo

Estas diretrizes organizam os testes automatizados de interface WEB com Cypress neste projeto, orientando a modularização e a manutenção das specs.

## 2. Arquitetura e organização

- A spec principal fica em `cypress/e2e/` e define os cenários, os dados de teste e a sequência das ações.
- Os módulos ficam em `cypress/modules/`, organizados por funcionalidade.
- Os módulos utilizam funções JavaScript e `module.exports`, conforme o padrão V3.
- Cada módulo declara seus seletores em `const seletores`.

## 3. Responsabilidade dos módulos

- Agrupar ações relacionadas a uma funcionalidade ou etapa de negócio.
- Manter nos módulos os seletores, as interações e as asserções relacionados às ações.
- Evitar funções excessivamente pequenas, duplicação de código e abstrações desnecessárias.
- Manter a spec fácil de ler, mostrando a sequência do cenário.

## 4. Padrões e restrições

- Não utilizar classes ou Page Objects.
- Não introduzir custom commands sem necessidade ou sem alinhamento com o conteúdo estudado.
- Não adicionar bibliotecas nem alterar versões de dependências sem autorização.
- Preservar seletores, dados, asserções e comportamentos existentes durante refatorações, salvo quando uma correção for solicitada.
- Manter os comentários de código em português, curtos e naturais, sem acentos ou cedilha, conforme o padrão adotado neste projeto.

## 5. Critérios de qualidade

- Imports e exports compatíveis.
- Ausência de dependências circulares e de duplicações desnecessárias.
- Ordem dos testes e fluxos de negócio preservados.
- Funções coesas, legíveis e fáceis de explicar.
- Validar as alterações antes de considerar a modularização concluída.

## 6. Execução e segurança

- Não executar Cypress durante uma revisão ou refatoração sem autorização explícita.
- Antes de executar os testes, fechar instâncias abertas do Cypress.
- Quando autorizado, executar a spec final no Chrome visível, utilizando o comando definido para o projeto.
- Não alterar specs antigas, configurações ou arquivos fora do escopo solicitado.

## 7. Estado atual do projeto

- A spec final é `cypress/e2e/automation-exercise-conclusao.cy.js`.
- A spec final possui dez casos: TC1, TC2, TC3, TC4, TC5, TC8, TC9, TC10, TC15 e TC16.
- A CI deve executar somente essa spec final.
- A modularização foi implementada e passou por revisão estática. A execução completa dos dez testes após a modularização ainda precisa ser validada.
