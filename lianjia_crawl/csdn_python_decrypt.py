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
    e = [71, 65, 0, 48, 7, 80, 0, 8, 78, 244, 126, 0, 0, 0, 1, 224, 0, 0, 128, 192, 10, 49, 0, 71, 96, 65, 17, 0, 71, 40, 1,
     242, 227, 79, 24, 132, 205, 176, 185, 120, 29, 208, 242, 254, 82, 108, 129, 122, 186, 174, 156, 27, 156, 67, 54,
     126, 245, 100, 96, 110, 82, 247, 158, 214, 144, 65, 218, 219, 128, 17, 176, 26, 148, 176, 146, 1, 35, 25, 151, 251,
     4, 213, 152, 112, 38, 226, 237, 19, 30, 228, 11, 221, 138, 240, 125, 108, 30, 251, 55, 97, 59, 126, 117, 171, 8,
     253, 85, 43, 86, 80, 234, 160, 254, 96, 189, 185, 199, 161, 24, 85, 69, 198, 165, 173, 72, 177, 235, 98, 165, 3, 9,
     17, 163, 24, 129, 144, 189, 105, 80, 180, 70, 246, 49, 209, 92, 182, 21, 104, 146, 162, 188, 111, 86, 190, 15, 39,
     153, 211, 14, 25, 224, 158, 134, 18, 161, 153, 46, 236, 213, 176, 49, 156, 237, 44, 219, 163, 187, 80, 67, 51, 91,
     65, 150, 213, 107, 155, 54, 93]
    d = [71, 65, 0, 48, 7, 80, 0, 8, 78, 244, 126, 0, 0, 0, 1, 224, 0, 0, 128, 192, 10, 49, 0, 71, 96, 65, 17, 0, 71, 40, 1,
     0, 0, 0, 1, 9, 240, 0, 0, 0, 1, 103, 100, 0, 40, 172, 217, 64, 93, 7, 94, 34, 124, 4, 64, 0, 0, 3, 0, 64, 0, 0, 12,
     131, 198, 12, 101, 128, 0, 0, 0, 1, 104, 235, 227, 242, 192, 0, 0, 1, 101, 136, 132, 0, 79, 242, 15, 47, 233, 64,
     91, 101, 218, 110, 63, 203, 228, 182, 112, 232, 48, 44, 251, 115, 152, 41, 60, 153, 161, 190, 3, 4, 148, 56, 125,
     191, 6, 63, 39, 151, 212, 64, 151, 152, 117, 169, 219, 154, 109, 173, 83, 124, 198, 45, 222, 42, 79, 193, 161, 100,
     167, 193, 138, 147, 0, 208, 119, 206, 40, 254, 180, 130, 254, 35, 83, 180, 75, 164, 92, 126, 200, 215, 132, 21,
     203, 137, 217, 52, 198, 88, 37, 88, 43, 218, 232, 35, 62, 64, 219, 116, 98, 107, 19, 170, 59, 178, 163, 220]

    s1 = decrypt(bytes(e[31:47]),base64.b64decode('D0YyvTV5RnU3hLl9O6tFqw=='))
    s = pydecrypt(e[31:47],'D0YyvTV5RnU3hLl9O6tFqw==')
    print(list(s1))
    print(list(s))
    print(d[31:47])
