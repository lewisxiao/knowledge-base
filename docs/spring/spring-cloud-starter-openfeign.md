### 介绍
Spring Cloud OpenFeign——一个用于 Spring Boot 应用程序的声明式 REST 客户端。

Feign 通过可插入注释支持（包括 Feign 注释和 JAX-RS 注释）使编写 Web 服务客户端更容易。

此外，Spring Cloud 添加了对 Spring MVC 注释的支持，并支持使用与 Spring Web 中相同的 HttpMessageConverters。

使用 Feign 的一大好处是我们不必编写任何代码来调用服务，除了接口定义。

### 添加依赖
```xml
<project>
     <dependencyManagement>
         <dependencies>
             <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring-cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>
    
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>
    </dependencies>
</project>
```

### FeignCLient
首先，在启动类上添加`@EnableFeignClients`注解
```java
@SpringBootApplication
@EnableFeignClients
public class ExampleApplication {

    public static void main(String[] args) {
        SpringApplication.run(ExampleApplication.class, args);
    }
}
```

然后，定义FeignClient接口
```java
@FeignClient(value = "jplaceholder", url = "https://jsonplaceholder.typicode.com/")
public interface JSONPlaceHolderClient {

    @RequestMapping(method = RequestMethod.GET, value = "/posts")
    List<Post> getPosts();

    @RequestMapping(method = RequestMethod.GET, value = "/posts/{postId}", produces = "application/json")
    Post getPostById(@PathVariable("postId") Long postId);
}
```

### FeignClient的组件配置
现在，Feign 客户端都由一组可定制的组件组成。

* Decoder – ResponseEntityDecoder，封装了SpringDecoder，用于对Response进行解码
* Encoder – SpringEncoder 用于对 RequestBody 进行编码。
* 记录器——Slf4jLogger 是 Feign 使用的默认记录器。
* Contract——SpringMvcContract，提供注解处理
* Feign-Builder – HystrixFeign.Builder 用于构建组件。
* Client – LoadBalancerFeignClient 或默认 Feign 客户端

### Feign的全局配置
```
feign:
  client:
    config:
      default:
        connectTimeout: 5000
        readTimeout: 5000
        loggerLevel: basic
```

### 拦截器
添加拦截器是 Feign 提供的另一个有用的功能。

拦截器可以为每个 HTTP 请求/响应执行各种隐式任务，从身份验证到日志记录。

在本节中，我们将实现自己的拦截器，并使用开箱即用的 Spring Cloud OpenFeign 提供的拦截器。 两者都会为每个请求添加一个基本的身份验证标头。

让我们自定义一个拦截器
```java
@Bean
public RequestInterceptor requestInterceptor() {
  return requestTemplate -> {
      requestTemplate.header("user", username);
      requestTemplate.header("password", password);
      requestTemplate.header("Accept", ContentType.APPLICATION_JSON.getMimeType());
  };
}
```

此外，要将拦截器添加到请求链中，我们只需要将这个 bean 添加到我们的 @Configuration 类中，或者如我们之前所见，在属性文件中声明它：
```yml
feign:
  client:
    config:
      default:
        requestInterceptors: com.example.cloud.openfeign.JSONPlaceHolderInterceptor
```

### 支持Hystrix
Feign 支持 Hystrix，所以如果我们启用了它，我们就可以实现 fallback 模式。

使用回退模式，当远程服务调用失败时，服务使用者不会产生异常，而是执行替代代码路径以尝试通过另一种方式执行操作。

为了实现这个目标，我们需要通过在属性文件中添加 feign.hystrix.enabled=true 来启用 Hystrix。

这允许我们实现在服务失败时调用的回退方法：
```java
@Component
public class JSONPlaceHolderFallback implements JSONPlaceHolderClient {

    @Override
    public List<Post> getPosts() {
        return Collections.emptyList();
    }

    @Override
    public Post getPostById(Long postId) {
        return null;
    }
}
```

为了让 Feign 知道已经提供了 fallback 方法，我们还需要在 @FeignClient 注解中设置我们的 fallback 类：
```java
@FeignClient(value = "jplaceholder",
  url = "https://jsonplaceholder.typicode.com/",
  fallback = JSONPlaceHolderFallback.class)
public interface JSONPlaceHolderClient {
    // APIs
}
```

### 日志
对于每个 Feign 客户端，默认都会创建一个记录器。

要启用日志记录，我们应该使用客户端接口的包名称在 application.properties 文件中声明它：
```yml
logging.level.com.baeldung.cloud.openfeign.client: DEBUG
```

或者，如果我们只想为包中的一个特定客户端启用日志记录，我们可以使用完整的类名：
```yml
logging.level.com.baeldung.cloud.openfeign.client.JSONPlaceHolderClient: DEBUG
```

请注意，Feign 日志记录仅响应 DEBUG 级别。

我们可以为每个客户端配置的 Logger.Level 指示要记录多少：
```java
@Configuration
public class ClientConfiguration {
    
    @Bean
    Logger.Level feignLoggerLevel() {
        return Logger.Level.BASIC;
    }
}
```

有四种日志记录级别可供选择：

* NONE – 不记录，这是默认设置
* BASIC – 仅记录请求方法、URL 和响应状态
* HEADERS - 将基本信息与请求和响应标头一起记录
* FULL – 记录请求和响应的正文、标头和元数据

## 错误处理
Feign 的默认错误处理程序 ErrorDecoder.default 总是抛出 FeignException。

现在，这种行为并不总是最有用的。 因此，要自定义抛出的异常，我们可以使用 CustomErrorDecoder：
```java
public class CustomErrorDecoder implements ErrorDecoder {
    @Override
    public Exception decode(String methodKey, Response response) {

        switch (response.status()){
            case 400:
                return new BadRequestException();
            case 404:
                return new NotFoundException();
            default:
                return new Exception("Generic error");
        }
    }
}
```

然后，就像我们之前所做的那样，我们必须通过向 @Configuration 类添加一个 bean 来替换默认的 ErrorDecoder：
```java
@Configuration
public class ClientConfiguration {

    @Bean
    public ErrorDecoder errorDecoder() {
        return new CustomErrorDecoder();
    }
}
```

## [负载均衡原理](https://blog.csdn.net/erik_tse/article/details/116062792)