import requests
import traceback
import re
import os

from .aes import PrpCrypt
from binascii import b2a_hex, a2b_hex


class VideoCrawler:
    """
    a crawler to get video with m3u8
    """

    def __init__(self, path, ts_path, result_path):
        self.path = path
        self.ts_path = ts_path
        self.result_path = result_path
        self.keys = []
        self.ts_list = []
        self.headers = None
        self.m3u8 = None
        self.ts_url_list = None
        self.key_url_dealt = None
        self.iv_dealt = None

    def get(self, url):
        try:
            req = requests.get(url, self.headers)
            req.raise_for_status()
            req.encoding = req.apparent_encoding
            return req.text
        except:
            traceback.print_exc()

    def set_headers(self, cookie, referer, user_agent):
        self.headers = {"Cookie": cookie,
                        "Referer": referer,
                        "User-Agent": user_agent}

    def parse_m3u8(self, m3u8):
        self.m3u8 = m3u8
        self.ts_url_list = re.findall(r'EXTINF:.*,\n(.*)\n#', self.m3u8)
        key_url_list = re.findall(r'EXT-X-KEY:METHOD=AES-128,URI="http.*"', self.m3u8)
        iv_list = re.findall(r'IV=0x.{32}', self.m3u8)

        self.key_url_dealt = []
        for key in key_url_list:
            key = key[30:-1]
            self.key_url_dealt.append(key)

        self.iv_dealt = []
        for iv in iv_list:
            iv = iv[5:]
            self.iv_dealt.append(iv)

    def save_ts_url(self, url, index):
        name = url.split("/")[-1]
        if not os.path.exists(self.path):
            os.makedirs(self.path)
        try:
            req = requests.get(url)
            req.raise_for_status()
            file_path = self.path + os.path.sep + str(index) + ".ts"
            print("download", file_path)
            if not os.path.exists(file_path):
                with open(file_path, 'wb') as f:
                    f.write(req.content)
            return req.content
        except:
            traceback.print_exc()

    def save_content(self, name, content, path):
        if type(content) == str:
            content = content.encode('utf-8')
        if not os.path.exists(path):
            os.makedirs(path)
        filepath = path + os.path.sep + name
        print(filepath)
        if not os.path.exists(filepath):
            with open(filepath, 'wb') as f:
                f.write(content)

    def chr_parse_int(self, s):
        s_list = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
                  'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
        i_list = list(range(0, 36))
        for i in range(len(s_list)):
            if s == s_list[i]:
                return i_list[i]

    def str_parse_int(self, s):
        result = 0
        for i in range(len(s)):
            i = self.chr_parse_int(s[i])
            result = result * 36 + i
        return result

    def parse_key(self, key):
        key = bytes(key, "utf-8")
        se = ord("a")
        if len(key) == 20:
            r = key[0]
            i = chr(r).lower()
            a = self.chr_parse_int(i) % 7
            n = key[a]
            o = chr(n)
            s = key[a + 1]
            l = chr(s)
            u = self.str_parse_int(o + l) % 3
            if u == 2:
                d = key[8]
                h = key[9]
                c = key[10]
                f = key[11]
                p = key[15]
                g = key[16]
                v = key[17]
                y = key[18]
                m = d - se + 26 * (int(chr(h)) + 1) - se
                b = c - se + 26 * (int(chr(f)) + 1) - se
                E = p - se + 26 * (int(chr(g)) + 1) - se
                T = v - se + 26 * (int(chr(y)) + 2) - se
                result = [key[0], key[1], key[2], key[3], key[4], key[5], key[6], key[7], m, b, key[12], key[13],
                          key[14], E, T, key[19]]
                return bytes(result)
            elif u == 1:
                result = [key[0], key[1], key[2], key[3], key[4], key[5], key[6], key[7], key[18], key[16], key[15],
                          key[13], key[12], key[11], key[10], key[8]]
                return bytes(result)
            else:
                if u != 0:
                    pass
                result = [key[0], key[1], key[2], key[3], key[4], key[5], key[6], key[7], key[8], key[10], key[11],
                          key[12], key[14], key[15], key[16], key[18]]
                return bytes(result)
        elif len(key) == 17:
            key = key[1:]
            result = [key[8], key[9], key[2], key[3], key[4], key[5], key[6], key[7], key[0], key[1], key[10], key[11],
                      key[12], key[13], key[14], key[15]]
            return bytes(result)
        else:
            return key

    def decoding(self):
        key = ""
        for i in range(0, len(self.ts_url_list)):
            ts_url = self.ts_url_list[i]
            print("No", i, "file\t", ts_url)
            ts = self.save_ts_url(ts_url, i)

            key_name = str(i) + ".key"
            iv_name = str(i) + ".iv"
            ts_name = str(i) + "_convert.ts"

            if i <= 1:
                key = '2310583a004e2246c322'#self.get(self.key_url_dealt[i])
                key = self.parse_key(key)
            iv = self.iv_dealt[i]
            print("key_url:", self.key_url_dealt[i])
            print("key:", key)
            print("iv", iv)

            self.save_content(key_name, key, self.path)
            self.save_content(iv_name, iv, self.path)

            iv = a2b_hex(iv)
            pc = PrpCrypt(key, iv)
            result = pc.decrypt(ts)
            with open(self.ts_path + "\\" + ts_name, 'wb') as f:
                f.write(result)
            self.ts_list.append(result)

    def merge_ts(self):
        out_file = open(self.result_path + os.path.sep + "1.ts", "wb")

        for i in range(0, len(self.ts_list)):
            in_file = self.ts_list[i]
            out_file.write(in_file)
        out_file.close()


def main():
    url = "https://edu.cda.cn/hls/18828/stream/hd/6c7593104a6b11eba04f02422cce336c.m3u8?protocol=https"
    cookie = ''
    referer = "https://service-cdn.qiqiuyun.net/js-sdk/video-player/1.1.62/player.html"
    user_agent = "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"

    save_path = r"d:\data\cda\tmp"
    ts_path = r"d:\data\cda\convert"
    result_path = r"d:\data\cda\aliyun_video"

    if not os.path.exists(save_path):
        os.makedirs(save_path)
    if not os.path.exists(ts_path):
        os.makedirs(ts_path)
    if not os.path.exists(result_path):
        os.makedirs(result_path)

    crawler = VideoCrawler(save_path, ts_path, result_path)
    crawler.set_headers(cookie, referer, user_agent)
    m3u8 = open(save_path + "\\list2.m3u8","r").read()
    # if not os.path.exists(save_path + "\\list2.m3u8"):
    #     with open(save_path + "\\list2.m3u8", "w") as f:
    #         f.write(m3u8)
    crawler.parse_m3u8(m3u8)
    crawler.decoding()
    crawler.merge_ts()


if __name__ == "__main__":
    main()
