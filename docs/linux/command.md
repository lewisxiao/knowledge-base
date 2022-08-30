## ll: 查询文件或文件夹的磁盘使用空间

## du: 查询看当前目录下文件的磁盘使用空间

## 打包成tar.gz格式压缩包
tar -zcvf renwolesshel.tar.gz /renwolesshel

## 解压tar.gz格式压缩包
tar zxvf renwolesshel.tar.gz

## 压缩成zip格式
zip -q -r renwolesshel.zip renwolesshel/

## 解压zip格式的压缩包
unzip renwolesshel.zip

## 查看端口占用情况
```shell
1、根据进程名查看进程信息，以查看tomcat进程名为例，查看所对应的进程id为1095(或者使用： ps -aux | grep tomcat 查看占用内存等信息)

ps -ef | grep tomcat

2、根据进程id查看进程占用端口，查看对应端口为8080（如果没有netstat命令，使用 yum -y install net-tools安装）

netstat -nap | grep 1095

3、根据端口查看对应进程，查看占用8080端口的进程id，为1095

netstat -tunlp | grep 8080

4、根据进程id查看进程信息，查看进程id为1095的进程信息

ps -ef | grep 1095

5、根据进程id杀死进程，杀死进程id为1095的进程

kill -9 1095
————————————————
版权声明：本文为CSDN博主「爪哇_克劳德_武汉」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/JavaTeachers/article/details/104705398/
```