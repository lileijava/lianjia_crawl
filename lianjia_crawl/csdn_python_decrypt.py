from aes_yk import AES_YK
import base64
import binascii
import execjs

def decrypt(data,key):
    with open("../test.js", "r", encoding='UTF-8') as f:
        js_code = f.read()
    ctx = execjs.compile(js_code)
    result = ctx.call("func",binascii.b2a_hex(data).decode(),binascii.b2a_hex(key).decode())
    return base64.b64decode(result)

def copyArray_f(t, r, e, i, n):
    if i is not None or n is not None:
        if t:
            t = t[i:n]
    r.set(t, e)

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

def pydecrypt(data, key):
    aes = AES_YK(list(base64.b64decode(key)))
    if len(data) % 16 > 0:
        a = 16 * int(len(data) / 16)
        n = data[0:a]
        n = aes.dataDecrypt(n)
        t = n + data[len(n):]
        return t
    n = aes.dataDecrypt(data)
    return n

if __name__ == '__main__':
    '''
    f = open('D:/vvtoolbox-gui-series-0.4.3-win-64bit/tsvideo/2.ts', 'rb')
    data = list(f.read())
    index_video = []
    index_voice = []
    video = []
    voice = []
    for i in range(0, len(data), 188):
        ts1 = data[i:i + 188]
        PID = (ts1[1] & 0x1f) << 8 | ts1[2]
        if PID == 256:
            bit = getBit(ts1[1])

            trycount = 1
            bit_next = ''
            ts2 = data[i + 188 * trycount: i + 188 * (trycount + 1)]
            while len(ts2) > 0:
                trycount += 1
                if ((ts2[1] & 0x1f) << 8 | ts2[2]) == 256:
                    bit_next = getBit(ts2[1])
                    break
                ts2 = data[i + 188 * trycount:i + 188 * (trycount + 1)]
            if bit == '1' and bit_next == '0':
                begin = getStartIndex(ts1)
                video += list(ts1[begin + 19:])
                ids = [0, 0]
                ids[0] = i + begin + 19
                ids[1] = len(ts1[begin + 19:])
                index_video.append(ids)
            elif bit == '0' and (bit_next == '1' or bit_next == ''):
                deResult = list(decrypt(bytes(video), base64.b64decode('ZOmY0Fhc6u9zjwi9ky4PpA==')))
                idx = 0
                for ids in index_video:
                    start = ids[0]
                    end = ids[0] + ids[1]
                    for i in range(start, end):
                        data[i] = deResult[idx]
                        idx += 1
            else:
                video += ts1[4:]
                ids = [0, 0]
                ids[0] = i + 4
                ids[1] = 184
                index_video.append(ids)
        elif PID == 257:
            bit = getBit(ts1[1])

            trycount = 1
            bit_next = ''
            ts2 = data[i + 188 * trycount:i + 188 * (trycount + 1)]
            while len(ts2) > 0:
                if ((ts2[1] & 0x1f) << 8 | ts2[2]) == 257:
                    bit_next = getBit(ts2[1])
                    break
                trycount += 1
                ts2 = data[i + 188 * trycount:i + 188 * (trycount + 1)]
            if bit == '1' and bit_next == '0':
                begin = getStartIndex(ts1)
                voice += list(ts1[begin + 19:])
                ids = [0, 0]
                ids[0] = i + begin + 19
                ids[1] = len(ts1[begin + 19:])
                index_voice.append(ids)
            elif bit == '0' and (bit_next == '1' or bit_next == ''):
                deResult = decrypt(voice, base64.b64decode('ZOmY0Fhc6u9zjwi9ky4PpA=='))
                idx = 0
                for ids in index_voice:
                    start = ids[0]
                    end = ids[0] + ids[1]
                    for i in range(start, end):
                        data[i] = deResult[idx]
                        idx += 1
            else:
                voice += ts1[4:]
                ids = [0, 0]
                ids[0] = i + 4
                ids[1] = 184
                index_voice.append(ids)

    with open('d:/result.ts', 'wb') as fr:
        fr.write(bytes(data))
    '''
    # e = [177, 132, 61, 115, 70, 26, 38, 64, 40, 221, 125, 184, 188, 187, 254, 148, 23, 178, 96, 226, 20, 86, 14, 68, 113, 91, 238, 14, 129, 168, 213, 14, 41, 227, 224, 99, 167, 57, 19, 249, 200, 203, 6, 229, 25, 180, 185, 150, 75, 241, 182, 190, 133, 244, 44, 222, 162, 47, 5, 155, 0, 241, 206, 252, 15, 28, 255, 127, 202, 214, 186, 68, 226, 146, 149, 122, 132, 194, 150, 228, 217, 87, 124, 41, 9, 212, 179, 160, 159, 47, 234, 84, 252, 186, 32, 229, 234, 252, 143, 35, 251, 174, 95, 48, 45, 103, 230, 63]
    # d = [1, 203, 246, 188, 65, 196, 204, 76, 4, 161, 27, 142, 51, 69, 115, 162, 81, 118, 68, 0, 0, 3, 0, 0, 3, 0, 2, 133, 120, 0, 0, 3, 0, 195, 30, 128, 0, 1, 131, 168, 0, 0, 8, 121, 192, 0, 0, 70, 103, 0, 0, 4, 32, 224, 0, 0, 78, 86, 0, 0, 8, 71, 54, 85, 86, 48, 66, 106, 193, 160, 235, 107, 150, 73, 1, 100, 252, 156, 232, 50, 0, 0, 3, 0, 0, 3, 0, 20, 88, 114, 157, 39, 148, 111, 195, 5, 138, 24, 184, 237, 203, 34, 92, 153, 64, 214, 27, 63]
    #
    # s1 = decrypt(bytes(e),base64.b64decode('ZOmY0Fhc6u9zjwi9ky4PpA=='))
    # print(list(s1))
    # print(d)

    a = [0, 0, 1, 224, 0, 0, 128, 192, 10, 49, 0, 15, 233, 1, 17, 0, 15, 176, 193]
    print([hex(s) for s in a])
