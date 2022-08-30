#### 1. buildScript和allProjects中的repositories有什么区别？
buildscript中的声明是gradle在构建项目时自身需要使用的资源。可以声明的资源包括依赖项、第三方插件、maven仓库地址等。gradle在执行脚本时，会优先执行buildscript代码块中的内容，然后才会执行剩余的build脚本。

而allprojects声明的却是所有module所需要使用的资源，就是说你的每个module都需要用同一个第三库的时候，可以在allprojects里面声明。


所以buildScript中的repositories是为了gradle脚本自身的执行而用的，跟具体项目无关，比如：构建时使用到的插件就是从buildScript中的repositories获取的。

用同样的思路，也可以理解buildScript中的dependencies和allProjects中的dependencies区别了。


#### 2. allProjects和subProjects有什么区别？
allprojects是对所有project的配置，包括Root Project。而subprojects是对所有Child Project的配置


#### 3. Gradle的生命周期有哪些？每一步都做了什么？
[这篇讲的还可以](https://www.jianshu.com/p/498ae3fabe6f)，如果需要全面学习，那就看[官网](https://docs.gradle.org/current/userguide/build_lifecycle.html)吧