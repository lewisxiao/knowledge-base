# 并发编程
单核CPU时代早已过去，要想在多核CPU下最大限度榨干机器的性能，充分利用每个核心，必须要掌握并发编程，并发编程现在也是提升程序运行效率的最常用工具。

多进程、多线程是并发还是并行取决于CPU核心的数量，在单核CPU下，多线程、多进程开发是没有意义的，不仅不能提升效率，反而会因为线程切换而浪费时间。

# 概念
并发与并行是一对孪生兄弟，二者十分相似。

并发：多个事件在同一时间间隔发生。发生在一个CPU上，取决于CPU的时间片分配和调度。  
并行：多个事件在同一时刻发生。在多核CPU下才会出现并行，各个进程分别运行在不同CPU上，互不抢占资源。

## 线程的生命周期
从操作系统的角度来看，线程有5种状态，但是从Java线程的角度来看，线程有6种状态，在Thread类里有一个枚举类State，就定义了线程的6中状态。

```java
package java.lang;

public class Thread implements Runnable {
    // 省略无关代码...

    // 线程状态枚举
    public enum State {
        NEW,

        RUNNABLE,

        BLOCKED,

        WAITING,

        TIMED_WAITING,

        TERMINATED;
    }
}
```

根据上面 JDK 中线程状态的定义，下面对应的是其生命周期：
![thread-lifecycle](./image/thread-lifecycle.jpg)

### New —— 新建状态
新创建的尚未开始执行的线程。用 new 关键字创建了一个线程，在调用 start 方法之前，这个线程就处于 new 状态。
```java
public class ThreadLifecycle {
    public static void main(String[] args) {
        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println(Thread.currentThread().getState());
            }
        });

        System.out.println(thread.getState());
    }
}
```
由于还没有调用 start 方法，此时 thread.getState() 会在控制台打印出：
> NEW

### Runnable —— 可运行状态
也叫做“可执行状态”，正在运行或准备好执行，但它正在等待资源分配。线程对象被创建后，其它线程调用了该对象的start()方法，从而来启动该线程。处于 Runnable 状态的线程尚未被分配到 CPU 时间片，但随时可被 CPU 调度执行。
> 也有人对 Runnable 分为两种状态：
> Runnable: 处于 Runnable 状态的线程尚未被分配到 CPU 时间片。
> Running: 当处于 Runnable 状态的线程分配到 CPU 时间片后，就会进入该状态。

```java
public class ThreadLifecycle {
    public static void main(String[] args) {
        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("线程执行中");
            }
        });

        thread.start();
        System.out.println(thread.getState());
    }
}
```
需要注意：由于是是两个线程并发执行，上面的 thread.getState() 有可能输出下面两种结果：
> RUNNABLE 或者 TERMINATED

### Blocked —— 阻塞状态
处于阻塞状态的线程正在等待获取锁，然后才能进入同步块/方法。

> 也有人认为 Blocked 状态包含了下面三种，不过咱们只针对 JDK 的定义来学习，了解一下也好
Blocked 状态是线程因为某种原因失去了 CPU 使用权，暂时停止运行。直到线程进入就绪状态，才有机会转到运行状态。阻塞的情况分三种：
>  * 等待阻塞（Waiting、Timed Waiting）：通过调用线程的 wait() 方法，让线程等待某工作的完成。
>  * 同步阻塞：线程在获取 synchronized 同步锁失败(因为锁被其它线程所占用)，它会进入同步阻塞状态。
>  * 其他阻塞：通过调用线程的 sleep() 或 join() 或发出了 I/O 请求时，线程会进入到阻塞状态。当 sleep() 状态超时、join() 等待线程终止或者超时、或者 I/O 处理完毕时，线程重新转入就绪状态。

认为线程有6种状态的，也就是用 Waiting、Time Waiting 取代了 Blocked 状态，其实  Blocked 状态还有同步阻塞、其他阻塞的情况，所以分为5种更加合理。

### WAITING —— 等待状态
等待其他线程唤醒，没有任何时间限制，如果不被唤醒，线程将一直等待下去。下面三种方式都会让线程进入该状态：
  * Object.wait()
  * Thread.join()
  * LockSupport.park()

