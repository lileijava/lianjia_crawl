import sys
import codecs
import frida
import json
import threading
import requests
import hashlib
from datetime import datetime
import uuid
import random

g_app_version = "15.9.1"  # 安居客 App 版本号
g_ios_version = "13.4.1"  # iOS 系统版本
g_idfa = "00000000-0000-0000-0000-000000000000"

# ua
g_useragent = f"Anjuke/{g_app_version} (iPhone; iOS {g_ios_version}; Scale/2.00)"


def generate_openudid():
    uuid_str = str(uuid.uuid4()).replace('-', '').lower()
    # 生成十六进制随机数，不足 8 位补 0
    random_num = '%08x' % random.randint(0, sys.maxsize)
    # 截取 8 位，拼接成 40 位，生成 OpenUUID
    return uuid_str + str(random_num)[0:8]


def generate_idfv():
    return str(uuid.uuid4()).upper()


# 设备标识，一台设备生成一个即可
g_openudid = generate_openudid()

now = datetime.now()
g_idfv = generate_idfv()
g_udid = g_idfv[:24] + now.strftime('%Y%m%d%H%M%S')


def on_message(message, data):
    if message['type'] == 'send':
        print(message['payload'])
    elif message['type'] == 'error':
        print(message['stack'])


def get_usb_iphone():
    device_type = 'usb'
    if int(frida.__version__.split('.')[0]) < 12:
        device_type = 'tether'
    device_manager = frida.get_device_manager()
    changed = threading.Event()

    def on_changed():
        changed.set()

    device_manager.on('changed', on_changed)

    device = None
    while device is None:
        devices = [dev for dev in device_manager.enumerate_devices() if
                   dev.type == device_type and dev.id == '6d824076de766cf571c81a4600dbc2cdd9ad4869']
        if len(devices) == 0:
            print('Waiting for USB device...')
            changed.wait()
        else:
            device = devices[0]

    device_manager.off('changed', on_changed)

    return device


def attach_application(device, bundleid=None):
    application = device.get_frontmost_application()
    if bundleid is None:
        if application is not None:
            session = device.attach(application.pid)
            return session
        else:
            print("No frontmost application on iPhone, please run an application first.")
            sys.exit(-1)
    else:
        if application is not None and application.identifier == bundleid:
            session = device.attach(application.pid)
            return session
        else:
            try:
                pid = device.spawn([bundleid])
                session = device.attach(pid)
                device.resume(pid)
                return session
            except Exception as identifier:
                print(f"faild to run the application {bundleid}. {ex}")
                sys.exit(-1)


def load_script(session, filename):
    with codecs.open(filename, 'r', 'utf-8') as f:
        source = f.read()
    script = session.create_script(source)
    script.on('message', on_message)
    script.load()
    return script


def get_header_params():
    headers = {}
    # headers["xxzl_cid"] = ""
    # headers["xxzl-sid"] = ""
    headers["ajkAuthTicket"] = ""
    # headers["xxzl-cid"] = ""
    headers["User-Agent"] = g_useragent
    headers["Accept-Language"] = "zh-Hans-CN;q=1"
    # headers["xxzl_sid"] = ""
    # headers["nsign"] = ""
    return headers


def get_common_params(cityid: str):
    global g_udid
    g_uid = str(uuid.uuid4()).upper()
    ajk_city_id = cityid

    now = datetime.now()
    qtime = now.strftime('%Y%m%d%H%M%S')
    common_params = {
        "_guid": g_uid,
        "ajk_city_id": ajk_city_id,
        "app": "i-ajk",
        "cid": "-1",
        "cv": g_app_version,
        "from": "mobile",
        "i": g_udid,
        "idfa": g_idfa,
        "m": "iPhone",
        "macid": "0f607264fc6318a92b9e13c65db7cd3c",
        "o": "iOS",
        "openudid": g_openudid,
        "ostype2": "ios13",
        "pm": "A01",
        "qtime": qtime,
        "udid2": g_udid,
        "uuid": g_udid,
        "uuid2": g_udid,
        "v": g_ios_version
    }
    return common_params


def send_request(url, headers=None, payload=None, callback=None):
    try:
        response_data = requests.get(url, headers=headers, params=payload, verify=False)
        if response_data.content is not None:
            json_data = json.loads(response_data.text)
            if callback: callback(json_data)
        else:
            print('request failed, the response data is null.')
    except json.decoder.JSONDecodeError as ex:
        print(f"parse json failed: {str(ex)}")
    except Exception as ex:
        print(f"request exception: {str(ex)}")


def request_ajk_hotnews(cityid: str, pageidx: int):
    def request_finished_callback(response_data):
        status = int(response_data["status"])
        if status == 0:
            data = response_data["data"]
            hasNextPage = data["hasNextPage"]
            print(data)
        else:
            msg = int(response_data["msg"])
            print(msg)

    base_url = "https://api.anjuke.com/mobile/v5/content/news"
    query_params = dict(get_common_params(cityid))

    business_params = {
        "city_id": cityid,
        "page": pageidx,
        "page_size": 15,
        "slide": 0,
        "sort": 0,
        "tab_id": "2"
    }
    query_params.update(business_params)

    uri = "/mobile/v5/content/news"

    sign = script.exports.nsign(json.dumps(business_params), json.dumps(query_params), uri)

    header_params = dict(get_header_params())
    header_params.update({"nsign": sign})

    send_request(base_url, header_params, query_params, request_finished_callback)


def export_citylist():
    citylist = script.exports.getcitylist();
    city_json = json.dumps(citylist, ensure_ascii=False, sort_keys=True, indent=2)
    with open("citylist.json", "w") as json_file:
        json_file.write(city_json)


def test_ajk_common_params():
    params = script.exports.ajkcommonparams();
    format_params = json.dumps(params, ensure_ascii=False, sort_keys=True, indent=2)
    print(f"common params: {format_params}")


def test_nsign():
    cityid = "13"
    pageidx = 1

    query_params = dict(get_common_params(cityid))
    business_params = {
        "city_id": cityid,
        "page": pageidx,
        "page_size": 15,
        "slide": 0,
        "sort": 0,
        "tab_id": "2"
    }
    query_params.update(business_params)

    uri = "/mobile/v5/content/news"
    sign = script.exports.nsign(json.dumps(business_params), json.dumps(query_params), uri);
    print(sign)


if __name__ == '__main__':
    device = get_usb_iphone()
    session = attach_application(device)
    script = load_script(session, "./Anjuke.js")
    #
    # print(f"idfv: {g_idfv}")
    # print(f"openudid: {g_openudid}")

    # export_citylist()

    # test_ajk_common_params()
    test_nsign()

    # request_ajk_hotnews()

    session.detach()