# -*- coding: utf-8 -*-

import urllib2
import md5
import time
import json

# 默认密码的MD5码
pas = md5.new()   
pas.update("123456")
password = pas.hexdigest()

# 打卡记录url
def getCheckDataURL(time_1_str, time_2_str, page):
	nowtime = int(time.time())
	param = {
		'account':'125865c1aedf7f1f6292a0d678a4e659',
		'requesttime':nowtime,
		"start":time_1_str,
		"end":time_2_str,
		'sign':'YYK123456b',
		'page':int(page)
		}
	url = "http://kq.qycn.com/index.php/Api/Api/recordlog?account=%s&end=%s&page=%d&requesttime=%d&start=%s&sign=%s"
	src = "%s%s%d%d%s%s"
	param_str = src%(param['account'], param['end'], param['page'], param['requesttime'], param['start'], param['sign'])
	m1 = md5.new()   
	m1.update(param_str)   
	src = url%(param['account'], param['end'], param['page'], param['requesttime'], param['start'], m1.hexdigest())
	return src

# 员工信息url
def getPersonUrl(page):
	nowtime = int(time.time())
	param = {
		'account':'125865c1aedf7f1f6292a0d678a4e659',
		'requesttime':nowtime,
		'sign':'YYK123456b',
		'page':int(page)
		}
	url = "http://kq.qycn.com/index.php/Api/Api/getEmployee?account=%s&page=%d&requesttime=%d&sign=%s"
	src = "%s%d%d%s"
	param_str = src%(param['account'], param['page'], param['requesttime'], param['sign'])
	m1 = md5.new()   
	m1.update(param_str)   
	src = url%(param['account'], param['page'], param['requesttime'], m1.hexdigest())
	return src

# 员工详细信息url
def getPersonInfoUrl(useraccount):
	nowtime = int(time.time())
	param = {
		'account':'125865c1aedf7f1f6292a0d678a4e659',
		'requesttime':nowtime,
		'sign':'YYK123456b',
		'useraccount':useraccount
		}
	url = "http://kq.qycn.com/index.php/Api/Api/getUserDetail?account=%s&requesttime=%d&useraccount=%s&sign=%s"
	src = "%s%d%s%s"
	param_str = src%(param['account'], param['requesttime'], param['useraccount'], param['sign'])
	m1 = md5.new()   
	m1.update(param_str)   
	src = url%(param['account'], param['requesttime'], param['useraccount'], m1.hexdigest())
	return src

