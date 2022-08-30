# Git Commit Message规范
Commit message 包括三个部分：Header，Body 和 Footer。
```code
<type>(<scope>): <subject>
<空行>
<body>
<空行>
<footer>
```

Header是必须的，Body、Footer可以省略。commit message 的任何一行不能超过 100 个字符！主要是为了方便阅读。

## Header
Header由三部分构成: type、scope、subject。

### type
type 说明 commit 的类别，是以下几个之一：

```code
feat：新功能（feature）
fix：修补bug
docs：文档（documentation）
style： 格式（不影响代码运行的变动）
refactor：重构（即不是新增功能，也不是修改bug的代码变动）
test：增加测试
chore：构建过程或辅助工具的变动
```

### scope
scope 说明 commit 影响的范围，比如：登录、下载

### subject
本次 commit 目的简短描述

## Body
Body 部分是对本次 commit 的详细描述，可以分成多行。
```code
feat(login): 更新登录功能

1. 校验密码
2. 接口不返回密码

```

## Footer
Footer 部分只用于两种情况：不兼容变动、关闭 Issue

## 参考
1. [Commit message 和 Change log 编写指南](https://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)