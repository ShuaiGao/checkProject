# -*- coding: UTF-8 -*-

from django.shortcuts import render
from django.core.urlresolvers import reverse
from django.views.decorators.clickjacking import xframe_options_exempt

import datetime
import md5
import time
from check.models import Person, Department,Check
import math
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
@xframe_options_exempt
def qiyao(request):
	departments = Department.objects.all()
	data = {}
	for i in departments:
		persons = Person.objects.filter(department = i.id)
		data[i.id] = [i, persons]
	person = Person.objects.all()
	return render(request, 'qiyao.html', locals())	

@xframe_options_exempt
def logs(request):
	departments = Department.objects.all()
	data = {}
	personnum = 0
	for i in departments:
		persons = Person.objects.filter(department = i.id)
		personnum = personnum + len(persons)
		data[i.id] = [i, persons]
		
	end_str = time.strftime("%Y-%m-%d %H:%M", time.localtime())
	start_str = time.strftime("%Y-%m-%d 00:00", time.localtime())
	return render(request, 'Attendance/Record/logs.html', locals())		

@xframe_options_exempt
def saved_resource(request):
	persons = Person.objects.all()
	every_page_num = 20
	page_num = int(math.ceil(len(persons)/(every_page_num *1.0)))
	personnum = len(persons)
	persons = persons[:20]
	return render(request, 'Attendance/Record/saved_resource.html', locals())		

@xframe_options_exempt
def index(request):
	return render(request, 'Default/Sidebar/index.html')		

@xframe_options_exempt
def Record_logs(request):
	return render(request, 'Attendance/Record/logs.html')		

@xframe_options_exempt
def staff_index(request):
	departments = Department.objects.all()
	data = {}
	personnum = 0
	for i in departments:
		persons = Person.objects.filter(department = i.id)
		personnum = personnum + len(persons)
		data[i.id] = [i, persons]
	return render(request, 'Personnel/Staff/index.html', locals())		

@xframe_options_exempt
def shedule_view(request, start_time=None, end_time=None):
	print("shedule_view")
	if start_time:
		start = start_time 
		end = end_time 
	else:
		end =  time.mktime(time.localtime())
		start = end - 4000  
	
	checks = Check.objects.filter(time__range = (start, end))
	week = ('一','二','三','四','五','六','日')
	checkData = []
	for i in checks:
		data = {}
		tt = time.localtime(i.time)
		data['date'] = time.strftime("%Y-%m-%d ", tt) + "周(%s)"%week[tt.tm_wday]
		data['id'] = i.id
		data['name'] = i.person.name
		data['time'] = time.strftime("%Y-%m-%d %H:%M:%S", tt)
		checkData.append(data)
	checknum = len(checkData)
	return render(request, 'Attendance/Record/showLogs.html', locals())

@xframe_options_exempt
def staff_view(request, page):
	print "page == ", page
	persons = Person.objects.all()
	every_page_num = 20
	page_num = int(math.ceil(len(persons)/(every_page_num *1.0))) 
	personnum = len(persons)
	persons = persons[(int(page) -1) * 20: int(page) * 20]
	return render(request, 'Personnel/Staff/staffView.html', locals())		
# def redirect_to_page(request):
# 	return HeepResponseRedirect(reverse('page', args(2,)))


def checkUserFiles():
	print "hello World"
