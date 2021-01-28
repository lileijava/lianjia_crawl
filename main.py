from scrapy import cmdline

# cmdline.execute(['scrapy', 'crawl', 'lianjia'])
import ctypes
x = 4023233417
y = 2562383102
r1 = x & y
print(r1)
print(ctypes.c_int(r1^0).value)