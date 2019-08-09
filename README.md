# WanAndroid-React-Demo

## 前言

已学习 React 为前提，这是一个学习的 Demo，用于熟悉 React 项目创建，react-router 的使用，JSX 以及阿里开源 UI 库 AntDesign。作为一个Android开发者，Demo中数据当然来自[WanAndroid](https://www.wanandroid.com/)。

## 使用库

> -   [React](https://github.com/facebook/react)
> -   [Create React App](https://github.com/facebookincubator/create-react-app)
> -   [react-router](https://github.com/ReactTraining/react-router)
> -   [AntDesign](https://ant.design/docs/react/introduce-cn)

## Demo 解析

### 1、创建项目

```
# 全局安装
npm install -g create-react-app
# 构建一个my-app的项目
npx create-react-app my-app
cd my-app

# 启动编译当前的React项目，并自动打开 http://localhost:3000/
npm start
```

### 2、网络请求

基于 axios 的封装

```javascript
import axios from "axios";
import qs from "qs";

let http = {
    post: "",
    get: ""
};

http.post = (api, data) => {
    let params = qs.stringify(data);
    return new Promise((resolve, reject) => {
        axios
            .post(api, params)
            .then(res => {
                resolve(res.data);
            })
            .catch(e => {
                reject(e);
            });
    });
};

http.get = (api, data) => {
    return new Promise((resolve, reject) => {
        axios
            .get(api, {
                params: data
            })
            .then(res => {
                resolve(res.data);
            })
            .catch(e => {
                reject(e);
            });
    });
};

export default http;
```

然后可以直接使用，也可以再次封装

```javascript
import api from "../../src/api/baseApi";

export function _banner() {
    return api.get("/banner/json");
}
```

使用时以下两种方式均可

```javascript
async getBanner() {
    let res = await _banner();
    this.setState({
        bannerList: res.data
    });
}
//或者
getBanner() {
    _banner().then(res=>{
      this.setState({
          bannerList: res.data
      });
    })
}
```

### 3、Create React App 跨域问题

在 package.json 中加入

```json
"proxy": "https://www.wanandroid.com"
```

或者,以下方式可支持多域名代理
```json
"proxy": {
  "/api": {
      "target": "https://www.wanandroid.com",
      "ws": true,
      "changeOrigin": true,
      "pathRewrite": {
          "^/api": "" // rewrite path
      }
  }
}
```
第二种方式需要在请求路径加**/api**,如下
```javascript
export function _banner() {
    return api.get("/api/banner/json");
}
```

### 4、router的使用

参考[React Router 中文文档](http://react-guide.github.io/react-router-cn/index.html)或者[react-router](https://github.com/ReactTraining/react-router)

### 5、UI库

使用[AntDesign](https://ant.design/docs/react/introduce-cn)。

```javascript
//引入
import { Menu, Layout } from "antd";
const { Header, Content, Footer } = Layout;
//使用
render(){
  return(
     <Layout>
        <Header>...</Header>
        <Content>...</Content>
        <Footer>...</Footer>
     </Layout>
  )
}
```
## Demo截图

![首页](https://github.com/leiyun1993/WanAndroid-React-Demo/raw/master/screenshot/1.jpg)

![项目](https://github.com/leiyun1993/WanAndroid-React-Demo/raw/master/screenshot/2.jpg)

![体系](https://github.com/leiyun1993/WanAndroid-React-Demo/raw/master/screenshot/3.jpg)

![公众号](https://github.com/leiyun1993/WanAndroid-React-Demo/raw/master/screenshot/4.jpg)

## License

MIT License

Copyright (c) 2019 YunLei
