# RxJava

Observable 可以发布任意数量的事件（0个、1个或者多个），事件分为三种类型：
  * Observatble声明的类型为T的值 —— onNext
  * 完成事件 —— onComplete
  * 错误事件 —— onError

Observable 不会主动发布事件，必须要有订阅者订阅后才会发布事件。

对待 Observable 抛出的异常时，不要用 try...catch... 去接收，而要在 onError 中处理。