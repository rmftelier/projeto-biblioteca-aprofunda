<h1 align="center"> API de Gerenciamento de Biblioteca </h1>

API para gerenciamento de uma biblioteca, seguindo os princípios da Clean Architecture. Permite criar, listar, buscar, atualizar e excluir livros.

### 📑 Sumário

- [Funcionalidades](#funcionalidades)
- [Estrutura de um Livro](#estrutura-de-um-livro)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Endpoints](#endpoints)
- [Exemplos de Requisição](#exemplos-de-requisição)

---

## Funcionalidades

- Cadastro de livros;
- Listagem de todos os livros cadastrados;
- Busca de livros por ID;
- Atualização dos dados dos livros;
- Exclusão de livros.

### Estrutura de um Livro

| Campo            | Tipo      | Descrição                                         |
|------------------|-----------|--------------------------------------------------|
| `id`             | string    | ID único gerado automaticamente                   |
| `title`         | string    | Título do livro                                   |
| `author`       | string    | Escritor do livro                                 |
| `publishedAt` | string    | Data de publicação do livro (formato: `aaaa-mm-dd`) |
| `format`        | string    | Formato do livro (ex: Físico, Kindle, Audiobook) |
| `pages`     | number    | Quantidade de páginas                             |
| `genres`        | string[ ] | Gêneros do livro                                 |
| `language`         | string    | Idioma da versão do livro                         |
| `createdAt`       | string    | Data da criação do objeto livro                   |


## Tecnologias utilizadas

- Node.js 
- Express 
- TypeScript
- uuid (para geração de IDs)
- date-fns (para manipulação de datas)
- CORS (para permitir requisições cross-origin)
- Jest e SuperTest (para testes unitários e de integração)
---

## Instalação 

1. Clone o repositório: 

   ```bash
    git clone https://github.com/rmftelier/projeto3-testes-aprofunda.git
   ```

2. Acesse a pasta do projeto:

   ```bash
    cd projeto3-testes-aprofunda/api-clean-architecture
   ```

3. Instale as dependências:

    ```bash
     npm install
    ```

4. Inicie o servidor:

    ```bash
     npm run start
    ```

5. Para testar as rotas utilize ferramentas como: ThunderClient ou Postman e faça as requisições que desejar para testar os endpoints da API.

6. Para rodar os testes utilize o comando:

    ```bash
     npm run test
    ```

---

## Endpoints

| Método | Rota          | Descrição               |
| ------ | ------------- | ----------------------- |
| GET    | `/books` | Listar todos os livros  |
| GET    | `/books/:id`  | Buscar livro por ID     |
| POST   | `/books`  | Cadastrar um novo livro |
| PATCH    | `/books/:id`  | Atualizar livro por ID  |
| DELETE | `/books/:id`  | Excluir livro por ID    |

---

## Exemplos de Requisição

Abaixo alguns exemplos de requisição e resposta utilizando o Postman.

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

**Requisição:**

```
  POST http://localhost:3000/books
```

Corpo (Body):

```json
{
    "title": "Jurassic Park",
    "author": "Michael Crichton",
    "publishedAt": "2015-06-12",
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
    "publishedAt": "12/06/2015",
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
    "publishedAt": "12/06/2015",
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
        "publishedAt": "12/06/2015",
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
```

**Resposta:**

```json
204 NO CONTENT
```

---

<div align="center"> 
  <p> 💌 Desenvolvido por Roberta Meyrelles</p>
  <a href = "mailto:bertameyrelles@gmail.com"><img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
  <a href="https://www.linkedin.com/in/roberta-meyrelles" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 
  <a href="https://github.com/rmftelier" target="_blank"><img src="https://img.shields.io/badge/github-black?style=for-the-badge&logo=github"></a>
</div>