ss = '''
{"status":1,"error":"","data":{"total":"548","totalpage":11,"page":1,"attendata":[
{"atten_id":"145400741",
"atten_device":"3394154900086",
"atten_uid":"1541764",
"atten_type":"1",
"atten_status":"255",
"atten_time":"1488382371",
"atten_date":"2017-03-01",
"companyId":"264327",
"realname":"\u738b\u6052\u5e05",
"departname":"\u5b9a\u6d77",
"remark":"\u8003\u52e4\u673a1"},
{"atten_id":"145400317","atten_device":"3394154900086","atten_uid":"1621806","atten_type":"1","atten_status":"255","atten_time":"1488382122","atten_date":"2017-03-01","companyId":"264327","realname":"\u90d1\u658c\u6208","departname":"\u624b\u6e382","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145400130","atten_device":"3394154900086","atten_uid":"1278563","atten_type":"1","atten_status":"255","atten_time":"1488381805","atten_date":"2017-03-01","companyId":"264327","realname":"\u5434\u6cfd\u94d6","departname":"\u65a9\u4ed92","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145399837","atten_device":"3394154900086","atten_uid":"1278623","atten_type":"1","atten_status":"255","atten_time":"1488381505","atten_date":"2017-03-01","companyId":"264327","realname":"\u7a0b\u5e86\u519b","departname":"\u65a9\u4ed92","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145399692","atten_device":"3394154900086","atten_uid":"1331681","atten_type":"1","atten_status":"255","atten_time":"1488381386","atten_date":"2017-03-01","companyId":"264327","realname":"\u5218\u9e4f","departname":"\u516c\u5171\u652f\u6301\u90e8","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145399610","atten_device":"3394154900086","atten_uid":"1624817","atten_type":"1","atten_status":"255","atten_time":"1488381311","atten_date":"2017-03-01","companyId":"264327","realname":"\u9648\u5065\u6b23","departname":"\u624b\u6e382","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145399534","atten_device":"3394154900086","atten_uid":"1278565","atten_type":"1","atten_status":"255","atten_time":"1488381203","atten_date":"2017-03-01","companyId":"264327","realname":"\u9648\u667a\u521a","departname":"\u65a9\u4ed92","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145399253","atten_device":"3394154900086","atten_uid":"1624818","atten_type":"1","atten_status":"255","atten_time":"1488380897","atten_date":"2017-03-01","companyId":"264327","realname":"\u5434\u4e1c\u6210","departname":"\u624b\u6e382","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145399244","atten_device":"3394154900086","atten_uid":"1630698","atten_type":"1","atten_status":"255","atten_time":"1488380889","atten_date":"2017-03-01","companyId":"264327","realname":"\u738b\u6dfc","departname":"\u624b\u6e381","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145399126","atten_device":"3394154900086","atten_uid":"1653069","atten_type":"1","atten_status":"255","atten_time":"1488380744","atten_date":"2017-03-01","companyId":"264327","realname":"\u5434\u9526\u6d9b","departname":"\u624b\u6e382","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145398892","atten_device":"3394154900086","atten_uid":"1493895","atten_type":"1","atten_status":"255","atten_time":"1488380542","atten_date":"2017-03-01","companyId":"264327","realname":"\u53f6\u575a\u6587","departname":"\u65a9\u4ed92","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145398888","atten_device":"3394154900086","atten_uid":"1278598","atten_type":"1","atten_status":"255","atten_time":"1488380539","atten_date":"2017-03-01","companyId":"264327","realname":"\u5218\u660a","departname":"\u65a9\u4ed92","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145398617","atten_device":"3394154900086","atten_uid":"1614480","atten_type":"1","atten_status":"255","atten_time":"1488380379","atten_date":"2017-03-01","companyId":"264327","realname":"\u5434\u5609\u742a","departname":"\u624b\u6e383","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145398584","atten_device":"3394154900086","atten_uid":"1278633","atten_type":"1","atten_status":"255","atten_time":"1488380304","atten_date":"2017-03-01","companyId":"264327","realname":"\u738b\u5b50\u6587","departname":"\u624b\u6e381","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145398493","atten_device":"3394154900086","atten_uid":"1620784","atten_type":"1","atten_status":"255","atten_time":"1488380159","atten_date":"2017-03-01","companyId":"264327","realname":"\u5f20\u731b","departname":"\u624b\u6e382","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145398487","atten_device":"3394154900086","atten_uid":"1596454","atten_type":"1","atten_status":"255","atten_time":"1488380148","atten_date":"2017-03-01","companyId":"264327","realname":"\u79e6\u56fd\u9716","departname":"\u624b\u6e382","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145398414","atten_device":"3394154900086","atten_uid":"1588024","atten_type":"1","atten_status":"255","atten_time":"1488380003","atten_date":"2017-03-01","companyId":"264327","realname":"\u949f\u7fe0\u82ac","departname":"\u624b\u6e382","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145398412","atten_device":"3394154900086","atten_uid":"1614551","atten_type":"1","atten_status":"255","atten_time":"1488379998","atten_date":"2017-03-01","companyId":"264327","realname":"\u5ed6\u9510\u654f","departname":"\u7f8e\u672f\u516c\u5171\u90e8","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145398361","atten_device":"3394154900086","atten_uid":"1698095","atten_type":"1","atten_status":"255","atten_time":"1488379917","atten_date":"2017-03-01","companyId":"264327","realname":"\u8463\u660e\u798f","departname":"\u624b\u6e382","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145398341","atten_device":"3394154900086","atten_uid":"1551930","atten_type":"1","atten_status":"255","atten_time":"1488379883","atten_date":"2017-03-01","companyId":"264327","realname":"\u674e\u6839","departname":"\u624b\u6e383","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145398308","atten_device":"3394154900086","atten_uid":"1278627","atten_type":"1","atten_status":"255","atten_time":"1488379848","atten_date":"2017-03-01","companyId":"264327","realname":"\u9648\u5c0f\u9752","departname":"\u65a9\u4ed92","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145398193","atten_device":"3394154900086","atten_uid":"1697081","atten_type":"1","atten_status":"255","atten_time":"1488379669","atten_date":"2017-03-01","companyId":"264327","realname":"\u9ec4\u9e3f\u7fd4","departname":"\u624b\u6e382","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145398057","atten_device":"3394154900086","atten_uid":"1578749","atten_type":"1","atten_status":"255","atten_time":"1488379469","atten_date":"2017-03-01","companyId":"264327","realname":"\u90d1\u91d1\u4e30","departname":"\u624b\u6e382","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145397888","atten_device":"3394154900086","atten_uid":"1591928","atten_type":"1","atten_status":"255","atten_time":"1488379183","atten_date":"2017-03-01","companyId":"264327","realname":"\u7f57\u9633","departname":"\u624b\u6e382","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145397859","atten_device":"3394154900086","atten_uid":"1278587","atten_type":"1","atten_status":"255","atten_time":"1488379142","atten_date":"2017-03-01","companyId":"264327","realname":"\u9648\u5fd7\u5f3a","departname":"\u7f8e\u672f\u516c\u5171\u90e8","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145397824","atten_device":"3394154900086","atten_uid":"1620782","atten_type":"1","atten_status":"255","atten_time":"1488379107","atten_date":"2017-03-01","companyId":"264327","realname":"\u6768\u94c1\u7426","departname":"\u7f8e\u672f\u516c\u5171\u90e8","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145397762","atten_device":"3394154900086","atten_uid":"1635713","atten_type":"1","atten_status":"255","atten_time":"1488379025","atten_date":"2017-03-01","companyId":"264327","realname":"\u5468\u6893\u5065","departname":"\u5b9a\u6d77","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145397352","atten_device":"3394154900086","atten_uid":"1622477","atten_type":"1","atten_status":"255","atten_time":"1488378687","atten_date":"2017-03-01","companyId":"264327","realname":"\u6731\u5fd7\u52c7","departname":"\u624b\u6e382","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145397175","atten_device":"3394154900086","atten_uid":"1611639","atten_type":"1","atten_status":"255","atten_time":"1488378620","atten_date":"2017-03-01","companyId":"264327","realname":"\u4e25\u9896\u711c","departname":"\u7efc\u5408\u90e8","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145397082","atten_device":"3394154900086","atten_uid":"1653068","atten_type":"1","atten_status":"255","atten_time":"1488378566","atten_date":"2017-03-01","companyId":"264327","realname":"\u674e\u5f25","departname":"\u624b\u6e382","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145397012","atten_device":"3394154900086","atten_uid":"1582348","atten_type":"1","atten_status":"255","atten_time":"1488378461","atten_date":"2017-03-01","companyId":"264327","realname":"\u6797\u6d01\u662d","departname":"\u624b\u6e383","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145397008","atten_device":"3394154900086","atten_uid":"1371062","atten_type":"1","atten_status":"255","atten_time":"1488378457","atten_date":"2017-03-01","companyId":"264327","realname":"\u9ad8\u5e05","departname":"\u624b\u6e381","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145396772","atten_device":"3394154900086","atten_uid":"1618056","atten_type":"1","atten_status":"255","atten_time":"1488378171","atten_date":"2017-03-01","companyId":"264327","realname":"\u674e\u5f3a","departname":"\u624b\u6e382","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145396573","atten_device":"3394154900086","atten_uid":"1470016","atten_type":"1","atten_status":"255","atten_time":"1488377996","atten_date":"2017-03-01","companyId":"264327","realname":"\u6731\u5efa\u519b","departname":"\u624b\u6e381","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145396558","atten_device":"3394154900086","atten_uid":"1278628","atten_type":"1","atten_status":"255","atten_time":"1488377987","atten_date":"2017-03-01","companyId":"264327","realname":"\u6768\u5bb6\u5a01","departname":"\u516c\u5171\u652f\u6301\u90e8","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145396401","atten_device":"3394154900086","atten_uid":"1623123","atten_type":"1","atten_status":"255","atten_time":"1488377877","atten_date":"2017-03-01","companyId":"264327","realname":"\u738b\u4fca\u96c4","departname":"\u624b\u6e382","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145396332","atten_device":"3394154900086","atten_uid":"1652179","atten_type":"1","atten_status":"255","atten_time":"1488377831","atten_date":"2017-03-01","companyId":"264327","realname":"\u9ece\u9e92","departname":"\u624b\u6e382","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145396292","atten_device":"3394154900086","atten_uid":"1652187","atten_type":"1","atten_status":"255","atten_time":"1488377811","atten_date":"2017-03-01","companyId":"264327","realname":"\u9648\u5065","departname":"\u624b\u6e382","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145396087","atten_device":"3394154900086","atten_uid":"1623119","atten_type":"1","atten_status":"255","atten_time":"1488377663","atten_date":"2017-03-01","companyId":"264327","realname":"\u9648\u4f20\u53cb","departname":"\u624b\u6e382","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145395875","atten_device":"3394154900086","atten_uid":"1278599","atten_type":"1","atten_status":"255","atten_time":"1488377542","atten_date":"2017-03-01","companyId":"264327","realname":"\u66fe\u6d77\u660e","departname":"\u624b\u6e381","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145395579","atten_device":"3394154900086","atten_uid":"1632477","atten_type":"1","atten_status":"255","atten_time":"1488377423","atten_date":"2017-03-01","companyId":"264327","realname":"\u674e\u7389\u9f99","departname":"\u624b\u6e382","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145395547","atten_device":"3394154900086","atten_uid":"1577719","atten_type":"1","atten_status":"255","atten_time":"1488377409","atten_date":"2017-03-01","companyId":"264327","realname":"\u97e6\u65ed\u534e","departname":"\u624b\u6e382","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145395434","atten_device":"3394154900086","atten_uid":"1278571","atten_type":"1","atten_status":"255","atten_time":"1488377352","atten_date":"2017-03-01","companyId":"264327","realname":"\u90d1\u7ff0\u658c","departname":"\u65a9\u4ed92","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145395227","atten_device":"3394154900086","atten_uid":"1706276","atten_type":"1","atten_status":"255","atten_time":"1488377231","atten_date":"2017-03-01","companyId":"264327","realname":"\u4f55\u6c42","departname":"\u624b\u6e382","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145395223","atten_device":"3394154900086","atten_uid":"1660377","atten_type":"1","atten_status":"255","atten_time":"1488377228","atten_date":"2017-03-01","companyId":"264327","realname":"\u5f90\u77f3","departname":"\u7f8e\u672f\u516c\u5171\u90e8","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145395216","atten_device":"3394154900086","atten_uid":"1278591","atten_type":"1","atten_status":"255","atten_time":"1488377223","atten_date":"2017-03-01","companyId":"264327","realname":"\u90b9\u6e90","departname":"\u7f8e\u672f\u516c\u5171\u90e8","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145395211","atten_device":"3394154900086","atten_uid":"1673956","atten_type":"1","atten_status":"255","atten_time":"1488377219","atten_date":"2017-03-01","companyId":"264327","realname":"\u5218\u6e58\u541b","departname":"\u624b\u6e382","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145395123","atten_device":"3394154900086","atten_uid":"1611640","atten_type":"1","atten_status":"255","atten_time":"1488377175","atten_date":"2017-03-01","companyId":"264327","realname":"\u6881\u6587\u9759","departname":"\u7f8e\u672f\u516c\u5171\u90e8","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145394900","atten_device":"3394154900086","atten_uid":"1323624","atten_type":"1","atten_status":"255","atten_time":"1488377066","atten_date":"2017-03-01","companyId":"264327","realname":"\u9ec4\u4f73","departname":"\u624b\u6e381","remark":"\u8003\u52e4\u673a1"},{"atten_id":"145394788","atten_device":"3394154900086","atten_uid":"1278573","atten_type":"1","atten_status":"255","atten_time":"1488377019","atten_date":"2017-03-01","companyId":"264327","realname":"\u90ed\u4e5d\u798f","departname":"\u624b\u6e381","remark":"\u8003\u52e4\u673a1"}]}}
'''

