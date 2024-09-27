## Persistir dados de alimentação

<<<<<<< Updated upstream
<div align="center">
<h1>
<a href="#bookmark_tabs-entregas-de-sprints">Entrega das Sprints</a> | <a href="https://trello.com/b/YXR56u2f/abp">Trello</a> | <a href="#bust_in_silhouette-user-stories">User Story</a> | <a href="#triangular_flag_on_post-backlog-do-produto">Backlog do Produto</a> | <a href="#chart_with_downwards_trend-gráfico-burndown-das-sprints">Burndown</a> | <a href="#page_facing_up-wireframe">Wireframe</a> | <a href="#busts_in_silhouette-equipe">Equipe</a> | <a href="Requisitos de Cliente 1DSM - 2024-1.pdf">Requisitos</a>
</h1>
</div>
=======
A  aplicação tem como objetivo manter o registro dos alimentos consumidos diariamente pelos usuários para o controle de calorias e nutrientes. 
Os alimentos são divididos em industrializados e não industrializados. As calorias e nutrientes dos alimentos não industrializados foram obtidos na tabela TACO (Tabela Brasileira de Composição de Alimentos). Cada usuário deverá cadastrar as calorias e nutrientes dos alimentos industrizalizados.
A aplicação persiste os dados nas seguintes tabelas do SBGD PostgreSQL:
- tabela _foods_: possui os alimentos extraídos da tabela TACO;
- tabela _categories_: possui as categorias dos alimentos da tabela TACO;
- tabela _products_: receberá os produtos de cada usuário. Caberá ao usuário olhar a composição de nutrientes do alimento e fazer o registro;
- tabela _eat_foods_: registro do consumo diário do usuário de alimentos não industrializados;
- tabela _eat_products_: registro do consumo diário do usuário de alimentos industrializados;
- tablea _profiles_: o ideal é incluir outros campos para manter informações relevantes para a dieta do usuário. 
>>>>>>> Stashed changes

![](https://github.com/arleysouza/server-nutrient/blob/main/images/modelDB.png)

### Instruções de uso
Utilize os comandos a seguir para clonar o projeto e instalar as dependências.
```
git clone https://github.com/arleysouza/server-nutrient.git server
cd server
npm i
```
A aplicação utiliza o SGBD PostgreSQL. Crie um BD no PostgreSQL de nome `bdnutrient` ou algum outro nome de sua preferência e altere as variáveis de ambiente do arquivo `.env` pelos parâmetros de conexão do SBGD PostgreSQL que você criou.
```
PORT = 3011
JWT_SECRET = @tokenJWT

DB_USER = postgres
DB_HOST = localhost
DB_NAME = bdnutrient
DB_PASSWORD = 123
DB_PORT = 5432
```

### SQL para criar as tabelas
No arquivo `src/database/create.ts` estão as instruções SQL para criar as tabelas no BD. Execute o comando `npm run create` para submeter as instruções SQL no SGBD. As tabelas estão organizadas da seguinte forma.

No arquivo `src/database/load.ts` estão as instruções SQL para carregar os dados nas tabelas `categories`, `foods` e `fields`. Execute o comando `npm run load` para submeter as instruções SQL no SGBD.

### Rotas
Rotas que não requer login:
- HTTP GET /login - usuário efetua o login e obtém o token de acesso;
- HTTP POST /user - usuário efetua o seu cadastro para criar uma conta;
- HTTP GET /food/search?term=café - obter os alimentos não industrializados que possuem um termo, por exemplo, _café_;
- HTTP GET /food/get?idfood=511 - obter os dados de um alimento não industrializado pelo identificador;
- HTTP GET /field - obter todos os campos;
- HTTP GET /category - obter todas as categorias dos alimentos não industrializados.

<<<<<<< Updated upstream
| Sprint  | Previsão de Entrega   | Status                            | Backlog das Sprints                                       | Retrospectiva das Sprints
| ------- | --------------------- | --------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------- |
| :one:   | :calendar: 20/09/2024 | :yellow_square: Em Andamento      | :round_pushpin: [Ver Relatório](./misc/sprintbacklog1.md) | :round_pushpin: [Concluído](./misc/sprintretrospective1.md)   |
| :two:   | :calendar: 11/10/2024 | :red_square: Não Iniciado         | :round_pushpin: [Ver Relatório](./misc/sprintbacklog2.md) | :round_pushpin: [Concluído](./misc/sprintretrospective2.md)   |
| :three: | :calendar: 08/11/2024 | :red_square: Não Iniciado         | :round_pushpin: [Ver Relatório](./misc/sprintbacklog3.md) | :round_pushpin: [Concluído](./misc/sprintretrospective3.md)   |

# :triangular_flag_on_post: Backlog do Produto (Provisório)

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

![User Preview](https://via.placeholder.com/800x400?text=Wireframe+Preview)  
[Link para a Documentação](https://www.figma.com/design/Ny1gtxP6uqtkRBuB9SEq3K/Untitled)

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

![Wireframe Preview](https://via.placeholder.com/800x400?text=Wireframe+Preview)  
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
=======
Rotas que requer estar logado, ou seja, é necessário enviar o token no header da requisição:
- HTTP PUT /user/alias - usuário altera o nome de usuário da sua conta;
- HTTP PUT /user/mail - usuário altera o e-mail da sua conta;
- HTTP PUT /user/password - usuário altera a senha de acesso da sua conta;
- HTTP GET /profile - usuário obtém os seus dados físicos;
- HTTP POST /profile - usuário cria ou altera os seus dados físicos;
- HTTP DELETE /profile - usuário remove os seus dados físicos;
- HTTP GET /product/search - obtém todos os produtos que satisfazem ao termo de busca e que não são do usuário;
- HTTP GET /product/searchbyuser - obtém todos os produtos que satisfazem ao termo de busca e não são do usuário;
- HTTP GET /product/byuser - obtém todos os produtos industrializados que o usuário cadastrou;
- HTTP POST /product - cria novo produto industrializado;
- HTTP POST /product/copy - cada usuário precisa ter os seus próprios produtos, ou seja, o mesmo produto pode existir na conta de vários usuários. Essa operação copia o produto de outro usuário para a conta do usuário;
- HTTP PUT /product - atualiza um produto que está na conta do usuário;
- HTTP DELETE /product - exclui um produto que está na conta do usuário;
- HTTP GET /eat/food e /eat/product - retorna os alimentos consumidos no dia pelo usuário;
- HTTP POST /eat/food e /eat/product - cria um consumo de alimento pelo usuário;
- HTTP PUT /eat/food e /eat/product - atualiza o registro de consumo de alimento pelo usuário;
- HTTP DELETE /eat/food e /eat/product - exclui o registro de consumo de alimento pelo usuário.

Rotas que requer estar logado com o perfil _adm_:
- HTTP GET /user - usuário administrador lista todos os usuários;
- HTTP PUT /user/role - usuário administrador altera o perfil de acesso do usuário. Os tipos são _user_ e _adm_.
>>>>>>> Stashed changes
