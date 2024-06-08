# 索引（Index）
## 动态映射（Dynamic Mapping）

## 显示映射（Explicit Mapping）

## 分片与副本
分片保存了全部数据的一部分，一个分片在底层就是一个Lucene实例，本身就是一个完整的搜索引擎。我们的数据存储在分片中，但是对于开发来说，与其交互的是索引，而不是分片。

分片作为数据的容器，ElasticSearch通过分片将数据分散保存到集群中的各个节点。分片又分为主分片和副本分片。
  * 主分片：决定了索引能够保存的最大数据量
  * 副本分片：副本分片是主分片的拷贝，副本分片作为硬件故障时保护数据不丢失的冗余备份，并为搜索和返回文档等读操作提供服务。副本分片的主要目的就是为了故障转移，如果持有主分片的节点挂掉了，一个副本分片就会晋升为主分片的角色。在索引写入时，副本分片做着与主分片相同的工作。新文档首先被索引进主分片然后再同步到其它所有的副本分片。增加副本数并不会增加索引容量。在索引建立的时候就已经确定了主分片数，但是副本分片数可以随时修改。

# 字段（Field）
## 动态字段（Runtime Field）

## 数据类型

## 元数据字段（Metadata Field）

# 文本分析（Text Analysis）
对于 text 类型的数据，ElasticSearch 采用了一种叫 Text Analysis 的技术来进行全文索引，检索出所有相关的结果，而并非精确匹配的结果。

# 查询（Search）

# 聚合查询（Aggregate）
查询语言有好几种：
  * Query DSL
  * EQL（Event Query Language）
  * SQL
  * KQL

# 常见问题
## 1. 如何修改index中字段的数据类型？
ES官方文档中明确指出不能直接修改。如果需要的话，再新增一个index，然后通过[reindex接口](https://www.elastic.co/guide/en/elasticsearch/reference/8.7/docs-reindex.html)实现。

## 2. 我应该设置多大的分片？
避免分片过大，因为这样会对集群从故障中恢复造成不利影响。尽管并没有关于分片大小的固定限值，但是人们通常将 50GB 作为分片上限，而且这一限值在各种用例中都已得到验证。

## 3. 为什么需要跨索引查询
Elasticsearch索引本身有一些指标限制，对于很多新手来说最容易忽视或者乱用。

  * Elastic索引数据量有大小限制；
  * 单个分片数据容量官方建议不超过50GB，合理范围是20GB～40GB之间；
  * 单个分片数据条数不超过约21亿条（2的32次方），此值一般很难达到，基本可以忽略，背后原理可以参考源码或者其它；
  * 索引分片过多，分布式资源消耗越大，查询响应越慢。

基于以上限制，索引在创建之前就需要依据业务场景估算，设置合理的分片数，不能过多也不能过少。

# 参考
1. [ES的跨索引查询有多便利？对比下分库分表、分片更直观](https://mp.weixin.qq.com/s?__biz=MzU0OTE4MzYzMw==&mid=2247488841&idx=3&sn=fa709e4bc0f6a13082f7fe2c51971270&chksm=fbb29cb7ccc515a18a1e951f8bf099c44e4e5741158f7caf356740955bcb76b0ab83f856b103&scene=27)
2. [我在 Elasticsearch 集群内应该设置多少个分片？](https://www.elastic.co/cn/blog/how-many-shards-should-i-have-in-my-elasticsearch-cluster)