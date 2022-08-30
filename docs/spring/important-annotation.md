整理了在学习过程中接触到的注解、接口。

## 注解
### 1. @Import
> @Import、ImportSelector、ImportBeanDefinitionRegistrar三者可以放在一起学习

1. 可以引入其他由`@Configuration`修饰的类
2. 可以直接初始化一个普通的类

## 接口
### 1. ImportSelector
需要实现selectImports接口，该方法返回的字符串数组，每个字符串被视为一个要被注入容器的类的全限定名。

### 2. ImportBeanDefinitionRegistrar
ImportBeanDefinitionRegistrar可以人为的往spring容器中添加bean，mybatis就是使用了这种方式将mapper添加到容器中的，这其实是手动注册的一种方式，开发可以进行灵活地订制。在mybatis-spring项目中，@MapperScan进行了定义。

这种方式可以动态地注入属性、修改scope等等。
```java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@Documented
@Import(MapperScannerRegistrar.class)
@Repeatable(MapperScans.class)
public @interface MapperScan {
    // 省略无关...
}
```

### 3. BeanFactoryPostProcessor
实现该接口可以在spring的bean创建之前，修改bean的定义属性。

BeanFactoryPostProcessor是在spring容器加载了bean的定义文件之后，在bean实例化之前执行的。接口方法的入参是ConfigurrableListableBeanFactory，使用该参数，可以获取到相关bean的定义信息。

### 4. BeanDefinitionRegistryPostProcessor
该接口的执行时机是在所有bean定义信息将要被加载到BeanFactory之前执行的,进而可以知道BeanDefinitionRegistryPostProcessor接口方法应该是在BeanFactoryPostProcessor执行之前执行的。

当我们想动态注入(自定义注入)BeanDefinition或者需要干预已有的BeanDefinition被Spring加载到BeanFactory进行后续的初始化时可以使用这个接口。例如Mybatis框架中就有一个很好地实践,Mybatis在实现Mapper接口在Spring中实例化上MapperScannerConfigurer就是BeanDefinitionRegistryPostProcessor接口的一个实例。
