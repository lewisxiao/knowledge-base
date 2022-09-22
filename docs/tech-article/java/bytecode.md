## 前言

设计模式中有两种代理模式：静态代理和动态代理，其本质都是创建一个代理类来给加入一些自定义的行为。但是静态代理的行为发生在编译阶段，而动态代理的行为却是在运行时阶段。

在JVM运行过程中动态地时修改类的行为，大家都知道的动态代理技术就可以做到，但是动态代理背后的核心技术是什么呢？

没错，这就是我们今天要提到的：**字节码技术**。

> 思考：
>
> 1.  动态代理跟反射有什么区别？
> 2.  能够通过反射去动态修改类的行为吗？

## JDK动态代理

JDK动态代理只能代理接口，无法代理具体的类。其有两个核心类：
\* Proxy: 用来创建代理类
\* InvocationHandler: 通过代理对象调用方法时，会转发到该类中的invoke方法调用

整体步骤分为3步：

1.  代理对象继承InvocationHandler接口，实现invoke方法，在其中完成原方法调用，并加入自定义逻辑。
2.  Proxy.newInstance创建一个代理类的实例。
3.  用代理类实例完成方法调用。

下面再介绍一下两个核心类中的关键方法参数

```java
public class Proxy implements java.io.Serializable {
    // loader: 指定了由哪个ClassLoader对象完成代理对象的加载
    // interfaces: 给代理对象提供的接口，其实就是被代理对象的接口
    // h: 代理对象在调用方法时，关联到的InvocationHandler实例
    public static Object newProxyInstance(ClassLoader loader,
                                          Class<?>[] interfaces,
                                          InvocationHandler h)
}
```

```java
public interface InvocationHandler {
    // 动态代理类的引用，通常情况下不需要它。但可以使用getClass()方法，得到proxy的Class类从而取得实例的类信息，如方法列表，annotation等
    // method: 被代理对象的method对象
    // args: 调用被代理对象时传入的参数
    public Object invoke(Object proxy, Method method, Object[] args)
        throws Throwable;
}
```

> 思考：
>
> 1.  JDK动态代理有什么使用场景？
> 2.  JDK动态代理为什么只能代理接口，却不能代理类？
> 3.  反射能不能用来做动态代理？

## 字节码

上面说了JDK动态代理的接口、功能，实际上可以用一句话总结：通过动态生成字节码，然后将其加载成Class。深入一点去分析一下Proxy.newInstance的源代码，就能得到这个结果。

借助于JVM虚拟机，针对各个操作系统都进行了定制，通过javac命令将`.java`文件编译一个固定格式的`.class`字节码文件。`.class`文件由16进制值组成，JVM虚拟机以字节为单位进行读取。

### .class文件的构成

两种数据类型：无符号数和表

了解了`.class`文件的字节码构成，目的还是为了应用。市面上也有很多成熟的字节码操作框架，下面我们来一一介绍。

## 字节码操作框架

### ASM

### Javaassist

### CGLib

### JDK的Proxy

## 工具

1.  16进制查看工具 ——  010editor、UltraEdit、WinHex

## 参考

1.  <https://blog.csdn.net/Moonxiyue/article/details/125245348>
2.  <https://blog.csdn.net/wuraox/article/details/119568749>
3.  <https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-4.html#jvms-4.1>
4.  <https://www.jianshu.com/p/a7057a85bd74>
5.  <https://www.cnblogs.com/cd-along/p/14876464.html>

