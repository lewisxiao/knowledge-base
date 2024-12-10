# Docker 常用命令整理

## 镜像操作

### 查找空镜像、并删除

1. 查找

```bash
docker images -f "dangling=true"
```

2. 删除

```bash
docker image prune
```
