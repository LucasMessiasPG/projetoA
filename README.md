# luizalabs

Olá

Para agilizar e facilitar a vida de quem vai rodar este projeto, estou colocando uma biblioteca chamada "mongodb-memory-server", com ela é possivel criar um "banco mongodb temporário" sem a necessidade de ter o mongodb na maquina, porém, se já tiver o mongodb instalado localmente, basta colocar as configurações na dotenv (.env) que o server ja ignorará esse banco temporário

## Dados iniciais
Acesse as rotas abaixo para criar os dados iniciais, rotas essas que são apenas para finalidade desses testes
```
	criar um usuário para poder ter acesso as rotas que exigem autenticação
	cliete: http://localhost:8080/user/populate
```

## Requisitos
* node 14+

## Principais pacotes npm
* express
* mongoose
* jsonwebtoken

## Instalação

* instalação via npm
```bash
	npm install
```

* instalação via yarn
```bash
	yarn install
```

## environment

```
SECRET=superSECRETtextFORtoken
PORT=8080
DB_HOST=localhost
DB_PORT=27017
DB_AUTH=
DB_COLLECTION_ATUH=
API_PRODUCT=http://challenge-api.luizalabs.com/api/product/
```
```
SECRET
	string que será usada como hash para geranção de token
PORT
	porta para inciar o servidor
DB_HOST
	endereço do database
DB_PORT
	porta do database
DB_AUTH
	"login:password" dados usados para se autenticar
DB_COLLECTION_AUTH
	collection quer usará para se autenticar
API_PRODUCT
	url da api de produtos

exemplo de uri completa
mongodb://login:passowrd@host:port?authSource=collection
```

## Comandos

Inicia o servidor para desenvolvimento
```javascript
npm run dev
// ou
yarn dev
```

Roda os testes unitários
```javascript
npm test
// ou
yarn test
```

## fluxo para testar api

A Collection (table) do user foi nescessaria, pois estava sendo requisitado autenticação em algumas rotas;

1. GET http://localhost:8080/user/populate

2. POST http://localhost:8080/user/login (com os dados que foi populado anteriormente)
* copie o token da resposta e coloque como autenticação Baerer em todas as proximas requests

3. POST http://localhost:8080/client (com "name" e "email")
* anote o _id que irá retornar, será necessario para as proximas rotas

4. pode escolher as ações abaixo alterando o :clientId pelo _id anotado
* GET http://localhost:8080/client/:clientId (coleta os dados do cliente)
* DELETE http://localhost:8080/client/:clientId/remove (soft delete no cliente)
* PATCH http://localhost:8080/client/:clientId (atualiza o cliente, precisa passar ou "name" ou "email")
* GET http://localhost:8080/products/:clientId (lista os produtos)
* POST http://localhost:8080/products/:clientId (adiciona um produto, precisa passar "id" do produto com base na api consultada)