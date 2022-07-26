# 结课作业提交仓库


> 该项目使用typescript编写，仿照vue实现了简单的MVVM框架, 包括`{{}}`表达式, v-model, v-html,v-class, v-on, $watch等实用功能。

该项目包括js版本(js目录下)和ts版本(src目录下)，以及其对应的demo: js-demo和ts-demo，同时可以参见vue-demo来对比框架的使用。

该实现的主要方法是利用Object.defineProperty()来实现数据劫持，并通过观察者模式利用回调函数来实现数据更新一致。

## 检查点

* [x] 实现数据劫持
* [x] 实现发布订阅模式
* [x] 实现数据单向绑定
* [x] 实现双向绑定
* [x] 单元测试

## 脚本
### 运行
```bash
npm start
```
### 测试
```bash
npm run test
```



