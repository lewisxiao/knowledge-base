#!/bin/bash

# 自动部署脚本，部署到个人的github pages

# 构建
echo '开始构建代码...'
npm run build
echo '代码构建成功'

# 跳转到构建输出目录
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

# 推到你仓库的 master 分支
echo '开始推送代码...'
git push -f git@github.com:lewisxiao/lewisxiao.github.io.git master
echo '代码推送成功'