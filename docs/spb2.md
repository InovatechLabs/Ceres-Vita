# Sprint Backlog 2 - Projeto Ceres Vita

## Objetivo da Sprint
Desenvolver funcionalidades de gestão de perfil do usuário, registro de ingestão diária, cálculo automático de nutrientes e histórico de consumo.

## Itens do Backlog

### 1. RF 02 - Gestão de Perfil do Usuário
- **Descrição**: Manipulação de dados pessoais, como idade, peso, altura e metas nutricionais.
- **Tarefas**:
  - 🟩 Criar estrutura de banco de dados no PostgreSQL para armazenar dados do perfil do usuário.
  - 🟩 Implementar métodos DML para atualizar informações pessoais.
  - 🟩 Desenvolver API para manipulação dos dados do perfil utilizando método .get e .post.
  - 🟩 Implementar validação das informações inseridas.
  - 🟩 Testar a funcionalidade de gestão de perfil.
 
### 2. RF 03 - Registro de Ingestão Diária
- **Descrição**: Possibilidade de registrar os alimentos consumidos diariamente.
- **Tarefas**:
  - 🟩 Criar tabela no banco de dados para registro de ingestão diária.
  - 🟩 Implementar método DML para inserir registros de alimentos consumidos.
  - 🟩 Desenvolver API para registro de ingestão utilizando método .post.
  - 🟩 Criar estrutura de validação para os registros.
  - 🟩 Testar a funcionalidade de registro de ingestão.

### 3. RF 04 - Cálculo Automático de Nutrientes
- **Descrição**: O sistema deve calcular automaticamente a ingestão de calorias, proteínas e outros nutrientes.
- **Tarefas**:
  - 🟩 Implementar lógica para cálculo de nutrientes com base nos alimentos registrados.
  - 🟩 Integrar cálculo à funcionalidade de registro de ingestão.
  - 🟩 Testar o cálculo de nutrientes com diferentes entradas.

### 4. RF 05 - Histórico de Consumo
- **Descrição**: Armazenamento da ingestão de alimentos em um histórico acessível a qualquer momento.
- **Tarefas**:
  - 🟩 Criar estrutura no banco de dados para armazenar o histórico de consumo.
  - 🟩 Desenvolver API para acessar o histórico de consumo utilizando método .get.
  - 🟩 Implementar funcionalidades para visualização do histórico.
  - 🟩 Testar a acessibilidade e integridade dos dados no histórico.

## Documentação
- 🟩 Documentar as funcionalidades entregues nessa Sprint no GitHub.

## Critérios de Aceitação
- Funcionalidades de gestão de perfil, registro de ingestão, cálculo de nutrientes e histórico de consumo operacionais e testadas.
- Dados armazenados corretamente no banco de dados e acessíveis via API.

## Duração da Sprint
- Início: 21/09/2024
- Término: 11/10/2024

## Observações
- Reuniões diárias para atualização de status.
- Revisão ao final da Sprint para apresentação dos resultados.
