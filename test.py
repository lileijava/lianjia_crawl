#-*- coding: UTF-8 -*-
import os
import sys
import codecs
import json
import threading
import requests
import urllib
from urllib.parse import unquote, urlparse
import hashlib
from datetime import datetime
from datetime import timedelta
import base64
import uuid
import random


def generate_idfv():
    return str(uuid.uuid4()).upper()

def generate_openudid():
    uuid_str = str(uuid.uuid4()).replace('-', '').lower()
    # 生成十六进制随机数，不足 8 位补 0
    return uuid_str


#请求头参数
X_IMSI = "46001"
accept = "*/*"
X_Client_Agent = "APPLE_iPhone12,3_iOS13.6"
X_Client_Version = "7.1.0"
X_Client_Hash = generate_openudid()
X_Platform_Version = "13.6"
Accept_Language = "zh-Hans-CN;q=1"
Accept_Encoding = "gzip, deflate, br"
X_Long_Token = ""
X_Platform_Type = "1"
X_User_ID = ""
User_Agent = "LiVideoIOS/7.1.0 (iPhone; iOS 13.6; Scale/3.00)"
X_Client_ID = generate_idfv()
X_Channel_Code = "official"
X_Serial_Num = "1615542813"
Connection = "keep-alive"

#装配参数
headers = {
    "X-IMSI":X_IMSI,
    "accept":accept,
    "X-Client-Agent":X_Client_Agent,
    "X-Client-Version":X_Client_Version,
    "X-Client-Hash":X_Client_Hash,
    "X-Platform-Version":X_Platform_Version,
    "Accept-Language":Accept_Language,
    "Accept-Encoding":Accept_Encoding,
    "X-Long-Token":X_Long_Token,
    "X-Platform-Type":X_Platform_Type,
    "X-User-ID":X_User_ID,
    "User-Agent":User_Agent,
    "X-Client-ID":X_Client_ID,
    "X-Channel-Code":X_Channel_Code,
    "X-Serial-Num":X_Serial_Num,
    "Connection":Connection
}

queryParams = {
    "channelCode":"110100"
}
print(headers)


def send_request(url, headers = None, payload = None, callback = None):
    try:
        response_data = requests.get(url, headers = headers, params=payload, verify=False)
        if response_data.content is not None:
            json_data = json.loads(response_data.text)
        if callback: callback(json_data)
        else:
            print('request failed, the response data is null.')
    except json.decoder.JSONDecodeError as ex:
        print(f"parse json failed: {str(ex)}")
    except Exception as ex:
        print(f"request exception: {str(ex)}")

# https://app.pearvideo.com/clt/jsp/v4/localChannelConts.jsp?channelCode=110100
def request_finished_callback(response_data):
    print(response_data)

#获取城市列表
# send_request("https://app.pearvideo.com/clt/jsp/v4/localChannels.jsp",headers,{},request_finished_callback)

#获取本地数据
send_request("https://app.pearvideo.com/clt/jsp/v4/localChannelConts.jsp",headers,queryParams,request_finished_callback)