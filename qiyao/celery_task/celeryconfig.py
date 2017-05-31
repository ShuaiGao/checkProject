from __future__ import absolute_import

from datetime import timedelta
# from celery.schedules import crontab

BROKER_URL = 'django://localhost:8000//'
CELERYBEAT_SCHEDULE = {
    "print_every_5s": {
        "task": "celery_task.obtain_data_task.checkData",
        "schedule": timedelta(hours=1),
#         datetime.timedelta(days=0, seconds=0, microseconds=0, milliseconds=0, minutes=0, hours=0, weeks=0)
        # "schedule": crontab(minute="*/20"),
        "args": ()
    },
}

CELERY_TIMEZONE = 'UTC'

CELERY_IMPORTS = [
	"celery_task.obtain_data_task"
	]