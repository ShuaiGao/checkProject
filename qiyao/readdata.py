import md5
import time
import socket

f = open("data.txt",'r')

s = f.readline()
f.close()

data = eval(s)
print data["status"]
print data['error'].encode("utf-8").decode('unicode_escape')
print type(data['data'])
# print data['data']
check_data = data['data'].get("attendata")
for item in check_data:
	print item.get("atten_id"),item.get("realname").encode("utf-8").decode('unicode_escape'),item.get("atten_uid"),item.get("atten_date"),item.get("atten_time")