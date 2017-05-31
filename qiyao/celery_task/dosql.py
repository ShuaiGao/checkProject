# -*- coding: UTF-8 -*-

import MySQLdb

#打开数据库连接
conn = MySQLdb.connect("localhost", "root", "0987abc123", "qiyao", charset='utf8')

#使用cursor() 方法获取操作游标
cursor = conn.cursor()

#使用ececute方法执行sql语句
cursor.execute("SELECT MAX(`time`) FROM `check_check`;")
# conn.commit()
#使用fetchone() 方法获取一条数据库数据
data = cursor.fetchone()
print data[0] or 0
# data = cursor.fetchall()
# print type(data)
# for i in data:
# 	print i[0], i[1].encode("utf-8"),type(i)

# print "Database version: %s"%data

# 关闭数据库
conn.close()
