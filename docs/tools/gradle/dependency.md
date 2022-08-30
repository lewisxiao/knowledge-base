> Gradle的版本众多，低版本的依赖配置跟高版本有些出入，但整体无太大差别。本文参照的是7.4.2版本。

## gradle-wrapper
Wrapper是对Gradle的一层包装，便于在团队开发过程中统一Gradle构建的版本号，这样大家都可以使用统一的Gradle版本进行构建。其常见配置如下：
```gradle
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https\://services.gradle.org/distributions/gradle-5.6.4-bin.zip
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
```

distributionUrl是要下载的gradle的地址，使用哪个版本的gradle，就在这里修改。
gradle的3种版本：
* gradle-xx-all.zip是完整版，包含了各种二进制文件，源代码文件，和离线的文档。
* gradle-xx-bin.zip是二进制版，只包含了二进制文件（可执行文件），没有文档和源代码。
* gradle-xx-src.zip是源码版，只包含了Gradle源代码，不能用来编译你的工程。

zipStoreBase和zipStorePath组合在一起，是下载的gradle-3.1-bin.zip所存放的位置。
zipStorePath是zipStoreBase指定的目录下的子目录。

distributionBase和distributionPath组合在一起，是解压gradle-5.6.4-bin.zip之后的文件的存放位置。
distributionPath是distributionBase指定的目录下的子目录。

下载位置可以和解压位置不一样。
zipStoreBase和distributionBase有两种取值：GRADLE_USER_HOME和PROJECT。其中，GRADLE_USER_HOME表示用户目录。在windows下是%USERPROFILE%/.gradle，例如C:\Users<user_name>.gradle\。在linux下是$HOME/.gradle，例如~/.gradle。PROJECT表示工程的当前目录，即gradlew所在的目录。

## 依赖类型

### implementation
使用implementation配置的依赖会将对应的依赖添加到编译路径，并将依赖打包输出

implementation依赖设置表示当前这个依赖在编译时只能在当前这个模块中访问，其他模块在编译时不能访问，依赖这个模块的其他模块在运行时可以访问这个库的实现

由于没有传递依赖，使用这个配置，可以显著提升构建时间，因为它可以减少重新编译的module的数量。建议，尽量使用这个依赖配置。


### api
使用api配置的依赖会将对应的依赖添加到编译路径，并将依赖打包输出

这个依赖是可以传递的，比如模块A依赖模块B，B依赖库C，模块B在编译时能够访问到库C，但是与implemetation不同的是，在模块A中库C也是可以访问的


### compileOnly
compileOnly修饰的依赖会添加到编译路径中，但是不会打包到apk中

compileOnly修饰的依赖不会传递

这可以减少输出的体积，在只在编译时需要，在运行时可选的情况，很有用。

### runtimeOnly
它修饰的依赖不会添加到编译路径中，但是被打包到apk中，运行时使用

### annotationProcessor

### testImplementation

### androidTestImplementation