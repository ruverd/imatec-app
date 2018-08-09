## Introdução
`imatec-app` é uma complexa Single-Page Applications baseado em  [Vue.js](https://github.com/vuejs/vue) e utiliza como biblioteca visual UI Toolkit -- [element](https://github.com/ElemeFE/element). Essa solução se conecta a uma API que trata todas informações do nosso back-end [imatec-api](https://github.com/ruverd/imatec-api). 

<p align="center">
  <img width="900" src="https://wpimg.wallstcn.com/a5894c1b-f6af-456e-82df-1151da0839bf.png">
</p>

## Preparação 
Necessário instalar 
[node](http://nodejs.org/) e [git](https://git-scm.com/) localmente. 

## Funcionalidades
O projeto é baseado e utiliza algumas bibliotecas:

### Bibliotecas terceiras
 - [ES2015+](http://es6.ruanyifeng.com/)
 - [vue](https://cn.vuejs.org/index.html)
 - [vuex](https://vuex.vuejs.org/zh-cn/)
 - [vue-router](https://router.vuejs.org/zh-cn/)
 - [element-ui](https://github.com/ElemeFE/element)
 - [axios](https://github.com/axios/axios)
 - [docsify](https://docsify.js.org/#/quickstart)
 - [vue-data-tables](https://github.com/njleonzhang/vue-data-tables)

 **O entendimento dessas bibliotecas é necessario para manutenção do projeto.**
 
 **Esse projeto não suporta as versões antigas do (e.g. IE). Adicionar polyfill caso necessário.**

## Como começar

```bash
# clonar o projeto
git clone https://github.com/ruverd/imatec-app.git

# instalar dependencias
npm install
yarn install
npm i docsify-cli -g

# rodar desenvolvimento
npm run dev

# inicializar documentação
docsify serve docs
```

**Acessar sistema http://localhost:9527.**

**Acessar documentação http://localhost:9527.**

## Gerar
```bash
# construir para ambiente de teste
npm run build:sit

# construir para ambiente de produção
npm run build:prod
```

## Avançado
```bash
# --report to build with bundle size analytics
npm run build:prod --report

# --preview to start a server in local to preview
npm run build:prod --preview

# lint code
npm run lint

# auto fix
npm run lint -- --fix
```

Copyright (c) 2018-present Imatec
