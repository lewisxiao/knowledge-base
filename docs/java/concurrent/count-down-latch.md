# CountDownLatch
一个用于线程间同步的辅助工具类，允许一个或多个线程等待，直到在其他线程中的操作完成。

该类比较简单，仅其包含两个核心方法：
```java
public class CountDownLatch {
    /**
     * 使当前线程等待直到锁存器倒计时到零，除非线程被中断。
     */
    public void await() throws InterruptedException;

    /**
     * 使当前线程等待直到锁存器倒计时到零，除非线程被中断，或者指定的等待时间已过。
     */
    public boolean await(long timeout, TimeUnit unit);

    /**
     * 计数器减一，如果计数器减一后值为0，则唤醒所有等待的线程。
     *
     */
    public void countDown();
}
```

结合其特点，该类可用来确保某些活动直到其它活动都完成后才继续执行。是一个轻量版的`CompletableFuture`。还有一个`CyclicBarrier`与该类的功能比较相似，可以结合一起学习。

例子：
```java
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

public class CountDownLaunchDemo {
    public static void main(String[] args) throws InterruptedException {
        CountDownLatch countDownLatch = new CountDownLatch(1);

        new Thread(() -> {
            try {
                System.out.println("begin to do something...");
                TimeUnit.SECONDS.sleep(3);
                System.out.println("finished");

                // 线程已经执行完，计数器减1
                countDownLatch.countDown();
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }).start();

        // 等待上面的线程执行完
        countDownLatch.await();
        System.out.println("main thread finished");
    }
}
```

## 底层原理