### TIMED WAITING —— 限时等待状态
在有限时间内，等待其他线程执行逻辑。如果超过等待时间，线程将继续执行。有下面几种方式让线程进入该状态：
  * Thread.sleep(long millis)
  * Object.wait(int timeout) 或 Object.wait(int timeout, int nanos)
  * Thread.join(long millis)
  * LockSupport.parkNanos
  * LockSupport.parkUntil

### Terminated —— 结束状态
线程执行完成或由于异常而退出，意味着线程的生命周期已经结束。

## 使用 Jstack 查看 JVM 虚拟机中线程的状态
JDK 自带了一个小工具 `jstack`，可以很方便查看虚拟机中所有的线程，学习了上面线程的状态，就能看懂其输出的内容了
```code
2022-06-28 15:15:55
Full thread dump Java HotSpot(TM) 64-Bit Server VM (25.202-b08 mixed mode):

"Attach Listener" #48023 daemon prio=9 os_prio=0 tid=0x00007fc568122800 nid=0x4e84 waiting on condition [0x0000000000000000]
   java.lang.Thread.State: RUNNABLE

"OkHttp TaskRunner" #47987 daemon prio=5 os_prio=0 tid=0x00007fc5ac07f800 nid=0x3d83 waiting on condition [0x00007fc515ff2000]
   java.lang.Thread.State: TIMED_WAITING (parking
	at sun.misc.Unsafe.park(Native Method)
	- parking to wait for  <0x00000006c8b00008> (a java.util.concurrent.SynchronousQueue$TransferStack)
	at java.util.concurrent.locks.LockSupport.parkNanos(LockSupport.java:215)
	at java.util.concurrent.SynchronousQueue$TransferStack.awaitFulfill(SynchronousQueue.java:460)
	at java.util.concurrent.SynchronousQueue$TransferStack.transfer(SynchronousQueue.java:362)
	at java.util.concurrent.SynchronousQueue.poll(SynchronousQueue.java:941)
	at java.util.concurrent.ThreadPoolExecutor.getTask(ThreadPoolExecutor.java:1073)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1134)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624)
	at java.lang.Thread.run(Thread.java:748)

"redisson-3-12" #47975 prio=5 os_prio=0 tid=0x00007fc5982c1800 nid=0x3965 waiting on condition [0x00007fc516033000]
   java.lang.Thread.State: WAITING (parking)
	at sun.misc.Unsafe.park(Native Method)
	- parking to wait for  <0x00000006c8b47a40> (a java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject)
	at java.util.concurrent.locks.LockSupport.park(LockSupport.java:175)
	at java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject.await(AbstractQueuedSynchronizer.java:2039)
	at java.util.concurrent.LinkedBlockingQueue.take(LinkedBlockingQueue.java:442)
	at java.util.concurrent.ThreadPoolExecutor.getTask(ThreadPoolExecutor.java:1074)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1134)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624)
	at io.netty.util.concurrent.FastThreadLocalRunnable.run(FastThreadLocalRunnable.java:30)
	at java.lang.Thread.run(Thread.java:748)

"redisson-3-11" #47972 prio=5 os_prio=0 tid=0x00007fc5982c1000 nid=0x3834 waiting on condition [0x00007fc51744b000]
   java.lang.Thread.State: WAITING (parking)
	at sun.misc.Unsafe.park(Native Method)
	- parking to wait for  <0x00000006c8b47a40> (a java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject)
	at java.util.concurrent.locks.LockSupport.park(LockSupport.java:175)
	at java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject.await(AbstractQueuedSynchronizer.java:2039)
	at java.util.concurrent.LinkedBlockingQueue.take(LinkedBlockingQueue.java:442)
	at java.util.concurrent.ThreadPoolExecutor.getTask(ThreadPoolExecutor.java:1074)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1134)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624)
	at io.netty.util.concurrent.FastThreadLocalRunnable.run(FastThreadLocalRunnable.java:30)
	at java.lang.Thread.run(Thread.java:748)
```

## 参考
1. [baeldung - Life Cycle of a Thread in Java](https://www.baeldung.com/java-thread-lifecycle)
2. [线程的六种状态](https://www.cnblogs.com/dingpeng9055/p/16307193.html)
3. [Java线程状态分析](https://fangjian0423.github.io/2016/06/04/java-thread-state/)