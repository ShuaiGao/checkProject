ע�⣺
	�÷�����Ҫ��django�汾1.10���߼��汾���������


��ʱ�����������Ҫһ�ο�����������
����worker
python manage.py celery -A celery_task worker --loglevel=info
����beat
python manage.py celery -A celery_task beat -s celerybeat-schedule