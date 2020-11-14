# -*- coding: utf-8 -*-
import scrapy
from scrapy_redis.spiders import RedisSpider
from pyquery import PyQuery as pq
from lianjia_crawl.items import LianjiaItem


class LianjiaSpider(RedisSpider):
    name = 'lianjia'
    allowed_domains = ['lianjia.com']
    # start_urls = ['https://lf.lianjia.com/ershoufang/yanjiao/']
    page_url = 'https://lf.lianjia.com/ershoufang/yanjiao/pg{}/'
    redis_key = 'lianjia:start_urls'

    # __init__方法必须按规定写，使用时只需要修改super()里的类名参数即可
    def __init__(self, *args, **kwargs):
        # 修改这里的类名为当前类名
        super(LianjiaSpider, self).__init__(*args, **kwargs)

    # def start_requests(self):
    #     for i in range(1,10):
    #         if i == 1:
    #             yield scrapy.Request(self.start_urls[0])
    #         else:
    #             yield scrapy.Request(self.page_url.format(i))
    #     print("queue init success")

    def parse(self, response):
        html = pq(response.text)
        els = html('ul.sellListContent li div.info').items()
        for ele in els:
            lianjia = LianjiaItem()
            lianjia['name'] = ele.find('div.title a').text()
            lianjia['detail_url'] = ele.find('div.title a').attr('href')
            lianjia['shequ'] = ele.find('div.flood').text()
            lianjia['tag'] = ele.find('div.houseInfo').text()
            lianjia['zongjia'] = ele.find('div.totalPrice').text()
            lianjia['danjia'] = ele.find('div.unitPrice').text()
            lianjia['status'] = ele.find('div.tag span.taxfree').text()
            yield response.follow(lianjia['detail_url'],self.parse,meta=lianjia)