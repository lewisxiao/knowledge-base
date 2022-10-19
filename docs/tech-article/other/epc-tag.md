# EPC标签
EPC标签分为四个区，RESERVED区、EPC区、TID区、USER区。EPC区作为一个可以进行读写的区域，经常被使用到。

# 单位
常用的单位有3个：
  * 位 —— bit
  * 字节 —— byte
  * 字 —— word

它们之间的换算关系如下：
  * 1 byte = 8 bit
  * 1 word = 2 byte = 16 bit = 4位16进制数字

注意了，EPC 中是以16进制的格式存储数据的。比如 96 bit 的 EPC 区，可以存储24位16进制数字（0-F）。而对 EPC 区域进行读写的时候，都是以 word 为单位进行读写的，那最少也要读或者写4位十六进制数字。

 # EPC存储区
 EPC存储区也分了三个部分，依次按序存放：
  * CRC检验区 —— 占2个字节，16位数字
  * PC控制区 —— 占2个字节，16位数字
  * EPC码

PC控制区的前5位指定了 EPC 的长度，举例：
```code
00000：PC+EPC的长度为1个字（EPC长度为0，PC长度固定位1个字）

00001：PC+EPC的长度为2个字（EPC长度为1个字，2个字节，16bits，PC长度固定位1个字）

00010：PC+EPC的长度为3个字（EPC长度为2个字，4个字节，32bits，PC长度固定位1个字）
```


# 参考
1. [GS1's EPC Tag Data Standard —— 国际标准](https://www.gs1.org/standards/epc-rfid-epcis-id-keys/epc-rfid-tds/1-111)
2. [ISO18000-6C电子标签](https://baike.baidu.com/item/ISO18000-6C%E7%94%B5%E5%AD%90%E6%A0%87%E7%AD%BE/8050092?fr=aladdin)
3. [关于EPC中存储数据的说明](https://www.toutiao.com/article/6858290860803490319/?app=news_article&timestamp=1596820304&use_new_style=1&req_id=20200808011144010130036145372A1F5E&group_id=6858290860803490319&wxshare_count=3&tt_from=weixin&utm_source=weixin&utm_medium=toutiao_android&utm_campaign=client_share&from=timeline&source=m_redirect)
4. [RFID标签EPC物品编码区PC协议控制字编码解析](https://blog.csdn.net/aa804738534/article/details/115111469)