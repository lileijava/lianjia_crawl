import base64
import binascii
import execjs
import queue
import re
import os
from concurrent.futures import ThreadPoolExecutor, wait, FIRST_COMPLETED, ALL_COMPLETED
import time

queue = queue.Queue()

class DecryptCSDNVideo:
    def __init__(self,key):
        self.data = []
        self.key = base64.b64decode(key)
        with open("../test.js", "r", encoding='UTF-8') as f:
            js_code = f.read()
        self.ctx = execjs.compile(js_code)
        self.pes_list = []

    def __decrypt(self,pes):
        param_data = binascii.b2a_hex(bytes(pes)).decode()
        param_key = binascii.b2a_hex(self.key).decode()
        result = self.ctx.call("func", param_data, param_key)
        return list(base64.b64decode(result))

    def __getBit(self,cha):
        bi = bin(cha)
        if len(bi[2:]) < 8:
            bi = '0' * (8 - len(bi[2:])) + bi[2:]
        return bi[1:2]

    def __getStartIndex(self,pes):
        for i in range(4, len(pes) - 3):
            if pes[i] == 0 and pes[i + 1] == 0 and pes[i + 2] == 1:
                return i
        return 0

    def __parse_pes_list(self):
        self.pes_list = []
        video = []
        index_video = []
        voice = []
        index_voice = []
        for i in range(0, len(self.data), 188):
            ts1 = self.data[i:i + 188]
            PID = (ts1[1] & 0x1f) << 8 | ts1[2]
            if PID == 256:
                video,index_video = self.__parse_pes(i, PID, video, index_video)
            elif PID == 257:
                voice,index_voice = self.__parse_pes(i, PID, voice, index_voice)

    def __parse_pes(self, i, pid, video, index_video):
        ts1 = self.data[i:i + 188]
        bit = self.__getBit(ts1[1])
        trycount = 1
        bit_next = ''
        ts2 = self.data[i + 188 * trycount: i + 188 * (trycount + 1)]
        while len(ts2) > 0:
            trycount += 1
            if ((ts2[1] & 0x1f) << 8 | ts2[2]) == pid:
                bit_next = self.__getBit(ts2[1])
                break
            else:
                bit_next = ''
            ts2 = self.data[i + 188 * trycount:i + 188 * (trycount + 1)]
        ids = [0, 0]
        if bit == '1':
            begin = self.__getStartIndex(ts1) + 8
            begin += ts1[begin] + 1
            video += ts1[begin:]
            ids[0] = i + begin
            ids[1] = len(ts1[begin:])
            index_video.append(ids)
        else:
            if bit_next == '1' or bit_next == '':
                b_idx = 4 + ts1[4] + 1
                video += ts1[b_idx:]
                ids[0] = i + b_idx
                ids[1] = 188 - b_idx
                index_video.append(ids)
            else:
                video += ts1[4:]
                ids[0] = i + 4
                ids[1] = 184
                index_video.append(ids)
        if bit_next == '1' or bit_next == '':
            pes_dict = {'data': video, 'index': index_video}
            self.pes_list.append(pes_dict)
            video = []
            index_video = []
        return video,index_video

    def decrypt_video(self,data):
        self.data = data
        self.__parse_pes_list()
        for d in self.pes_list:
            deResult = self.__decrypt(d['data'])
            idx = 0
            for ids in d['index']:
                start = ids[0]
                end = ids[0] + ids[1]
                for i in range(start, end):
                    self.data[i] = deResult[idx]
                    idx += 1
        return self.data

def decryptFile(threadname):
    decrypt = DecryptCSDNVideo('D0YyvTV5RnU3hLl9O6tFqw==')
    while not queue.empty():
        path = queue.get()
        findex = re.findall(r'.*/tsvideo/(\d+)\.ts',path,flags=0)[0]
        print('{}开始解密第{}个视频'.format(threadname, findex))
        f = open(path, 'rb')
        data = list(f.read())
        result = decrypt.decrypt_video(data)
        with open('D:/vvtoolbox-gui-series-0.4.3-win-64bit/tsvideo/video/{}.ts'.format(findex), 'wb') as fr:
            fr.write(bytes(result))

if __name__ == '__main__':
    # for findex in range(0, 212):
    #     queue.put('D:/vvtoolbox-gui-series-0.4.3-win-64bit/tsvideo/{}.ts'.format(str(findex)))
    #
    #
    # with ThreadPoolExecutor(max_workers=16) as t:
    #     all_task = [t.submit(decryptFile,'线程-{}'.format(i)) for i in range(1,17)]
    #     wait(all_task, return_when=FIRST_COMPLETED)
    #     print('finished')
    #     print(wait(all_task, timeout=2.5))

    files = os.listdir('D:/vvtoolbox-gui-series-0.4.3-win-64bit/tsvideo/video/')
    w = open('D:/vvtoolbox-gui-series-0.4.3-win-64bit/tsvideo/video/video.mp4', 'wb')
    for i in range(0, len(files)):
        print(i)
        f = open('D:/vvtoolbox-gui-series-0.4.3-win-64bit/tsvideo/video/{}.ts'.format(str(i)), 'rb')
        w.write(f.read())
        f.close()
    w.close()
