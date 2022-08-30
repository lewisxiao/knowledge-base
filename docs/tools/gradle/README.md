# Gradle
Android开发的老熟人了，Android Studio新建一个项目，默认就是采用gradle作为构建工具的。

入门先看一篇不错的指南：[Gradle入门学习---认识buildeTypes和dependencies](https://www.cnblogs.com/wenjiang/p/6638927.html)，主要讲解build.gralde文件中的配置，比如buildTypes、dependencies。

## Gradle常见的Task
### build
当运行gradle build命令时Gradle将会编译和测试你的代码，并且创建一个包含类和资源的JAR文件。

### clean
当运行gradle clean命令时Gradle将会删除build生成的目录和所有生成的文件。

### assemble
当运行gradle assemble命令时Gradle将会编译并打包代码，但是并不运行单元测试。

### check
当运行gradle check命令时Gradle将会编译并测试你的代码，其他的插件会加入更多的检查步骤。