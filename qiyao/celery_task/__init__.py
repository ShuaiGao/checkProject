# coding:utf-8

from __future__ import absolute_import
from celery import Celery

app = Celery("service")
app.config_from_object('celery_task.celeryconfig')