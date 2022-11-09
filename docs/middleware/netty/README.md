
# 常见问题
## 什么是半包，粘包（zhān bāo）？Netty是如何解决的？
半包：数据在传输时，接收端只接收到了部分数据，而非完整的数据。

粘包：数据在传输时，接收端在一条消息中读取到了另一条消息的部分数据。

# 参考
1. [Netty 4.x 用户指南](https://waylau.com/netty-4-user-guide/)
2. [什么是粘包和半包？怎么解决？](https://mp.weixin.qq.com/s?__biz=MzAxNjM2MTk0Ng==&mid=2247499474&idx=2&sn=47a79340c27a22dad9c77065f9cf5122&chksm=9bf74e67ac80c771fed228b7f6d1c67ccda433fa9c6375064b53d1f7a01d1978c3134c280fa8&scene=27)
