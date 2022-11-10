# Linux下的5种IO模型
Linux下的IO主要分为：阻塞IO、非阻塞IO、同步IO、异步IO。

同步IO：用户进程主动发起IO请求，系统内核接收请求。
异步IO：系统内核处理完成后，主动发起IO请求，通过回调的方式通知用户进程来接收请求。
阻塞IO: 用户进程发起IO请求后，会发生阻塞，直到内核IO操作彻底完成，用户进程能继续后面的操作。
非阻塞IO: 用户进程发起IO请求后，内核会立即返回状态值（不包含数据），用户进程不会阻塞，可以继续执行后面的操作。

## 用户态与内核态
为了避免用户进程直接操作内核，保证内核安全，操作系统将内存分为两部分：内核空间和用户空间。

  * 内核态：内核模块运行在内核空间，对应的进程处于内核态。内核模块即是操作系统的核心，只有它才能访问内核空间和硬件设备（如：磁盘、网卡、内存）。
  * 用户态：用户程序运行在用户空间，对应的进程就处于用户态。运行在用户态的进程不能访问内核空间的数据，不能调用内核的函数，也不能直接访问系统的硬件资源，需要将用户进程切换到内核态才能进行系统调用。

## 内核缓冲区与进程缓冲区
先说结论，**缓冲区的设计是为了减少设备间频繁的数据交换。**。

我们都知道，CPU、内存和外部设备之间的读写速度有着非常大的差距，对于外部设备的读写涉及操作系统的中断。发生中断时，需要保存进程的数据和状态信息，等中断结束后，又需要恢复之前缓存的数据和状态信息。频繁的中断会带来很大的损耗，缓冲区的设计就是为了减少这种损耗的出现。

> 注意：中断是无法避免的，缓冲区的设计仅仅是为了减少中断次数的出现。

所幸的是，操作系统会自动对内核的缓冲区进行监控，至于什么时候出现中断（包括读中断、写中断），操作系统会帮我们处理，应用程序不用关心。

以一个完整的客户端请求为例。
![system call process](./image/system-call-process.png)
```code
1. 客户端发送请求：Java客户端通过write调用将数据复制到内核缓冲区，再将内核缓冲区的数据通过网卡发送出去。
2. 服务端接收请求：服务端通过read调用将数据读入内核缓冲区，再将数据复制到Java进程缓冲区。
3. 服务端处理请求：Java从进程缓冲区中读取数据，完成业务处理。
4. 服务端数据返回：业务处理完成后，服务端通过write调用将数据从用户缓冲区写入内核缓冲区，最后将数据通过网卡返回给客户端。
5. 客户端接收数据：客户端通过read调用，将网卡中的数据读入内核缓冲区，然后复制到用户缓冲区。
```

为什么要设计的这么复杂呢？
  * 减少开发的复杂度，如果我们写的程序要访问硬件资源时，要自己去写读取硬盘的代码、读内存的代码，这无疑是及其复杂的。
  * 安全性，在有些CPU指令中，有些是非常危险的，会直接导致系统崩溃，试想一下，如果你写的代码有个bug，直接导致系统崩溃重启了，你的老板会是什么反应？

有了上述基础后，咱们再来看一下一个查询数据的请求，通常我们这样去理解：从磁盘中读取数据，然后加载到内存中，最后再将数据返回。其实内部经历了如下更为复杂的过程。
  * 用户进程发起一个系统调用
  * 内核执行指令，将数据从 [磁盘] 拷贝到 [内核buffer]
  * 将数据从 [内核buffer] 拷贝到 [用户buffer]
  * 数据拷贝完成后，返回数据

最后我们从内核空间和用户空间的角度看一看整个 Linux 系统的结构。它大体可以分为三个部分，从下往上依次为：硬件 -> 内核空间 -> 用户空间。
![kernel-and-user-space](./image/kernel-and-user-space.jpg)

 * 系统调用：为了使应用程序访问到内核的资源，如 CPU、内存、I/O，内核必须提供一组通用的访问接口，这些接口就叫系统调用。
 * 库函数：屏蔽这些复杂的底层实现细节，减轻程序员的负担，从而更加关注上层的逻辑实现，它对系统调用进行封装，提供简单的基本接口给程序员。
 * shell：顾名思义，就是外壳的意思，就好像把内核包裹起来的外壳，它是一种特殊的应用程序，俗称命令行。Shell 也是可编程的，它有标准的 Shell 语法，符合其语法的文本叫 Shell 脚本，很多人都会用 Shell 脚本实现一些常用的功能，可以提高工作效率。

## 用户态与内核态的切换
有三种情况会导致从用户态切换到内核态：
  * 系统调用：用户态进程主动切换到内核态的方式，用户态进程通过系统调用向操作系统申请资源完成工作，例如 fork（）就是一个创建新进程的系统调用，系统调用的机制核心使用了操作系统为用户特别开放的一个中断来实现，如 Linux 的 int 80h 中断，也可以称为软中断
  * 异常：当 C P U 在执行用户态的进程时，发生了一些没有预知的异常，这时当前运行进程会切换到处理此异常的内核相关进程中，也就是切换到了内核态，如缺页异常
  * 中断：当 C P U 在执行用户态的进程时，外围设备完成用户请求的操作后，会向 C P U 发出相应的中断信号，这时 C P U 会暂停执行下一条即将要执行的指令，转到与中断信号对应的处理程序去执行，也就是切换到了内核态。如硬盘读写操作完成，系统会切换到硬盘读写的中断处理程序中执行后边的操作等。