# 打卡信息数据
def dealreturndata(page, starttime, endtime):
# 	file_d = open('urldata.txt', "w")
	furl = getCheckDataURL(starttime, endtime, page)
	# furl = getURL('2017-03-01 9:25:00','2017-03-01 9:30:00', 1)
# 	print >>file_d,furl
	req = urllib2.urlopen(furl)
	datastr = req.read()
	dataTable = json.loads(datastr)
	errcode = dataTable['status']
	if errcode != 1:
		error = dataTable['error']
		print "data error"
		print error.encode('utf-8')
		return
	data = dataTable['data']
	data_page = data['page']
	totalpage = data['totalpage']
# 	total = data['total']
	attendata = data['attendata']
# 	print >>file_d,"page = ", data_page
# 	print >>file_d,"totalpage = ", totalpage
# 	print >>file_d,"total = ", total
# 	print >>file_d,"attendata = "
	dataList = []
	for item in attendata:
		dataList.append((item["atten_uid"], item["atten_time"]))
# 		print >> file_d, "uid = ", item["atten_uid"], " id = ", item["atten_id"], " time = ", item["atten_time"], " realname = ", item['realname']
	return data_page, totalpage, dataList

# 员工信息数据
def Persondata(page):
	furl = getPersonUrl(page)
	req = urllib2.urlopen(furl)
	datastr = req.read()
	dataTable = json.loads(datastr)
	errcode = dataTable['status']
	if errcode != 1:
		error = dataTable['error']
		print "data error"
		print error
		return
	data = dataTable['data']
	data_page = data['page']
	totalpage = data['totalpage']
	userData = data['userData']
	dataList = []
	departmentTable = {}
	for item in userData:
		# 没有部门可能是已经离职，而行政只从部门里删除了员工，没有删除员工数据
		if item["departname"]:
			dataList.append([item["account"], item['realname'], item["deptid"]])
			departmentTable[item["deptid"]] = item["departname"]
	
	return data_page, totalpage, dataList, departmentTable

