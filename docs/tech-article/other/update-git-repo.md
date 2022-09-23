# 前言
有一个项目很久没打开了，今天突然要用到，当打算执行 `git pull` 更新一下本地的代码时，意外地发现代码拉不下来了：

```git
$ git pull
CODING 提示: Repository not found.
Git 仓库找不到。

fatal: Could not read from remote repository.      

Please make sure you have the correct access rights
and the repository exists.
```

排查了一下，本地的秘钥信息时正确的，看来是远程仓库地址换了，需要换一下仓库地址

# 更换仓库地址
根据 git 的[文档描述](https://git-scm.com/docs/git-remote)

> git-remote - Manage set of tracked repositories

也就是说 git-remote 可以用来管理本地仓库之的一些信息。提供了如下这些选项：
  * *git remote -v* : 查看远程仓库地址和名称
  * *git remote add* : 添加一个远程仓库和名称
  * *git remote rename* : 重命名一个远程仓库
  * *git remote remote* : 删除一个远程仓库
  * *git remote get-url* : 查看远程仓库地址
  * *git remote set-url* : 更新远程仓库地址

发现有两种方式可以重置远程仓库地址：
  * 先删除旧地址，再添加新地址
  * 直接更新地址

## 先删除再更新
```git
git remote -v                // 先查看远程仓库信息
git remote remove "仓库名称" // 删除关联的远程仓库地址
git remote add "新的仓库名称" "新的仓库地址"  // 添加新的仓库地址
git remote -v               // 查看添加后的仓库地址
```

## 直接更新
```git
git remote -v                // 先查看远程仓库地址
git remote set-url "新的仓库名称" "新的仓库地址"  // 添加新的仓库地址
```

更多其它的命令，就看这里官方文档上的 [git remote](https://git-scm.com/docs/git-remote) 吧