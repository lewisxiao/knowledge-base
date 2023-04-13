# 索引（Index）
## 动态映射（Dynamic Mapping）

## 显示映射（Explicit Mapping）

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
  * EQL
  * SQL
  * KQL

# 常见问题
## 1. 如何修改index中字段的数据类型？
ES官方文档中明确指出不能直接修改。如果需要的话，再新增一个index，然后通过[reindex接口](https://www.elastic.co/guide/en/elasticsearch/reference/8.7/docs-reindex.html)实现。
