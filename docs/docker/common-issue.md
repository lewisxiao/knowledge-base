# 常见问题

## 如何让 Docker 在运行容器时，自动执行命令

1. 编写 Dockerfile，构建好镜像，如下是示例

```bash
# 使用 openjdk:8u212-jdk-alpine3.9 作为基础镜像
FROM openjdk:8u212-jdk-alpine3.9

# 安装 fontconfig、ttf-dejavu，调整时区为印度标准时间（UTC+5:30）
RUN apk add --no-cache fontconfig \
    && apk add --no-cache ttf-dejavu \
    && apk add --no-cache tzdata \
    && cp /usr/share/zoneinfo/Asia/Kolkata /etc/localtime \
    && echo "Asia/Kolkata" > /etc/timezone

# 设置工作目录
WORKDIR /app

# 复制应用程序到容器中
COPY ./target/ccms-admin.jar /app/ccms-admin.jar

# 暴露应用程序所需的端口（根据需要修改）
EXPOSE 8081

# 运行容器时，会自动执行该命令，从而避免每次手动进入容器去启动命令
ENTRYPOINT ["java","-jar","/app/ccms-admin.jar","--spring.profiles.active=leco"]
```

2. docker run 命令运行容器时，就会自动执行 ENTRYPOINT 中的命令了