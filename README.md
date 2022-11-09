## Projeto Portal de Atendimento - EMAL

Criação do projeto para controle dos dados do lado do backend.

### Instalação

Para realizar a instalação é necessário realizar os seguintes passos:

1. Inicialmente é necessário realizar a configuração do arquivo "src/data-source.ts", dentro dele que se tem a conexão com o banco.

2. Depois é necessário realizar a instalação das dependencias.

```
yarn install
```

3. Agora é necessário executar as migrações do banco de dados.

Se for Windows

```
yarn typeorm migration:run -d .\src\data-source.ts
```

Sw for outro SO.

```
yarn typeorm migration:run -d ./src/data-source.ts
```

4. Agora basta iniciar o servidor, para isso pode ser feito em dois ambientes:

Ambiente de desenvolvimento

```
yarn dev
```

Ambiente de produção / teste

```
yarn start
```

5. Variaveis de ambiente

Foi utilizado a questão de variaveis de ambiente para realizar a parametrizações de alguns itens, então é necessário criar o arquivo chamado ".env" na pasta raiz da aplicação, com as seguintes variaveis:

```
NODE_ENV="development"

SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_AUTH_USER="seu@email.com"
SMTP_AUTH_PASS="suaSenha"
SMTP_RECIPIENT_TEST="seu@email.com"

DATABASE_POSTGRES_HOST="localhost"
DATABASE_POSTGRES_PORT=5432
DATABASE_POSTGRES_USERNAME="postgres"
DATABASE_POSTGRES_PASSWORD="admin"
DATABASE_POSTGRES_DATABASE="portal"

DATABASE_EMAL_HOST="caminho_servidor"
DATABASE_EMAL_PORT=1521
DATABASE_EMAL_USERNAME="usuario"
DATABASE_EMAL_PASSWORD="senha"
DATABASE_EMAL_DATABASE="database"
DATABASE_EMAL_SERVICE="serviceName"
```
