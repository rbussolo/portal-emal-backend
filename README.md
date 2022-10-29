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
