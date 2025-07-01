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
| `titulo`         | string    | Título do livro                                   |
| `escritor`       | string    | Escritor do livro                                 |
| `dataPublicacao` | string    | Data de publicação do livro (formato: `aaaa-mm-dd`) |
| `formato`        | string    | Formato do livro (ex: Físico, Kindle, Audiobook) |
| `qtdPaginas`     | number    | Quantidade de páginas                             |
| `generos`        | string[ ] | Gêneros do livro                                 |
| `idioma`         | string    | Idioma da versão do livro                         |
| `criadoEm`       | string    | Data da criação do objeto livro                   |


## Tecnologias utilizadas

- Node.js 
- Express 
- TypeScript
- uuid (para geração de IDs)
- date-fns (para manipulação de datas)
- CORS (para permitir requisições cross-origin)

---

## Instalação 

1. Clone o repositório: 

   ```bash
    git clone https://github.com/rmftelier/projeto2-clean-architecture-aprofunda.git
   ```

2. Acesse a pasta do projeto:

   ```bash
    cd projeto2-clean-architecture-aprofunda/api-clean-architecture
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

---

## Endpoints

| Método | Rota          | Descrição               |
| ------ | ------------- | ----------------------- |
| GET    | `/livros` | Listar todos os livros  |
| GET    | `/livros/:id`  | Buscar livro por ID     |
| POST   | `/livros`  | Cadastrar um novo livro |
| PUT    | `/livros/:id`  | Atualizar livro por ID  |
| DELETE | `/livros/:id`  | Excluir livro por ID    |

---

## Exemplos de Requisição

Abaixo alguns exemplos de requisição e resposta utilizando o Postman.

### Listar todos os livros

**Requisição:**

```
  GET http://localhost:3000/livros
```

**Resposta:**

``` json
  []
```

### Cadastrar um novo livro

**Requisição:**

```
  POST http://localhost:3000/livros
```

Corpo (Body):

```json
  {
    "titulo": "Jurassic Park",
    "escritor": "Michael Crichton",
    "dataPublicacao": "2015-06-12",
    "formato": "Físico",
    "qtdPaginas": 528,
    "generos": ["Ficção Científica", "Ação", "Aventura"],
    "idioma": "Português"
  }
```

**Resposta:**

```json
{
    "message": "O livro: Jurassic Park foi cadastrado com sucesso!",
    "novoLivro": {
        "id": "5b5c5012-122e-43c9-96b9-297ab35aca01",
        "titulo": "Jurassic Park",
        "escritor": "Michael Crichton",
        "dataPublicacao": "12/06/2015",
        "formato": "Físico",
        "qtdPaginas": 528,
        "generos": [
            "Ficção Científica",
            "Ação",
            "Aventura"
        ],
        "idioma": "Português",
        "criadoEm": "01/07/2025"
    }
}
```

### Buscar livro por Id

**Requisição:**

```
  GET http://localhost:3000/livros/5b5c5012-122e-43c9-96b9-297ab35aca01
```

**Resposta:**

```json
{
    "id": "5b5c5012-122e-43c9-96b9-297ab35aca01",
    "titulo": "Jurassic Park",
    "escritor": "Michael Crichton",
    "dataPublicacao": "12/06/2015",
    "formato": "Físico",
    "qtdPaginas": 528,
    "generos": [
        "Ficção Científica",
        "Ação",
        "Aventura"
    ],
    "idioma": "Português",
    "criadoEm": "01/07/2025"
}
```


### Atualizar um livro

**Requisição:**

```
  PUT http://localhost:3000/livros/5b5c5012-122e-43c9-96b9-297ab35aca01
```

Corpo (Body):

```json
{
  "titulo": "Jurassic Park",
  "escritor": "Michael Crichton",
  "dataPublicacao": "2019-04-17",
  "formato": "Edição Kindle",
  "qtdPaginas": 748,
  "generos": ["Ficção Científica", "Ação", "Aventura", "Clássico"],
  "idioma": "Português"
}
```

**Resposta:**

```json
{
  "message": "Livro com id: 5b5c5012-122e-43c9-96b9-297ab35aca01 foi editado com sucesso."
}
```

### Excluir um Livro

**Requisição:**
```
  DELETE http://localhost:3000/livros/5b5c5012-122e-43c9-96b9-297ab35aca01
```

**Resposta:**

```json
{
    "message": "Livro com o id: 5b5c5012-122e-43c9-96b9-297ab35aca01 foi excluído com sucesso.",
    "listaLivrosAtualizada": []
}
```

---

<div align="center"> 
  <p> 💌 Desenvolvido por Roberta Meyrelles</p>
  <a href = "mailto:bertameyrelles@gmail.com"><img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
  <a href="https://www.linkedin.com/in/roberta-meyrelles" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 
  <a href="https://github.com/rmftelier" target="_blank"><img src="https://img.shields.io/badge/github-black?style=for-the-badge&logo=github"></a>
</div>