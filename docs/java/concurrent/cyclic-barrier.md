# CyclicBarrier
一个用于线程间同步的辅助工具类，允许一组线程相互等待，直到所有的线程到达屏障点（Barrier的由来）。屏障是可循环的，每次被使用完成后，下次仍然可以继续使用。

CyclicBarrier 还支持一个回调函数，待所有线程到达屏障点后执行，可用于修改共享的状态。

例子：
```java
import java.util.concurrent.BrokenBarrierException;
import java.util.concurrent.CyclicBarrier;
import java.util.concurrent.TimeUnit;

public class CyclicBarrierDemo {
    public static void main(String[] args) {
        CyclicBarrier barrier = new CyclicBarrier(5, () -> {
            // 所有线程都已到达屏障点，在继续之前，先执行该回调方法
            System.out.println("All finished, go!!!");
        });

        for (int i = 0; i < 5; i++) {
            int index = i;
            new Thread(() -> {
                try {
                    System.out.println("sub " + index + " start...");
                    TimeUnit.SECONDS.sleep(2);

                    // 等待所有线程到达
                    barrier.await();
                    System.out.println("sub " + index + " finished");
                } catch (InterruptedException | BrokenBarrierException e) {
                    throw new RuntimeException(e);
                }
            }).start();
        }

        // 跟 CountDownLatch 不同，主线程不会阻塞
        System.out.println("main finished");
    }
}
```

## CountDownLatch VS CyclicBarrier
二者都是用于控制并发的工具类，都可以理解为一个计数器，但是二者的侧重点不同：
  * CountDownLatch强调一个线程等多个线程完成某件事情。CyclicBarrier是多个线程互等，等大家都完成，再携手共进。
  * CountDownLatch 的计数器归零后，就不能再重用；而 CyclicBarrier 没有这个限制，重置后又可以继续使用。

## 底层原理