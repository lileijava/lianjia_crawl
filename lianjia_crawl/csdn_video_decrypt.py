#from Crypto.Cipher import ARC4
from Crypto.Cipher import AES
import base64
from aes_yk import AES_YK
import array

def copyArray_f(t, r, e, i, n):
    if i is not None or n is not None:
        if t:
            t = t[i:n]
    r.set(t, e)

if __name__ == '__main__':
    aes = AES_YK(base64.b64decode('D0YyvTV5RnU3hLl9O6tFqw=='))
    f = open('d:/vvtoolbox-gui-series-0.4.3-win-64bit/tsvideo/2.ts', 'rb')
    b = f.read()
    result = []
    for i in range(0,len(b)):
        e = b[i:i+16]
        result.append(aes.decrypt(e))
        i+=16
    with open('d:/result.ts', 'wb') as fr:
        fr.write(result)