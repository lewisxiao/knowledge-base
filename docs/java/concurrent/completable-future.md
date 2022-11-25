# Completable异步回调详解
Google 旗下顶顶大名的 Guava 工具包为 Java 提供了异步回调的 API，为开发者带来了更好的异步编程工具。如果你的项目中还在使用 JDK 1.5、JDK 1.6、JDK1.7的版本，要想使用异步回调的方式来编程，引入 Guava 工具包是一个好的方式。

然而本篇要说的是 JDK1.8 中提供的 CompletableFuture，使用它既能进行函数式编程、也能进行异步回调方式的开发。