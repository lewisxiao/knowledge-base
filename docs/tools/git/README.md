# [Git](https://git-scm.com/)
Git是一个免费和开源的分布式版本控制系统，也是我们在开发过程中的老朋友了。能够精准的跟踪每一次提交，每一行代码的变更，功能非常强大。

# 初始化配置
安装好Git后，有些常用的配置是必须的。

## 配置用户名、邮箱
姓名、邮箱会显示在每一次提交中，表明了代码的作者和联系方式。

```shell
# 全局配置
git config --global user.name "xiaoweiqian"
git config --global user.email "xiaoweiqian5@163.com"
```
`--global`参数意味着全局的配置，也可以单独设置某一个代码库的姓名和邮箱
```shell
# 单个项目配置
git config user.name "xiaoweiqian"
git config user.email "xiaoweiqian5@163.com"
```
## 配置 SSH 密钥
代码仓库都是受保护的，只有被授权的用户才能进行访问。为了避免每次输入密码，一般都会配置 SSH 秘钥。分为如下两步：

1. 生成 SSH 秘钥
```shell
ssh-keygen -t rsa -b 4096 -C "xiaoweiqian5@163.com"
```
执行完命令后，一路敲回车知道结束。密码默认保存在用户目录下，以Linux为例：`~/.ssh/`

2. 将 SSH 密钥添加到 ssh-agent
有时候发现生成了秘钥，也配置好了。但是克隆代码时发现并不生效，就是因为没有配置这一步的原因。
```shell
# 确保 ssh-agent 在运行，下面这行代码会输出 ssh-agent 的进程id
eval "$(ssh-agent -s)"

# 将 SSH 私钥添加到 ssh-agent
ssh-add ~/.ssh/id_rsa.pub
```

3. 最后将 SSH 密钥配置到代码管理后台的账户上（比如：GitHub、GitLab）

# 参考
1. [生成新 SSH 密钥并添加到 ssh-agent](https://docs.github.com/cn/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)