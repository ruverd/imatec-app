## Introduction

`imatec-app` is a large complex Single-Page Applications based on the newest development stack of [Vue.js](https://github.com/vuejs/vue) and use the UI Toolkit -- [element](https://github.com/ElemeFE/element). The project is connected in an API that make all process on the back-end [imatec-api](https://github.com/ruverd/imatec-api). 

<p align="center">
  <img width="900" src="https://wpimg.wallstcn.com/a5894c1b-f6af-456e-82df-1151da0839bf.png">
</p>

## Preparation 
You need to install [node](http://nodejs.org/) and [git](https://git-scm.com/) locally.

## Features
The project is based in some libraries:

### Libraries
 - [ES2015+](http://es6.ruanyifeng.com/)
 - [vue](https://cn.vuejs.org/index.html)
 - [vuex](https://vuex.vuejs.org/zh-cn/)
 - [vue-router](https://router.vuejs.org/zh-cn/)
 - [element-ui](https://github.com/ElemeFE/element)
 - [axios](https://github.com/axios/axios)
 - [docsify](https://docsify.js.org/#/quickstart)
 - [vue-data-tables](https://github.com/njleonzhang/vue-data-tables)

 **It would be helpful if you have pre-existing knowledge on those.**

**Note: This project uses element-ui@2.0.0+ version, so the minimum compatible vue@2.5.0**

## Getting started

```bash
# clone the project
git clone https://github.com/ruverd/imatec-app.git

# install dependency
npm install
yarn install
npm i docsify-cli -g

# develop
npm run dev

# Documentation serve
docsify serve docs
```

**This will automatically open http://localhost:9527.**
**Open documentação http://localhost:3000.**

## Build
```bash
# build for test environment
npm run build:sit

# build for production environment
npm run build:prod
```

## Advanced
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
