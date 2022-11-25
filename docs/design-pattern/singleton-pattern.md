# 单例模式
## 饿汉式单例
饿汉式单例在类初始化时就直接被初始化，实现简单，且没有线程安全问题。但很多时候是在使用实例的时候才进行初始化，饿汉式单例就不太合适了。
```java
public class Singleton {
    private static final Singleton instance = new Singleton();
    
    private Singleton() {
    }
    
    public static Singleton getInstance() {
        return instance;
    }
}
```

## 懒汉式单例
相较于饿汉式单例，为了达到延迟初始化，于是有了懒汉式单例。使用懒汉式单例需要注意线程安全问题。

线程不安全的懒汉式单例。
```java
public class Singleton {
    private static Singleton instance;

    private Singleton() {
    }

    public static Singleton getInstance() {
        if (instance == null) {
            return new Singleton();
        }
        return instance;
    }
}
```

为了实现线程安全，下面使用内置锁来达到线程安全的目的。
```java
public class Singleton {
    private static Singleton instance;

    private Singleton() {
    }

    public static synchronized Singleton getInstance() {
        if (instance == null) {
            return new Singleton();
        }
        return instance;
    }
}
```

其实只需要在第一次初始化时加锁，后续就没必要加锁了，在方法上加内置锁，导致每次访问都要加锁，效率较低。下面使用双重检查锁来进行优化。

错误的双重检查锁。
```java
public class Singleton {
    private static Singleton instance;

    private Singleton() {
    }

    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    return new Singleton();
                }
            }
        }
        return instance;
    }
}
```
`return new Singleton();`这行初始化的代码实际上分为3步：
1. 分配内存空间
2. 初始化对象
3. 将对象指向刚分配的内存空间

编译器为了性能的原因，可能会将第二步和第三步进行重排序，顺序就成了：
1. 分配内存空间
2. 将对象指向刚分配的内存空间
3. 初始化对象

指令重排之后，获取单例可能导致问题的发生，这里假设两个线程以下面的次序执行：
1. 线程A先执行getInstance()方法，当执行到分配一块内存并将地址赋值给M后，恰好发生了线程切换。此时，线程A还没来得及将M指向的内存初始化。
2. 线程B刚进入getInstance()方法，判断if语句instance是否为空，此时的instance不为空，线程B直接获取到了未初始化的instance变量。

由于线程B得到的是一个未初始化完全的对象，因此访问instance成员变量的时候可能发生异常。

为了禁止指令重排，需要使用 volatile 来修饰变量，下面才是真正线程安全的双重检查机制。
```java
public class Singleton {
    private volatile static Singleton instance;

    private Singleton() {
    }

    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    return new Singleton();
                }
            }
        }
        return instance;
    }
}
```

双重检查机制解决了线程安全问题，但是实现相对复杂，还有一种更为简单的方式，拿就是使用静态内部类。
```java
public class Singleton {
    private Singleton() {
    }

    public static Singleton getInstance() {
        return SingletonHolder.instance;
    }

    public static class SingletonHolder {
        private static final Singleton instance = new Singleton();
    }
}
```
这种方式只有在getInstance()被调用时才去加载内部类并且初始化单例，该方式既解决了线程安全问题，又解决了写法烦琐问题。