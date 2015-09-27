###用户信息哈希表
|user:001|info|
|---|---|
|useId |用户ID |
|usename |用户名 |
|password |密码 |
|imageUrl |头像  |
|email    |邮箱|
|lastLoginTime|最近登陆时间|
|nickname |昵称|
###群信息哈希表
|group:001|info|
|------|------|
|groupId|群号|
|groupName|群名称|
|imageUrl|群头像|
###用户登录信息哈希表
|logined:14006|info|
|------|----|
|address |消息服务器地址|
|port |消息服务器端口|
|sessionid|密钥种子|

|Key类型|value info |exmaple|
|-----|-----|------|
|集合groupSet:(userid)|存储用户加入的群号|如groupSet:14006|
|集合friendsSet:(userid)|存储好友ID|如friendsSet:14006|
|列表unreadMsg:(userid)|存储用户二进制点对点未读消息|如unreadMsg:14006|
|键online:(userid)|存储用户在线的服务器Socket信息。|如online:14006|
|哈希表group:(group)|存储群信息|如group:1|
|列表groupMsg:(groupid)|存储二进制群消息|如groupMsg:1|
|列表groupMember:(groupid)|存储群成员ID|如:groupMember:1。|
|列表onlineGroup:(groupid)|存储当前在线群成员ID。|如：onlineGroup:1。|
|键unreadNumber:(userid):(groupid)|存储未读群消息数目。|如:unreadMember:14006:1。|
|哈希表loginMap:(userid)|存储用户登陆密钥和消息服务器信息。|如：loginMap:14006。|

有序集合serverRank存储消息服务器套接字信息及排名。
