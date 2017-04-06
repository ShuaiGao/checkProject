# -*- coding: UTF-8 -*-
from django.shortcuts import render

import datetime
import md5
import time

def getURL():
	now = datetime.datetime.now()
	nowtime = int(time.time())
	param = {'account':'125865c1aedf7f1f6292a0d678a4e659','requesttime':nowtime,"start":'2017-03-01',"end":'2017-03-01', 'sign':'YYK123456b'}
	url = "http://kq.qycn.com/index.php/Api/Api/recordlog?account=%s&end=%s&requesttime=%d&start=%s&sign=%s"
	src = "%s%s%d%s%s"
	param_str = src%(param['account'], param['end'], param['requesttime'], param['start'], param['sign'])
	m1 = md5.new()   
	m1.update(param_str)   
	src = url%(param['account'], param['end'], param['requesttime'], param['start'], m1.hexdigest())

# Create your views here.
def home(request):
	print "home(request):"
	today = datetime.datetime.today()
	year = today.year
	month = today.month
	first_day = datetime.datetime(year, month, 1,1,1,1)
	print first_day
	line = 0
	dayTable = [[0]*7,[0]*7,[0]*7,[0]*7,[0]*7,[0]*7]
	for i in range(0,31):
		day = first_day.weekday()
		dayTable[line][day] = i
		first_day = first_day + datetime.timedelta(days=1)
		if day == 6:
			line += 1

	data = {"year":year,"month":month, "day":today.day, "current_date":today, "daytable":dayTable}

	redata = render(request, 'check.html')
	print redata

	return render(request, 'check.html',data)

def qiyao(request):
	return render(request, 'qiyao.html')	

def logs(request):
	return render(request, 'logs.html')		

def saved_resource(request):
	return render(request, 'saved_resource.html')		

def index(request):
	return render(request, 'Default/Sidebar/index.html')		