## 5种IO模型
### 同步阻塞IO
应用程序发起一个IO调用，然后就进入阻塞状态，等待数据准备好，当内核准备好数据后，再将数据拷贝到用户空间，最后返回成功的提示。其特点是整个过程完全阻塞，不能进行其他操作。
![blocking io](./image/blocking-io.jpg)

### 同步非阻塞IO
应用程序发起一个IO调用后，内核立即返回一个结果，y此时应用程序不会阻塞，而是继续执行。那如何知道数据准备好了呢？很简单，应用程序将持续轮询，直到数据准备好，在轮询的间隙，应用程序就可以作其他事情了。然后整个轮询的 过程将占用大量的CPU。
![non-blocking io](./image/non-blocking-io.jpg)

### IO多路复用
非阻塞 I/O 模型有一个特点就是用户进程需要不断地主动轮询kernel数据是否准备好，这样的操作导致CPU的占用率很高。如何规避这一个问题呢？内核给出了一个解决办法，就是 I/O 多路复用。

但是你会发现，内核也是通过轮询的方式监控 I/O 通道接口是否准备好数据，那么和用户轮询有什么区别呢？

内核不再只监控一个 I/O 通道，而是多个。和内核相比，用户进程只需要关注自己想要读写数据的 I/O 通道即可，至于系统中其他的 I/O 通道则不关心。将轮询转移到内核能减少用户进程对CPU的占用率。

主流中间件netty、redis、nginx都应用了该模型，可见该模型是多么成功。

> 注意：IO多路复用并不是非阻塞的，它只是在服务端通过一个线程去轮询多个请求的状态，用户进程在获得结果前仍然是阻塞的。
> 可以这么去理解：服务端复用了一个线程去处理多个网络请求，达到了多路复用的目的。

内核如何实现 I/O 多路复用呢？有下面三种方式。
### select
Linux提供了select，进程通过将一个或多个fd传递给select或poll系统调用，阻塞在select操作上，这样select可以帮我们侦测多个fd是否处于就绪状态。
时间复杂度 O(n)。因为 select是顺序扫描fd是否就绪，只能无差别轮询所有流，而且支持的fd数量有限（1024个），因此它的使用受到了一些制约。

### poll
时间复杂度同样是 O(n)
和 select 的区别是它轮询 I/O 通道的数量没有限制。

### epoll
时间复杂度O(1)。epoll不再通过轮询的方式检查每个I/O通道是否已经准备好数据，而是通过事件的方式，也就是每个I/O通道准备好数据之后会通过回调函数通知epoll数据已经准备好，这样epoll的时间复杂度就是O(1)，而不再是O(n)。然后epoll再通知用户进程数据已经准备好了。
想要epoll帮助用户进程监控I/O通道，那么用户进程需要到epoll上进行注册。

![multiplexing io](./image/multiplexing-io.jpg)

### 信号驱动IO
首先说明信号驱动I/O模型是确确实实的非阻塞I/O模型。

前面的非阻塞I/O模型使得用户进程不阻塞的实现方法是通过轮询的方式看内核是否准备好数据，但是在信号驱动 I/O模型中，使用信号机制实现，而不再轮询。这使得阶段一用户进程等待数据的时候确实不阻塞了。

那么信号驱动 I/O 模型如何保证用户进程不阻塞呢？

第一阶段：应用进程是调用操作系统内核提供的signal信号处理接口，但是该接口不会造成阻塞而是立即返回。当数据准备好了之后内核则再返回一个信号，告诉应用程序。
第二阶段：和前面三种模型完全一样，应用进程仍然会阻塞知道数据复制完毕。
![signal-driven io](./image/signal-driven-io.jpg)

### 异步IO
前四种模型的同质是第二阶段，在内核将数据准备好之后，通知用户进程调用系统的recvfrom方法完成数据从内核缓冲区到进程的拷贝，这时用户进程仍旧被阻塞。因为数据的拷贝是由用户进程完成，所以前四种 I/O 模型都是同步 I/O。

但是如果数据的拷贝工作由内核完成，那么这就是一个异步 I/O。顺着信号驱动模IO模型，将信号通知的时机放到数据复制完成之后，就是异步IO模型，这样从整体上来看，应用进程从来没有阻塞过，而是一直运行，直到被通知数据已经被复制到自己的空间中了。

这种模型与信号驱动模型的主要区别是：信号驱动模型由内核通知我们何时可以开始一个IO操作；异步IO模型由内核通知我们IO操作何时完成。
![async io](./image/async-io.jpg)

## 总结
只有异步IO才能真正算得上是异步IO模型，剩下的4中都是同步I/O模型：
  * 阻塞 I/O 模型
  * 非阻塞 I/O 模型
  * IO 多路复用模型
  * 信号驱动 I/O 模型

这4种都是同步模型，它们的主要区别在第一阶段，每个模型中应用进程阻塞的实现和方式不同，而在第二个阶段则全部相同，都会阻塞于内核复制数据过程。所以不管阻塞和还是不阻塞都是同步模型。它们的区别是在准备数据的过程中，应用进程是不是阻塞。
## 参考
1. [理解用户态和内核态](https://xie.infoq.cn/article/25df22c38dc0e925879ce4e9b)
2. [Linux的5种IO模型](https://xie.infoq.cn/article/df9d5150f408e600e4dedcadb)
3. [Linux的IO模型](https://www.cnblogs.com/supportmyself/p/14978168.html)