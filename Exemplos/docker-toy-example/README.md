# Docker Toy Example

App didatico para aprender Docker usando um monorepo simples:

- `api`: backend Node.js + TypeScript + Express + MongoDB.
- `web`: frontend Vite + React + TypeScript.
- `mongodb`: banco de dados.
- `mongo-express`: painel web para inspecionar o MongoDB.
- `storage`: nginx servindo imagens salvas em volume Docker.

## Requisitos

- Node.js LTS
- npm
- Docker
- Docker Compose

## Instalar Dependencias Localmente

Instale as dependencias da API:

```bash
cd api
npm install
```

Instale as dependencias do frontend:

```bash
cd ../web
npm install
```

## Subir os Servicos com Docker

Na raiz do projeto, execute:

```bash
docker compose up -d --build
```

Para ver os containers:

```bash
docker compose ps
```

Para ver logs da API:

```bash
docker compose logs -f api
```

Para parar os servicos:

```bash
docker compose down
```

Para parar e apagar os volumes de banco e uploads:

```bash
docker compose down -v
```

Observacao: o storage usa a porta `8080`. Se ja existir outro container usando essa porta, pare-o antes:

```bash
docker stop container
```

## Acessar os Servicos

Frontend:

```text
http://localhost:5173
```

API:

```text
http://localhost:3000
```

Storage de imagens:

```text
http://localhost:8080/uploads/nome-do-arquivo.jpg
```

Mongo Express:

```text
http://localhost:8082
```

MongoDB:

```text
mongodb://mongodb:27017/docker-toy-example
```

Dentro do Docker, os containers acessam o banco pelo nome do servico `mongodb`. A porta `27017` nao esta publicada no host para evitar conflito com MongoDB local.

## Endpoints da API

### GET /health

Verifica se a API esta respondendo.

```bash
curl http://localhost:3000/health
```

Resposta esperada:

```json
{
  "status": "ok"
}
```

### GET /books

Lista todos os livros, ordenados pelos mais recentes primeiro.

```bash
curl http://localhost:3000/books
```

Resposta exemplo:

```json
[
  {
    "_id": "665000000000000000000000",
    "title": "Clean Code",
    "authors": ["Robert C. Martin"],
    "year": 2008,
    "imageUrl": "http://localhost:8080/uploads/clean-code.jpg",
    "createdAt": "2026-05-19T00:00:00.000Z",
    "updatedAt": "2026-05-19T00:00:00.000Z",
    "__v": 0
  }
]
```

### POST /books com JSON

Cria um livro usando uma URL de imagem ja existente.

```bash
curl -X POST http://localhost:3000/books \
  -H 'Content-Type: application/json' \
  -d '{
    "title": "Clean Code",
    "authors": ["Robert C. Martin"],
    "year": 2008,
    "image": "http://localhost:8080/uploads/clean-code.jpg"
  }'
```

Campos obrigatorios:

- `title`: titulo do livro.
- `authors`: array de autores.
- `year`: ano de publicacao.
- `image`: URL da imagem.

### POST /books com Upload

Cria um livro enviando uma imagem por `multipart/form-data`.

```bash
curl -X POST http://localhost:3000/books \
  -F 'title=Domain-Driven Design' \
  -F 'authors=Eric Evans, Vaughn Vernon' \
  -F 'year=2003' \
  -F 'image=@/caminho/para/capa.png;type=image/png'
```

Campos aceitos:

- `title`: titulo do livro.
- `authors`: autores separados por virgula ou multiplos campos `authors`.
- `year`: ano de publicacao.
- `image`: arquivo de imagem.

Formatos de imagem aceitos:

- `.jpg`
- `.jpeg`
- `.png`
- `.webp`
- `.gif`

Quando o upload e usado, a API salva o arquivo no volume Docker de uploads e grava no MongoDB um `imageUrl` com base em:

```text
http://localhost:8080/uploads
```

## Como os Volumes Funcionam

O volume `mongodb_data` guarda os dados do MongoDB.

O volume `uploads_data` e compartilhado entre dois containers:

- `api`: monta o volume em `/uploads` e grava as imagens recebidas.
- `storage`: monta o mesmo volume em `/usr/share/nginx/html/uploads` e serve os arquivos via HTTP.

Assim, a API nao precisa servir arquivos estaticos diretamente. Ela apenas salva o arquivo e grava a URL publica no banco.
