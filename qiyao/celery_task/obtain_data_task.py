# coding:utf-8
from __future__ import absolute_import
from celery_task import app

import os
import sys
import time
import MySQLdb
import traceback
from celery_task import urldata
from celery_task import init_data
from qiyao.settings import DATABASES

cwd = os.path.dirname(__file__)
package_path = os.path.join(cwd,'../')
sys.path.append(package_path)

@app.task
def checkData():
	dbconfig = DATABASES['default']
	# 打开数据库连接
	conn = MySQLdb.connect(dbconfig["HOST"], dbconfig["USER"], dbconfig["PASSWORD"], dbconfig["NAME"], charset=dbconfig["CHARSET"])
	cursor = conn.cursor()
	cursor.execute("SELECT MAX(time) from check_check;")
	data = cursor.fetchone()
	maxtime = data[0]
	print time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(maxtime))
	start_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(maxtime))
	end_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()) 
	data = urldata.outCheckData(start_time, end_time)
	strList = []
	for personid, ttime in data:
		strList.append("\n(%s,%s)" % (personid, ttime))
	check_sql = "INSERT INTO `check_check` (`person_id`,`time`) VALUES %s" % ",".join(strList)
	try:
		cursor.execute(check_sql)
	except MySQLdb.IntegrityError, e:
		#异常可能是由于，打开数据对应的员工id不存在，这时需要更新员工数据，
		#另外如果新增加了部门就会导致员工数据对应的 部门不存在，也会引发异常，捕获异常后要更新部门数据
		f=open("log.txt",'a')  
		traceback.print_exc(file=f)
		print >> f, e  
		f.flush()  
		f.close()
		init_data.updateDepartment(conn, cursor)
		cursor.execute(check_sql)
	
	# 提交事务，不然插入操作不会执行到数据库
	conn.commit()
	print "Get check data ok."
	# 关闭数据库
	conn.close()

# checkData()