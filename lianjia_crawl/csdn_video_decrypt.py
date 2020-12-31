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
    print(result)
    return result

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
    #
    # for i in range(0,len(b)):
    #     if b[i] != b1[i]:
    #         print(i)
    #         break;
    # ---------------------------------------------------------------------------------------------
    f = open('D:/vvtoolbox-gui-series-0.4.3-win-64bit/tsvideo/2.ts', 'rb')
    b = f.read()
    result = decrypt(b, base64.b64decode('D0YyvTV5RnU3hLl9O6tFqw=='))
    # aes = AES_YK(list(base64.b64decode('D0YyvTV5RnU3hLl9O6tFqw==')))
    # result = b[0:784]
    # h = b[784:]
    # if len(b)%16 > 0:
    #     end = 16 * int(len(h)/16)
    #     result += decrypt(h[0:end],base64.b64decode('D0YyvTV5RnU3hLl9O6tFqw=='))
    #     result += h[end:]
    with open('d:/result.ts', 'wb') as fr:
        fr.write(base64.b64decode(result))