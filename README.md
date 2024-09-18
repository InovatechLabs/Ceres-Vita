[![Logo Ceres Vita](https://i.ibb.co/WVzV6VX/Ceres3.png)](https://i.ibb.co/WVzV6VX/Ceres3.png)

<div align="center">
<h1>
<a href="#bookmark_tabs-entregas-de-sprints">Entrega das Sprints</a> | <a href="https://trello.com/b/YXR56u2f/abp">Trello</a> | <a href="#bust_in_silhouette-user-stories">User Story</a> | <a href="#triangular_flag_on_post-backlog-do-produto">Backlog do Produto</a> | <a href="#chart_with_downwards_trend-gráfico-burndown-das-sprints">Burndown</a> | <a href="#page_facing_up-wireframe">Wireframe</a> | <a href="#busts_in_silhouette-equipe">Equipe</a> | <a href="Requisitos de Cliente 1DSM - 2024-1.pdf">Requisitos</a>
</h1>
</div>

# :pencil: Sobre o Projeto

Somos a Innovatech Labs, um grupo de desenvolvimento de software focado em criar soluções inovadoras. Este repositório apresenta o nosso mais recente projeto: uma plataforma que presta serviços de nutrição aos usuários, desenvolvida com tecnologias modernas da web. Nosso site para nutrição oferece uma experiência de resultados incríveis. A plataforma foi projetada para ser intuitiva e acessível, permitindo que os usuários sejam auxiliados e melhorem seus hábitos de alimentação, contribuindo assim para uma melhor qualidade de vida e bem-estar.

### 🏹 Objetivos do Projeto
- **Melhorar a Qualidade de Vida:** Facilitar o acesso a informações nutricionais.
- **Apoio ao Usuário:** Proporcionar ferramentas para gestão da alimentação.

### 🟨 Status do Projeto: Em Andamento❗

# :bookmark_tabs: Entregas de Sprints

Os entregáveis serão realizados conforme as datas previamente acordadas com o cliente, acompanhados de um relatório completo do progresso alcançado durante as sprints.

| Sprint  | Previsão de Entrega   | Status                            | Backlog das Sprints                                       | Retrospectiva das Sprints
| ------- | --------------------- | --------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------- |
| :one:   | :calendar: 20/09/2024 | :yellow_square: Em Andamento      | :round_pushpin: [Ver Relatório](./misc/sprintbacklog1.md) | :round_pushpin: [Concluído](./misc/sprintretrospective1.md)   |
| :two:   | :calendar: 11/10/2024 | :red_square: Não Iniciado         | :round_pushpin: [Ver Relatório](./misc/sprintbacklog2.md) | :round_pushpin: [Concluído](./misc/sprintretrospective2.md)   |
| :three: | :calendar: 08/11/2024 | :red_square: Não Iniciado         | :round_pushpin: [Ver Relatório](./misc/sprintbacklog3.md) | :round_pushpin: [Concluído](./misc/sprintretrospective3.md)   |

# :triangular_flag_on_post: Backlog do Produto

**★ Registro de Usuário:** Registro no banco de dados utilizando DML através da cláusula INSERT; autenticação através do método .get.

**★ Gestão de Perfil do Usuário:** Manipulação de dados pessoais, como idade, peso, altura e metas nutricionais.

**★ Registro de Ingestão Diária:** Possibilidade de registrar os alimentos consumidos diariamente.

**★ Cálculo Automático de Nutrientes:** O sistema deve calcular automaticamente a ingestão de calorias, proteínas e outros nutrientes.

**★ Histórico de Consumo:** Armazenamento da ingestão de alimentos em um histórico acessível a qualquer momento.

**★ Alertas e Notificações:** Modelo de decisão para verificar quando a ingestão de nutrientes está acima ou abaixo do recomendado.

**★ Relatórios e Gráficos:** Geração de relatórios gráficos para visualizar o consumo de calorias e nutrientes.

**★ Suporte a Dietas Específicas:** Inserção e modificação de alertas de acordo com dietas especiais.

**★ Prototipagem:** Protótipo navegável da aplicação criado no Figma para validação antes do desenvolvimento final.

# :chart_with_downwards_trend: Gráfico Burndown das Sprints

| Burndown                                       | Link de Acesso                                               |
|------------------------------------------------|--------------------------------------------------------------|
| :yellow_square: Sprint 1 (Em Andamento)        | :round_pushpin: [Ver Relatório](/documentos/GBS1.jpg)        |
| :red_square: Sprint 2 (Pendente)               | :round_pushpin: [Ver Relatório](/documentos/GBS2.jpg)        |
| :red_square: Sprint 3 (Pendente)               | :round_pushpin: [Ver Relatório](/documentos/GBS3.png)        |

# :bust_in_silhouette: User Stories

| ID  | História do Usuário                                                                                                                                                                      | Critérios de Aceitação                                                                                                                                                                                                                                     | Porquê                                                                                                                                                                         |
|-----|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1   | Como um usuário, desejo me registrar no sistema e autenticar minha conta, para que eu possa acessar minhas funcionalidades personalizadas.                                              | - Devo me registrar fornecendo nome, e-mail, senha e outras informações.<br>- Receber confirmação de registro bem-sucedido.<br>- Autenticar usando e-mail e senha registrados.<br>- Mensagem de erro para credenciais inválidas.                               | Eu, como usuário, quero me registrar e autenticar no sistema para acessar meus dados e funcionalidades de forma segura.                                                        |
| 2   | Como um usuário, desejo gerenciar meu perfil pessoal, para que eu possa manter minhas informações atualizadas, incluindo idade, peso, altura e metas nutricionais.                     | - Atualizar informações pessoais no perfil.<br>- Alterações devem ser salvas e refletidas em futuras interações.<br>- Receber confirmação de alterações salvas.<br>- Mensagem de erro para dados incorretos ou incompletos.                                   | Eu, como usuário, quero manter meu perfil atualizado para que as recomendações e cálculos estejam alinhados com minhas metas atuais.                                           |
| 3   | Como um usuário, desejo registrar os alimentos que consumo diariamente, para que eu possa monitorar minha ingestão calórica e de nutrientes.                                             | - Adicionar alimentos ao registro diário especificando nome, quantidade e detalhes nutricionais.<br>- Alimentos devem ser associados ao meu perfil e armazenados.<br>- Visualizar lista dos alimentos registrados.<br>- Confirmação ao adicionar alimento.   | Eu, como usuário, quero monitorar minha alimentação diária para garantir que estou atingindo minhas metas nutricionais.                                                        |
| 4   | Como um usuário, desejo que o sistema calcule automaticamente minha ingestão diária de nutrientes, para que eu possa comparar com minhas metas nutricionais.                             | - O sistema deve calcular automaticamente calorias, proteínas, carboidratos e gorduras.<br>- Visualizar totais em comparação com metas nutricionais diárias.<br>- Notificação de erro se o cálculo falhar.                                               | Eu, como usuário, quero acompanhar meu consumo de nutrientes em relação às minhas metas diárias para ajustar minha alimentação conforme necessário.                            |
| 5   | Como um usuário, desejo acessar um histórico do meu consumo alimentar, para que eu possa analisar minhas escolhas alimentares ao longo do tempo.                                          | - Visualizar histórico detalhado dos alimentos consumidos.<br>- Histórico deve incluir calorias e nutrientes.<br>- Filtrar e ordenar o histórico por data e tipo de alimento.                                                                                    | Eu, como usuário, quero revisar meu histórico de consumo para identificar padrões e ajustar minha dieta conforme necessário.                                                    |
| 6   | Como um usuário, desejo configurar e receber alertas personalizados baseados nas minhas metas nutricionais e dietas específicas, para que eu possa manter minha alimentação em conformidade com meus objetivos. | - Configurar alertas personalizados para limites nutricionais.<br>- Notificação automática quando limites forem atingidos.<br>- Configurar alertas para restrições alimentares.<br>- Notificações devem incluir detalhes sobre nutrientes e metas.                 | Eu, como usuário, quero receber alertas personalizados para garantir que estou seguindo minhas metas nutricionais e respeitando minhas restrições alimentares.                |
| 7   | Como um usuário, desejo gerar relatórios e gráficos sobre meu consumo de calorias e nutrientes, para que eu possa visualizar meu progresso ao longo do tempo.                             | - Gerar relatórios detalhados sobre consumo de nutrientes em diferentes períodos.<br>- Visualizar gráficos que mostrem progresso em relação às metas nutricionais.                                                                                             | Eu, como usuário, quero visualizar relatórios e gráficos do meu progresso para entender melhor minhas tendências alimentares e fazer ajustes conforme necessário.                 |

[Link para a Documentação](./docs/00%20-%20User%20Stories%20-%20V1.pdf)

# :wrench: Tecnologias Utilizadas

![Adobe InDesign](https://img.shields.io/badge/Adobe%20InDesign-49021F?style=for-the-badge&logo=adobeindesign&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![Canva](https://img.shields.io/badge/Canva-%2300C4CC.svg?style=for-the-badge&logo=Canva&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Photoshop](https://img.shields.io/badge/adobe%20photoshop-%2331A8FF.svg?style=for-the-badge&logo=adobe%20photoshop&logoColor=white)
![Postgre](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Trello](https://img.shields.io/badge/Trello-0052CC?style=for-the-badge&logo=trello&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)

## :page_facing_up: Wireframe

![Wireframe Preview](./docs/Wireframe.png)  
[Link para o Figma](https://www.figma.com/design/Ny1gtxP6uqtkRBuB9SEq3K/Untitled)

## :busts_in_silhouette: Equipe

| Função        | Nome                               | GitHub                                                                                                                                        |
| ------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Project Owner | Pedro Oliveira                     | [![Github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/PedroOlveira)      |
| Scrum Master  | Paulo Alexandre                    | [![Github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/oneubp)            |
| Dev Team      | Gabriel Juliani                    | [![Github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/gjulianni)         |
| Dev Team      | Kainé Sant'anna                    | [![Github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Usahime)           |
| Dev Team      | Bruno Alves                        | [![Github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/bWS7)              |
| Dev Team      | Victor Carbajo                     | [![Github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Victor-Carbajo)    |

## :page_facing_up: Instruções de Instalação

Para instalar e executar o projeto localmente, siga estas etapas:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/InovatechLabs/Ceres-Vita.git
   ```
2. **Acesse a pasta do projeto:**
   ```bash
   cd Ceres-Vita
   ```
3. **Instale as dependências:**
   ```bash
   npm install
   ```
4. **Execute o servidor:**
   ```bash
   npm start
   ```
5. **Abra o navegador e acesse:**
   ```bash
   http://localhost:3000
   ```

## :page_facing_up: Licença
Este projeto está licenciado sob a MIT License. Veja o arquivo [LICENSE](LICENSE) para mais informações.

##### [:rocket: Voltar ao topo ](#bookmark_tabs-entregas-de-sprints)
