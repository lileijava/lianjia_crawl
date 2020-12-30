#from Crypto.Cipher import ARC4
from Crypto.Cipher import AES
import base64
from aes_yk import AES_YK
import array
import execjs

def copyArray_f(t, r, e, i, n):
    if i is not None or n is not None:
        if t:
            t = t[i:n]
    r.set(t, e)

# def decrypt(data,key):
#     with open("D:\PycharmProjects/lianjia_crawl/test.js", "rb") as f:
#         js_code = f.read()
#
#     ctx = execjs.compile(js_code)
#     return ctx.call("func", data, key)

if __name__ == '__main__':
    aes = AES_YK(base64.b64decode('D0YyvTV5RnU3hLl9O6tFqw=='))
    f = open('D:/vvtoolbox-gui-series-0.4.3-win-64bit/tsvideo/2.ts', 'rb')
    b = f.read()
    h = b[784:]
    result = b''
    result += b[0:784]
    for i in range(0,len(h)):
        e= h[i*16:(i+1)*16]
        result += bytes(aes.decrypt(e))
        i += 16
    # result = decrypt(b, base64.b64decode('D0YyvTV5RnU3hLl9O6tFqw=='))
    with open('d:/result.ts', 'wb') as fr:
        fr.write(result)
    # f = open('D:/vvtoolbox-gui-series-0.4.3-win-64bit/tsvideo/2.ts', 'rb')
    # b = list(f.read())
    # f1 = open('D:/vvtoolbox-gui-series-0.4.3-win-64bit/tsvideo/decrypted/2.ts', 'rb')
    # b1 = list(f1.read())
    #
    # for i in range(0,len(b)):
    #     if b[i] != b1[i]:
    #         print(i)
    #         break;
