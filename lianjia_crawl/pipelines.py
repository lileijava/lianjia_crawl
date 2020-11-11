# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html
import re

class LianjiaPipeline(object):
    def process_item(self, item, spider):
        danjia = item['danjia']
        item['danjia'] = re.sub(r'单价','',danjia)
        return item
