#from Crypto.Cipher import ARC4
from Crypto.Cipher import AES
from aes_yk import AES_YK
import array
import execjs
import base64
import binascii

def copyArray_f(t, r, e, i, n):
    if i is not None or n is not None:
        if t:
            t = t[i:n]
    r.set(t, e)

def decrypt(data,key):
    with open("D:\pycharmWorkspace/lianjia_crawl/test.js", "r", encoding='UTF-8') as f:
        js_code = f.read()
    ctx = execjs.compile(js_code)
    result = ctx.call("func",binascii.b2a_hex(data).decode(),binascii.b2a_hex(key).decode())
    return base64.b64decode(result)

def toHex(num):
    """
    :type num: int
    :rtype: str
    """
    chaDic = {10: 'a', 11: 'b', 12: 'c', 13: 'd', 14: 'e', 15: 'f'}
    hexStr = ""

    if num < 0:
        num = num + 2 ** 32

    while num >= 16:
        digit = num % 16
        hexStr = chaDic.get(digit, str(digit)) + hexStr
        num //= 16
    hexStr = chaDic.get(num, str(num)) + hexStr

    return hexStr

def getBit(cha):
    bi = bin(cha)
    if len(bi[2:]) < 8:
        bi = '0' * (8 - len(bi[2:])) + bi[2:]
    return bi[1:2]

def getStartIndex(data):
    for i in range(4, len(data)-3):
        if data[i] == 0 and data[i+1] == 0 and data[i+2] == 1:
            return i
    return 0

if __name__ == '__main__':
    # aes = AES_YK(list(base64.b64decode('D0YyvTV5RnU3hLl9O6tFqw==')))
    # f = open('D:/vvtoolbox-gui-series-0.4.3-win-64bit/tsvideo/2.ts', 'rb')
    # b = list(f.read())
    # h = b[784:]
    # result = []
    # result += list(b[0:784])
    # for i in range(0,len(h),16):
    #     end = i + 16
    #     if end >= len(h):
    #         end = len(h) - 1
    #     e = list(h[i:end])
    #     r = aes.decrypt(e)
    #     result += r
    # # result = decrypt(b, base64.b64decode('D0YyvTV5RnU3hLl9O6tFqw=='))
    # with open('d:/result.ts', 'wb') as fr:
    #     fr.write(bytes(result))
    # ---------------------------------------------------------------------------------------------
    # f = open('D:/vvtoolbox-gui-series-0.4.3-win-64bit/tsvideo/2.ts', 'rb')
    # b = list(f.read())
    # f1 = open('D:/vvtoolbox-gui-series-0.4.3-win-64bit/tsvideo/decrypted/2.ts', 'rb')
    # b1 = list(f1.read())
    # flag = False
    # for i in range(0,len(b)):
    #     if b[i] != b1[i] and flag:
    #         print(i)
    #         flag = False
    #         # break
    #     else:
    #         flag = True
    # ---------------------------------------------------------------------------------------------

    f = open('D:/vvtoolbox-gui-series-0.4.3-win-64bit/tsvideo/2.ts', 'rb')
    result = []

    oldVideo = []
    oldVoice = []
    video = []
    voice = []
    section = f.read(188)
    begin = 0
    while len(section) == 188:
        PID = (section[1] & 0x1f) << 8 | section[2]
        if PID == 256:
            oldVideo.append(list(section))
            bit = getBit(section[1])
            if bit == '1':
                begin = getStartIndex(list(section))
                if len(video) == 0 and begin > 0:
                    video += list(section[begin+19:])
                else:
                    deResult = list(decrypt(bytes(video), base64.b64decode('D0YyvTV5RnU3hLl9O6tFqw==')))
                    num = 1
                    rindex = 0
                    for v in oldVideo:
                        if num == 1:
                            r1 = v[0:begin + 19]
                            r2 = deResult[rindex : 188 - len(r1)]
                            rindex = 188 - len(r1)
                            result += r1 + r2
                        else:
                            r1 = v[0:4]
                            r2 = deResult[rindex : rindex + 184]
                            rindex += 184
            else:
                video += list(section[4:])
        elif PID == 257:
            oldVoice.append(list(section))
            bit = getBit(section[1])
            if bit == '1':
                begin = getStartIndex(list(section))
                if len(voice) == 0 and begin > 0:
                    voice += list(section[begin + 19:])
                else:
                    deResult = list(decrypt(bytes(voice), base64.b64decode('D0YyvTV5RnU3hLl9O6tFqw==')))
                    num = 1
                    rindex = 0
                    for v in oldVoice:
                        if num == 1:
                            r1 = v[0:begin + 19]
                            r2 = deResult[rindex: 188 - len(r1)]
                            rindex = 188 - len(r1)
                            result += r1 + r2
                        else:
                            r1 = v[0:4]
                            r2 = deResult[rindex: rindex + 184]
                            rindex += 184
            else:
                video += list(section[4:])
        else:
            result += list(section)
        section = f.read(188)

    with open('d:/result.ts', 'wb') as fr:
        fr.write(bytes(result))

    #-----------------------------------------------------------------------------------------------
    # file = open('D:/vvtoolbox-gui-series-0.4.3-win-64bit/tsvideo/2.ts', 'rb')
    # offset = 0
    # start = 0
    # section = file.read(188)
    # while len(section) == 188:
    #     for c in section:
    #         if c == 71:
    #             print('(%03d,%03d)' % (start, offset)),
    #         offset = offset + 1
    #     section = file.read(188)
    #     offset = 0
    #     start = start + 1
    # file.close()
    #-------------------------------------------------------------------------------------------------
    file = open('D:/vvtoolbox-gui-series-0.4.3-win-64bit/tsvideo/1.ts', 'rb')
    file1 = open('D:/vvtoolbox-gui-series-0.4.3-win-64bit/tsvideo/decrypted/1.ts', 'rb')
    total = dict()
    section = file.read(188)
    section1 = file1.read(188)
    num = 0
    lastpid = 0
    while len(section) == 188:
        PID = (section[1] & 0x1f) << 8 | section[2]
        if PID == 256 and lastpid != PID:
            bi = bin(section[1])
            if len(bi[2:]) < 8:
                bi = '0'*(8-len(bi[2:]))+bi[2:]
            print(bi)
            d = list(section)
            print(lastpid)
            print(PID)
            print([hex(i) for i in section])
            print(list(section))
            print([hex(i) for i in section1])
            print(list(section1))
            # print([hex(a) for a in list(section1)])
            print('-'*50)
            num += 1
        for key in total.keys():
            if PID == key:
                total[key] = total[key] + 1
                break
        else:
            total[PID] = 1
        section = file.read(188)
        section1 = file1.read(188)
        lastpid = PID
    print(total)
    file.close()