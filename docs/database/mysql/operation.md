> 有时需要查看mysql服务器中正在执行sql的数据库连接，以帮助了解运行状况、排查问题

# 有哪些方式
## 第一种：show processlist
* 拥有PROCESS权限，可以看到所有线程，甚至那些属于其他用户的线程。否则(没有PROCESS权限)，非匿名用户可以访问自己线程的信息。
* 该命令只能查看前100个连接，如果要查看全部，需要用`show full processlist`


## 第二种：select * from information_schema.processlist
* 拥有PROCESS权限，可以看到所有线程，甚至那些属于其他用户的线程。否则(没有PROCESS权限)，非匿名用户可以访问自己线程的信息。
* 该命令是sql语句，可以增加where条件进行筛选


## 参数说明
| 字段名 | 说明 |
| --- | --- |
| 连接的id | 要kill一个语句的时候很有用 |
| user | 当前连接用户 |
| host | 发起连接的客户端的ip和port |
| db | 连接的数据库，如果没有选择，则为NULL |
| command | 客户端线程正在执行的命令类型，一般有休眠（sleep），查询（query），连接（connect），例如会话空闲则休眠 |
| time | 连接持续时间，单位是秒 |
| state | 指示线程正在做什么的动作、事件或状态。大多数状态对应于非常快速的操作。如果一个线程在给定状态中停留了许多秒，那么可能存在需要调查的问题。 |
| info | 线程正在执行的语句，如果没有执行语句，则为NULL。该语句可以是发送到服务器的语句，也可以是最内层的语句(如果该语句执行其他语句的话)。例如，如果一个CALL语句执行一个正在执行SELECT语句的存储过程，则Info值显示SELECT语句。 |

command和state的类型比较多，下面列出比较常见的：
[State状态](https://note.youdao.com/yws/public/resource/0ffa12d5477b1d737264f0b14ebb2ec9/xmlnote/WEBRESOURCE85cf17b29465b784cdf1b1b91a036fa7/14728)
[Command状态](https://note.youdao.com/yws/public/resource/0ffa12d5477b1d737264f0b14ebb2ec9/xmlnote/WEBRESOURCE8177ef91c3b6253e34429066d6969442/14730)


# 发现某个连接阻塞，如何kill掉
kill #{id}，id可用上面的命令查出来

# 参考
https://blog.csdn.net/dreamyuzhou/article/details/123312920