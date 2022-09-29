线程一旦开始就会一直执行，除非正常结束、或者遇到异常退出，没有其它任何办法强制一个线程结束。有人就要说了：调用 Thread 中的 interrupt 方法不就可以终止线程了吗？这显然是一种错误的认知。

举个例子：
  1. 创建一个子线程 thread，并执行
  2. 刚开始控制台会持续打印“执行中”
  3. 1秒钟后，main 线程试图调用 thread.interrupt() 来终止线程
  4. 子线程检测到中断标志位为 true，打印“子线程被中断了”（注意：此时子线程还在执行，并未中断），接着马上调用 Thread.interrupted() 清除中断标志
  5. 子线程继续执行，并打印“执行中”
```java
public class InterruptDemo {
    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            while (true) {
                if (Thread.currentThread().isInterrupted()) {
                    System.out.println("子线程被中断了");
                    boolean flag = Thread.interrupted();
                    System.out.println("清除中断标志：" + flag);
                } else {
                    System.out.println("执行中");
                }
            }
        });
        thread.start();
        TimeUnit.SECONDS.sleep(1);
        thread.interrupt();
        TimeUnit.SECONDS.sleep(1);
    }
}

控制台输出结果：
D:\software\Java\jdk1.8.0_202\bin\java.exe...
执行中
执行中
执行中
执行中
执行中
执行中
执行中
子线程被中断了
清除中断标志：true
执行中
执行中
执行中
Process finished with exit code 0
```

上面涉及到 Thread 类中的三个关键方法：
  * void interrupt()  
    向线程发送中断请求。线程的中断状态将被设置为true。如果目前该线程被一个sleep调用阻塞，那么，InterruptedException异常被抛出。

  * static boolean interrupted()  
    测试当前线程（即正在执行这一命令的线程）是否被中断。注意，这是一个静态方法。这一调用会产生副作用——它将当前线程的中断状态重置为false。

  * boolean isInterrupted()  
    测试线程是否被终止。不像静态的中断方法，这一调用不改变线程的中断状态

Java语言层面也并未要求一个被中断的线程应该立刻终止，试图调用 `interrupt` 方法来中断线程不过是发起一个中断的请求，被中断的线程可以选择忽略、也可以选择立即中断。

我们经常会看到下面这样的代码，要特别注意了，这其实是一种不好的实践，除非是逻辑要求等待几秒，然后恢复，否则尽量不要这么写。
```java
try {
    ...
    Thread.currentThead.sleep(3000);
    ...
} catch (InterruptedException e) {
    // Do noting
}
```

这种情况有两种处理方式：
  * 在catch子句中调用Thread.currentThread().interrupt()来设置中断状态。于是，调用者可以对其进行检测。
    ```java
    try {
        ...
        Thread.currentThead.sleep(3000);
        ...
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    ```
  * 或者throws InterruptedException标记你的方法，不采用try语句块捕获异常。于是，调用者（或者，最终的run方法）可以捕获这一异常。
    ```java
    void task() throws InterrupedException {
        ...
        Thread.currentThead.sleep(3000);
        ...
    }
    ```