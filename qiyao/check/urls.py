"""qiyao URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
import views as check_view

urlpatterns = [
    # url(r'^home$',check_view.home, name = 'home' ),
    # # url(r'^saved_resource$',check_view.saved_resource, name = 'saved_resource' ),
    url(r'^Default/Sidebar/index$',check_view.index ),
    url(r'^Attendance/Record/saved_resource$',check_view.saved_resource ),
    url(r'^Attendance/Record/logs$',check_view.logs, name = 'logs' ),
    url(r'^Personnel/Staff/index$',check_view.staff_index, name = 'logs' ),
    url(r'^Personnel/Staff/staffView/page/(\d+)/$',check_view.staff_view, name = "page"),
#     url(r'^Personnel/Staff/scheduleView/showall/(\d+)/start_time/$',check_view.shedule_view, name = "page"),
    url(r'^Attendance/Record/showLogs/$',check_view.shedule_view),
    url(r'^Attendance/Record/showLogs/start_time/(\d+)/end_time/(\d+)/$',check_view.shedule_view),
    
    url(r'^home/', check_view.qiyao),
    
    
]
