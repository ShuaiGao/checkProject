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
from check import views as check_view

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^home$',check_view.home, name = 'home' ),
    url(r'^qiyao$',check_view.qiyao, name = 'qiyao' ),
    url(r'^logs$',check_view.logs, name = 'logs' ),
    url(r'^saved_resource$',check_view.saved_resource, name = 'saved_resource' ),
    url(r'^Default/Sidebar/index$',check_view.index, ),
    
]
