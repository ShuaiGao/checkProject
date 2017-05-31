注意：
	该服务器要求django版本1.10，高级版本会出现问题


定时任务的启动需要一次开启两个服务
开启worker
python manage.py celery -A celery_task worker --loglevel=info
开启beat
python manage.py celery -A celery_task beat -s celerybeat-schedule