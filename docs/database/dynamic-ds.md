# 动态数据源
经常有一个项目连接多个不同数据库的需求，这时就需要动态数据源了。有三种方式：
  * mybatis实现
  * 使用Spring提供的动态数据源AbstractRoutingDataSource
  * 开源实现dynamic-datasource-spring-boot-starter

前面两种在[这篇文章](https://www.csdn.net/tags/MtjaYg5sNjY3NjgtYmxvZwO0O0OO0O0O.html)中有实现，自己实现的话，还要考虑线程池、事务问题。而开源实现已经将这些功能打包好了。

苞米豆不仅开源了 mybatis-plus 项目，还有[动态数据源](https://github.com/baomidou/dynamic-datasource-spring-boot-starter)。