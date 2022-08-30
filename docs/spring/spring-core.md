##### IoC容器
DI注入的两种形式
  * 构造函数注入
  * setter注入

那要使用构造函数注入，还是setter注入？
> 对于必须的依赖，使用构造函数注入；对于可选的依赖，使用setter注入。构造函数注入，可以有效避免依赖的对象为null，且都被有效地初始化了。setter注入，在别处使用时，可能要花很多时间去检查是否为null。

什么是循环依赖，如何解决循环依赖？
> 假如有两个类, classA 和 classB，classA中依赖了classB，classB中依赖了classA，这就是循环依赖。如果使用的是构造函数注入，spring会在启动时，检测到这个错误，并抛出`BeanCurrentlyInCreationException`异常。解决方法是使用setter注入，不使用构造函数注入。

Spring初始化，启动时，会开启多少个IoC容器？

Ganf of Four(GoF) patterns

Spring中，bean的Scope有多少种?
>在Spring中，共有6中scope，主要的两种是singleton和prototype。使用的原则是：对于无状态的对象，使用singleton，对于有状态的对象，使用prototype。补充一点：bean都是有生命周期的，我们也可以自定义自己的scope。

bean的配置，支持注解和xml配置，两者相比各自有什么特点？
>注解更简洁，但是会分散到各个类中，而且每一个修改，都需要重新编译。

>xml冗长，但是很集中，很容易看清各个bean之间的依赖关系，修改不需要重新编译。

[autowire by name的解释](https://www.mkyong.com/spring/spring-autowiring-by-name/)

[autowire by type的解释](https://www.mkyong.com/spring/spring-autowiring-by-type/)

Bean有id，name，那id和name的作用是什么？
>IoC容器根据id或者name查找、定位Bean。id只能有一个，name可以有多个。在IoC容器中，不同的bean，id或者name一定是唯一的。

Spring中一些常用的注解
>@Bean、@Autowired、@Resource、@Concifugration、@Primary、@Component、@Repository、@Service、@Controller、@Component

Bean的生命周期是怎样的？如何去复写这些生命周期？

`@Bean`注解的含义是什么？
>The @Bean annotation is used to indicate that a method instantiates, configures, and initializes a new object to be managed by the Spring IoC container.

`@Configuration`注解的含义是什么？
>Annotating a class with @Configuration indicates that its primary purpose is as a source of bean definitions. Furthermore, @Configuration classes let inter-bean dependencies be defined by calling other @Bean methods in the same class. 

Bean有加载顺序吗？如果有，我们通过什么方式去控制这个顺序。

Java的ClassLoader之双亲委托。
>从下至上委托，从上至下查找。从下往上走时，先查找缓存，缓存如果没有命中，则委托给父加载器（不一定是父类）。最后由父加载器层层返回。

##### Resources

##### Validation, Data Binding and Type Conversion

##### Spring Expression Language(SpEL)

##### Aspect Oriented Programming

##### Srping Data Access
什么是全局事务、本地事务？
>[Java中的事务——全局事务与本地事务](http://www.hollischuang.com/archives/1678)

声明式事务与编程式事务
>大多数情况下，推荐使用声明式事务

Java中的事务有哪几种？分布式事务的解决方案有哪几种？
>JDBC事务、JTA(Java Transaction API)事务、容器事务。[Java中的事务——JDBC事务和JTA事务](http://www.hollischuang.com/archives/1658)

SPI--Service Provider Interface

Spring中跟事务相关的几个重要抽象类
> PlatformTransactionManager、TransactionStatus、TransactionDefinition、TransactionException

事务的默认配置是怎样的？
>The propagation setting is REQUIRED.  
The isolation level is DEFAULT.  
The transaction is read-write.  
The transaction timeout defaults to the default timeout of the underlying transaction system or none if timeouts are not supported.  
Any RuntimeException triggers rollback, and any checked Exception does not.

几个注解
>@import: 通过导入的方式，把实例注入到Spring IOC容器中。查看@import的源代码可以发现，这个注解只能用在特定的类上。
