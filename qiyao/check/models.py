#!c:\python27\python.exe
# -*- coding: UTF-8 -*-

from __future__ import unicode_literals

from django.db import models
import datetime
import md5

pwd = '123456'   
m1 = md5.new()   
m1.update(pwd)   
default_passworld =  m1.hexdigest() 

# Create your models here.
class Department(models.Model):
	id = models.IntegerField(primary_key = True)
	name = models.CharField(max_length=30)

	def __unicode__(self):
		return self.name#.encode("utf-8")

class Person(models.Model):
	id = models.IntegerField(primary_key = True)
	department 	= models.ForeignKey(Department, default= 0)
	name 		= models.CharField(max_length=30)
	sex 		= models.BooleanField(default= 0)# 0：男  1：女
	email 		= models.EmailField(max_length=100, default=None)
	password 	= models.CharField(max_length=32, default= default_passworld)

	def __unicode__(self):
		return self.name#.encode("utf-8")

# 所有打卡记录
class Check(models.Model):
	person = models.IntegerField()
	time = models.IntegerField()


# class Leave(models.Model):
# 	person = models.IntegerField()
# 	day = models.DateField()
# 	type = models.IntegerField()
# 	reason = models.CharField(max_length = 400)
# 	msg = models.CharField(max_length = 400)
# 	starttime = models.DateTimeField()
# 	endtime = models.DateTimeField()
# 	hours = models.IntegerField()


# class DayRecord(models.Model):
# 	person 			= models.IntegerField()
# 	day 			= models.DateField()
# 	am_starttime 	= models.DateTimeField() # 上班打卡时间
# 	pm_endtime 		= models.DateTimeField() # 下班打卡时间
# 	am_start_check_time 	= models.DateTimeField() # 上班特殊时间，
# 	pm_end_check_time 		= models.DateTimeField() # 下班特殊时间
# 	specialtime		= models.BooleanField() # 特殊打卡时间
# 	late_come		= models.BooleanField() # 上班迟到
# 	early_leave		= models.BooleanField() # 下班早退

# 	def getCheckOnTime():
# 		if self.am_start_check_time:
# 			return self.am_start_check_time
# 		return datetime.datetime(self.day.year, self.day.month, self.day.day, 9, 30, 0)