# 导出打卡记录
def outCheckData(start_time, end_time):
	p = 1
	data = []
	while True:
		page, allPage, datalist = dealreturndata(p, start_time, end_time)
		data.extend(datalist)
		if p >= allPage:
			break
		if page >= allPage:
			break
		p = p + 1
		
	print "Get check data end, total %d the data." % len(data)
	return data

# 导出所有员工，部门
def outPersonData(department_id_set = set(),person_id_set = set()):
	p = 1
	allPerson = []		
	department = {}
	while True:
		print "Get check data, No.%d page" % p
		page, allPage, dataList, departmentTable = Persondata(p)
		for key, item in departmentTable.items():
			department[key] = item
		allPerson.extend(dataList)
		if p >= allPage:
			break
		if page >= allPage:
			break
		p = p + 1

	departmentTmpList = []
	for key, departname in department.items():
		if key not in department_id_set:
			departmentTmpList.append((key, departname))
	
	personTmpList = []
	for (useraccount, username, departmentid) in allPerson:
		if useraccount not in person_id_set:
			mobile, sex = getPersonInfoData(useraccount)
			personTmpList.append([useraccount, username, departmentid, sex, mobile])
	print "导出员工数据完成，共导出%d个员工数据。" % len(personTmpList)
	print "导出部门数据完成，共导出%d个部门数据。" % len(departmentTmpList)
	return personTmpList, departmentTmpList

