# 10Fund 小程序

## 开发打包

```
# 安装依赖
yarn install

# 启动开发
yarn dev

# 打包脚本
yarn build

# 新增component
yarn com component名称

# 新增page
yarn page page名称

# 生成CHANGELOG (https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli)
yarn changelog
```

## 开发文件夹结构简介
| 文件夹名称	   | 简介                              |
|:------------:|:----------------------------------|
| assets       | 存放静态资源                        |
| components   | 存放业务组件                        |
| global       | 存放项目业务底层逻辑                 |
| models       | 存放与数据层方法(只用于数据的获取和缓存)|
| pages        | 存放页面文件                        |
| utils        | 存放全局共用库                      |