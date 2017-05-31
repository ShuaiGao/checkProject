# from __future__ import absolute_import
# import os
# from celery import Celery
# from django.conf import settings
# from datetime import timedelta

# # set the default Django settings module for the 'celery' program.
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'qiyao.config')

# app = Celery('qiyao')

# # Using a string here means the worker will not have to
# # pickle the object when using Windows.
# app.config_from_object('django.conf:settings')
# app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

# @app.task(bind=True)
# def debug_task(self):
#     print('Request: {0!r}'.format(self.request))


# # CELERYBEAT_SCHEDULE = {
# #     "get_proxy_20_min": {
# #         "task": "qiyao.celery.gaoshuai",
# #         "schedule": timedelta(seconds=5),
# #         # "schedule": crontab(minute="*/20"),
# #         "args": ()
# #     },
#     # "check_proxy_10_min": {
#     #     "task": "celery_task.obtain_data_task.check_proxy",
#     #     "schedule": timedelta(minutes=11),
#     #     # "schedule": crontab(minute="*/11"),
#     #     "args": ()
#     # },
#     # "get_rbl_20_min": {
#     #     "task": "celery_task.obtain_data_task.get_rbl",
#     #     "schedule": timedelta(minutes=20),
#     #     # "schedule": crontab(minute="*/20"),
#     #     "args": ()
#     # },
#     # "generate_train_set_4_day": {
#     #     "task": "celery_task.obtain_model_task.generate_train_set",
#     #     "schedule": timedelta(hours=96),
#     #     # "schedule": crontab(day_of_month="2-29/4"),
#     #     "args": ()
#     # },
#     # "generate_model_day": {
#     #     "task": "celery_task.obtain_model_task.generate_model",
#     #     "schedule": timedelta(hours=100),
#     #     # "schedule": crontab(day_of_month="2-29/5"),
#     #     "args": ()
#     # },

# # }


# @app.task
# def gaoshuai(self):
# 	print "================="