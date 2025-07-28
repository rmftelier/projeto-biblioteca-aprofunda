<h1 align="center">📚 API de Gerenciamento de Biblioteca</h1>

API RESTful para gerenciamento de uma biblioteca, desenvolvida com Node.js, Express e TypeScript, seguindo os princípios da Clean Architecture. Inclui autenticação via JWT e controle de acesso com RBAC (Role-Based Access Control), permitindo diferentes permissões para usuários comuns e administradores.

### 📑 Sumário

- [Funcionalidades](#funcionalidades)
- [Controle de Acesso](#controle-de-acesso)
- [Estrutura de um Livro](#estrutura-de-um-livro)
- [Estrutura de um Usuário](#estrutura-de-um-usuário)
- [Instalação](#instalação)
- [Endpoints](#endpoints)
- [Exemplos de Requisição](#exemplos-de-requisição)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)

---

## Funcionalidades

- Cadastro de usuários e login com JWT;
- Listagem de livros cadastrados (usuários autenticados);
- Cadastro, atualização e remoção de livros (somente admins);
- Controle de acesso com autenticação e autorização por papéis.

## Controle de Acesso

A API implementa autenticação via Bearer Token (JWT) e autorização baseada em papéis (RBAC):

| Papel   | Acesso                                                                 |
|---------|------------------------------------------------------------------------|
| `user`  | Pode visualizar a lista de livros e detalhes de livros específicos.    |
| `admin` | Pode criar, atualizar e excluir livros, além de listar e gerenciar usuários. |

> ⚠️ Todas as rotas protegidas exigem token JWT no header:  
> `Authorization: Bearer <seu_token_aqui>`

### Estrutura de um Usuário 

| Campo        | Tipo     | Descrição                                         |
|--------------|----------|--------------------------------------------------|
| `id`         | string   | ID único do usuário gerado automaticamente       |
| `name`       | string   | Nome completo do usuário                          |
| `login`       | string   | Login do usuário                          |
| `password`   | string   | Senha criptografada (não retornada em respostas) |
| `email`      | string   | E-mail do usuário (único)                         |
| `role`       | string   | Papel do usuário (`user` ou `admin`)             |


### Estrutura de um Livro

| Campo            | Tipo      | Descrição                                         |
|------------------|-----------|--------------------------------------------------|
| `id`             | string    | ID único gerado automaticamente                   |
| `title`         | string    | Título do livro                                   |
| `author`       | string    | Escritor do livro                                 |
| `publishedYear` | number    | Ano de publicação do livro  |
| `format`        | string    | Formato do livro (ex: Físico, Kindle, Audiobook) |
| `pages`     | number    | Quantidade de páginas                             |
| `genres`        | string[ ] | Gêneros do livro                                 |
| `language`         | string    | Idioma da versão do livro                         |
| `createdAt`       | string    | Data da criação do objeto livro                   |



---

## Instalação 

1. Clone o repositório: 

   ```bash
    git clone https://github.com/rmftelier/projeto-biblioteca-aprofunda.git
   ```

2. Acesse a pasta do projeto:

   ```bash
    cd projeto-biblioteca-aprofunda/api
   ```

3. Instale as dependências:

    ```bash
     npm install
    ```
    
4. Configure o arquivo `.env.example` com as variáveis necessárias e depois renomeie-o para `.env`:

    ```env
     MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority&appName=<appname>
     JWT_SECRET=sua_chave_secreta
     PORT=3000
    ```

5. Inicie o servidor:

    ```bash
     npm run dev
    ```

5. Para testar as rotas utilize ferramentas como: ThunderClient ou Postman e faça as requisições que desejar para testar os endpoints da API.

6. Para rodar os testes utilize o comando:

    ```bash
     npm run test
    ```

---

## Endpoints

`BOOKS`

| Método | Rota         | Autenticação | Papel exigido     | Descrição              |
| ------ | ------------ | ------------ | ----------------- | ---------------------- |
| GET    | `/books`     | ❌           | - | Listar todos os livros |
| GET    | `/books/:id` | ❌            | - | Buscar livro por ID    |
| POST   | `/books`     | ✅            | `admin`           | Cadastrar novo livro   |
| PATCH  | `/books/:id` | ✅            | `admin`           | Atualizar livro por ID |
| DELETE | `/books/:id` | ✅            | `admin`           | Excluir livro por ID   |


`USERS`

| Método | Rota         | Autenticação | Papel exigido          | Descrição                |
| ------ | ------------ | ------------ | ---------------------- | ------------------------ |
| POST   | `/register`  | ❌            | -                      | Criar novo usuário       |
| POST   | `/login`     | ❌            | -                      | Realizar login           |
| GET    | `/users`     | ✅            | `admin`                | Listar todos os usuários |
| GET    | `/users/:id` | ✅            | `admin` ou `user dono` | Buscar usuário por ID    |
| PATCH  | `/users/:id` | ✅            | `admin`                | Atualizar usuário por ID |
| DELETE | `/users/:id` | ✅            | `admin`                | Excluir usuário por ID   |


---

## Exemplos de Requisição

Abaixo alguns exemplos de requisição e resposta utilizando o Postman.

### Criar novo usuário

**Requisição:**

```
  POST http://localhost:3000/register
```

Corpo (Body):

```json
   {
     "name": "Exemplo", 
     "login": "exemplo",
     "password": "123456",
     "email": "admin@email.com",
     "role": "admin"
   }
```
> ⚠️ Caso não passe o atributo `role`, é atribuído a você `user`:  


**Resposta:**

``` json
  "token": "seu_token_jwt"
```

### Realizar login

**Requisição:**

```
  POST http://localhost:3000/login
```

Corpo (Body):

```json
{
    "login": "exemplo",
    "password": "123456"
}
```


**Resposta:**

``` json
  "token": "seu_token_jwt"
```

### Listar todos os livros

**Requisição:**

```
  GET http://localhost:3000/books
```

**Resposta:**

``` json
  []
```

### Cadastrar um novo livro
> ⚠️ Lembrando que além do token de autenticação é necessário ter o atributo `role` como `admin` para que se crie um novo livro:  


**Requisição:**

```
  POST http://localhost:3000/books
  Headers:
  Authorization: Bearer seu_token_jwt
```

Corpo (Body):

```json
{
    "title": "Jurassic Park",
    "author": "Michael Crichton",
    "publishedYear": 2015,
    "format": "Físico",
    "pages": 528,
    "genres": ["Ficção Científica", "Ação", "Aventura"],
    "language": "Português"
}
```

**Resposta:**

```json
{
    "title": "Jurassic Park",
    "author": "Michael Crichton",
    "publishedYear": 2015,
    "format": "Físico",
    "pages": 528,
    "genres": [
        "Ficção Científica",
        "Ação",
        "Aventura"
    ],
    "language": "Português",
    "id": "09eef7aa-74ff-46d9-9123-737bc2404519",
    "createdAt": "09/07/2025"
}
```

### Buscar livro por Id

**Requisição:**

```
  GET http://localhost:3000/books/09eef7aa-74ff-46d9-9123-737bc2404519
```

**Resposta:**

```json
{
    "title": "Jurassic Park",
    "author": "Michael Crichton",
    "publishedYear": 2015,
    "format": "Físico",
    "pages": 528,
    "genres": [
        "Ficção Científica",
        "Ação",
        "Aventura"
    ],
    "language": "Português",
    "id": "a40c5977-7f87-463b-9641-3aca53d9b99b",
    "createdAt": "09/07/2025"
}
```


### Atualizar um livro

**Requisição:**

```
  PATCH http://localhost:3000/books/09eef7aa-74ff-46d9-9123-737bc2404519
  Headers:
  Authorization: Bearer seu_token_jwt
```

Corpo (Body):

```json
{
    "title": "Orgulho e Preconceito",
    "pages": 582
}
```

**Resposta:**

```json
{
    "message": "Livro atualizado com sucesso",
    "book": {
        "title": "Orgulho e Preconceito",
        "author": "Michael Crichton",
        "publishedYear": 2015,
        "format": "Físico",
        "pages": 582,
        "genres": [
            "Ficção Científica",
            "Ação",
            "Aventura"
        ],
        "language": "Português",
        "id": "09eef7aa-74ff-46d9-9123-737bc2404519",
        "createdAt": "09/07/2025"
    }
}
```

### Excluir um Livro

**Requisição:**
```
  DELETE http://localhost:3000/books/09eef7aa-74ff-46d9-9123-737bc2404519
  Headers:
  Authorization: Bearer seu_token_jwt
```

**Resposta:**

```json
204 NO CONTENT
```

---

## Tecnologias utilizadas

- Node.js 
- Express 
- TypeScript
- MongoDB + Mongoose
- JWT para autenticação
- Bcrypt para hashing de senhas
- CORS (para permitir requisições cross-origin)
- Jest e SuperTest (para testes unitários e de integração)

---

<div align="center"> 
  <p> 💌 Desenvolvido por Roberta Meyrelles</p>
  <a href = "mailto:bertameyrelles@gmail.com"><img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
  <a href="https://www.linkedin.com/in/roberta-meyrelles" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 
  <a href="https://github.com/rmftelier" target="_blank"><img src="https://img.shields.io/badge/github-black?style=for-the-badge&logo=github"></a>
</div>
