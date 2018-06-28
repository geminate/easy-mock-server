[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)
# Introduction
EasyMockServer is a mock server for json and mock template files.It can map you json/mockJs file to RESTful url easily.
# Install
You can install easy-mock-server as local package
```
 $ npm install easy-mock-server
```
or global package
```
$ npm install -g easy-mock-server
```
# Usage
### Basic
```
 $ easyMockServer
```
If you mock file tree like this
```
│
├─mock
│  │  basic.json
│  │
│  ├─auth
│  │      login.json
│  │      logout.json
│  │      user.template
│  │
│  └─goods
│          beverage.json
```
The mapping will be
```
./mock/basic.json           -->    http://localhost:8124/mock/basic
./mock/auth/login.json      -->    http://localhost:8124/mock/auth/login
./mock/auth/logout.json     -->    http://localhost:8124/mock/auth/logout
./mock/auth/user.template   -->    http://localhost:8124/mock/auth/user
./mock/goods/basic.json     -->    http://localhost:8124/mock/goods/basic
```
*  The json file will be returned directly.
*  The template file will be translated by mockJs before return. See [mockJs document](http://mockjs.com/examples.html)
*  Other file will be ignored.
### Change port
```
$ easyMockServer -p 8088
$ easyMockServer --port 8088
```
### change base path
```
$ easyMockServer -b ./mock
$ easyMockServer --basePath ./mock
```
