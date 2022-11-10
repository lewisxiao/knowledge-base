# 如何正确的使用 Redis
前阵子，生产环境上遇到了一个问题：“在有上百万key的时候，由于不正确的使用 redis scan 命令导致整个 redis 响应变慢”。影响很严重，公司发邮件进行了通报批评，整条线上的负责人被罚款，也取消了年度绩效评定。

## 为何会产生这个问题
哲学上有个基本原理，叫做“量变引起质变”，这个原理在软件工程上也同样适用。我们来回顾一下这几个场景：
  * MySQL数据库在执行一条SQL语句后突然变慢，而这条SQL语句已经运行了很久了
  * 遍历 redis 的所有key后导致服务器失去响应，而这条 keys * 在本地是屡试不爽的
在项目初期，性能问题很难发现，因为数据量小，还不足以成为瓶颈。随着项目持续不断的运行，数据量一天天增加，性能问题才会显现，引发人们的关注。

作为软件研发人员，要能学会预见未来，科学编码，作好防范。如何正确的使用 redis，就变得尤为重要了。

## 有些命令会“自爆”
TODO...