# 导出员工详细信息
def getPersonInfoData(useraccount):
	furl = getPersonInfoUrl(useraccount)
	req = urllib2.urlopen(furl)
	datastr = req.read()
	dataTable = json.loads(datastr)
	errcode = dataTable['status']
	if errcode != 1:
		error = dataTable['error']
		print "data error"
		print error.encode('utf-8')
	data = dataTable['data']
	return data['mobile'], data['sex']


class test(object):
	file_test = open('hhhh.txt', 'w')
	print >> file_test, "gaoshuai test"
	file_test.close()
# file_d = open('urldata.txt', "w")
# outPersonData()
# file_d.close()
# print "end ..."
# dd = urllib2.urlopen("http://kq.qycn.com/index.php/Api/Api/recordlog/API")
# print dd.read()

# st = "\u8d26\u53f7\u4e0d\u80fd\u4e3a\u7a7a"
# print st.decode("unicode-escape").encode('utf-8')


# str_t ='{"status":1,"error":"","data":{"total":"310","totalpage":7,"page":1,"userData":[{"account":"1319221","realname":"\u5510\u6b66\u946b","fingerprint":2,"departname":"\u7f8e\u672f\u516c\u5171\u90e8","deptid":"131892"},{"account":"1278177","realname":"\u738b\u743c","fingerprint":2,"departname":"\u7efc\u5408\u90e8","deptid":"144368"},{"account":"1278560","realname":"\u8d75\u658c","fingerprint":2,"departname":"\u7ba1\u7406\u5c42","deptid":"132142"},{"account":"1278561","realname":"\u6797\u5b8f\u4f1f","fingerprint":2,"departname":"\u65a9\u4ed92","deptid":"130719"},{"account":"1278562","realname":"\u6881\u8d85\u708e","fingerprint":2,"departname":"\u65a9\u4ed92","deptid":"130719"},{"account":"1278563","realname":"\u5434\u6cfd\u94d6","fingerprint":2,"departname":"\u65a9\u4ed92","deptid":"130719"},{"account":"1278564","realname":"\u5b98\u96f7","fingerprint":2,"departname":"\u65a9\u4ed92","deptid":"130719"},{"account":"1278565","realname":"\u9648\u667a\u521a","fingerprint":2,"departname":"\u65a9\u4ed92","deptid":"130719"},{"account":"1278568","realname":"\u6768\u6d69\u6109","fingerprint":2,"departname":"\u5b9a\u6d77","deptid":"131825"},{"account":"1278569","realname":"\u5362\u5c71","fingerprint":2,"departname":"\u624b\u6e381","deptid":"132018"},{"account":"1278570","realname":"\u5434\u5fd7\u7ea2","fingerprint":2,"departname":"\u5b9a\u6d77","deptid":"131825"},{"account":"1278571","realname":"\u90d1\u7ff0\u658c","fingerprint":2,"departname":"\u65a9\u4ed92","deptid":"130719"},{"account":"1278573","realname":"\u90ed\u4e5d\u798f","fingerprint":2,"departname":"\u624b\u6e381","deptid":"132018"},{"account":"1278576","realname":"\u5f20\u6811\u658c","fingerprint":2,"departname":"\u65a9\u4ed92","deptid":"130719"},{"account":"1278577","realname":"\u9a6c\u6587\u52c7","fingerprint":2,"departname":"\u624b\u6e381","deptid":"132018"},{"account":"1278578","realname":"\u9648\u88d5\u73b2","fingerprint":2,"departname":"\u5b9a\u6d77","deptid":"131825"},{"account":"1278579","realname":"\u8bb8\u9526\u6d69","fingerprint":2,"departname":"\u5b9a\u6d77","deptid":"131825"},{"account":"1278582","realname":"\u595a\u4ef2\u709c","fingerprint":2,"departname":"\u7f8e\u672f\u516c\u5171\u90e8","deptid":"131892"},{"account":"1278583","realname":"\u5362\u601d\u9716","fingerprint":2,"departname":"\u7efc\u5408\u90e8","deptid":"144368"},{"account":"1278584","realname":"\u9093\u582a\u6cf0","fingerprint":2,"departname":"\u7f8e\u672f\u516c\u5171\u90e8","deptid":"131892"},{"account":"1278585","realname":"\u5434\u6dd1\u4e7e","fingerprint":5,"departname":"\u65a9\u4ed92","deptid":"130719"},{"account":"1278586","realname":"\u9ec4\u96ef\u4eae","fingerprint":2,"departname":"\u7f8e\u672f\u516c\u5171\u90e8","deptid":"131892"},{"account":"1278587","realname":"\u9648\u5fd7\u5f3a","fingerprint":2,"departname":"\u7f8e\u672f\u516c\u5171\u90e8","deptid":"131892"},{"account":"1278588","realname":"\u84dd\u5029\u5a77","fingerprint":2,"departname":"\u7f8e\u672f\u516c\u5171\u90e8","deptid":"131892"},{"account":"1278591","realname":"\u90b9\u6e90","fingerprint":2,"departname":"\u7f8e\u672f\u516c\u5171\u90e8","deptid":"131892"},{"account":"1278593","realname":"\u4f55\u81f4\u534e","fingerprint":2,"departname":"\u7f8e\u672f\u516c\u5171\u90e8","deptid":"131892"},{"account":"1278594","realname":"\u9648\u4f1f\u6770","fingerprint":2,"departname":"\u5b9a\u6d77","deptid":"131825"},{"account":"1278595","realname":"\u9648\u5fd7\u7115","fingerprint":2,"departname":"\u7f8e\u672f\u516c\u5171\u90e8","deptid":"131892"},{"account":"1278596","realname":"\u5ed6\u52c7\u6770","fingerprint":2,"departname":"\u5b9a\u6d77","deptid":"131825"},{"account":"1278597","realname":"\u77f3\u6d0b","fingerprint":2,"departname":"\u7f8e\u672f\u516c\u5171\u90e8","deptid":"131892"},{"account":"1278598","realname":"\u5218\u660a","fingerprint":3,"departname":"\u65a9\u4ed92","deptid":"130719"},{"account":"1278599","realname":"\u66fe\u6d77\u660e","fingerprint":2,"departname":"\u624b\u6e381","deptid":"132018"},{"account":"1278600","realname":"\u65b9\u4fca\u6cd3","fingerprint":5,"departname":"\u5b9a\u6d77","deptid":"131825"},{"account":"1278601","realname":"\u51af\u4e9a\u5357","fingerprint":2,"departname":"\u7f8e\u672f\u516c\u5171\u90e8","deptid":"131892"},{"account":"1278602","realname":"\u9648\u60e0","fingerprint":2,"departname":"\u7f8e\u672f\u516c\u5171\u90e8","deptid":"131892"},{"account":"1278603","realname":"\u8346\u6167\u950b","fingerprint":2,"departname":"\u7f8e\u672f\u516c\u5171\u90e8","deptid":"131892"},{"account":"1278604","realname":"\u738b\u78ca","fingerprint":2,"departname":"\u7f8e\u672f\u516c\u5171\u90e8","deptid":"131892"},{"account":"1278605","realname":"\u738b\u6000\u7535","fingerprint":2,"departname":"\u7f8e\u672f\u516c\u5171\u90e8","deptid":"131892"},{"account":"1278606","realname":"\u718a\u5229\u8363","fingerprint":2,"departname":"\u7f8e\u672f\u516c\u5171\u90e8","deptid":"131892"},{"account":"1278607","realname":"\u66f9\u610f\u5fe0","fingerprint":2,"departname":"\u7f8e\u672f\u516c\u5171\u90e8","deptid":"131892"},{"account":"1278608","realname":"\u738b\u5bb6\u8f89","fingerprint":2,"departname":"\u7f8e\u672f\u516c\u5171\u90e8","deptid":"131892"},{"account":"1278609","realname":"\u8303\u79cb\u5bcc","fingerprint":2,"departname":"\u7f8e\u672f\u516c\u5171\u90e8","deptid":"131892"},{"account":"1278611","realname":"\u4f59\u8ba1\u94a2","fingerprint":2,"departname":"\u7f8e\u672f\u516c\u5171\u90e8","deptid":"131892"},{"account":"1278612","realname":"\u6881\u5e73","fingerprint":2,"departname":"\u7f8e\u672f\u516c\u5171\u90e8","deptid":"131892"},{"account":"1278613","realname":"\u738b\u84dd\u6eaa","fingerprint":2,"departname":"\u7f8e\u672f\u516c\u5171\u90e8","deptid":"131892"},{"account":"1278614","realname":"\u962e\u707f\u534e","fingerprint":2,"departname":"\u7f8e\u672f\u516c\u5171\u90e8","deptid":"131892"},{"account":"1278616","realname":"\u9093\u5149\u8000","fingerprint":2,"departname":"\u7f8e\u672f\u516c\u5171\u90e8","deptid":"131892"},{"account":"1278618","realname":"\u9648\u5e78\u5764","fingerprint":2,"departname":"\u5b9a\u6d77","deptid":"131825"},{"account":"1278619","realname":"\u5218\u6d0b","fingerprint":2,"departname":"\u624b\u6e382","deptid":"132030"},{"account":"1278620","realname":"\u90ed\u53ec","fingerprint":2,"departname":"\u5b9a\u6d77","deptid":"131825"}]}}'
# j_data = json.loads(str(str_t))
# print type(j_data)
# print j_data['data'].get("userData")[2].get('realname').encode('utf-8')
