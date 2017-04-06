import md5
import time
import socket
import urllib2

socket.setdefaulttimeout(10)

def outdata(check_data):
	for item in check_data:
		print item.get("atten_uid"), item.get("realname").encode("utf-8").decode('unicode_escape'),item.get("atten_date"),item.get("atten_time")

def getcheckdata(page = 1):
	nowtime = int(time.time())
	param = {'account':'125865c1aedf7f1f6292a0d678a4e659','requesttime':nowtime,"start":'2017-03-01',"end":'2017-03-01', 'sign':'YYK123456b', 'page':page}
	url = "http://kq.qycn.com/index.php/Api/Api/recordlog?account=%s&end=%s&page=%d&requesttime=%d&start=%s&sign=%s"
	param_str = "%s%s%d%d%s%s"%(param['account'], param['end'], param['page'], param['requesttime'], param['start'], param['sign'])
	m1 = md5.new()   
	m1.update(param_str)   
	src = url%(param['account'], param['end'], param['page'], param['requesttime'], param['start'], m1.hexdigest())
	# print len(m1.hexdigest())
	print src
	return_data = urllib2.urlopen(src).read()
	s = eval(return_data)
	if s['error']:
		print s['error'].encode("utf-8").decode('unicode_escape')
		return s['error'], None,None,None
	else:
		return s['error'], s['data'].get("attendata"), s['data'].get("totalpage"), s['data'].get("page")

def getdepartmentdata(page = 1):
	nowtime = int(time.time())
	param = {'account':'125865c1aedf7f1f6292a0d678a4e659','requesttime':nowtime,"start":'2017-03-01',"end":'2017-03-01', 'sign':'YYK123456b', 'page':page}
	url = "http://kq.qycn.com/index.php/Api/Api/recordlog?account=%s&end=%s&page=%d&requesttime=%d&start=%s&sign=%s"
	param_str = "%s%s%d%d%s%s"%(param['account'], param['end'], param['page'], param['requesttime'], param['start'], param['sign'])
	m1 = md5.new()   
	m1.update(param_str)   
	src = url%(param['account'], param['end'], param['page'], param['requesttime'], param['start'], m1.hexdigest())
	# print len(m1.hexdigest())
	print src
	return_data = urllib2.urlopen(src).read()
	s = eval(return_data)
	if s['error']:
		print s['error'].encode("utf-8").decode('unicode_escape')
		return s['error'], None,None,None
	else:
		return s['error'], s['data'].get("attendata"), s['data'].get("totalpage"), s['data'].get("page")


index.php/Api/Api/getDepartment
def main():
	page = 1
	errnum = 0
	while True:
		error, data, totalpage, repage = getdata(page)
		print totalpage, repage, page
		if totalpage == repage:
			print "data end..."
			return
		if repage == page:
			page = page + 1
			outdata(data)
		else:
			errnum += 1
		if errnum > 20 :
			print "totalpage = ", totalpage, "page = ", page, error

main()