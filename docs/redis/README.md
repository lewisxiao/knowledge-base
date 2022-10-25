# Redis
Redis原来只是一个缩写，全称是REmote DIctionary Server(远程字典服务器)。是一个开源、高性能、基于键值对的缓存与存储系统。提供了多种键值对数据类型来适应不同场景下的缓存与存储需求。可以担任以下角色：
  * 数据库
  * 缓存
  * 消息队列
  * 任务队列

> 这里额外引入一个话题，之前在阅读学习源码、博客文章时，经常遇到benchmark这个单词，按照中英文翻译，它的意思是`基准的意思`，直至在《Redis入门指南中》看到了一个翻译，让我了然，你细品。redis-benchmark: redis性能测试工具。
> cli: Comman Line Interface(命令行接口)

Redis的数据类型
  * 列表（List）的实现算法是双向链表，所以在头部、尾部插入数据或查询数据的速度都是极快的，但是如果想查询中间的某个数值，则需要从头开始遍历。这种特性取决于其底层算法。
  * 集合（Set）的内部是一个空的散列表（Hash），向集合中插入、删除、判断元素是否存在，时间复杂度都是O(1)，而且多个集合之间可以方便地进行交集、并集、差集运算。这种特性仍旧取决于其底层地实现算法。

> 小结：学习算法地作用是什么？由此可以发现一个重要的作用，各种程序所用的高级语言底层都是基于某种特定算法，算法都有各自的特性（或查询速度快；或更新、删除速度快）。理解算法，理解了语言特性，理解就更深入，在把需求落地实现时，就能选择正确的数据结构来实现，性能上会有不小提升。


# 可视化工具
## [Redis Desktop Manager](https://resp.app/)
最初开源的时候还可以免费用，但现在已经开始收费了

## [Another Redis Desktop Manager](https://github.com/qishibo/AnotherRedisDesktopManager)
免费开源的可视化管理工具，从名字上看，跟Redis Desktop Manager就有针锋相对的意思

## 学习资料
1. [Redis 官网](https://redis.io/)
2. [Redis 在线测试](http://try.redis.io/)
3. [Redis 命令参考](http://doc.redisfans.com/)
4. [书籍：Redis 设计与实现](http://redisbook.com/)
5. [Redis设计与实现](http://redisbook.com/index.html)
6. [缓存更新策略](https://coolshell.cn/articles/17416.html?spm=5176.100239.0.0.EHDrfY)
7. [SpringBoot应用之分布式缓存](http://segmentfault.com/a/1190000004389938)
8. [阿里云Redis开发规范](https://developer.aliyun.com/article/531067)
9. [Redis 中文网](https://www.redis.com.cn/)
