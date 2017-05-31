# -*- coding: utf-8 -*-
import emaildata
from celery_task import urldata
import time
import MySQLdb
from qiyao.settings import DATABASES 

# 员工信息和部门信息
def createSql():
	personList, departmentList = urldata.outPersonData()
	email_data = emaildata.dataTable
	personSqlStrList = []
	for person in personList:
		mail = email_data.get("%s" % person[1], "")
		personSqlStrList.append("\n(%s,'%s','%s','%s',%s,%s,'%s')" % (person[0], person[1], mail, urldata.password , person[2], person[3], person[4]))
	person_sql = """INSERT INTO `check_person` (`id`, `name`, `email`, `password`, `department_id`, `sex`, `phone`)\n VALUES %s;""" % ','.join(personSqlStrList)
				
	departmentSqlStrList = []
	for dapartment in departmentList:
		departmentSqlStrList.append("\n(%s,'%s')" % (dapartment [0], dapartment[1]))
	department_sql = "INSERT INTO `check_department` (`id`, `name`) VALUES %s;" % ','.join(departmentSqlStrList)
	return person_sql, department_sql  

# 初始导出打卡数据
def checkTimeSql():
	start_time = "2017-4-24 15:00:00"
	end_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()) 
	data = urldata.outCheckData(start_time, end_time)
	strList = []
	for personid, ttime in data:
		strList.append("\n(%s,%s)" % (personid, ttime))
	check_sql = "INSERT INTO `check_check` (`person_id`,`time`) VALUES %s" % ",".join(strList)
	return check_sql

def main():
	dbconfig = DATABASES['default']
	# 打开数据库连接
	conn = MySQLdb.connect(dbconfig["HOST"], dbconfig["USER"], dbconfig["PASSWORD"], dbconfig["NAME"], charset=dbconfig["CHARSET"])

	cursor = conn.cursor()
	cursor.execute("select count(*) from check_department;")
	d_count = cursor.fetchone()[0]  # 部门数
	cursor.execute("select count(*) from check_person;")
	p_count = cursor.fetchone()[0]  # 员工数
	cursor.execute("select count(*) from check_check;")
	c_count = cursor.fetchone()[0]  # 打卡数据数量
	
	count = p_count + d_count 
	
	if count == 0:
		print "初始化员工数据"
		insertPerson, insertDepartment = createSql()
		# 执行插入语句
		cursor.execute(insertDepartment)
		cursor.execute(insertPerson)
	else:
		print "员工、部门 数据表已经有数据，不允许重复初始化"
	if c_count == 0:
		pass
		insertCheck = checkTimeSql()
		cursor.execute(insertCheck)
	else:
		print "打卡数据表已经有数据，不允许重复初始化"
	
	
	
	# 提交事务，不然插入操作不会执行到数据库
	conn.commit()
	print "初始化数据完成。"
	# 关闭数据库
	conn.close()


#更新部门数据，只插入不存在的数据
def updateDepartment(conn = None, cursor = None):
	if not conn:
		dbconfig = DATABASES['default']
		# 打开数据库连接
		conn = MySQLdb.connect(dbconfig["HOST"], dbconfig["USER"], dbconfig["PASSWORD"], dbconfig["NAME"], charset=dbconfig["CHARSET"])
	
		cursor = conn.cursor()
	# 查询部门id
	department_sql_str = "SELECT `id` FROM check_department;"
	cursor.execute(department_sql_str)
	result = cursor.fetchall()
	department_id_set = set()
	for i in result:
		department_id_set.add(str(i[0]))
	print department_id_set
	# 查询角色id
	person_sqlstr = "SELECT `id` FROM check_person;"
	cursor.execute(person_sqlstr )
	result = cursor.fetchall()
	person_id_set = set()
	for i in result:
		person_id_set.add(str(i[0]))
	print person_id_set

	#创建新建部门sql语句	
	personList, departmentList = urldata.outPersonData(department_id_set,person_id_set)
	departmentSqlStrList = []
	for dapartment in departmentList:
		if dapartment[0] in department_id_set:
			continue
		departmentSqlStrList.append("\n(%s,'%s')" % (dapartment [0], dapartment[1]))
	if len(departmentSqlStrList) > 0:
		department_sql = """INSERT INTO `check_department` (`id`, `name`) VALUES %s;""" % ','.join(departmentSqlStrList)

	
	#创建新增员工sql语句
	email_data = emaildata.dataTable
	personSqlStrList = []
	for person in personList:
		print type(person[0]),person[0]
		if person[0] in person_id_set:
			continue
		mail = email_data.get("%s" % person[1], "")
		personSqlStrList.append("\n(%s,'%s','%s','%s',%s,%s,'%s')" % (person[0], person[1], mail, urldata.password , person[2], person[3], person[4]))
	if len(personSqlStrList) > 0:
		person_sql = """INSERT INTO `check_person` (`id`, `name`, `email`, `password`, `department_id`, `sex`, `phone`)\n VALUES %s;""" % ','.join(personSqlStrList)
	
	if len(departmentSqlStrList) > 0:
		print department_sql
		cursor.execute(department_sql)
		
	if len(personSqlStrList) > 0:
		print person_sql
		cursor.execute(person_sql)
	
	# 提交事务，不然插入操作不会执行到数据库
	conn.commit()
	

if __name__ == '__main__':
	main()
# 	updateDepartment()
